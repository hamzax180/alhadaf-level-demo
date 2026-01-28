export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

// MOCK DATA for Demo
const MOCK_CATEGORIES = [
  { id: '1', slug: 'fertilizers', nameEn: 'Fertilizers', nameAr: 'أسمدة', imageUrl: '/img/products/torofert.jpg' },
  { id: '2', slug: 'seeds', nameEn: 'Seeds', nameAr: 'بذور', imageUrl: '/img/products/seeds-tomato.png' },
  { id: '3', slug: 'equipment', nameEn: 'Equipment', nameAr: 'معدات', imageUrl: '/img/products/humic.jpg' },
  { id: '4', slug: 'pesticides', nameEn: 'Pesticides', nameAr: 'مبيدات', imageUrl: '/img/products/foliar-max.jpg' },
  { id: '5', slug: 'irrigation', nameEn: 'Irrigation', nameAr: 'ري', imageUrl: '/img/products/green-power.jpg' },
];

const MOCK_PRODUCTS = [
  // FERTILIZERS (Cat 1)
  {
    id: '101', slug: 'npk-20-20-20', nameEn: 'NPK 20-20-20 Fertilizer', nameAr: 'سماد NPK 20-20-20',
    descriptionEn: 'High quality NPK fertilizer for all crops.', descriptionAr: 'سماد NPK عالي الجودة لجميع المحاصيل.',
    priceSar: 150, inStock: true, imageUrl: '/img/products/torofert.jpg', categoryId: '1'
  },
  {
    id: '105', slug: 'torophoska', nameEn: 'Torophoska Fertilizer', nameAr: 'سماد توروفوسكا',
    descriptionEn: 'Granular fertilizer rich in phosphorus.', descriptionAr: 'سماد حبيبي غني بالفوسفور.',
    priceSar: 120, inStock: true, imageUrl: '/img/products/torophoska.jpg', categoryId: '1'
  },
  {
    id: '106', slug: 'leaf-booster', nameEn: 'Leaf Booster', nameAr: 'معزز الأوراق',
    descriptionEn: 'Foliar spray for greenery.', descriptionAr: 'رش ورقي لزيادة الاخضرار.',
    priceSar: 95, inStock: true, imageUrl: '/img/products/leaf-booster.jpg', categoryId: '1'
  },
  {
    id: '107', slug: 'mkp-fertilizer', nameEn: 'MKP Fertilizer', nameAr: 'سماد MKP',
    descriptionEn: 'Mono Potassium Phosphate.', descriptionAr: 'فوسفات بوتاسيوم أحادي.',
    priceSar: 180, inStock: true, imageUrl: '/img/products/mkp.jpg', categoryId: '1'
  },
  {
    id: '108', slug: 'map-fertilizer', nameEn: 'MAP Fertilizer', nameAr: 'سماد MAP',
    descriptionEn: 'Mono Ammonium Phosphate.', descriptionAr: 'فوسفات أمونيوم أحادي.',
    priceSar: 160, inStock: true, imageUrl: '/img/products/map.jpg', categoryId: '1'
  },
  {
    id: '109', slug: 'ferromax', nameEn: 'FerroMax Iron', nameAr: 'فيروماكس حديد',
    descriptionEn: 'Iron chelate for treating chemical deficiency.', descriptionAr: 'حديد مخلبي لعلاج نقص العناصر.',
    priceSar: 85, inStock: true, imageUrl: '/img/products/ferromax.jpg', categoryId: '1'
  },

  // SEEDS (Cat 2)
  {
    id: '102', slug: 'tomato-seeds', nameEn: 'Hybrid Tomato Seeds', nameAr: 'بذور طماطم هجين',
    descriptionEn: 'Disease resistant hybrid seeds with high yield.', descriptionAr: 'بذور هجينة مقاومة للأمراض ذات إنتاجية عالية.',
    priceSar: 45, inStock: true, imageUrl: '/img/products/seeds-tomato.png', categoryId: '2'
  },
  {
    id: '104', slug: 'cucumber-seeds', nameEn: 'Cucumber Seeds F1', nameAr: 'بذور خيار F1',
    descriptionEn: 'F1 hybrid cucumber seeds suitable for greenhouses.', descriptionAr: 'بذور خيار هجين F1 مناسبة للبيوت المحمية.',
    priceSar: 55, inStock: true, imageUrl: '/img/products/seeds-cucumber.jpg', categoryId: '2'
  },
  {
    id: '203', slug: 'pepper-seeds', nameEn: 'Hot Pepper Seeds', nameAr: 'بذور فلفل حار',
    descriptionEn: 'High productivity hot pepper seeds.', descriptionAr: 'بذور فلفل حار عالية الإنتاجية.',
    priceSar: 40, inStock: true, imageUrl: '/img/products/seeds-tomato.png', categoryId: '2'
  },
  {
    id: '204', slug: 'eggplant-seeds', nameEn: 'Eggplant Seeds', nameAr: 'بذور باذنجان',
    descriptionEn: 'Black beauty variety.', descriptionAr: 'صنف بلاك بيوتي.',
    priceSar: 35, inStock: false, imageUrl: '/img/products/seeds-cucumber.jpg', categoryId: '2'
  },

  // EQUIPMENT (Cat 3)
  {
    id: '103', slug: 'sprayer-5l', nameEn: '5L Garden Sprayer', nameAr: 'رشاشة حدائق 5 لتر',
    descriptionEn: 'Durable plastic pressure sprayer.', descriptionAr: 'رشاشة ضغط بلاستيكية متينة.',
    priceSar: 80, inStock: true, imageUrl: '/img/products/humic.jpg', categoryId: '3'
  },
  {
    id: '301', slug: 'pruning-shears', nameEn: 'Pruning Shears', nameAr: 'مقص تقليم',
    descriptionEn: 'Professional gardening shears.', descriptionAr: 'مقص حدائق احترافي.',
    priceSar: 65, inStock: true, imageUrl: '/img/products/humic.jpg', categoryId: '3'
  },
  {
    id: '302', slug: 'humic-acid-equipment', nameEn: 'Soil Tester', nameAr: 'جهاز فحص التربة',
    descriptionEn: 'Digital soil ph and moisture meter.', descriptionAr: 'مقياس درجة الحموضة والرطوبة الرقمي.',
    priceSar: 120, inStock: true, imageUrl: '/img/products/humic.jpg', categoryId: '3'
  },

  // PESTICIDES (Cat 4)
  {
    id: '401', slug: 'foliar-max', nameEn: 'Foliar Max Insecticide', nameAr: 'مبيد حشري فوليار ماكس',
    descriptionEn: 'Effective against aphids and whitefly.', descriptionAr: 'فعال ضد المن والذبابة البيضاء.',
    priceSar: 90, inStock: true, imageUrl: '/img/products/foliar-max.jpg', categoryId: '4'
  },
  {
    id: '402', slug: 'pest-control-universal', nameEn: 'Universal Pest Control', nameAr: 'مكافحة آفات شامل',
    descriptionEn: 'Broad spectrum pesticide.', descriptionAr: 'مبيد واسع الطيف.',
    priceSar: 75, inStock: true, imageUrl: '/img/products/foliar-max.jpg', categoryId: '4'
  },

  // IRRIGATION (Cat 5)
  {
    id: '501', slug: 'green-power-pump', nameEn: 'Green Power Pump', nameAr: 'مضخة جرين باور',
    descriptionEn: 'Submersible water pump for irrigation.', descriptionAr: 'مضخة مياه غاطسة للري.',
    priceSar: 350, inStock: true, imageUrl: '/img/products/green-power.jpg', categoryId: '5'
  },
  {
    id: '502', slug: 'drip-tape-100m', nameEn: 'Drip Tape 100m', nameAr: 'شريط تنقيط 100 متر',
    descriptionEn: 'High quality drip irrigation tape.', descriptionAr: 'شريط ري بالتنقيط عالي الجودة.',
    priceSar: 110, inStock: true, imageUrl: '/img/products/green-power.jpg', categoryId: '5'
  },
  {
    id: '503', slug: 'sprinkler-head', nameEn: 'Brass Sprinkler Head', nameAr: 'رأش رشاش نحاسي',
    descriptionEn: '360 degree rotating sprinkler.', descriptionAr: 'رشاش دوار 360 درجة.',
    priceSar: 25, inStock: true, imageUrl: '/img/products/green-power.jpg', categoryId: '5'
  },
];

const MOCK_OFFERS = [
  {
    id: '201', titleEn: 'Summer Sale', titleAr: 'عروض الصيف',
    subtitleEn: 'Up to 50% off', subtitleAr: 'خصم يصل إلى 50%',
    discountPercent: 50, productId: '101',
    imageUrl: '/img/products/torofert-susp.jpg',
    product: MOCK_PRODUCTS[0],
    expiresAt: new Date(Date.now() + 86400000).toISOString()
  },
  {
    id: '202', titleEn: 'Bundle Deal', titleAr: 'عرض التوفير',
    subtitleEn: 'Buy 2 Get 1 Free', subtitleAr: 'اشتري 2 واحصل على 1 مجانا',
    discountPercent: 33, productId: '102',
    imageUrl: '/img/products/ferromax.jpg',
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
      } else if (path.includes('/api/search') || path.includes('/api/products/search')) {
        // Handle both /api/search and /api/products/search
        // Hack to parse query params
        const dummyBase = 'http://dummy.com';
        const cleanPath = path.replace('/api/search', '/search').replace('/api/products/search', '/search');
        const url = new URL(cleanPath, dummyBase);
        const q = url.searchParams.get('q')?.toLowerCase() || '';

        const results = MOCK_PRODUCTS.filter(p =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.descriptionEn.toLowerCase().includes(q) ||
          p.descriptionAr.includes(q)
        );
        // Search page expects { query: string; results: Product[] }
        resolve({ query: q, results } as any);
      } else if (path.match(/\/api\/categories\/([^\/]+)\/products/)) {
        // Handle /api/categories/[slug]/products
        const match = path.match(/\/api\/categories\/([^\/]+)\/products/);
        const slug = match ? match[1] : '';
        const category = MOCK_CATEGORIES.find(c => c.slug === slug || c.id === slug);

        if (!category) {
          resolve({ category: null, products: [] } as any);
        } else {
          const products = MOCK_PRODUCTS.filter(p => p.categoryId === category.id);
          resolve({ category, products } as any);
        }
      } else if (path.startsWith('/api/products/')) {
        // Single product fetch
        const slug = path.split('/').pop();
        const product = MOCK_PRODUCTS.find(p => p.slug === slug || p.id === slug);
        resolve(product as any);
      } else {
        // Default empty
        resolve([] as any);
      }
    }, 300); // Simulate network delay
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
