export default function ProductCard({ product, compact = false }:{ product: any, compact?: boolean }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
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
        <span className="text-5xl">{product.emoji}</span>
      </div>

      {/* Source Tag */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
          via {product.source}
        </span>
        <span className="text-xs text-white/30">{product.rating}★</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-white leading-snug mb-1 line-clamp-2 group-hover:text-[#e8ff47] transition-colors">
        {product.name}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-base font-bold text-white">${product.price}</span>
        {product.originalPrice && (
          <span className="text-xs text-white/30 line-through">
            ${product.originalPrice}
          </span>
        )}
      </div>

      {/* Add to Cart */}
      <button className="mt-3 w-full bg-white/5 hover:bg-[#e8ff47] hover:text-black border border-white/10 hover:border-[#e8ff47] text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
        Add to Cart
      </button>
    </div>
  );
}