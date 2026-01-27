'use client';

import Container from '../../../components/Container';
import { useLocale } from 'next-intl';

export default function Page() {
  const locale = useLocale();

  const title = locale === 'ar' ? 'من نحن - شركة مستوى الهدف' : 'About Alhadaf Level';
  const content = locale === 'ar' ? `
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
  ` : `
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
  `;

  return (
    <Container>
      <div className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-[color:var(--brand-2)]">{title}</h1>
          </div>

          <div className="rounded-[2.5rem] bg-white border border-black/5 shadow-xl overflow-hidden p-8 md:p-12">
            <div
              className="prose prose-lg prose-headings:font-bold prose-headings:text-[color:var(--brand-2)] prose-a:text-[color:var(--brand-1)] max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
