import { useState } from "react";
import ProductCard from "@/components/Productcard";
import { SearchIcon, SettingsIcon } from "lucide-react";
import useSWR from "swr";
import { Product } from "@/types/producttype";
import ApiLoading from "@/components/ApiLoading";
import NoProduct from "@/components/NoProduct";

const allProducts = [
  { id: 1, name: "Wireless Earbuds Pro X100", price: 12.99, originalPrice: 35.0, image: "🎧", source: "Temu", rating: 4.3, category: "Electronics" },
  { id: 2, name: "LED Strip Lights 10m RGB", price: 8.49, originalPrice: 22.0, image: "💡", source: "Temu", rating: 4.5, category: "Home" },
  { id: 3, name: "Portable Phone Stand", price: 4.99, originalPrice: 12.0, image: "📱", source: "Temu", rating: 4.1, category: "Electronics" },
  { id: 4, name: "Stainless Steel Bottle", price: 6.99, originalPrice: 18.0, image: "🍶", source: "Temu", rating: 4.4, category: "Sports" },
  { id: 5, name: "Smart Watch Fitness Tracker", price: 29.99, originalPrice: 55.0, image: "⌚", source: "Jumia", rating: 4.2, category: "Electronics", badge: "Top Pick" },
  { id: 6, name: "Ankara Print Dress Set", price: 18.0, originalPrice: 30.0, image: "👗", source: "Jumia", rating: 4.6, category: "Fashion" },
  { id: 7, name: "Laptop Backpack 15.6\"", price: 22.5, originalPrice: 45.0, image: "🎒", source: "Jumia", rating: 4.4, category: "Fashion" },
  { id: 8, name: "Blender 600W Kitchen", price: 35.0, originalPrice: 60.0, image: "🍹", source: "Jumia", rating: 4.3, category: "Home" },
  { id: 9, name: "Solar Power Bank 20000mAh", price: 24.99, originalPrice: 60.0, image: "🔋", source: "Alibaba", rating: 4.5, category: "Electronics" },
  { id: 10, name: "Drone Mini FPV Camera", price: 89.0, originalPrice: 180.0, image: "🚁", source: "Alibaba", rating: 4.4, category: "Electronics", badge: "Hot" },
  { id: 11, name: "UV Sterilizer Box", price: 19.99, originalPrice: 45.0, image: "🧪", source: "Alibaba", rating: 4.2, category: "Home" },
  { id: 12, name: "Mechanical Keyboard TKL", price: 45.0, originalPrice: 90.0, image: "⌨️", source: "Alibaba", rating: 4.7, category: "Electronics" },
  { id: 13, name: "Kindle Paperwhite 11th Gen", price: 99.0, originalPrice: 140.0, image: "📖", source: "Amazon", rating: 4.8, category: "Electronics", badge: "Bestseller" },
  { id: 14, name: "Echo Dot 5th Generation", price: 29.99, originalPrice: 50.0, image: "🔊", source: "Amazon", rating: 4.7, category: "Electronics" },
  { id: 15, name: "Fire TV Stick 4K Max", price: 39.99, originalPrice: 60.0, image: "📺", source: "Amazon", rating: 4.6, category: "Electronics" },
  { id: 16, name: "Instant Pot Duo 7-in-1", price: 59.0, originalPrice: 100.0, image: "🍲", source: "Amazon", rating: 4.9, category: "Home" },
  { id: 17, name: "Running Shoes Mesh Air", price: 38.0, originalPrice: 80.0, image: "👟", source: "Jumia", rating: 4.3, category: "Sports" },
  { id: 18, name: "Yoga Mat Non-Slip 6mm", price: 15.5, originalPrice: 30.0, image: "🧘", source: "Temu", rating: 4.5, category: "Sports" },
  { id: 19, name: "Skincare Set 5-piece", price: 22.0, originalPrice: 55.0, image: "✨", source: "Alibaba", rating: 4.4, category: "Beauty" },
  { id: 20, name: "Perfume EDP 50ml", price: 25.0, originalPrice: 60.0, image: "🌸", source: "Jumia", rating: 4.6, category: "Beauty" },
];

const platforms = ["All", "Temu", "Jumia", "Alibaba", "Amazon"];
const categories = ["All", "Electronics", "Fashion", "Home", "Sports", "Beauty"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Rating", "Discount"];

export default function ShopPage() {

  const {data:allProducts,error:error} = useSWR<Product[]>(`products`)

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Relevance");
  const [priceRange, setPriceRange] = useState(200);
  const [filterOpen, setFilterOpen] = useState(false);

  if(!allProducts) return <ApiLoading/>
  if(error) return <p>Run Into A Problem Trying To Fetch Products...</p>

  let filtered = allProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchPlatform = platform === "All" || p.market?.name === platform;
    const matchCat = category === "All" || p.category?.name === category;
    const matchPrice = p.price <= priceRange;
    return matchSearch && matchPlatform && matchCat && matchPrice;
  });

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "Rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === "Discount") filtered = [...filtered].sort((a, b) => {
    const da = a.original_price ? a.original_price - a.price : 0;
    const db = b.original_price ? b.original_price - b.price : 0;
    return db - da;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold uppercase tracking-widest text-[#e8ff47]">Store</span>
          <span className="w-4 h-px bg-white/20" />
          <span className="text-sm text-white/30">Browse all deals</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Shop All Products</h1>
        <p className="text-white/40 mt-1 text-sm">{filtered.length} results found</p>
      </div>

      {/* Search + Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm"><SearchIcon size={16}/></span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm pl-9 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#e8ff47]/50"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-3 rounded-lg focus:outline-none cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o} value={o} className="bg-[#0a0a0a]">{o}</option>
          ))}
        </select>

        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="sm:hidden flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-3 rounded-lg"
        >
          <SettingsIcon/> Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${filterOpen ? "block" : "hidden"} sm:block w-full sm:w-56 shrink-0`}>
          <div className="sticky top-20 space-y-6">
            {/* Platform */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Platform</h3>
              <div className="space-y-1">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${platform === p ? "bg-[#e8ff47]/10 text-[#e8ff47] font-semibold" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                  >
                    {p}
                    <span className="float-right text-white/20 text-xs">
                      {p === "All" ? allProducts.length : allProducts.filter((x) => x.market?.name === p).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Category</h3>
              <div className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${category === c ? "bg-[#e8ff47]/10 text-[#e8ff47] font-semibold" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Max Price</h3>
              <input
                type="range"
                min="5"
                max="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#e8ff47]"
              />
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>$5</span>
                <span className="text-[#e8ff47] font-bold">${priceRange}</span>
                <span>$200</span>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => { setPlatform("All"); setCategory("All"); setPriceRange(200); setSearch(""); }}
              className="w-full text-xs text-white/30 hover:text-white/60 py-2 border border-white/10 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <NoProduct/>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}