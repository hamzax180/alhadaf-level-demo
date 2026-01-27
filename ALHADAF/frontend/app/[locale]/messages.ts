import fs from 'node:fs/promises';
import path from 'node:path';

export async function getMessages(locale: string) {
  try {
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
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
