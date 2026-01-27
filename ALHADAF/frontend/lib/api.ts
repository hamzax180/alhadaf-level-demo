export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

// MOCK DATA for Demo
const MOCK_CATEGORIES = [
  { id: '1', slug: 'fertilizers', nameEn: 'Fertilizers', nameAr: 'أسمدة', imageUrl: '/img/products/product-1.png' },
  { id: '2', slug: 'seeds', nameEn: 'Seeds', nameAr: 'بذور', imageUrl: '/img/products/product-2.png' },
  { id: '3', slug: 'equipment', nameEn: 'Equipment', nameAr: 'معدات', imageUrl: '/img/products/product-3.png' },
  { id: '4', slug: 'pesticides', nameEn: 'Pesticides', nameAr: 'مبيدات', imageUrl: '/img/products/product-1.png' },
  { id: '5', slug: 'irrigation', nameEn: 'Irrigation', nameAr: 'ري', imageUrl: '/img/products/product-2.png' },
];

const MOCK_PRODUCTS = [
  {
    id: '101', slug: 'npk-20-20-20', nameEn: 'NPK 20-20-20 Fertilizer', nameAr: 'سماد NPK 20-20-20',
    descriptionEn: 'High quality fertilizer.', descriptionAr: 'سماد عالي الجودة.',
    priceSar: 150, inStock: true, imageUrl: '/img/products/product-1.png', categoryId: '1'
  },
  {
    id: '102', slug: 'tomato-seeds', nameEn: 'Hybrid Tomato Seeds', nameAr: 'بذور طماطم هجين',
    descriptionEn: 'Disease resistant.', descriptionAr: 'مقاومة للأمراض.',
    priceSar: 45, inStock: true, imageUrl: '/img/products/product-2.png', categoryId: '2'
  },
  {
    id: '103', slug: 'sprayer-5l', nameEn: '5L Garden Sprayer', nameAr: 'رشاشة حدائق 5 لتر',
    descriptionEn: 'Durable plastic.', descriptionAr: 'بلاستيك متين.',
    priceSar: 80, inStock: true, imageUrl: '/img/products/product-3.png', categoryId: '3'
  },
  {
    id: '104', slug: 'cucumber-seeds', nameEn: 'Cucumber Seeds F1', nameAr: 'بذور خيار F1',
    descriptionEn: 'High yield.', descriptionAr: 'انتتاجية عالية.',
    priceSar: 55, inStock: true, imageUrl: '/img/products/product-1.png', categoryId: '2'
  },
  {
    id: '105', slug: 'urea-46', nameEn: 'Urea 46%', nameAr: 'يوريا 46%',
    descriptionEn: 'Nitrogen rich.', descriptionAr: 'غني بالنيتروجين.',
    priceSar: 120, inStock: true, imageUrl: '/img/products/product-2.png', categoryId: '1'
  },
];

const MOCK_OFFERS = [
  {
    id: '201', titleEn: 'Summer Sale', titleAr: 'عروض الصيف',
    subtitleEn: 'Up to 50% off', subtitleAr: 'خصم يصل إلى 50%',
    discountPercent: 50, productId: '101',
    imageUrl: '/img/products/product-1.png',
    product: MOCK_PRODUCTS[0],
    expiresAt: new Date(Date.now() + 86400000).toISOString()
  },
  {
    id: '202', titleEn: 'Bundle Deal', titleAr: 'عرض التوفير',
    subtitleEn: 'Buy 2 Get 1 Free', subtitleAr: 'اشتري 2 واحصل على 1 مجانا',
    discountPercent: 33, productId: '102',
    imageUrl: '/img/products/product-2.png',
    product: MOCK_PRODUCTS[1],
    expiresAt: new Date(Date.now() + 172800000).toISOString()
  }
];


export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  // MOCK RESPONSES
  console.log(`[MockAPI] Request: ${path}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      if (path === '/api/categories') {
        resolve(MOCK_CATEGORIES as any);
      } else if (path === '/api/products') {
        resolve(MOCK_PRODUCTS as any);
      } else if (path === '/api/products/offers') {
        resolve(MOCK_OFFERS as any);
      } else if (path.startsWith('/api/products/search')) {
        const url = new URL(path, 'http://dummy.com'); // Hack to parse query params
        const q = url.searchParams.get('q')?.toLowerCase() || '';
        const results = MOCK_PRODUCTS.filter(p =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.descriptionEn.toLowerCase().includes(q) ||
          p.descriptionAr.includes(q)
        );
        resolve(results as any);
      } else if (path.startsWith('/api/products/')) {
        // Single product fetch
        const slug = path.split('/').pop();
        const product = MOCK_PRODUCTS.find(p => p.slug === slug || p.id === slug);
        resolve(product as any);
      } else {
        // Default empty
        resolve([] as any);
      }
    }, 500); // Simulate network delay
  });

  /* 
  // ORIGINAL FETCH CODE (Commented out for Demo)
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store"
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
  */
}
