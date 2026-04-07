import { useState, useEffect } from "react";
import ProductCard from "@/components/Productcard";

const heroSlides = [
  {
    tag: "Limited Time",
    title: "Deals You Won't Find Anywhere Else",
    sub: "Up to 70% off on electronics, fashion, and home goods from top global platforms.",
    cta: "Browse All Deals",
    accent: "#e8ff47",
    bg: "from-[#1a1a2e] to-[#0a0a0a]",
    emoji: "⚡",
  },
  {
    tag: "Flash Sale",
    title: "Tech Essentials at Rock-Bottom Prices",
    sub: "Smart devices, accessories, and gadgets — sourced directly from Alibaba & Temu.",
    cta: "Shop Tech",
    accent: "#47ffe8",
    bg: "from-[#0d2b2b] to-[#0a0a0a]",
    emoji: "💻",
  },
  {
    tag: "New Arrivals",
    title: "Fresh Fashion Drops Every Week",
    sub: "Trendy styles from Jumia and beyond — delivered fast to your door.",
    cta: "Explore Fashion",
    accent: "#ff47b4",
    bg: "from-[#2b0d1f] to-[#0a0a0a]",
    emoji: "👗",
  },
];

const platformDeals = [
  {
    platform: "Temu",
    icon: "🛒",
    color: "#ff6b35",
    tagline: "Ultra-low prices",
    products: [
      { id: 1, name: "Wireless Earbuds Pro X100", price: 12.99, originalPrice: 35.0, emoji: "🎧", source: "Temu", rating: 4.3 },
      { id: 2, name: "LED Strip Lights 10m RGB", price: 8.49, originalPrice: 22.0, emoji: "💡", source: "Temu", rating: 4.5 },
      { id: 3, name: "Portable Phone Stand Desk", price: 4.99, originalPrice: 12.0, emoji: "📱", source: "Temu", rating: 4.1 },
      { id: 4, name: "Stainless Steel Water Bottle", price: 6.99, originalPrice: 18.0, emoji: "🍶", source: "Temu", rating: 4.4 },
    ],
  },
  {
    platform: "Jumia",
    icon: "📦",
    color: "#f97316",
    tagline: "Africa's #1 marketplace",
    products: [
      { id: 5, name: "Smart Watch Fitness Tracker", price: 29.99, originalPrice: 55.0, emoji: "⌚", source: "Jumia", rating: 4.2, badge: "Top Pick" },
      { id: 6, name: "Ankara Print Dress Set", price: 18.0, originalPrice: 30.0, emoji: "👗", source: "Jumia", rating: 4.6 },
      { id: 7, name: "Laptop Backpack 15.6\"", price: 22.50, originalPrice: 45.0, emoji: "🎒", source: "Jumia", rating: 4.4 },
      { id: 8, name: "Blender 600W Kitchen", price: 35.0, originalPrice: 60.0, emoji: "🍹", source: "Jumia", rating: 4.3 },
    ],
  },
  {
    platform: "Alibaba",
    icon: "🏭",
    color: "#f59e0b",
    tagline: "Wholesale & bulk deals",
    products: [
      { id: 9, name: "Solar Power Bank 20000mAh", price: 24.99, originalPrice: 60.0, emoji: "🔋", source: "Alibaba", rating: 4.5 },
      { id: 10, name: "Drone Mini FPV Camera", price: 89.0, originalPrice: 180.0, emoji: "🚁", source: "Alibaba", rating: 4.4, badge: "Hot" },
      { id: 11, name: "UV Sterilizer Box Phone", price: 19.99, originalPrice: 45.0, emoji: "🧪", source: "Alibaba", rating: 4.2 },
      { id: 12, name: "Mechanical Keyboard TKL", price: 45.0, originalPrice: 90.0, emoji: "⌨️", source: "Alibaba", rating: 4.7 },
    ],
  },
  {
    platform: "Amazon",
    icon: "⭐",
    color: "#0ea5e9",
    tagline: "Prime-worthy picks",
    products: [
      { id: 13, name: "Kindle Paperwhite 11th Gen", price: 99.0, originalPrice: 140.0, emoji: "📖", source: "Amazon", rating: 4.8, badge: "Bestseller" },
      { id: 14, name: "Echo Dot 5th Generation", price: 29.99, originalPrice: 50.0, emoji: "🔊", source: "Amazon", rating: 4.7 },
      { id: 15, name: "Fire TV Stick 4K Max", price: 39.99, originalPrice: 60.0, emoji: "📺", source: "Amazon", rating: 4.6 },
      { id: 16, name: "Instant Pot Duo 7-in-1", price: 59.0, originalPrice: 100.0, emoji: "🍲", source: "Amazon", rating: 4.9 },
    ],
  },
];

const featuredCategories = [
  { name: "Electronics", emoji: "💻", count: "2.4k+ items" },
  { name: "Fashion", emoji: "👗", count: "5.1k+ items" },
  { name: "Home & Garden", emoji: "🏡", count: "1.8k+ items" },
  { name: "Sports", emoji: "⚽", count: "900+ items" },
  { name: "Beauty", emoji: "💄", count: "3.2k+ items" },
  { name: "Toys", emoji: "🧸", count: "1.1k+ items" },
];

export default function HomePage({ navigate }:{navigate:(page:string) => void}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Temu");

  useEffect(() => {
    const t = setInterval(() => setSlideIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[slideIndex];
  const activeData = platformDeals.find((p) => p.platform === activeTab);

  return (
    <div>
      {/* ——— HERO CAROUSEL ——— */}
      <section className={`relative bg-linear-to-br ${slide.bg} min-h-[88vh] flex items-center overflow-hidden transition-all duration-700`}>
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px"}} />

        {/* Glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{background: slide.accent}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest" style={{color: slide.accent}}>{slide.tag}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-xs text-white/40">Today Only</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              {slide.title}
            </h1>

            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("shop")}
                className="px-6 py-3 font-bold text-sm text-black rounded-lg transition-all hover:opacity-90 hover:scale-105"
                style={{background: slide.accent}}
              >
                {slide.cta} →
              </button>
              <button className="px-6 py-3 font-semibold text-sm text-white/70 rounded-lg border border-white/10 hover:bg-white/5 hover:text-white transition-all">
                View Lookbook
              </button>
            </div>

            {/* Stats Row */}
            <div className="mt-14 flex flex-wrap gap-8">
              {[["50k+", "Products"], ["4", "Platforms"], ["99%", "Satisfaction"], ["Free", "Returns"]].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-white">{v}</div>
                  <div className="text-xs text-white/30 uppercase tracking-wider mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Emoji */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex text-[140px] opacity-20 select-none pointer-events-none">
            {slide.emoji}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`transition-all rounded-full h-1.5 ${i === slideIndex ? "w-8 bg-[#e8ff47]" : "w-2 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* ——— CATEGORY STRIP ——— */}
      <section className="py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {featuredCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate("shop")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#e8ff47]/50 hover:bg-white/8 transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="text-xs font-semibold text-white/80">{cat.name}</span>
                <span className="text-xs text-white/30">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ——— PLATFORM DEAL SECTIONS ——— */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8ff47]">Hot Deals</span>
              <span className="flex-1 h-px bg-white/10" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Deals by Platform
            </h2>
            <p className="text-white/40 mt-2">Browse top discounts sorted by where they come from</p>
          </div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {platformDeals.map((p) => (
              <button
                key={p.platform}
                onClick={() => setActiveTab(p.platform)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                  activeTab === p.platform
                    ? "border-[#e8ff47]/50 bg-[#e8ff47]/10 text-[#e8ff47]"
                    : "border-white/10 text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.platform}</span>
                {activeTab === p.platform && (
                  <span className="text-xs bg-[#e8ff47] text-black px-1.5 py-0.5 rounded-full font-bold">
                    {p.tagline}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {activeData && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {activeData.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate("shop")}
                  className="px-6 py-3 border border-white/15 text-white/60 text-sm font-semibold rounded-lg hover:bg-white/5 hover:text-white transition-all"
                >
                  See all {activeData.platform} deals →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ——— PROMO BANNER ——— */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-linear-to-r from-[#e8ff47]/10 to-[#47ffe8]/5 border border-[#e8ff47]/20 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#e8ff47] mb-2">Newsletter</p>
              <h3 className="text-2xl font-black text-white">Never Miss a Deal</h3>
              <p className="text-white/40 mt-1 text-sm">Get the best offers delivered to your inbox daily.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#e8ff47]/50 w-full sm:w-64"
              />
              <button className="bg-[#e8ff47] text-black text-sm font-bold px-5 py-3 rounded-lg hover:bg-[#d4eb2e] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ——— ALL PLATFORM PREVIEWS ——— */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8ff47]">All Stores</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-10">
            Shop Every Platform
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {platformDeals.map((p) => (
              <button
                key={p.platform}
                onClick={() => navigate("shop")}
                className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left"
              >
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#e8ff47] transition-colors">
                  {p.platform}
                </h3>
                <p className="text-white/40 text-sm mb-3">{p.tagline}</p>
                <p className="text-xs text-white/30 font-medium">
                  {p.products.length} deals available →
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}