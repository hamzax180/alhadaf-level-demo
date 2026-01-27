import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(process.cwd(), "prisma", "seed-data.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  const data = JSON.parse(raw);

  // Upsert categories
  const categoryBySlug = new Map();
  for (const c of data.categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { nameEn: c.nameEn, nameAr: c.nameAr, sortOrder: c.sortOrder ?? 0, imageUrl: c.image ?? null },
      create: { slug: c.slug, nameEn: c.nameEn, nameAr: c.nameAr, sortOrder: c.sortOrder ?? 0, imageUrl: c.image ?? null },
    });
    categoryBySlug.set(c.slug, cat);
  }

  // Upsert products
  for (const p of data.products) {
    const cat = categoryBySlug.get(p.categorySlug);
    if (!cat) continue;

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        nameEn: p.nameEn,
        nameAr: p.nameAr,
        descriptionEn: p.descriptionEn,
        descriptionAr: p.descriptionAr,
        priceSar: p.price,
        inStock: p.inStock !== false,
        imageUrl: p.image ?? null,
        categoryId: cat.id
      },
      create: {
        slug: p.slug,
        nameEn: p.nameEn,
        nameAr: p.nameAr,
        descriptionEn: p.descriptionEn,
        descriptionAr: p.descriptionAr,
        priceSar: p.price,
        inStock: p.inStock !== false,
        imageUrl: p.image ?? null,
        categoryId: cat.id
      },
    });
  }

  console.log("Seed done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
