import fs from 'node:fs/promises';
import path from 'node:path';

const messages: Record<string, () => Promise<any>> = {
  ar: () => import('../messages_data/ar.json').then((m) => m.default),
  en: () => import('../messages_data/en.json').then((m) => m.default),
};

export async function getMessages(locale: string) {
  try {
    const loader = messages[locale];
    if (loader) {
      return await loader();
    }
    // If locale not found, try default
    return await messages['en']();
  } catch (err) {
    return {
      "nav_home": "Home",
      "company_name": "Alhadaf Level",
      "company_tagline": "Agriculture • Trading",
      "home_hero_title": "Agricultural Solutions",
      "home_hero_subtitle": "Quality and Trust"
    };
  }
}
