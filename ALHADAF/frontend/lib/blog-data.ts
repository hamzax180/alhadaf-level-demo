export interface BlogPost {
    slug: string;
    titleEn: string;
    titleAr: string;
    excerptEn: string;
    excerptAr: string;
    contentEn: string; // Markdown or HTML
    contentAr: string;
    date: string;
    image: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'about-us',
        titleEn: 'About Alhadaf Level',
        titleAr: 'من نحن - شركة مستوى الهدف',
        excerptEn: 'Learn about our mission to support agriculture in Saudi Arabia with premium products and expertise.',
        excerptAr: 'تعرف على رسالتنا لدعم الزراعة في المملكة العربية السعودية بمنتجات وخبرات متميزة.',
        date: '2024-01-15',
        image: '/img/banner-1.png', // Reusing banner
        contentEn: `
      <h2>Who We Are</h2>
      <p>Alhadaf Level is a leading establishment in the field of agriculture and trading. We pride ourselves on supplying high-quality fertilizers, seeds, and agricultural equipment to support the growing farming sector in Saudi Arabia.</p>
      
      <h2>Our Mission</h2>
      <p>Our mission is to empower farmers by providing them with advanced nutritional solutions and high-yield seeds. We believe in sustainable agriculture and aim to contribute to the Kingdom's food security goals.</p>

      <h2>What We Offer</h2>
      <ul>
        <li><strong>Premium Fertilizers:</strong> From water-soluble NPK to specialized foliar nutrients.</li>
        <li><strong>High-Quality Seeds:</strong> Hybrid varieties of vegetables tailored for local conditions.</li>
        <li><strong>Technical Support:</strong> Our team of experts is always ready to assist you with technical advice.</li>
      </ul>

      <p>We partner with top international manufacturers to bring you best-in-class products like TOROFERT, GREEN POWER, and more.</p>
    `,
        contentAr: `
      <h2>من نحن</h2>
      <p>شركة مستوى الهدف هي مؤسسة رائدة في مجال الزراعة والتجارة. نحن نفخر بتوريد أسمدة وبذور ومعدات زراعية عالية الجودة لدعم القطاع الزراعي المتنامي في المملكة العربية السعودية.</p>
      
      <h2>رسالتنا</h2>
      <p>رسالتنا هي تمكين المزارعين من خلال تزويدهم بحلول تغذية متقدمة وبذور عالية الإنتاجية. نحن نؤمن بالزراعة المستدامة ونسعى للمساهمة في تحقيق أهداف الأمن الغذائي للمملكة.</p>

      <h2>ماذا نقدم</h2>
      <ul>
        <li><strong>أسمدة متميزة:</strong> من NPK الذائبة بالماء إلى المغذيات الورقية المتخصصة.</li>
        <li><strong>بذور عالية الجودة:</strong> أصناف هجينة من الخضروات مصممة للظروف المحلية.</li>
        <li><strong>الدعم الفني:</strong> فريق خبرائنا مستعد دائماً لمساعدتك بالمشورة الفنية.</li>
      </ul>

      <p>نحن نتعاون مع كبار المصنعين الدوليين لنقدم لكم أفضل المنتجات مثل توروفيرت، جرين باور، والمزيد.</p>
    `
    },
    {
        slug: 'importance-of-fertilizers',
        titleEn: 'The Importance of Water Soluble Fertilizers',
        titleAr: 'أهمية الأسمدة الذائبة في الماء',
        excerptEn: 'Why modern irrigation systems require high-purity soluble fertilizers for maximum efficiency.',
        excerptAr: 'لماذا تتطلب أنظمة الري الحديثة أسمدة ذائبة عالية النقاء لتحقيق أقصى كفاءة.',
        date: '2024-02-10',
        image: '/img/categories/soluble-npk.jpg',
        contentEn: `
      <p>Modern agriculture relies heavily on fertigation—the application of fertilizers through irrigation systems. This method requires fertilizers that are 100% water-soluble and free from impurities.</p>
      <h2>Benefits</h2>
      <p>Water-soluble fertilizers ensure that nutrients are immediately available to the plant roots. This results in faster growth, higher yields, and better crop quality.</p>
    `,
        contentAr: `
      <p>تعتمد الزراعة الحديثة بشكل كبير على التسميد بالري—أي إضافة الأسمدة من خلال أنظمة الري. تتطلب هذه الطريقة أسمدة قابلة للذوبان في الماء بنسبة 100٪ وخالية من الشوائب.</p>
      <h2>الفوائد</h2>
      <p>تضمن الأسمدة الذائبة في الماء توافر العناصر الغذائية فوراً لجذور النبات. وهذا يؤدي إلى نمو أسرع، وإنتاجية أعلى، وجودة محاصيل أفضل.</p>
    `
    }
];
