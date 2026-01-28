# 🌱 Alhadaf Level (الهدف ليفل) 🇸🇦

**Alhadaf Level** is a premium, modern bilingual (Arabic/English) e-commerce platform specifically designed for the professional agricultural sector in Saudi Arabia. Built with cutting-edge web technologies, it offers a seamless shopping experience for fertilizers, seeds, irrigation equipment, and more.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://alhadaf-level-demo.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20|%20Express%20|%20PostgreSQL-blue)](#tech-stack)

---

## ✨ Key Features

- **🌐 Full Bilingual Support**: Native RTL (Arabic) and LTR (English) support with seamless language switching.
- **🛒 Dynamic Shopping Cart**: Client-side state management with persistent storage for an uninterrupted shopping experience.
- **🔍 Smart Search**: Real-time product search with suggestions and high-speed indexing.
- **🤖 AI Agriculture Assistant**: Integrated intelligent assistant to help farmers choose the right products.
- **📈 Professional Dashboard**: Clean management of categories, products, and special offers.
- **🎯 Promotions & Offers**: Dedicated sections for special deals with real-time countdown timers.
- **💳 Secure Checkout**: Integrated with modern payment gateways (Moyasar), supporting Mada, Visa, and Apple Pay.
- **📦 Order Tracking**: Robust system for customers to track their delivery status in real-time.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **I18n**: next-intl
- **State**: React Context API + LocalStorage persistence

### Backend
- **Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (Railway/Local)
- **Validation**: Zod

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hamzax180s/alhadaf-level-demo.git
   cd alhadaf-level-demo
   ```

2. **Setup Backend**:
   ```bash
   cd ALHADAF/backend
   npm install
   # Configure your .env file
   npx prisma migrate dev
   npm run db:seed
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ALHADAF/frontend
   npm install
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── ALHADAF/
│   ├── frontend/        # Next.js Application
│   │   ├── app/         # App Router pages & layouts
│   │   ├── components/  # Reusable UI components
│   │   └── public/      # Static assets (images, icons)
│   └── backend/         # Express API Server
│       ├── prisma/      # Database schema & migrations
│       └── src/         # API routes and logic
└── README.md            # You are here
```

---

## 📄 License

Copyright © 2026 Alhadaf Level Establishment. All rights reserved.
Licensed under the MIT License.

---

<p align="center">Made with ❤️ for Saudi Green Initiative 🇸🇦🌱</p>
