'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

// Demo AI responses based on keywords
const getAIResponse = (message: string, locale: string): string => {
    const lowerMessage = message.toLowerCase();

    // Fertilizer related
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('npk') || lowerMessage.includes('nutrition') ||
        lowerMessage.includes('سماد') || lowerMessage.includes('تسميد') || lowerMessage.includes('تغذية')) {
        return locale === 'ar'
            ? `🌱 نصيحة الأسمدة:

للحصول على أفضل النتائج، أنصح باستخدام سماد NPK متوازن مثل 20-20-20 للنمو الخضري العام. 

**توصياتي:**
• استخدم الأسمدة الورقية للامتصاص السريع
• أضف العناصر الصغرى (الحديد، الزنك، المنغنيز) كل أسبوعين
• تجنب التسميد الزائد لمنع حرق الجذور

هل تريد معرفة المزيد عن نوع محدد من الأسمدة؟`
            : `🌱 Fertilizer Advice:

For optimal results, I recommend using a balanced NPK fertilizer like 20-20-20 for general vegetative growth.

**My recommendations:**
• Use foliar fertilizers for quick absorption
• Add micronutrients (Iron, Zinc, Manganese) every two weeks
• Avoid over-fertilization to prevent root burn

Would you like to know more about a specific type of fertilizer?`;
    }

    // Seeds related
    if (lowerMessage.includes('seed') || lowerMessage.includes('planting') || lowerMessage.includes('germination') ||
        lowerMessage.includes('بذور') || lowerMessage.includes('زراعة') || lowerMessage.includes('إنبات')) {
        return locale === 'ar'
            ? `🌾 نصيحة البذور:

اختيار البذور الصحيحة أمر بالغ الأهمية لنجاح المحصول.

**نصائحي:**
• اختر بذور هجينة F1 لمقاومة أعلى للأمراض
• تأكد من تاريخ صلاحية البذور قبل الزراعة
• انقع البذور 12-24 ساعة لتسريع الإنبات
• احفظ البذور في مكان بارد وجاف

ما نوع المحصول الذي تخطط لزراعته؟`
            : `🌾 Seed Selection Advice:

Choosing the right seeds is crucial for crop success.

**My tips:**
• Choose F1 hybrid seeds for higher disease resistance
• Check seed expiration date before planting
• Soak seeds 12-24 hours to speed germination
• Store seeds in a cool, dry place

What type of crop are you planning to grow?`;
    }

    // Irrigation related
    if (lowerMessage.includes('water') || lowerMessage.includes('irrigation') || lowerMessage.includes('drip') ||
        lowerMessage.includes('ري') || lowerMessage.includes('ماء') || lowerMessage.includes('تنقيط')) {
        return locale === 'ar'
            ? `💧 نصائح الري:

الري الصحيح هو مفتاح النجاح الزراعي.

**توصياتي:**
• استخدم نظام الري بالتنقيط لتوفير 60% من المياه
• اسقِ في الصباح الباكر أو المساء لتقليل التبخر
• راقب رطوبة التربة بانتظام
• أضف السماد مع مياه الري (Fertigation) لكفاءة أعلى

هل تحتاج مساعدة في تصميم نظام ري؟`
            : `💧 Irrigation Tips:

Proper irrigation is the key to agricultural success.

**My recommendations:**
• Use drip irrigation to save up to 60% water
• Water early morning or evening to reduce evaporation
• Monitor soil moisture regularly
• Add fertilizer with irrigation water (Fertigation) for higher efficiency

Do you need help designing an irrigation system?`;
    }

    // Pest control related
    if (lowerMessage.includes('pest') || lowerMessage.includes('disease') || lowerMessage.includes('insect') || lowerMessage.includes('bug') ||
        lowerMessage.includes('آفات') || lowerMessage.includes('حشرات') || lowerMessage.includes('أمراض') || lowerMessage.includes('مكافحة')) {
        return locale === 'ar'
            ? `🐛 مكافحة الآفات:

الوقاية خير من العلاج في مكافحة الآفات.

**استراتيجيتي:**
• افحص النباتات بانتظام للكشف المبكر
• استخدم المبيدات الحيوية كخيار أول
• حافظ على التهوية الجيدة لمنع الأمراض الفطرية
• أزل الأوراق المصابة فوراً
• استخدم الأعداء الطبيعية (المكافحة البيولوجية)

ما نوع الآفة التي تواجهها؟`
            : `🐛 Pest Control:

Prevention is better than cure in pest management.

**My strategy:**
• Inspect plants regularly for early detection
• Use bio-pesticides as the first option
• Maintain good ventilation to prevent fungal diseases
• Remove infected leaves immediately
• Use natural predators (biological control)

What type of pest are you dealing with?`;
    }

    // Yield/harvest related
    if (lowerMessage.includes('yield') || lowerMessage.includes('harvest') || lowerMessage.includes('crop') || lowerMessage.includes('production') ||
        lowerMessage.includes('محصول') || lowerMessage.includes('إنتاج') || lowerMessage.includes('حصاد')) {
        return locale === 'ar'
            ? `📈 تحسين الإنتاجية:

لزيادة إنتاجية محاصيلك:

**نصائحي الذهبية:**
• اختر الأصناف عالية الإنتاجية
• حافظ على جدول تسميد منتظم
• تأكد من كثافة الزراعة المناسبة
• راقب واضبط pH التربة (6.0-7.0 مثالي)
• احصد في الوقت المناسب للجودة القصوى

ما هو المحصول الذي تزرعه حالياً؟`
            : `📈 Yield Optimization:

To maximize your crop yields:

**My golden tips:**
• Choose high-yielding varieties
• Maintain a regular fertilization schedule
• Ensure proper planting density
• Monitor and adjust soil pH (6.0-7.0 is ideal)
• Harvest at the right time for maximum quality

What crop are you currently growing?`;
    }

    // Default response
    return locale === 'ar'
        ? `🌿 شكراً لتواصلك!

أنا خبير الزراعة الذكي الخاص بكم. يمكنني مساعدتك في:

• 🌱 نصائح الأسمدة والتغذية النباتية
• 🌾 اختيار البذور المناسبة
• 💧 أنظمة الري والتسميد
• 🐛 مكافحة الآفات والأمراض
• 📈 تحسين إنتاجية المحاصيل

اسألني أي سؤال عن الزراعة!`
        : `🌿 Thank you for reaching out!

I'm your AI Agriculture Expert. I can help you with:

• 🌱 Fertilizer and plant nutrition advice
• 🌾 Selecting the right seeds
• 💧 Irrigation and fertigation systems
• 🐛 Pest and disease control
• 📈 Crop yield optimization

Ask me any question about farming!`;
};

export default function AIChatWidget() {
    const t = useTranslations();
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Add welcome message on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                id: 'welcome',
                role: 'assistant',
                content: t('ai_chat_welcome'),
                timestamp: new Date()
            }]);
        }
    }, [isOpen, messages.length, t]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Get AI response
        const aiResponse = getAIResponse(messageText, locale);
        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date()
        };

        setIsTyping(false);
        setMessages(prev => [...prev, assistantMessage]);
    };

    const quickActions = [
        { key: 'fertilizer', label: t('ai_chat_quick_fertilizer') },
        { key: 'seeds', label: t('ai_chat_quick_seeds') },
        { key: 'irrigation', label: t('ai_chat_quick_irrigation') },
        { key: 'pests', label: t('ai_chat_quick_pests') },
    ];

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 ${locale === 'ar' ? 'left-6' : 'right-6'} z-[1000] w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${isOpen
                    ? 'bg-red-500 hover:bg-red-600 rotate-0'
                    : 'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-110'
                    }`}
                aria-label={isOpen ? 'Close chat' : 'Open AI chat'}
            >
                {isOpen ? (
                    <span className="text-white text-2xl">✕</span>
                ) : (
                    <span className="text-3xl">🌱</span>
                )}
            </button>

            {/* Chat Panel */}
            <div
                className={`fixed bottom-24 ${locale === 'ar' ? 'left-6' : 'right-6'} z-[999] w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${isOpen
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 translate-y-8 invisible pointer-events-none'
                    }`}
                style={{ maxHeight: 'min(600px, calc(100vh - 160px))' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                            🌱
                        </div>
                        <div>
                            <div className="font-bold text-lg">{t('ai_chat_title')}</div>
                            <div className="text-white/80 text-sm">{t('ai_chat_subtitle')}</div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                    ? 'bg-green-600 text-white rounded-br-sm'
                                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                                    }`}
                            >
                                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-2 border-t border-gray-100 flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                        <button
                            key={action.key}
                            onClick={() => handleSend(action.label)}
                            className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full hover:bg-green-100 transition-colors"
                        >
                            {action.label}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100 bg-white">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('ai_chat_placeholder')}
                            className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="text-xl">→</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
