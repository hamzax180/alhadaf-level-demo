import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const app = express();

const PORT = Number(process.env.PORT || 8080);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/categories", async (_req, res) => {
  const cats = await prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { nameEn: "asc" }] });
  res.json(cats);
});

app.get("/api/products", async (_req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(products);
});

// Search products
app.get("/api/search", async (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase().trim();
  if (!q) {
    return res.json({ query: q, results: [] });
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { nameEn: { contains: q, mode: "insensitive" } },
        { nameAr: { contains: q, mode: "insensitive" } },
        { descriptionEn: { contains: q, mode: "insensitive" } },
        { descriptionAr: { contains: q, mode: "insensitive" } },
        { category: { nameEn: { contains: q, mode: "insensitive" } } },
        { category: { nameAr: { contains: q, mode: "insensitive" } } },
      ]
    },
    include: { category: true },
    take: 50
  });

  res.json({ query: q, results: products });
});

app.get("/api/categories/:slug/products", async (req, res) => {
  const { slug } = req.params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  if (!cat) return res.status(404).json({ error: "Category not found" });

  const products = await prisma.product.findMany({ where: { categoryId: cat.id }, orderBy: { createdAt: "desc" } });
  res.json({ category: cat, products });
});

app.get("/api/products/:slug", async (req, res) => {
  const { slug } = req.params;
  const p = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });
  if (!p) return res.status(404).json({ error: "Product not found" });
  res.json(p);
});

// Cart
app.post("/api/cart", async (_req, res) => {
  const cart = await prisma.cart.create({ data: {} });
  res.json(cart);
});

app.get("/api/cart/:id", async (req, res) => {
  const cart = await prisma.cart.findUnique({
    where: { id: req.params.id },
    include: { items: { include: { product: true } } }
  });
  if (!cart) return res.status(404).json({ error: "Cart not found" });
  res.json(cart);
});

const AddItemSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().min(1).max(99).default(1)
});

app.post("/api/cart/:id/items", async (req, res) => {
  const cartId = req.params.id;
  const parsed = AddItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const cart = await prisma.cart.findUnique({ where: { id: cartId } });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  const product = await prisma.product.findUnique({ where: { id: parsed.data.productId } });
  if (!product) return res.status(404).json({ error: "Product not found" });

  // Merge if exists
  const existing = await prisma.cartItem.findFirst({ where: { cartId, productId: product.id } });
  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { qty: existing.qty + parsed.data.qty }
    });
    return res.json(updated);
  }

  const item = await prisma.cartItem.create({ data: { cartId, productId: product.id, qty: parsed.data.qty } });
  res.json(item);
});

const UpdateQtySchema = z.object({ qty: z.number().int().min(1).max(99) });

app.patch("/api/cart/:cartId/items/:itemId", async (req, res) => {
  const parsed = UpdateQtySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const item = await prisma.cartItem.findUnique({ where: { id: req.params.itemId } });
  if (!item || item.cartId !== req.params.cartId) return res.status(404).json({ error: "Item not found" });

  const updated = await prisma.cartItem.update({ where: { id: item.id }, data: { qty: parsed.data.qty } });
  res.json(updated);
});

app.delete("/api/cart/:cartId/items/:itemId", async (req, res) => {
  const item = await prisma.cartItem.findUnique({ where: { id: req.params.itemId } });
  if (!item || item.cartId !== req.params.cartId) return res.status(404).json({ error: "Item not found" });

  await prisma.cartItem.delete({ where: { id: item.id } });
  res.json({ ok: true });
});

const CheckoutSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  city: z.string().min(2),
  address: z.string().min(5),
});

app.post("/api/cart/:id/checkout", async (req, res) => {
  const cartId = req.params.id;
  const parsed = CheckoutSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: { include: { product: true } } }
  });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  const totalSar = cart.items.reduce((sum, it) => sum + (it.product.priceSar * it.qty), 0);

  const order = await prisma.order.create({
    data: {
      cartId,
      totalSar,
      name: parsed.data.name,
      phone: parsed.data.phone,
      city: parsed.data.city,
      address: parsed.data.address,
    }
  });

  res.json({ ok: true, order });
});

app.listen(PORT, () => {
  console.log(`API listening on :${PORT}`);
});
