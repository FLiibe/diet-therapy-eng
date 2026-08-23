import React, { useState, useEffect } from "react";
import {
  Check,
  Clock,
  Smartphone,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Download,
  Infinity,
  RefreshCw,
  Monitor,
  Heart,
  Star,
  Lock,
  Wrench,
  AlertCircle,
  X,
  CreditCard,
  Stethoscope,
  Printer,
  Zap
} from "lucide-react";
import AcuLogo from "./components/AcuLogo";
import MovementTabs from "./components/MovementTabs";
import FAQAccordion from "./components/FAQAccordion";
import HotmartSalesFunnel from "./components/HotmartSalesFunnel";

// Import generated book bundle image (optimized with AVIF and WebP formats)
const bundleImgAvif = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1787247786/ChatGPT_Image_20_ago_2026_14_41_15_1_br8pkb.avif";
const bundleImgWebp = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1787247786/ChatGPT_Image_20_ago_2026_14_41_15_1_rjxjb2.webp";
const bundleImgPng = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1787247786/ChatGPT_Image_20_ago_2026_14_41_15_1_rjxjb2.webp";

const protocolImgAvif = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1784985719/ChatGPT_Image_25_lug_2026_10_19_01_agnrr5.avif";
const protocolImgWebp = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1784985785/ChatGPT_Image_25_lug_2026_10_19_01_rm0ob4.webp";
const protocolImgPng = "https://i.ibb.co/hJZNX1mh/Chat-GPT-Image-15-lug-2026-22-41-37.png";

const guashaImgAvif = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1785327873/ChatGPT_Image_29_lug_2026_09_22_03_ezvqws.avif";
const guashaImgWebp = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1785327873/ChatGPT_Image_29_lug_2026_09_22_03_wxey4d.webp";

// ============================================================================
// REGION: FIXED USD PRICING CONSTANTS (INTERNATIONAL ENGLISH EDITION)
// ============================================================================

const currency = {
  code: "USD",
  symbol: "$",
  basico: "5",
  completo: "15",
  basicoOriginal: "29",
  completoOriginal: "64",
  bono1: "15",
  bono2: "10",
  bono3: "12",
  bono4: "15",
  bono5: "12",
  bono6: "18",
  bono7: "10",
  bonosTotal: "92",
  upsell: "9.90",
  protocolo: "9.90",
  protocoloOriginal: "19.90",
  protocoloDownsell: "5.90"
};

export default function App() {
  // --- STATE DECLARATIONS ---
  
  // Simple client-side routing state to support the "/upsell" page request with direct access prevention
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname;
    
    // Check if they are accessing a protected path on initial render
    if (path === "/upsell" || path === "/downsell" || path === "/gracias") {
      const hasActiveSession = sessionStorage.getItem("funnel_session") === "active";
      const urlParams = new URLSearchParams(window.location.search);
      const hasHotmartParams = 
        urlParams.has("transaction") || 
        urlParams.has("hottok") || 
        urlParams.has("email") || 
        urlParams.has("status") ||
        urlParams.has("payment_type") ||
        urlParams.has("billet_url") ||
        urlParams.has("billet_barcode");
      const ref = document.referrer ? document.referrer.toLowerCase() : "";
      const isFromHotmart = ref.includes("hotmart");

      if (!hasActiveSession && !hasHotmartParams && !isFromHotmart) {
        // Direct access is unauthorized, redirect silently to homepage
        window.history.replaceState({}, "", "/");
        return "/";
      }
    } else if (path === "/" || path === "") {
      // Set active session flag when they hit the landing page
      sessionStorage.setItem("funnel_session", "active");
    }
    return path;
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      // Also protect on back/forward navigation
      if (path === "/upsell" || path === "/downsell" || path === "/gracias") {
        const hasActiveSession = sessionStorage.getItem("funnel_session") === "active";
        const urlParams = new URLSearchParams(window.location.search);
        const hasHotmartParams = 
          urlParams.has("transaction") || 
          urlParams.has("hottok") || 
          urlParams.has("email") || 
          urlParams.has("status") ||
          urlParams.has("payment_type") ||
          urlParams.has("billet_url") ||
          urlParams.has("billet_barcode");
        const ref = document.referrer ? document.referrer.toLowerCase() : "";
        const isFromHotmart = ref.includes("hotmart");

        if (!hasActiveSession && !hasHotmartParams && !isFromHotmart) {
          window.history.replaceState({}, "", "/");
          setCurrentPath("/");
          return;
        }
      } else if (path === "/" || path === "") {
        sessionStorage.setItem("funnel_session", "active");
      }
      setCurrentPath(path);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Also listen to currentPath state changes to set the funnel session active when hitting the main route
  useEffect(() => {
    if (currentPath === "/" || currentPath === "") {
      sessionStorage.setItem("funnel_session", "active");
    }
  }, [currentPath]);

  // Live countdown timer state (starting from 10 minutes, 51 seconds like the original screenshot)
  const [timeLeft, setTimeLeft] = useState(651); // 10 minutes * 60 + 51 = 651 seconds
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [protocolImageLoaded, setProtocolImageLoaded] = useState(false);
  const [guashaImageLoaded, setGuashaImageLoaded] = useState(false);

  useEffect(() => {
    // High-priority preload link for the hero image to make it load much faster on mobile phones
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = bundleImgAvif;
    document.head.appendChild(link);

    // Preload for the protocol image (upsell/downsell page) so it's fully cached when needed
    const linkProtocol = document.createElement("link");
    linkProtocol.rel = "preload";
    linkProtocol.as = "image";
    linkProtocol.href = protocolImgAvif;
    document.head.appendChild(linkProtocol);

    // Preload for Gua Sha image (gift on downsell page)
    const linkGuasha = document.createElement("link");
    linkGuasha.rel = "preload";
    linkGuasha.as = "image";
    linkGuasha.href = guashaImgAvif;
    document.head.appendChild(linkGuasha);

    const img = new Image();
    img.src = bundleImgAvif;
    if (img.complete) {
      setHeroImageLoaded(true);
    } else {
      img.onload = () => {
        setHeroImageLoaded(true);
      };
    }

    const imgProtocol = new Image();
    imgProtocol.src = protocolImgAvif;
    if (imgProtocol.complete) {
      setProtocolImageLoaded(true);
    } else {
      imgProtocol.onload = () => {
        setProtocolImageLoaded(true);
      };
    }

    const imgGuasha = new Image();
    imgGuasha.src = guashaImgAvif;
    if (imgGuasha.complete) {
      setGuashaImageLoaded(true);
    } else {
      imgGuasha.onload = () => {
        setGuashaImageLoaded(true);
      };
    }

    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {}
      try {
        document.head.removeChild(linkProtocol);
      } catch (e) {}
      try {
        document.head.removeChild(linkGuasha);
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 651)); // Loop for demo purposes
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (currentPath === "/gracias") {
    return (
      <div className="min-h-screen bg-sand-light antialiased font-sans text-gray-800 flex flex-col justify-between" id="gracias-page">
        
        {/* HEADER BAR */}
        <div className="bg-[#09261a] text-white py-4 px-6 text-center shadow-md">
          <AcuLogo size="sm" />
        </div>

        {/* MAIN BODY CONTAINER */}
        <div className="max-w-xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
          
          {/* SUCCESS ANIMATED ICON */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-500 flex items-center justify-center mb-8 shadow-lg animate-bounce">
            <ShieldCheck className="w-12 h-12 text-emerald-600" />
          </div>

          {/* HEADING */}
          <h1 className="font-serif text-3xl sm:text-4xl text-emerald-800 font-bold mb-4 tracking-tight">
            Thank you for your purchase!
          </h1>
          
          <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
            We have processed your order securely. In the next few minutes, you will receive a confirmation email with download links and access instructions for all your materials.
          </p>

        </div>

        {/* FOOTER */}
        <footer className="bg-[#09261a] text-gray-400 py-4 text-center text-xs border-t border-emerald-950">
          <p>© {new Date().getFullYear()} Clinical Acupuncture. All rights reserved.</p>
        </footer>

      </div>
    );
  }

  if (currentPath === "/downsell") {
    return (
      <div className="min-h-screen bg-rose-50/20 antialiased font-sans text-gray-800 flex flex-col justify-between relative" id="downsell-landing-page">
        
        {/* TOP EXTREME URGENCY BANNER */}
        <div className="bg-red-950 text-white text-[11px] md:text-xs py-2.5 px-4 text-center font-mono flex items-center justify-center gap-2 select-none shadow-sm sticky top-0 z-40">
          <span className="inline-block animate-ping text-red-500 font-bold">🚨</span>
          <span className="font-sans font-bold text-red-200 tracking-wide uppercase">
            Final Opportunity: Your 50% discount will be deactivated forever when you leave
          </span>
          <span className="mx-1">•</span>
          <span className="font-bold text-red-400 tracking-widest bg-black/40 px-2 py-0.5 rounded">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-12 flex-1 flex flex-col items-center justify-start">
          
          {/* CRITICAL ATTENTION NOTICE */}
          <div className="w-full max-w-3xl bg-amber-50/95 border border-amber-300 rounded-xl py-2 px-4 text-center mb-6 shadow-xs animate-pulse">
            <div className="flex items-center justify-center gap-2 text-amber-950 text-xs">
              <span>⚠️</span>
              <p className="font-sans font-bold text-amber-950 uppercase tracking-wide">
                <strong>WAIT!</strong> This is your last chance to save 50% before missing this offer forever.
              </p>
            </div>
          </div>

          {/* MAIN TITLES */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-red-800 text-center tracking-tight leading-tight mb-2 font-black px-2">
            Are You Sure You Want to Pass on This?
          </h1>
          <p className="text-gold-dark italic font-semibold text-base sm:text-lg md:text-xl text-center mb-4 md:mb-6">
            Acupressure Point Map + EXCLUSIVE GIFT: Gua Sha & Facial Self-Massage Guide
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-6 md:mb-10 px-2">
            Don't limit your knowledge to pure manual theory. Get the <strong className="text-red-700">Acupressure Point Map</strong> right now at half price and receive the <strong className="text-[#09261a]">Gua Sha & Facial Self-Massage Guide</strong> (19 pages) as an immediate free gift. Two practical tools to enhance wellness naturally!
          </p>

          {/* Side-by-side or stacked container for BOTH products */}
          <div className="w-full max-w-xl bg-white rounded-3xl border-2 border-red-100 p-6 sm:p-8 shadow-2xl mb-6 text-left">
            <div className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              MAIN PRODUCT WITH 50% OFF
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-red-800 mb-4 tracking-wide uppercase">
              📍 Acupressure Point Map
            </h3>

            {/* Main Book Mockup Image - MATCHES EXACTLY THE MAIN HERO LAYOUT AND SIZES */}
            <div className="relative max-w-sm mx-auto mb-6 group rounded-2xl overflow-hidden shadow-xl border-4 border-gray-100 transition-transform duration-500 hover:scale-[1.01] min-h-[180px] sm:min-h-[260px] flex items-center justify-center bg-rose-50/10" id="downsell-book-mockup-wrapper">
              {/* Elegant Skeleton Loader */}
              {!protocolImageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-50/30 rounded-2xl animate-pulse">
                  <div className="w-8 h-8 rounded-full border-4 border-red-300 border-t-red-600 animate-spin mb-2"></div>
                  <span className="text-[10px] font-mono text-red-800 tracking-wider">Loading protocol...</span>
                </div>
              )}
              <picture className={`w-full transition-opacity duration-700 ease-in-out ${protocolImageLoaded ? "opacity-100" : "opacity-0"}`}>
                <source srcSet={protocolImgAvif} type="image/avif" />
                <source srcSet={protocolImgWebp} type="image/webp" />
                <img 
                  src={protocolImgPng} 
                  alt="Acupressure Point Map" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                  onLoad={() => setProtocolImageLoaded(true)}
                />
              </picture>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-2.5">
                <span className="text-red-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-red-950">18 Illustrated Points Atlas:</strong> Discover the exact location, energetic function, and safety notes for each point.
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <span className="text-red-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-red-950">6 Complete Protocols:</strong> One for each imbalance pattern from the main Diet Therapy manual.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-red-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-red-950">Secure Lifetime Access:</strong> Digital downloadable format forever on your phone, tablet, or computer.
                </div>
              </div>
            </div>
          </div>

          {/* Plus sign */}
          <div className="flex flex-col items-center justify-center my-4">
            <span className="text-4xl font-black text-rose-500 animate-bounce">+</span>
          </div>

          {/* FREE GIFT: Gua Sha Guide Card */}
          <div className="w-full max-w-xl bg-[#09261a] text-white rounded-3xl border-2 border-emerald-800/40 p-6 sm:p-8 shadow-2xl mb-8 text-left">
            {/* BADGE */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> EXCLUSIVE GIFT INCLUDED 100% FREE!
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-wide uppercase">
              🌸 Gua Sha & Facial Self-Massage Guide
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 italic mb-6 font-medium">
              19 complete pages ready to download • At no additional cost
            </p>

            {/* Gua Sha Book Mockup Image */}
            <div className="relative max-w-sm mx-auto mb-6 group rounded-2xl overflow-hidden shadow-xl border-4 border-emerald-900 transition-transform duration-500 hover:scale-[1.01] min-h-[180px] sm:min-h-[260px] flex items-center justify-center bg-emerald-950/20">
              {!guashaImageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/40 rounded-2xl animate-pulse">
                  <div className="w-8 h-8 rounded-full border-4 border-emerald-300 border-t-emerald-600 animate-spin mb-2"></div>
                  <span className="text-[10px] font-mono text-emerald-200 tracking-wider">Loading gift...</span>
                </div>
              )}
              <picture className={`w-full transition-opacity duration-700 ease-in-out ${guashaImageLoaded ? "opacity-100" : "opacity-0"}`}>
                <source srcSet={guashaImgAvif} type="image/avif" />
                <source srcSet={guashaImgWebp} type="image/webp" />
                <img 
                  src={guashaImgAvif} 
                  alt="Gua Sha and Facial Self-Massage Guide" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                  onLoad={() => setGuashaImageLoaded(true)}
                />
              </picture>
            </div>

            {/* Gua Sha Content List */}
            <div className="space-y-3 text-xs sm:text-sm text-emerald-50/95">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-white">Complete Core Technique:</strong> Exact angle, pressure, and practical alternatives using only your hands without buying anything.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-white">6-Zone Facial Map:</strong> Clear diagrams with stroke directions for neck, jawline, cheeks, eyes, forehead, and brow area.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-white">6 Pattern-Based Routines:</strong> Spleen (anti-inflammatory), Yang (warming), Yin (hydrating), Liver (jaw tension), Dampness (drainage), and Heat (cooling).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-white">Safety and Practice:</strong> Contraindications (active acne, fillers), common mistakes to avoid, suggested weekly schedule, and tracking journal.
                </div>
              </div>
            </div>
          </div>

          {/* PRICE DROP ALERT BANNER */}
          <div className="w-full max-w-md bg-red-50 border-2 border-red-200 rounded-3xl p-4 sm:p-5 text-center mb-6 shadow-md">
            <p className="text-[10px] sm:text-xs text-red-700 uppercase tracking-widest font-extrabold mb-1 animate-pulse">
              💥 TWO MANUALS FOR THE PRICE OF ONE! 💥
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm sm:text-base text-gray-400 line-through font-semibold">
                $9.90 USD
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-black text-red-700 flex items-center gap-1.5 animate-pulse">
                <span>$5.90 USD</span>
              </span>
            </div>
            <p className="text-[11px] text-red-800 mt-1.5 font-semibold leading-relaxed">
              Get the Acupressure Point Map at half price for only <span className="underline font-black">$5.90 USD</span> and receive the Facial Gua Sha Guide as an immediate gift. Risk-free with our 100% money-back guarantee!
            </p>
          </div>

          {/* HOTMART - Sales Funnel Widget */}
          <HotmartSalesFunnel />

          {/* Secure purchase icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-6 text-gray-400 text-[10px] sm:text-[11px] md:text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" /> 100% Secure Purchase
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-red-600" /> Instant Access
            </span>
          </div>

        </div>

        {/* COMPACT FOOTER */}
        <footer className="bg-red-950 text-gray-400 py-4 sm:py-6 text-center text-[11px] border-t border-red-900/30 w-full mt-auto">
          <p>© {new Date().getFullYear()} AcuSalud Academy. All rights reserved.</p>
        </footer>

      </div>
    );
  }

  if (currentPath === "/upsell") {
    return (
      <div className="min-h-screen bg-sand-light antialiased font-sans text-gray-800 flex flex-col justify-between relative" id="upsell-landing-page">
        
        {/* TOP URGENT BANNER */}
        <div className="bg-[#09261a] text-white text-[11px] md:text-xs py-2.5 px-4 text-center font-mono flex items-center justify-center gap-2 select-none shadow-sm sticky top-0 z-40">
          <span className="inline-block animate-pulse text-gold-medium font-bold">⚠️</span>
          <span className="font-sans font-medium tracking-wide">
            One-Time Opportunity: This companion offer is only available here
          </span>
          <span className="mx-1">•</span>
          <span className="font-bold text-gold-medium tracking-widest bg-black/30 px-2 py-0.5 rounded">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* CONTENT CONTAINER - aligned to top */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-12 flex-1 flex flex-col items-center justify-start">
          
          {/* THANK YOU / SUCCESS NOTICE */}
          <div className="w-full max-w-3xl bg-emerald-50/80 border border-emerald-200 rounded-xl py-2 px-4 text-center mb-6 shadow-xs animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2 text-emerald-800 text-xs">
              <span>🎉</span>
              <p className="font-sans font-medium text-emerald-900">
                <strong>Thank you for your purchase!</strong> Your order is already being sent to your email. Do not close this page—check out this exclusive recommended addition:
              </p>
            </div>
          </div>

          {/* MAIN TITLES */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-forest-dark text-center tracking-tight leading-tight mb-2 font-bold px-2">
            Acupressure Point Map + EXCLUSIVE GIFT: Gua Sha & Facial Self-Massage Guide
          </h1>
          <p className="text-gold-dark italic font-semibold text-base sm:text-lg md:text-xl text-center mb-4 md:mb-6">
            18 illustrated points plus immediate gift of facial self-massage with Gua Sha
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-6 md:mb-10 px-2">
            Complement your Chinese Diet Therapy program with the <strong className="text-emerald-700">Acupressure Point Map</strong> and receive the <strong className="text-[#09261a]">Gua Sha & Facial Self-Massage Guide</strong> (19 pages) as an immediate free gift. Two practical Traditional Chinese Medicine tools to boost your health and beauty naturally!
          </p>

          {/* MAIN PRODUCT: Digitopuncture Map */}
          <div className="w-full max-w-xl bg-white rounded-3xl border border-sand-dark p-6 sm:p-8 shadow-xl mb-6 text-left">
            <div className="inline-flex items-center gap-1 bg-emerald-700 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              EXCLUSIVE COMPANION
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-dark mb-4 tracking-wide uppercase">
              📍 Acupressure Point Map
            </h3>

            {/* Main Book Mockup Image - MATCHES EXACTLY THE MAIN HERO LAYOUT AND SIZES */}
            <div className="relative max-w-sm mx-auto mb-6 group rounded-2xl overflow-hidden shadow-xl border-4 border-gray-100 transition-transform duration-500 hover:scale-[1.01] min-h-[180px] sm:min-h-[260px] flex items-center justify-center bg-sand-light/10" id="upsell-book-mockup-wrapper">
              {/* Elegant Skeleton Loader */}
              {!protocolImageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand-light/40 animate-pulse">
                  <div className="w-8 h-8 rounded-full border-4 border-emerald-300 border-t-emerald-600 animate-spin mb-2"></div>
                  <span className="text-[10px] font-mono text-emerald-800 tracking-wider">Loading map...</span>
                </div>
              )}
              <picture className={`w-full transition-opacity duration-700 ease-in-out ${protocolImageLoaded ? "opacity-100" : "opacity-0"}`}>
                <source srcSet={protocolImgAvif} type="image/avif" />
                <source srcSet={protocolImgWebp} type="image/webp" />
                <img
                  src={protocolImgPng}
                  alt="Acupressure Point Map"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                  onLoad={() => setProtocolImageLoaded(true)}
                />
              </picture>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-forest-dark">Illustrated 18-Point Atlas:</strong> Exact anatomical location, detailed energetic function, and complete safety notes for each point.
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-forest-dark">6 Complete Protocols:</strong> One for each imbalance pattern from the main manual, enabling direct external stimulation.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-forest-dark">Relief for Acute Situations:</strong> Quick protocols for headache, insomnia, anxiety, nausea, fatigue, menstrual cramps, and onset of colds.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-forest-dark">Secure Lifetime Access:</strong> Digital downloadable format forever on your phone, tablet, or computer.
                </div>
              </div>
            </div>
          </div>

          {/* Plus sign */}
          <div className="flex flex-col items-center justify-center my-4">
            <span className="text-4xl font-black text-emerald-600 animate-bounce">+</span>
          </div>

          {/* FREE GIFT: Gua Sha Guide Card */}
          <div className="w-full max-w-xl bg-[#09261a] text-white rounded-3xl border-2 border-emerald-800/40 p-6 sm:p-8 shadow-2xl mb-8 text-left">
            {/* BADGE */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> EXCLUSIVE GIFT INCLUDED 100% FREE!
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-wide uppercase">
              🌸 Gua Sha & Facial Self-Massage Guide
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 italic mb-6 font-medium">
              19 complete pages ready to download • At no additional cost
            </p>

            {/* Gua Sha Book Mockup Image */}
            <div className="relative max-w-sm mx-auto mb-6 group rounded-2xl overflow-hidden shadow-xl border-4 border-emerald-900 transition-transform duration-500 hover:scale-[1.01] min-h-[180px] sm:min-h-[260px] flex items-center justify-center bg-emerald-950/20">
              {!guashaImageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/40 rounded-2xl animate-pulse">
                  <div className="w-8 h-8 rounded-full border-4 border-emerald-300 border-t-emerald-600 animate-spin mb-2"></div>
                  <span className="text-[10px] font-mono text-emerald-200 tracking-wider">Loading gift...</span>
                </div>
              )}
              <picture className={`w-full transition-opacity duration-700 ease-in-out ${guashaImageLoaded ? "opacity-100" : "opacity-0"}`}>
                <source srcSet={guashaImgAvif} type="image/avif" />
                <source srcSet={guashaImgWebp} type="image/webp" />
                <img 
                  src={guashaImgAvif} 
                  alt="Gua Sha and Facial Self-Massage Guide" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                  onLoad={() => setGuashaImageLoaded(true)}
                />
              </picture>
            </div>

            {/* Gua Sha Content List */}
            <div className="space-y-3 text-xs sm:text-sm text-emerald-50/95">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-white">Complete Core Technique:</strong> Exact angle, pressure, and practical alternatives using only your hands without buying anything.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-white">6-Zone Facial Map:</strong> Clear diagrams with stroke directions for neck, jawline, cheeks, eyes, forehead, and brow area.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-white">6 Pattern-Based Routines:</strong> Spleen (anti-inflammatory), Yang (warming), Yin (hydrating), Liver (jaw tension), Dampness (drainage), and Heat (cooling).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-white">Safety and Practice:</strong> Contraindications (active acne, fillers), common mistakes to avoid, suggested weekly schedule, and tracking journal.
                </div>
              </div>
            </div>
          </div>

          {/* BUNDLE PRICE DROP BANNER */}
          <div className="w-full max-w-md bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-4 sm:p-5 text-center mb-6 shadow-md">
            <p className="text-[10px] sm:text-xs text-emerald-700 uppercase tracking-widest font-extrabold mb-1 animate-pulse">
              💥 TWO MANUALS FOR THE PRICE OF ONE! 💥
            </p>
            <p className="text-[11px] text-emerald-800 font-semibold leading-relaxed">
              Get the Acupressure Point Map now and receive the Facial Gua Sha Guide as an exclusive immediate gift. Risk-free with our 100% money-back guarantee!
            </p>
          </div>

          {/* HOTMART - Sales Funnel Widget */}
          <HotmartSalesFunnel />

          {/* Secure purchase icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-6 text-gray-400 text-[10px] sm:text-[11px] md:text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Secure Purchase
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-emerald-600" /> Instant Download
            </span>
          </div>



        </div>

        {/* COMPACT FOOTER */}
        <footer className="bg-forest-dark text-gray-400 py-4 sm:py-6 text-center text-[11px] border-t border-forest-light/20 w-full mt-auto">
          <p>© {new Date().getFullYear()} AcuSalud Academy. All rights reserved.</p>
        </footer>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-light antialiased font-sans text-gray-800">
      
      {/* 1. TOP BAR */}
      <div className="bg-[#09261a] text-[11px] md:text-xs py-2.5 px-4 text-center font-mono flex items-center justify-center gap-2 select-none shadow-sm sticky top-0 z-40">
        <span className="font-mono font-bold text-gold-dark uppercase tracking-widest">
          INSTANT DIGITAL ACCESS · 7-DAY GUARANTEE · INTERNATIONAL EDITION
        </span>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col items-center justify-center mb-6 mt-2">
          <AcuLogo size="sm" />
          <p className="text-xs sm:text-sm font-mono text-gold-dark uppercase tracking-widest mt-2">
            A practical clinical reference for Chinese Medicine professionals
          </p>
        </header>

        {/* 2. HERO / PRESENTATION SECTION */}
        <section className="text-center max-w-4xl mx-auto mb-12" id="hero-section">
          {/* Main Display Heading */}
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-forest-dark tracking-tight leading-[1.15] mb-6 font-medium">
            Learn to apply <span className="text-gold-dark italic font-semibold">Chinese Diet Therapy</span> in your patient care
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
            Turn energetic diagnosis into clear, personalised food guidance with a complete, practical system designed for everyday consultations.
          </p>

          {/* Main Book Mockup Image */}
          <div className="relative max-w-xl mx-auto mb-10 group rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.01] min-h-[250px] sm:min-h-[400px] flex items-center justify-center bg-sand-light/50" id="book-mockup-wrapper">
            {!heroImageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand-light/40 animate-pulse">
                <div className="w-10 h-10 rounded-full border-4 border-forest-light border-t-gold-medium animate-spin mb-3"></div>
                <span className="text-xs font-mono text-forest-dark tracking-wider">Loading material...</span>
              </div>
            )}
            <picture className={`w-full transition-opacity duration-700 ease-in-out ${heroImageLoaded ? "opacity-100" : "opacity-0"}`}>
              <source srcSet={bundleImgAvif} type="image/avif" />
              <source srcSet={bundleImgWebp} type="image/webp" />
              <img
                src={bundleImgPng}
                alt="Chinese Diet Therapy professional guide"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
                onLoad={() => setHeroImageLoaded(true)}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          <p className="text-xs font-mono uppercase tracking-widest text-gold-dark font-bold mb-4">
            <span className="text-gold-dark">Chinese Diet Therapy</span> professional guide
          </p>

          {/* CTA Button 1 */}
          <button
            onClick={() => scrollToSection("plan-completo-card")}
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#113827] hover:bg-[#1a4b35] text-white font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-forest-dark/20 cursor-pointer"
            id="hero-cta-btn"
          >
            GET INSTANT ACCESS
          </button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-500 font-medium" id="trust-badges-bar">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4.5 h-4.5 text-gold-medium" />
              <span>✓ Secure payment</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-sand-dark hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4.5 h-4.5 text-gold-medium" />
              <span>↻ 7-day guarantee</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-sand-dark hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Infinity className="w-4.5 h-4.5 text-gold-medium" />
              <span>∞ Lifetime access</span>
            </div>
          </div>
        </section>

      </div>

      {/* 2.7. "This material is for you if..." SECTION */}
      <section className="bg-[#113827] text-white py-16 md:py-20 shadow-inner" id="who-is-it-for-section">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10.5px] md:text-xs font-mono tracking-[0.3em] uppercase text-gold-light font-semibold mb-2 block">
              A clearer way to practise
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-light tracking-tight font-medium mb-3">
              This material is for you if…
            </h3>
          </div>

          {/* Grid of 6 Pain points with exact copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12" id="pain-points-grid">
            
            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                You have studied Chinese Medicine, yet still feel uncertain when giving patients fully personalised dietary guidance.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                You understand the theory, but find it difficult to turn an energetic diagnosis into clear food recommendations.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                You want to know what each patient should prioritise or avoid according to their individual pattern.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                You need a reliable clinical reference you can consult quickly before, during or after an appointment.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                You want patients to understand your advice and apply it consistently — without complex technical language.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                You want greater confidence, coherence and precision when integrating food therapy into your practice.
              </p>
            </div>

          </div>

          {/* CTA Button 2 */}
          <div className="text-center">
            <button
              onClick={() => scrollToSection("plan-completo-card")}
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#c59f5b] hover:bg-[#dfc28d] text-[#113827] font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              id="pain-points-cta-btn"
            >
              I WANT THE COMPLETE METHOD
            </button>
          </div>
        </div>
      </section>

      {/* 3. "Clinical foundations" SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/60 border-b border-sand-dark/30" id="learning-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10.5px] md:text-xs font-mono tracking-[0.3em] uppercase text-gold-dark font-semibold mb-2 block">
              Clinical foundations
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight leading-tight font-semibold mb-2">
              What you will learn
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-sans tracking-wide">
              The Five Elements applied to everyday practice
            </p>
          </div>

          {/* Interactive Elements Tabs */}
          <MovementTabs />
        </div>
      </section>

      {/* 4. "Inside the material" SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/35 border-b border-sand-dark/30" id="manual-contents-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10.5px] md:text-xs font-mono tracking-[0.3em] uppercase text-gold-dark font-semibold">
              Inside the material
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-semibold mt-2 mb-4">
              What you will find in the manual
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A step-by-step journey designed to bring the time-tested principles of Chinese Medicine into everyday clinical practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto" id="manual-contents-grid">
            {/* Module 1 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  1
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Foundations of Chinese Diet Therapy
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Understand the bioenergetic principles that explain the therapeutic action of everyday foods.
                </p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  2
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  The Five Elements
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Classify and select foods through the five thermal natures, five traditional flavours and channel tropism.
                </p>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  3
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Energetic Diagnosis
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Turn TCM patterns — deficiency, excess, heat, cold and stagnation — into clear dietary guidance.
                </p>
              </div>
            </div>

            {/* Module 4 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  4
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Therapeutic Recipes
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Use ready-made recipes and practical indications that can be applied immediately in professional consultations.
                </p>
              </div>
            </div>

            {/* Module 5 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group md:col-span-2 lg:col-span-1 max-w-md mx-auto lg:max-w-none">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  5
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Planning and Practical Guidance
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Work with printable models and quick-reference tools that improve understanding and adherence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 7 EXCLUSIVE BONUSES SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/40 border-t border-sand-dark/60" id="bonuses-section">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-[0.25em] text-gold-dark font-semibold bg-white px-3 py-1 rounded-full border border-sand-dark/80">
              7 exclusive bonuses
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight leading-tight mt-4 font-medium">
              You will also receive these resources immediately
            </h3>
          </div>

          {/* 7 Bonus Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="bonuses-cards-grid">
            
            {/* Bonus 1 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bonus 1
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Quick Consultation Cards
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Printable A6 cards with the main TCM patterns and simplified lists of foods to recommend or limit.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Individual value</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono1}</span>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bonus 2
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Therapeutic Recipe Guide
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Practical soups, broths and preparations organised to nourish Blood, tonify Qi, warm cold or drain dampness.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Individual value</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono2}</span>
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bonus 3
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Seasonal Eating Calendar
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  A season-by-season guide to the foods to prioritise and limit in harmony with the Five Movements.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Individual value</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono3}</span>
              </div>
            </div>

            {/* Bonus 4 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bonus 4
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Anamnesis and Assessment Templates
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Professional, printable forms for recording tongue, pulse, eating habits and the progress of dietary guidance.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Individual value</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono4}</span>
              </div>
            </div>

            {/* Bonus 5 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bonus 5
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Therapeutic Broths
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Six pattern-based broths, three special broths, a practical 15-minute meal method and food-safety guidance.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Individual value</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono5}</span>
              </div>
            </div>

            {/* Bonus 6 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bonus 6
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Tongue Atlas
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Illustrated tables covering colour, shape, coating, cracks and markings, with pattern notes and dietary orientation.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Individual value</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono6}</span>
              </div>
            </div>

            {/* Bonus 7 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bonus 7
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Food Combinations to Avoid
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Traditional principles, pattern-specific cautions, helpful combinations, practical cases and an honest evidence-aware perspective.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Individual value</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono7}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. DEEP GREEN INVESTMENT PRICING SECTION */}
      <section className="bg-[#113827] text-white py-16 md:py-24 px-6 shadow-inner relative overflow-hidden" id="pricing-section">
        
        {/* Soft background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-medium/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-forest-light/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <span className="inline-block bg-[#09261a] border border-gold-medium/40 text-gold-light text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-4 shadow-xs">
              Launch offer
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-light tracking-tight font-medium leading-tight">
              Choose your plan
            </h3>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto px-2 md:px-0" id="pricing-plans-grid">
            
            {/* PLAN BÁSICO CARD */}
            <div className="bg-[#09261a] text-white rounded-3xl border border-forest-light/35 p-6 md:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-forest-light/60 text-left relative" id="plan-basico-card">
              
              <div>
                {/* Header Badge */}
                <div className="text-2xl md:text-3xl tracking-wider font-black text-white uppercase mb-6">
                  BASIC PLAN
                </div>

                {/* Features List */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-sand-light/95">
                    <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                    <span>Complete Chinese Diet Therapy manual</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-white/40 select-none">
                    <span className="text-red-400/80 shrink-0 mt-0.5">×</span>
                    <span>No exclusive bonus materials</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-white/40 select-none">
                    <span className="text-red-400/80 shrink-0 mt-0.5">×</span>
                    <span>No future updates</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-white/40 select-none">
                    <span className="text-red-400/80 shrink-0 mt-0.5">×</span>
                    <span>No priority email support</span>
                  </div>
                </div>

                {/* Prices */}
                <div className="mt-4 mb-3 pt-4 border-t border-white/10 flex flex-col items-center justify-center text-center w-full" id="price-stack-basico">
                  <span className="text-sm md:text-base font-bold text-red-400 line-through tracking-tight mb-1">
                    {currency.symbol}{currency.basicoOriginal}
                  </span>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-none">
                      {currency.symbol}{currency.basico}
                    </span>
                  </div>
                  <span className="text-xs text-sand-dark/60 mt-2 font-medium tracking-wide">
                    one-time payment · {currency.code}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowUpsellModal(true);
                  }}
                  className="block w-full py-4 rounded-xl bg-[#09261a] hover:bg-white hover:text-[#09261a] border-2 border-white text-white font-extrabold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] text-center cursor-pointer shadow-sm"
                  id="checkout-plan-basico"
                >
                  CHOOSE THE BASIC PLAN
                </button>
              </div>

            </div>

            {/* COMPLETE PLAN CARD (RECOMMENDED) */}
            <div className="bg-white text-gray-800 rounded-3xl border-4 border-gold-medium p-6 md:p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-300 hover:shadow-gold-medium/15 text-left scale-100 lg:scale-[1.03] z-10" id="plan-completo-card">
              
              {/* Recommended Corner Ribbon / Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-medium text-[#113827] px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md border border-white whitespace-nowrap">
                <span>🎗</span> RECOMMENDED
              </div>

              <div>
                {/* Header Badge */}
                <div className="text-2xl md:text-3xl tracking-wider font-black text-[#113827] uppercase mb-6">
                  COMPLETE PLAN
                </div>

                {/* Features List */}
                <div className="space-y-3.5 pt-4 border-t border-gray-100">

                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✓</span>
                    <span>Complete Chinese Diet Therapy manual</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✓</span>
                    <span>Permanent lifetime access</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✓</span>
                    <span>Free lifetime updates</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700 font-sans">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✓</span>
                    <span>Priority email support</span>
                  </div>

                  {/* 7 Exclusive Bonuses */}
                  <div className="space-y-2 pt-1 border-t border-sand-medium/40">
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-gold-dark shrink-0 font-bold">✓</span>
                      <span>BONUS 1: Quick Consultation Cards</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-gold-dark shrink-0 font-bold">✓</span>
                      <span>BONUS 2: Therapeutic Recipe Guide</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-gold-dark shrink-0 font-bold">✓</span>
                      <span>BONUS 3: Seasonal Eating Calendar</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-gold-dark shrink-0 font-bold">✓</span>
                      <span>BONUS 4: Anamnesis and Assessment Templates</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-gold-dark shrink-0 font-bold">✓</span>
                      <span>BONUS 5: Therapeutic Broths</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-gold-dark shrink-0 font-bold">✓</span>
                      <span>BONUS 6: Tongue Atlas</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-gold-dark shrink-0 font-bold">✓</span>
                      <span>BONUS 7: Food Combinations to Avoid</span>
                    </div>
                  </div>
                </div>

                {/* Prices */}
                <div className="mt-4 mb-3 pt-4 border-t border-gray-100 flex flex-col items-center justify-center text-center w-full" id="price-stack-completo">
                  <span className="text-sm md:text-base font-bold text-red-500 line-through tracking-tight mb-1">
                    {currency.symbol}{currency.completoOriginal}
                  </span>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-6xl font-serif font-black tracking-tight text-[#113827] leading-none">
                      {currency.symbol}{currency.completo}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-2 font-medium tracking-wide">
                    one-time payment · {currency.code}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    window.open("https://pay.hotmart.com/F107252768C?off=xo3ezbob&checkoutMode=10", "_blank");
                  }}
                  className="block w-full py-4.5 rounded-xl bg-[#113827] hover:bg-[#1b4b35] text-white font-extrabold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-900/10 text-center cursor-pointer"
                  id="checkout-plan-completo"
                >
                  CHOOSE THE COMPLETE PLAN
                </button>
              </div>

            </div>

          </div>

          {/* Secure indicator footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-sand-dark/60 font-mono mt-12">
            <span className="flex items-center gap-1">🔒 100% secure encrypted payment · 7-day refund guarantee</span>
          </div>

        </div>
      </section>

      {/* 5. PATIENT TESTIMONIALS SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-light border-b border-sand-dark/30" id="patient-testimonials-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-[0.25em] text-gold-dark font-semibold block mb-2">
              Experiences shared by clients
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-semibold mb-3">
              What patients are saying about guided <span className="text-gold-dark italic font-semibold">Chinese Diet Therapy</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Individual experiences vary. These comments describe personal experiences with professionally guided dietary changes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12" id="patient-testimonials-grid">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-sand-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  “The warm meals and Spleen-supporting broths completely changed my routine. Within two weeks, my digestion improved and my daily energy returned.”
                </p>
              </div>
              <div>
                <div className="border-t border-sand-medium/40 my-3" />
                <div className="flex flex-col">
                  <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Sarah M.
                  </span>
                  <span className="text-[10px] text-gold-dark font-mono uppercase tracking-wider mt-0.5">
                    Fatigue and digestive discomfort
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-sand-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  “My constant stomach discomfort eased after I reduced cold foods and dairy. I was surprised that such simple changes could make such a difference.”
                </p>
              </div>
              <div>
                <div className="border-t border-sand-medium/40 my-3" />
                <div className="flex flex-col">
                  <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    David M.
                  </span>
                  <span className="text-[10px] text-gold-dark font-mono uppercase tracking-wider mt-0.5">
                    Digestive support
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-sand-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  “The warm-food guidance helped me feel more balanced. My digestion improved, and so did the quality of my sleep.”
                </p>
              </div>
              <div>
                <div className="border-t border-sand-medium/40 my-3" />
                <div className="flex flex-col">
                  <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Rachel D.
                  </span>
                  <span className="text-[10px] text-gold-dark font-mono uppercase tracking-wider mt-0.5">
                    Sleep and cold pattern
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-sand-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  “The seasonal guide made our family meals much easier to plan. The broths and infusions are simple, comforting and practical.”
                </p>
              </div>
              <div>
                <div className="border-t border-sand-medium/40 my-3" />
                <div className="flex flex-col">
                  <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Andrew V.
                  </span>
                  <span className="text-[10px] text-gold-dark font-mono uppercase tracking-wider mt-0.5">
                    Seasonal wellbeing
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials CTA Button */}
          <div className="text-center">
            <button
              onClick={() => scrollToSection("plan-completo-card")}
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#113827] hover:bg-[#1b4b35] text-white font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              id="patient-testimonials-cta-btn"
            >
              GET INSTANT ACCESS
            </button>
          </div>
        </div>
      </section>

      {/* 11. UNCONDITIONAL GUARANTEE SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/40 border-y border-sand-dark/50" id="guarantee-section">
        <div className="max-w-3xl mx-auto text-center">
          
          <div className="w-16 h-16 rounded-full bg-[#113827] text-gold-medium flex items-center justify-center mx-auto mb-4 border-2 border-gold-medium/30 shadow">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.25em] text-gold-dark font-bold uppercase">
            ✓ Unconditional guarantee
          </span>

          <h3 className="font-serif text-3xl md:text-4xl text-forest-dark tracking-tight leading-tight mt-2 mb-4 font-semibold">
            7-day money-back guarantee
          </h3>

          <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Explore the complete material with peace of mind. If you feel it does not add meaningful value to your day-to-day clinical practice, request a refund within 7 days and receive 100% of your payment back.
          </p>

        </div>
      </section>

      {/* 12. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="py-16 md:py-20 px-6 bg-white" id="faqs-section">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-medium">
              Frequently asked questions
            </h3>
          </div>

          {/* Collapsible Accordion Component */}
          <FAQAccordion />

        </div>
      </section>

      {/* 13. "We are AcuSalud Academy" SECTION */}
      <section className="bg-[#113827] text-white py-16 md:py-20 px-6 text-center" id="about-us-section">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Circular Frame enclosing AcuLogo */}
          <div className="bg-white p-6 rounded-2xl border-4 border-gold-medium/30 mb-6 flex items-center justify-center shadow-lg">
            <AcuLogo size="sm" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.3em] text-gold-light uppercase font-bold mb-3">
            AcuSalud Academy
          </span>

          <h3 className="font-serif text-2xl md:text-4xl text-gold-light tracking-tight font-medium mb-3 leading-tight max-w-xl">
            We are AcuSalud Academy
          </h3>
          <p className="text-xs md:text-sm font-mono text-sand-dark tracking-widest uppercase mb-8">
            Serious education for Chinese Medicine professionals
          </p>

          <div className="space-y-4 text-xs md:text-sm text-sand-light/90 max-w-2xl leading-relaxed text-justify sm:text-center mb-10" id="about-us-paragraphs">
            <p>
              We help Chinese Medicine professionals feel more confident when applying their knowledge in everyday clinical practice.
            </p>
            <p>
              Our purpose is to simplify time-tested TCM knowledge and transform it into clear, practical materials that can be used directly in consultations.
            </p>
            <p>
              Our comprehensive study tools help practitioners feel better prepared to assess patterns and communicate high-quality dietary guidance.
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => scrollToSection("plan-completo-card")}
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gold-medium hover:bg-gold-light text-forest-dark font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            id="final-cta-checkout-btn"
          >
            GET INSTANT ACCESS
          </button>

        </div>
      </section>

      {/* 15. FOOTER */}
      <footer className="bg-sand-medium border-t border-sand-dark/60 py-8 px-6 text-center">
        <p className="text-[10px] md:text-xs text-gray-600 font-mono mb-2">
          © 2026 AcuSalud Academy · Traditional Chinese Medicine · All rights reserved.
        </p>
        <p className="text-[10px] text-gray-500 font-sans max-w-xl mx-auto">
          Educational material only. It is not a substitute for individual medical diagnosis or treatment.
        </p>
      </footer>


      {/* ONE-TIME UPSELL POP-UP MODAL (HIGH-CONVERSION 50% OFF OFFER) */}
      {showUpsellModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs" id="upsell-modal">
          <div className="bg-white rounded-3xl border border-sand-dark w-full max-w-md overflow-y-auto max-h-[95vh] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-center p-5 md:p-6 flex flex-col items-center">
            
            {/* Top Close Button */}
            <button
              onClick={() => {
                setShowUpsellModal(false);
              }}
              className="absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-700 to-[#113827] text-[10px] font-bold tracking-[0.15em] text-white uppercase mb-3 shadow-xs select-none">
              <span>🔥</span> EXCLUSIVE SPECIAL OFFER
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl md:text-2xl text-forest-dark font-bold tracking-tight leading-snug px-2">
              Wait! We Have a One-Time Opportunity for You
            </h3>

            {/* Subtitle */}
            <p className="text-xs text-gray-600 mt-2 max-w-sm px-2">
              Upgrade to the <strong className="text-forest-dark font-bold">Complete Plan</strong> now for only{" "}
              <span className="font-mono font-extrabold text-base text-emerald-800">$9.90 USD</span>
            </p>

            {/* Feature Card */}
            <div className="w-full bg-sand-light border border-sand-dark/80 rounded-2xl p-4 my-3.5 text-left shadow-xs">
              <div className="text-[11px] font-extrabold text-forest-dark uppercase tracking-wider mb-2 flex items-center gap-1 select-none">
                <span className="text-gold-medium animate-pulse">✨</span> What you get in the Complete Plan:
              </div>
              
              <div className="space-y-1.5 text-[11px] md:text-xs text-gray-700 leading-normal">
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✔</span>
                  <span>Complete Manual <strong>"Chinese Diet Therapy"</strong> (Lifetime Access)</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✔</span>
                  <span><strong>100% Free</strong> future updates for life</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✔</span>
                  <span>Priority email support for clinical questions</span>
                </div>
                
                <div className="pt-1.5 border-t border-sand-dark/60 mt-1.5 space-y-1.5">
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONUS 1:</strong> Quick Consultation Cards (Syndromes & Foods)</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONUS 2:</strong> TCM Therapeutic Recipe Guide</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONUS 3:</strong> Seasonal Food Calendar (Five Elements)</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONUS 4:</strong> Intake & Nutritional Follow-Up Forms</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONUS 5:</strong> Therapeutic Broths & Healing Stocks Guide</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONUS 6:</strong> Tongue Diagnosis Clinical Atlas</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONUS 7:</strong> Food Combinations to Avoid in TCM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade CTA Button */}
            <button
              onClick={() => {
                setShowUpsellModal(false);
                window.open("https://pay.hotmart.com/F107252768C?off=rfdd2kej&checkoutMode=10", "_blank");
              }}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-[#c59f5b] hover:from-emerald-800 hover:to-[#dfc28d] text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-emerald-900/10 text-center cursor-pointer"
            >
              YES! UPGRADE TO THE COMPLETE PLAN FOR {currency.symbol}{currency.upsell}
            </button>

            {/* Decline Link Button */}
            <button
              onClick={() => {
                setShowUpsellModal(false);
                window.open("https://pay.hotmart.com/O107252722A?checkoutMode=10", "_blank");
              }}
              className="w-full mt-2 py-2 rounded-xl border border-sand-dark/60 hover:bg-gray-50 text-gray-500 font-semibold text-xs tracking-wide transition-colors text-center cursor-pointer"
            >
              No, proceed with the Basic Plan ({currency.symbol}{currency.basico})
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
