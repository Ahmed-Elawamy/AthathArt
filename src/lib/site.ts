import { siteConfig } from './siteConfig';

export function whatsappLink(message: string): string {
  const number = siteConfig.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 }).format(price);
}
