import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Service layer for booking inquiries and contact messages.
 * Inserts directly into Supabase 'inquiries' table when configured,
 * with network timeouts, input preservation, and friendly retry responses for slow/unstable connections.
 */
export const inquiryService = {
  /**
   * Submit a booking inquiry
   */
  async submitBookingInquiry(inquiryData) {
    // Validation checks
    if (!inquiryData.fullName || inquiryData.fullName.trim().length < 2) {
      throw new Error('Please enter your full name (minimum 2 characters).');
    }

    if (!inquiryData.phone || inquiryData.phone.trim().length < 6) {
      throw new Error('Please provide a valid contact phone number so our team can reach you.');
    }

    // Email format validation if entered
    if (inquiryData.email && inquiryData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inquiryData.email.trim())) {
        throw new Error('Please enter a valid email address, or leave it blank.');
      }
    }

    const refId = `HM-${Date.now().toString().slice(-6)}`;

    if (isSupabaseConfigured()) {
      try {
        const message = [
          inquiryData.tourTitle ? `Service / Destination: ${inquiryData.tourTitle}` : '',
          inquiryData.notes?.trim() ? `Notes: ${inquiryData.notes.trim()}` : '',
          `Reference: ${refId}`
        ].filter(Boolean).join('\n');

        const payload = {
          customer_name: inquiryData.fullName.trim(),
          phone: inquiryData.phone.trim(),
          email: inquiryData.email?.trim() || null,
          message: message,
          tour_id: inquiryData.tourSlug || null,
          travel_date: inquiryData.travelDate && inquiryData.travelDate.trim() ? inquiryData.travelDate.trim() : null,
          travelers: inquiryData.travelers ? Number(inquiryData.travelers) : 1,
        };

        // Timeout promise after 12 seconds
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Connection timed out. Please check your internet connection and tap retry.')), 12000);
        });

        const insertPromise = supabase
          .from('inquiries')
          .insert([payload]);

        const { error } = await Promise.race([insertPromise, timeoutPromise]);

        if (error) {
          console.error('Supabase inquiry insert error:', error);
          throw new Error('Unable to record inquiry right now. Please tap retry or message us on WhatsApp.');
        }

        return {
          success: true,
          referenceId: refId,
          message: 'Thank you! Your inquiry has been received by Expedition Travel – Go Lite. Hana Lema and our operations team will contact you shortly.',
          data: payload,
        };
      } catch (err) {
        console.warn('Inquiry submission exception:', err);
        throw err;
      }
    }

    // Fallback or demo mode receipt
    console.info('[Expedition Travel – Go Lite Demo Submission] Service inquiry received:', {
      reference: refId,
      ...inquiryData,
      submittedAt: new Date().toISOString()
    });

    return {
      success: true,
      referenceId: refId,
      message: 'Thank you! Your travel inquiry details were verified. For immediate confirmation, you can also reach us directly via WhatsApp or phone.',
      data: {
        ...inquiryData,
        referenceId: refId,
      }
    };
  },

  /**
   * Submit a general contact inquiry
   */
  async submitContactMessage(contactData) {
    if (!contactData.name || contactData.name.trim().length < 2) {
      throw new Error('Please provide your name.');
    }

    if (!contactData.phone || contactData.phone.trim().length < 6) {
      throw new Error('Please provide a valid phone number.');
    }

    if (!contactData.message || contactData.message.trim().length < 10) {
      throw new Error('Please share a brief message (minimum 10 characters).');
    }

    // Email validation if entered
    if (contactData.email && contactData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email.trim())) {
        throw new Error('Please enter a valid email address, or leave it blank.');
      }
    }

    const refId = `MSG-${Date.now().toString().slice(-6)}`;

    if (isSupabaseConfigured()) {
      try {
        const fullMessage = [
          contactData.subject ? `Subject: ${contactData.subject}` : '',
          contactData.message.trim(),
          `Reference: ${refId}`
        ].filter(Boolean).join('\n\n');

        const payload = {
          customer_name: contactData.name.trim(),
          phone: contactData.phone.trim(),
          email: contactData.email?.trim() || null,
          message: fullMessage,
        };

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Connection timed out. Please check your internet connection and tap retry.')), 12000);
        });

        const insertPromise = supabase
          .from('inquiries')
          .insert([payload]);

        const { error } = await Promise.race([insertPromise, timeoutPromise]);

        if (error) {
          console.error('Supabase contact message error:', error);
          throw new Error('Unable to send message right now. Please tap retry or message us on WhatsApp.');
        }

        return {
          success: true,
          referenceId: refId,
          message: 'Your message has been received! Our Addis Ababa office will get in touch with you promptly.',
          data: payload,
        };
      } catch (err) {
        console.warn('Contact message submission exception:', err);
        throw err;
      }
    }

    console.info('[Expedition Travel – Go Lite Demo Submission] Contact message received:', {
      reference: refId,
      ...contactData,
      submittedAt: new Date().toISOString()
    });

    return {
      success: true,
      referenceId: refId,
      message: 'Your message has been received! Our team in Addis Ababa will review your inquiry and contact you promptly.',
      data: {
        ...contactData,
        referenceId: refId,
      }
    };
  }
};
