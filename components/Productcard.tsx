import { Product } from "@/types/producttype";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";

export default function ProductCard({ product, compact = false }:{ product: Product, compact?: boolean }) {
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) * 100
      )
    : null;

  return (
    <div
      className={`group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:bg-white/8 transition-all duration-300 cursor-pointer ${compact ? "p-3" : "p-4"}`}
    >
      {/* Badge */}
      {discount && (
        <div className="absolute top-3 left-3 z-10 bg-[#e8ff47] text-black text-xs font-bold px-2 py-0.5 rounded-full">
          -{discount}%
        </div>
      )}
      {product.badge && !discount && (
        <div className="absolute top-3 left-3 z-10 bg-white/10 text-white text-xs font-medium px-2 py-0.5 rounded-full border border-white/20">
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div
        className={`rounded-lg overflow-hidden bg-white/5 flex items-center justify-center mb-3 ${compact ? "h-36" : "h-48"}`}
      >
        <img src={product.image} alt={product.name} className="w-full h-full"/>
      </div>

      {/* Source Tag */}
      <div className="w-full flex items-center justify-between mb-2">
        <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
          via {product.market?.name}
        </span>
        <span className="flex items-center space-x-1 text-sm text-white/30">
          <p>{product.rating}</p>
          <StarIcon size={12} color="#e8ff47"/>
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-white leading-snug mb-1 line-clamp-2 group-hover:text-[#e8ff47] transition-colors">
        {(product.name).toLocaleUpperCase()}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-base font-bold text-white">${product.price}</span>
        {product.original_price && (
          <span className="text-xs text-white/30 line-through">
            ${product.original_price}
          </span>
        )}
      </div>

      {/* Add to Cart */}
      <Button variant={"link"}  className="mt-3 w-full bg-white/5 hover:bg-[#e8ff47] hover:text-black border border-white/10 hover:border-[#e8ff47] text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
        <a href="" target="_blank" rel="noopener noreferrer">
          Interested
        </a>
      </Button>
    </div>
  );
}