"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 8;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (!validatePhone(whatsapp)) newErrors.whatsapp = true;
    if (!validateEmail(email)) newErrors.email = true;
    if (!terms) newErrors.terms = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: whatsapp,
          business: "Cold Brew Customer",
          challenge: "First order - 20% OFF",
          lang: "pt",
        }),
      });
    } catch (err) {
      console.error("Error sending email:", err);
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(true), 600);
    }
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <div className="relative z-10 min-h-[100dvh] flex flex-col items-center px-4 py-6 pb-16 bg-[#0d0906] text-[#f5ece0] font-['Nunito',sans-serif]">
      <style>{`
        .page-wrap { position: relative; z-index: 1; min-height: 100dvh; display: flex; flex-direction: column; align-items: center; padding: 1.5rem 1rem 4rem; }
        .page-wrap::before { content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(ellipse 90% 60% at 50% -5%, rgba(0,156,59,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(107,58,31,0.20) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 10% 90%, rgba(0,53,128,0.12) 0%, transparent 55%); }
        .page-wrap::after { content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 180px 180px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes pulse-red { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes bounceIn { 0%{transform:scale(0.3);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes glowGreen { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0)} 50%{box-shadow:0 0 0 8px rgba(37,211,102,0.07)} }
      `}</style>

      {/* HEADER */}
      <header className="w-full max-w-[500px] flex flex-col items-center pt-4 pb-8" style={{ animation: "fadeUp 0.05s both" }}>
        <div className="launch-banner inline-flex items-center gap-2 bg-[rgba(213,43,30,0.12)] border border-[rgba(213,43,30,0.4)] rounded-full px-[1.1rem] py-[0.35rem] text-[0.72rem] font-bold text-[#ff7066] uppercase tracking-widest mb-3">
          <span className="w-[7px] h-[7px] rounded-full bg-[#D52B1E]" style={{ animation: "pulse-red 1.8s ease-in-out infinite" }} />
          Lançamos em poucos dias — cadastre-se agora!
        </div>
        <div className="flex flex-col items-center gap-[0.35rem]">
          <div className="font-['Bebas_Neue'] text-[clamp(1.8rem,6vw,2.6rem)] tracking-widest leading-none">
            <span className="text-[#009c3b]">C</span>
            <span className="text-[#D52B1E]">A</span>
            <span className="text-[#FEDF00]">F</span>
            <span className="text-[#009c3b]">É</span>
            <span className="text-[#f5ece0]">&nbsp;</span>
            <span className="text-[#003580]">BR</span>
            <span className="text-[#009c3b]">A</span>
            <span className="text-[#D52B1E]">CH</span>
            <span className="text-[#003580]">IL</span>
            <span className="text-[#FEDF00]">E</span>
            <span className="text-[#D52B1E]">IR</span>
            <span className="text-[#009c3b]">O</span>
          </div>
          <div className="font-['Bebas_Neue'] text-[clamp(0.7rem,2.2vw,0.9rem)] tracking-[0.35em] text-[#c0a87a] uppercase">
            Cold Brew Coffee
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="text-center max-w-[500px] mb-8" style={{ animation: "fadeUp 0.15s both" }}>
        <div className="inline-flex items-center gap-1.5 bg-[rgba(0,156,59,0.15)] border border-[rgba(0,156,59,0.35)] rounded-full px-4 py-[0.3rem] text-[0.7rem] font-bold text-[#009c3b] uppercase tracking-wider mb-5">
          <span className="text-[7px]" style={{ animation: "pulse 2s ease-in-out infinite" }}>●</span>
          Delivery disponível agora
        </div>

        {/* Floating Cup */}
        <div className="w-[130px] h-[145px] mx-auto mb-8" style={{ animation: "float 3.5s ease-in-out infinite" }}>
          <svg viewBox="0 0 130 155" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M47 34 Q44 24 47 15" stroke="rgba(255,255,255,0.17)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M65 29 Q62 19 65 10" stroke="rgba(255,255,255,0.12)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M22 52 L28 133 Q28 139 35 139 L95 139 Q102 139 102 133 L108 52 Z" fill="#3d1c08" stroke="#5a2e10" strokeWidth="1.5" />
            <path d="M25 68 L30 128 Q30 134 36 134 L94 134 Q100 134 100 128 L105 68 Z" fill="#190b03" opacity="0.98" />
            <ellipse cx="65" cy="103" rx="25" ry="25" fill="none" stroke="#003580" strokeWidth="6" opacity="0.6" />
            <path d="M24 86 Q44 78 65 89 Q86 100 106 86" fill="none" stroke="#009c3b" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
            <ellipse cx="65" cy="103" rx="13" ry="13" fill="#6b3a1f" />
            <path d="M65 90 Q65 103 65 116" stroke="#190b03" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="37" y="38" width="20" height="20" rx="4" fill="rgba(185,228,248,0.55)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.3" />
            <rect x="64" y="33" width="20" height="20" rx="4" fill="rgba(185,228,248,0.45)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
            <rect x="55" y="46" width="17" height="17" rx="3" fill="rgba(210,240,255,0.5)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="40" y1="41" x2="42" y2="43" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="67" y1="36" x2="69" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
            <rect x="87" y="8" width="6" height="52" rx="3" fill="white" opacity="0.88" />
            <rect x="87" y="8" width="6" height="10" rx="3" fill="#D52B1E" />
            <rect x="87" y="27" width="6" height="10" rx="3" fill="#D52B1E" />
            <rect x="20" y="48" width="90" height="8" rx="4" fill="#5a2e10" stroke="#7a3e14" strokeWidth="1" />
            <rect x="27" y="123" width="32" height="14" rx="2.5" fill="white" />
            <rect x="27" y="130" width="32" height="7" rx="1.5" fill="#D52B1E" />
            <rect x="27" y="123" width="15" height="7" rx="1.5" fill="#003580" />
            <text x="34.5" y="131.5" fontSize="7" fill="white" textAnchor="middle" fontFamily="serif" fontWeight="bold">★</text>
            <rect x="71" y="123" width="32" height="14" rx="2.5" fill="#009c3b" />
            <polygon points="87,125.5 101,130 87,134.5 73,130" fill="#FEDF00" />
            <circle cx="87" cy="130" r="4.5" fill="#003580" />
            <path d="M83,130 Q87,127.5 91,130" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
            <circle cx="85" cy="129" r="0.7" fill="white" />
            <circle cx="89" cy="131.5" r="0.7" fill="white" />
            <circle cx="87" cy="127.5" r="0.6" fill="white" />
            <circle cx="84.5" cy="132" r="0.5" fill="white" />
            <circle cx="89.5" cy="128.5" r="0.5" fill="white" />
            <circle cx="57" cy="130" r="3.5" fill="none" stroke="rgba(255,215,0,0.65)" strokeWidth="1.6" />
            <circle cx="66" cy="130" r="3.5" fill="none" stroke="rgba(255,215,0,0.65)" strokeWidth="1.6" />
            <path d="M34 145 Q65 151 96 145" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        <h1 className="font-['Bebas_Neue'] text-[clamp(3rem,10vw,5.5rem)] leading-[0.95] tracking-[0.02em] mb-4">
          SEU COLD<br />
          <span className="text-[#009c3b]">BREW</span><br />
          NA SUA <span className="text-[#FEDF00]">PORTA</span>
        </h1>
        <p className="text-[clamp(0.95rem,2.5vw,1.1rem)] text-[#c0a87a] leading-relaxed max-w-[36ch] mx-auto mb-6">
          Café especial gelado, preparado com grãos premium do Brasil. Entregamos fresquinho, com o sabor intenso e suave que você merece.
        </p>
      </div>

      {/* FEATURE GRID */}
      <div className="w-full max-w-[440px] grid grid-cols-2 gap-3 mb-6" style={{ animation: "fadeUp 0.25s both" }}>
        <div className="bg-[#18100a] border border-[rgba(255,215,100,0.12)] rounded-lg p-4 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.6)] transition-all duration-200">
          <span className="text-[1.8rem] block mb-1">🧊</span>
          <div className="font-['Bebas_Neue'] text-[0.95rem] tracking-[0.03em] leading-tight mb-0.5">Cold Brew Premium</div>
          <div className="text-[0.67rem] text-[#c0a87a] leading-tight">Extração a frio por 18h com grãos especiais do Brasil.</div>
        </div>

        <div className="border border-[rgba(213,43,30,0.4)] bg-gradient-to-br from-[#18100a] to-[rgba(213,43,30,0.08)] rounded-lg p-4 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.6)] transition-all duration-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#D52B1E] to-[#FEDF00]" />
          <span className="text-[1.8rem] block mb-1">🫓</span>
          <div className="font-['Bebas_Neue'] text-[0.95rem] tracking-[0.03em] leading-tight mb-0.5">Lanche Chileno</div>
          <div className="text-[0.67rem] text-[#c0a87a] leading-tight">Churrascas — massa fermentada artesanal recheada com queijo derretido e presunto.</div>
          <span className="inline-block bg-[rgba(213,43,30,0.15)] border border-[rgba(213,43,30,0.3)] rounded-full px-[0.55rem] py-[0.15rem] text-[0.59rem] font-bold text-[#ff7066] uppercase tracking-wider mt-2">🇨🇱 Especialidade</span>
        </div>

        <div className="bg-[#18100a] border border-[rgba(255,215,100,0.12)] rounded-lg p-4 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.6)] transition-all duration-200">
          <span className="text-[1.8rem] block mb-1">🛵</span>
          <div className="font-['Bebas_Neue'] text-[0.95rem] tracking-[0.03em] leading-tight mb-0.5">Entrega Rápida</div>
          <div className="text-[0.67rem] text-[#c0a87a] leading-tight">15 a 20 min após seu pedido, direto onde você está.</div>
        </div>

        <div className="bg-[#18100a] border border-[rgba(255,215,100,0.12)] rounded-lg p-4 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.6)] transition-all duration-200">
          <span className="text-[1.8rem] block mb-1">❄️</span>
          <div className="font-['Bebas_Neue'] text-[0.95rem] tracking-[0.03em] leading-tight mb-0.5">Sempre Gelado</div>
          <div className="text-[0.67rem] text-[#c0a87a] leading-tight">Embalagem térmica que mantém o frescor até a última gota.</div>
        </div>
      </div>

      {/* MAIN FORM CARD */}
      {!submitted ? (
        <div className="w-full max-w-[440px] bg-[#18100a] border border-[rgba(255,215,100,0.12)] rounded-lg p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden mb-6" style={{ animation: "fadeUp 0.35s both" }}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#009c3b] via-[#FEDF00] via-[#D52B1E] to-[#003580]" />
          <h2 className="font-['Bebas_Neue'] text-[clamp(1.3rem,4vw,1.8rem)] tracking-[0.03em] leading-tight mb-1">
            Receba na sua<br />Faculdade / Cowork /<br />Trabalho agora
          </h2>
          <p className="text-[0.875rem] text-[#c0a87a] mb-6 leading-relaxed">
            Cadastre-se e ganhe <strong className="text-[#FEDF00]">20% OFF</strong> no seu primeiro pedido. Só precisamos de alguns dados rápidos.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div className={`flex flex-col gap-1 ${errors.name ? "has-error" : ""}`}>
              <label htmlFor="input-name" className="text-[0.7rem] font-bold uppercase tracking-wider text-[#c0a87a]">
                Seu nome
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="input-name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError("name"); }}
                  placeholder="Como você se chama?"
                  className={`w-full bg-[#221610] border rounded-lg px-4 py-3 pl-[2.75rem] text-[0.95rem] text-[#f5ece0] placeholder:text-[#7a5c3a] transition-all duration-200 ${errors.name ? "border-[rgba(229,115,115,0.5)]" : "border-[rgba(255,215,100,0.12)] focus:border-[#009c3b] focus:shadow-[0_0_0_3px_rgba(0,156,59,0.15)]"} focus:outline-none`}
                  autoComplete="given-name"
                  required
                />
                <svg className="field-icon absolute left-4 z-10 text-[#7a5c3a] pointer-events-none transition-colors duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              {errors.name && <span className="text-[0.72rem] text-[#e57373] mt-[-0.2rem]">Por favor, escreva seu nome.</span>}
            </div>

            {/* WhatsApp */}
            <div className={`flex flex-col gap-1 ${errors.whatsapp ? "has-error" : ""}`}>
              <label htmlFor="input-whatsapp" className="text-[0.7rem] font-bold uppercase tracking-wider text-[#c0a87a]">
                WhatsApp
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  id="input-whatsapp"
                  value={whatsapp}
                  onChange={(e) => { setWhatsapp(e.target.value); clearError("whatsapp"); }}
                  placeholder="+55 11 9 0000-0000"
                  className={`w-full bg-[#221610] border rounded-lg px-4 py-3 pl-[2.75rem] text-[0.95rem] text-[#f5ece0] placeholder:text-[#7a5c3a] transition-all duration-200 ${errors.whatsapp ? "border-[rgba(229,115,115,0.5)]" : "border-[rgba(255,215,100,0.12)] focus:border-[#009c3b] focus:shadow-[0_0_0_3px_rgba(0,156,59,0.15)]"} focus:outline-none`}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
                <svg className="field-icon absolute left-4 z-10 text-[#7a5c3a] pointer-events-none transition-colors duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              {errors.whatsapp && <span className="text-[0.72rem] text-[#e57373] mt-[-0.2rem]">Insira um número de WhatsApp válido.</span>}
            </div>

            {/* Email */}
            <div className={`flex flex-col gap-1 ${errors.email ? "has-error" : ""}`}>
              <label htmlFor="input-email" className="text-[0.7rem] font-bold uppercase tracking-wider text-[#c0a87a]">
                E-mail
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  id="input-email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                  placeholder="seu@email.com"
                  className={`w-full bg-[#221610] border rounded-lg px-4 py-3 pl-[2.75rem] text-[0.95rem] text-[#f5ece0] placeholder:text-[#7a5c3a] transition-all duration-200 ${errors.email ? "border-[rgba(229,115,115,0.5)]" : "border-[rgba(255,215,100,0.12)] focus:border-[#009c3b] focus:shadow-[0_0_0_3px_rgba(0,156,59,0.15)]"} focus:outline-none`}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
                <svg className="field-icon absolute left-4 z-10 text-[#7a5c3a] pointer-events-none transition-colors duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              {errors.email && <span className="text-[0.72rem] text-[#e57373] mt-[-0.2rem]">Insira um e-mail válido.</span>}
            </div>

            {/* Termos */}
            <div className={`${errors.terms ? "has-error" : ""}`}>
              <label className="flex items-start gap-3 text-[0.75rem] text-[#7a5c3a] leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => { setTerms(e.target.checked); clearError("terms"); }}
                  className="w-4 h-4 min-w-4 mt-0.5 accent-[#009c3b] cursor-pointer"
                  required
                />
                <div>
                  <span>Aceito receber comunicações do Café Brachileiro sobre pedidos, promoções e novidades.</span>
                  {errors.terms && <span className="text-[0.72rem] text-[#e57373] block mt-0.5">Aceitar os termos e condições</span>}
                </div>
              </label>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#009c3b] text-white rounded-lg px-6 py-4 text-base font-bold tracking-[0.03em] flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_4px_20px_rgba(0,156,59,0.4)] hover:bg-[#007a2f] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,156,59,0.5)] active:translate-y-0 ${loading ? "opacity-55 cursor-not-allowed translate-none" : ""}`}
            >
              <span className={loading ? "opacity-70" : ""}>☕ Quero meu Cold Brew agora!</span>
              {loading && <span className="w-[18px] h-[18px] border-2 border-[rgba(255,255,255,0.3)] border-t-white rounded-full" style={{ animation: "spin 0.7s linear infinite" }} />}
            </button>

            <p className="text-center text-[0.7rem] text-[#7a5c3a] flex items-center justify-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Seus dados estão seguros e nunca serão vendidos.
            </p>
          </form>

          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[rgba(255,215,100,0.07)]">
            <div className="flex">
              <div className="w-[30px] h-[30px] rounded-full border-2 border-[#18100a] text-[13px] flex items-center justify-center bg-[#2e1e12]">😄</div>
              <div className="w-[30px] h-[30px] rounded-full border-2 border-[#18100a] text-[13px] flex items-center justify-center bg-[#2e1e12] -ml-2.5">🤩</div>
              <div className="w-[30px] h-[30px] rounded-full border-2 border-[#18100a] text-[13px] flex items-center justify-center bg-[#2e1e12] -ml-2.5">😊</div>
              <div className="w-[30px] h-[30px] rounded-full border-2 border-[#18100a] text-[13px] flex items-center justify-center bg-[#2e1e12] -ml-2.5">☕</div>
            </div>
            <p className="text-[0.75rem] text-[#c0a87a] leading-tight">
              <strong className="text-[#f5ece0]">+200 pessoas</strong> já se cadastraram<br />esta semana
            </p>
          </div>
        </div>
      ) : null}

      {/* DELIVERY STRIP */}
      {!submitted && (
        <div className="w-full max-w-[440px] flex justify-around mb-6 gap-2 flex-wrap" style={{ animation: "fadeUp 0.45s both" }}>
          <div className="flex flex-col items-center gap-1 text-[0.68rem] text-[#c0a87a] text-center flex-1 min-w-[80px]">
            <span className="text-[1.6rem]">⚡</span>
            <span className="font-bold text-[0.73rem] text-[#f5ece0]">Rápido</span>
            <span>15 a 20 min após o pedido</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[0.68rem] text-[#c0a87a] text-center flex-1 min-w-[80px]">
            <span className="text-[1.6rem]">🌿</span>
            <span className="font-bold text-[0.73rem] text-[#f5ece0]">Especial</span>
            <span>Grãos selecionados</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[0.68rem] text-[#c0a87a] text-center flex-1 min-w-[80px]">
            <span className="text-[1.6rem]">🧊</span>
            <span className="font-bold text-[0.73rem] text-[#f5ece0]">Sempre gelado</span>
            <span>Embalagem térmica</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[0.68rem] text-[#c0a87a] text-center flex-1 min-w-[80px]">
            <span className="text-[1.6rem]">🇧🇷</span>
            <span className="font-bold text-[0.73rem] text-[#f5ece0]">Brasileiro</span>
            <span>Origem garantida</span>
          </div>
        </div>
      )}

      {/* WHATSAPP SECTION */}
      {submitted && (
        <div className="w-full max-w-[440px] flex flex-col" style={{ animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div className="w-full bg-[#18100a] border border-[rgba(255,215,100,0.12)] rounded-lg p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#009c3b] via-[#FEDF00] to-[#D52B1E]" />
            <div className="text-[52px] mb-3" style={{ animation: "bounceIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>🎉</div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(1.5rem,5vw,2rem)] text-[#f5ece0] mb-1 leading-tight">
              Você está na lista VIP!
            </h2>
            <p className="text-[0.85rem] text-[#c0a87a] mb-6 leading-relaxed">
              Só um passo final — inscreva-se no canal do WhatsApp e receba seu código de <strong className="text-[#FEDF00]">20% OFF</strong> como prêmio de boas-vindas.
            </p>

            <div className="bg-gradient-to-br from-[rgba(37,211,102,0.1)] to-[rgba(0,156,59,0.06)] border-[1.5px] border-[rgba(37,211,102,0.3)] rounded-lg p-6 mb-6 text-center" style={{ animation: "glowGreen 2.5s ease-in-out 0.5s infinite" }}>
              <div className="text-[2.2rem] mb-2">📲</div>
              <div className="font-['Bebas_Neue'] text-[clamp(1.1rem,3.5vw,1.5rem)] text-[#f5ece0] mb-1">
                Inscreva-se no Canal<br />do WhatsApp
              </div>
              <p className="text-[0.78rem] text-[#c0a87a] mb-4 leading-relaxed">
                Ao entrar no canal, você recebe o código direto. Também te avisamos quando abrirmos e sobre novas promoções!
              </p>

              <a
                href="https://whatsapp.com/channel/0029Vb87i7QGzzKPti9GX23V"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white rounded-lg px-6 py-4 text-[0.95rem] font-bold flex items-center justify-center gap-3 transition-all duration-200 shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:bg-[#20ba5a] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,0.45)] no-underline mb-3"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.359 9.359 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Entrar e Pegar meu 20% OFF →
              </a>

              <div className="flex items-center justify-center gap-2 bg-[#2e1e12] border border-dashed border-[rgba(254,223,0,0.35)] rounded-lg px-4 py-2.5 text-[0.78rem] text-[#c0a87a]">
                🎁 Código premiado: <strong className="font-['Courier_New'] text-[0.9rem] text-[#FEDF00] tracking-wider">BRACHILEIRO20</strong> · válido 7 dias
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(255,215,100,0.07)] text-left">
              <p className="text-[0.68rem] font-bold uppercase tracking-wider text-[#7a5c3a] mb-4">O que acontece agora?</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-[22px] h-[22px] min-w-[22px] bg-[rgba(0,156,59,0.15)] rounded-full text-[11px] font-bold text-[#009c3b] flex items-center justify-center mt-0.5">1</div>
                  <p className="text-[0.78rem] text-[#c0a87a] leading-relaxed"><strong className="text-[#f5ece0]">Clique acima</strong> e entre no canal do WhatsApp do Café Brachileiro.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-[22px] h-[22px] min-w-[22px] bg-[rgba(0,156,59,0.15)] rounded-full text-[11px] font-bold text-[#009c3b] flex items-center justify-center mt-0.5">2</div>
                  <p className="text-[0.78rem] text-[#c0a87a] leading-relaxed"><strong className="text-[#f5ece0]">Receba o código </strong> — 20% OFF garantido no primeiro pedido.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-[22px] h-[22px] min-w-[22px] bg-[rgba(0,156,59,0.15)] rounded-full text-[11px] font-bold text-[#009c3b] flex items-center justify-center mt-0.5">3</div>
                  <p className="text-[0.78rem] text-[#c0a87a] leading-relaxed"><strong className="text-[#f5ece0]">Peça seu Cold Brew</strong> na Faculdade, Cowork ou Trabalho — chega em 15 a 20 min. ☕🧊</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-12 text-center w-full max-w-[440px]">
        <div className="flex items-center justify-center gap-3 mb-5">
          <a href="https://instagram.com/cafebrachileiro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#18100a] border border-[rgba(255,215,100,0.12)] text-[#c0a87a] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:shadow-[0_6px_20px_rgba(220,39,67,0.4)]" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://whatsapp.com/channel/0029Vb87i7QGzzKPti9GX23V" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#18100a] border border-[rgba(255,215,100,0.12)] text-[#c0a87a] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#25D366] hover:border-transparent hover:text-white hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)]" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.359 9.359 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </a>
          <a href="https://tiktok.com/@cafebrachileiro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#18100a] border border-[rgba(255,215,100,0.12)] text-[#c0a87a] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#010101] hover:border-[#ff0050] hover:text-white hover:shadow-[0_6px_20px_rgba(255,0,80,0.35)]" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.01-8.83a8.18 8.18 0 0 0 4.78 1.52V4.56a4.85 4.85 0 0 1-1-.13z" />
            </svg>
          </a>
        </div>

        <div className="w-full h-px bg-[rgba(255,215,100,0.07)] mb-4" />

        <div className="text-[0.7rem] text-[#7a5c3a] flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mb-2.5">
          <a href="#" className="underline opacity-60 transition-opacity duration-200 hover:opacity-100">Política de Privacidade</a>
          <span className="opacity-30">·</span>
          <a href="#" className="underline opacity-60 transition-opacity duration-200 hover:opacity-100">Termos de Uso</a>
          <span className="opacity-30">·</span>
          <a href="mailto:contato@cafebrachileiro.com" className="underline opacity-60 transition-opacity duration-200 hover:opacity-100">Contato</a>
        </div>
        <p className="text-[0.65rem] text-[#7a5c3a] opacity-60">© 2025 Café Brachileiro · Cold Brew Coffee Delivery · 🇧🇷🇨🇱</p>
      </footer>
    </div>
  );
}
