import { useState } from "react";

export default function Navbar({ currentPage, navigate }:{ currentPage: string, navigate: (page: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-[#e8ff47] rounded-sm flex items-center justify-center">
              <span className="text-black font-black text-sm">M</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              MRKТ
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === link.page
                    ? "text-[#e8ff47] bg-white/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-white/60 hover:text-white transition-colors px-3 py-2">
              Sign in
            </button>
            <button
              onClick={() => navigate("shop")}
              className="bg-[#e8ff47] text-black text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#d4eb2e] transition-colors"
            >
              Shop Now
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0a] px-4 py-4 flex flex-col gap-2">
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                navigate(link.page);
                setMenuOpen(false);
              }}
              className={`text-left px-4 py-3 rounded-md text-sm font-medium transition-all ${
                currentPage === link.page
                  ? "text-[#e8ff47] bg-white/5"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2">
            <button className="text-left px-4 py-3 text-sm text-white/60 hover:text-white">
              Sign in
            </button>
            <button
              onClick={() => { navigate("shop"); setMenuOpen(false); }}
              className="bg-[#e8ff47] text-black text-sm font-semibold px-4 py-3 rounded-md hover:bg-[#d4eb2e] transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}