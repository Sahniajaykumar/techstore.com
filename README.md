# 🛒 TechStore - Premium Tech E-Commerce

A modern, responsive e-commerce platform for premium tech products built with React and Vite. Features a sleek dark/light mode, animated UI elements, and a complete shopping cart experience.

![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.x-purple?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- **🎨 Premium UI Design** - Modern, minimal design with smooth animations and transitions
- **🌙 Dark/Light Mode** - Toggle between dark and light themes
- **🛒 Shopping Cart** - Full cart functionality with quantity controls
- **❤️ Wishlist** - Save your favorite products
- **🔍 Search & Filter** - Search products and filter by brand
- **📱 Fully Responsive** - Works beautifully on all devices
- **⚡ Fast Performance** - Built with Vite for lightning-fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/techstore.git
cd techstore
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Vanilla CSS with CSS Variables
- **Fonts:** Inter (Google Fonts)
- **Icons:** Emoji icons

## 📁 Project Structure

```
techstore/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.css
│   ├── App.jsx
│   ├── App.css
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Customization

### Color Scheme

The app uses CSS variables for easy customization. Edit the `:root` selector in `App.css`:

```css
:root {
  --accent: #0071e3;        /* Primary accent color */
  --accent-hover: #0077ed;  /* Hover state */
  --bg-primary: #000000;    /* Background color */
  --text-primary: #ffffff;  /* Text color */
}
```

### Adding Products

Add new products to `src/data.js`:

```javascript
{
  id: 13,
  name: "Product Name",
  price: 99999,
  originalPrice: 119999,
  discount: "15% OFF",
  rating: 4.8,
  image: "https://example.com/image.png",
  isBestSeller: true,
  brand: "Brand Name",
}
```

## 📱 Responsive Breakpoints

| Breakpoint | Description |
|------------|-------------|
| `1024px` | Desktop (4-column grid) |
| `768px` | Tablet (2-column grid) |
| `640px` | Mobile (1-column grid) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by Apple's clean aesthetic
- Product images from Croma
- Icons from native emoji set

---

Made with ❤️ by [Your Name]
