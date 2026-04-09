import { BaggageClaim, BoxesIcon, Plane, StarIcon } from "lucide-react";

export default function Footer({ navigate }:{navigate:(page:string) => void}) {
  const footerLinks = {
    Company: ["About Us", "Careers", "Press", "Blog"],
    Support: ["Help Center", "Returns", "Shipping Info", "Track Order"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
  };

  const platforms = [
    { name: "Temu", icon: <StarIcon/> },
    { name: "Jumia", icon: <BoxesIcon/> },
    { name: "Alibaba", icon: <Plane/> },
    { name: "Amazon", icon: <BaggageClaim/> },
  ];

  const icons = [
    "/icons/instagram.svg",
    "/icons/facebook.svg",
    "/icons/youtube.svg",
    "/icons/x.svg",
  ]

  const payment_mthd_icons = [
    "/icons/paypal.svg",
    "/icons/mastercard.svg",
    "/icons/visa.svg",
  ]

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      {/* Partner Platforms Strip */}
      <div className="border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <span className="text-white/30 text-xs uppercase tracking-widest">
              Sourced from
            </span>
            {platforms.map((p) => (
              <span
                key={p.name}
                className="flex items-center gap-1.5 hover:text-white/60 transition-colors cursor-pointer"
              >
                {p.icon}{" "}
                <span className="font-medium text-white/50">{p.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#e8ff47] rounded-sm flex items-center justify-center">
                <span className="text-black font-black text-sm">M</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                MRKТ
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Your one-stop marketplace aggregating the best deals from top
              global platforms — curated, compared, and delivered.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {icons.map((src,i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-white rounded-md border border-white/10 text-white/40 hover:text-white hover:border-white/30 text-xs font-bold transition-all flex items-center justify-center"
                >
                  <img key={i} src={src} className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-white/50 hover:text-white transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2025 MRKT. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {payment_mthd_icons.map((src,i) => (
                <span
                  key={i}
                  className="text-xs border bg-white border-white/10 rounded px-2 py-1 text-white/30"
                >
                  <img key={i} src={src} className="w-6 h-6" />
                </span>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/30 text-sm">All systems normal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}