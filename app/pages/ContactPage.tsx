import { ArrowRight, CheckCheckIcon, ClockFadingIcon, CloudLightningIcon, LucideMapPinned, Mails, MapPinCheckIcon, MessagesSquareIcon, PhoneCallIcon } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can also visit the 'Track Order' page in your account dashboard." },
  { q: "What is your return policy?", a: "We offer free returns within 30 days of purchase. Items must be unused and in original packaging. Some exclusions apply for final sale items." },
  { q: "Which platforms do you source from?", a: "We aggregate deals from Temu, Jumia, Alibaba, and Amazon — showing you the best price across all platforms in one place." },
  { q: "How long does shipping take?", a: "Shipping times vary by platform and destination. Most orders arrive within 7–21 days. Express shipping options are available at checkout." },
  { q: "Is my payment information secure?", a: "Yes. We use industry-standard SSL encryption and never store your full card details on our servers." },
];

const contactOptions = [
  { icon: <MessagesSquareIcon/>, title: "Live Chat", desc: "Chat with our support team in real time.", action: "Start Chat", color: "#e8ff47" },
  { icon: <Mails/>, title: "Email Support", desc: "Send us an email and we'll respond within 24 hours.", action: "Send Email", color: "#47ffe8" },
  { icon: <PhoneCallIcon/>, title: "Phone Support", desc: "Speak with a representative Mon–Fri, 9am–6pm GMT.", action: "+233 55 553 0670", color: "#ff47b4" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-linear-to-br from-[#1a1a0a] to-[#0a0a0a] py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px"}} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e8ff47] mb-4 block">Support</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            How can we help?
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Our team is here to make your shopping experience seamless. Reach out any time.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {contactOptions.map((opt) => (
              <div
                key={opt.title}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="text-3xl mb-4">{opt.icon}</div>
                <h3 className="text-white font-bold mb-1 group-hover:text-[#e8ff47] transition-colors">{opt.title}</h3>
                <p className="text-white/40 text-sm mb-4">{opt.desc}</p>
                <button
                  className="text-xs font-bold px-4 py-2 rounded-lg border transition-all hover:opacity-90"
                  style={{ borderColor: opt.color + "50", color: opt.color, background: opt.color + "10" }}
                >
                  {opt.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map Split */}
      <section className="py-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6">Send a Message</h2>
              {submitted ? (
                <div className="rounded-xl bg-[#e8ff47]/10 border border-[#e8ff47]/30 p-8 text-center">
                  <div className="text-4xl mb-4"><CheckCheckIcon color="green"/></div>
                  <h3 className="text-white font-bold text-lg mb-2">Message Sent!</h3>
                  <p className="text-white/40 text-sm">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-5 text-sm text-[#e8ff47] hover:underline"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-white/30 block mb-2">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#e8ff47]/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-white/30 block mb-2">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#e8ff47]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/30 block mb-2">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#e8ff47]/50 cursor-pointer"
                    >
                      <option value="" className="bg-[#0a0a0a]">Select a topic</option>
                      <option value="order" className="bg-[#0a0a0a]">Order Issue</option>
                      <option value="return" className="bg-[#0a0a0a]">Return / Refund</option>
                      <option value="account" className="bg-[#0a0a0a]">Account Help</option>
                      <option value="other" className="bg-[#0a0a0a]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/30 block mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your issue or question..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#e8ff47]/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#e8ff47] flex items-center justify-center space-x-4 text-black font-bold py-3 rounded-lg hover:bg-[#d4eb2e] transition-colors"
                  >
                    <span>Send Message</span> <ArrowRight size={18}/>
                  </button>
                </form>
              )}
            </div>

            {/* Office Info */}
            <div>
              <h2 className="text-2xl font-black text-white mb-6">Our Office</h2>
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden mb-6">
                <div className="h-44 bg-linear-to-br from-[#1a2a0a] to-[#0d1a0d] flex items-center justify-center">
                  <span className="text-6xl opacity-30"><LucideMapPinned size={52}/></span>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    [<MapPinCheckIcon/>, "Address", "14 Commerce Street, Accra Central, Ghana"],
                    [<ClockFadingIcon/>, "Hours", "Mon–Fri: 9:00am – 6:00pm GMT"],
                    [<MessagesSquareIcon/>, "Email", "support@mrkt.store"],
                    [<PhoneCallIcon/>, "Phone", "+233 55 553 0670"],
                  ].map(([icon, label, val],i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5">{icon}</span>
                      <div>
                        <p className="text-xs text-white/30 font-semibold uppercase tracking-wider">{label}</p>
                        <p className="text-sm text-white/70">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response time badges */}
              <div className="grid grid-cols-2 gap-3">
                {[[<CloudLightningIcon/>, "< 2 min", "Live Chat"], [<ClockFadingIcon/>, "< 24 hrs", "Email"]].map(([ico, time, ch],i) => (
                  <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                    <div className="text-xl mb-1 flex justify-center items-center">{ico}</div>
                    <div className="text-[#e8ff47] font-black text-sm">{time}</div>
                    <div className="text-white/30 text-xs">{ch} response</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8ff47] block mb-3">FAQ</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white/5 hover:bg-white/8 transition-colors"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <span className={`text-white/40 text-lg transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 bg-white/3">
                    <p className="text-sm text-white/50 leading-relaxed pt-3 border-t border-white/10">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}