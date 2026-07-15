import React from "react";
import { Link } from "react-router";
import { Carousel } from "antd";
import { AiOutlineArrowRight, AiOutlineThunderbolt } from "react-icons/ai";

interface SlideItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  categorySlug: string;
  bgImage: string;
  ctaText: string;
}

const SLIDES: SlideItem[] = [
  {
    id: "slide-audio",
    badge: "Trending in Audio • Save Up to 25%",
    title: "Pure Sound. Zero Distraction.",
    subtitle: "Experience studio-grade noise-cancelling headphones and wireless audio built for all-day immersion.",
    categorySlug: "audio",
    bgImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1600&q=80",
    ctaText: "Shop Audio Collection",
  },
  {
    id: "slide-computers",
    badge: "Flagship Performance • 2026",
    title: "Next-Gen Laptops & Pro Displays",
    subtitle: "Empower your creative and engineering workflows with M3 Max MacBook Pros and Dell 4K Hub Monitors.",
    categorySlug: "computers",
    bgImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=80",
    ctaText: "Explore Computers",
  },
  {
    id: "slide-electronics",
    badge: "New Arrivals • In Stock",
    title: "Pro Cameras & Flagship Smartphones",
    subtitle: "Unleash high-precision photography, 4K video recording, and state-of-the-art mobile experiences.",
    categorySlug: "electronics",
    bgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80",
    ctaText: "Discover Electronics",
  },
  {
    id: "slide-home",
    badge: "Smart Home & Kitchen",
    title: "Elevate Your Everyday Space",
    subtitle: "Artisan espresso machines, smart blenders, and connected appliances designed for modern homes.",
    categorySlug: "home-kitchen",
    bgImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80",
    ctaText: "Browse Home & Kitchen",
  },
];

export const HomepageCarousel: React.FC = () => {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-gray-200/80 bg-slate-900">
      <Carousel
        autoplay
        autoplaySpeed={5000}
        effect="fade"
      >
        {SLIDES.map((slide) => (
          <div key={slide.id} className="relative outline-none">
            {/* Slide Container */}
            <div className="relative h-[380px] sm:h-[440px] lg:h-[480px] w-full flex items-center">
              {/* Background Image */}
              <img
                src={slide.bgImage}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Gradient Theme Overlay matching product page theme (Slate / Emerald) */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-emerald-950/40" />

              {/* Decorative Subtle Accent Glow */}
              <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              {/* Slide Content */}
              <div className="relative z-10 max-w-2xl px-6 sm:px-12 lg:px-16 text-white space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-xs">
                  <AiOutlineThunderbolt className="text-emerald-400" size={14} />
                  <span>{slide.badge}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/products?category=${slide.categorySlug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-xs"
                  >
                    <span>{slide.ctaText}</span>
                    <AiOutlineArrowRight size={14} />
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-medium text-sm border border-white/20 backdrop-blur-xs transition-colors"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomepageCarousel;
