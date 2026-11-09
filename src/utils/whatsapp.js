import { companyInfo } from '../data/navigation';

/**
 * Builds a clean WhatsApp chat link without any leading '+' symbol.
 * Example: https://wa.me/251911209405?text=Hello...
 */
export function getWhatsAppUrl(phoneRaw = null, message = '') {
  const number = phoneRaw || companyInfo.phones[0].raw;
  // Strip any non-digit characters to ensure strict international format
  const sanitized = number.replace(/\D/g, '');
  
  if (message && message.trim() !== '') {
    const encoded = encodeURIComponent(message.trim());
    return `https://wa.me/${sanitized}?text=${encoded}`;
  }
  
  return `https://wa.me/${sanitized}`;
}

export function buildTourWhatsAppMessage(tourTitle, customerName = '') {
  let text = `Hello Hana Lema! I would like to inquire regarding Expedition Travel – Go Lite services.`;
  if (tourTitle) {
    text = `Hello Hana Lema! I would like to inquire about "${tourTitle}" with Expedition Travel – Go Lite.`;
  }
  if (customerName) {
    text += ` My name is ${customerName}.`;
  }
  text += ` Could you please share availability, itinerary suggestions, and quote details? Thank you!`;
  return text;
}
