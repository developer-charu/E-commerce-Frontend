import React from "react";
import { Link } from "react-router";
import {
  AiOutlineArrowRight,
  AiOutlineSafety,
  AiOutlineTruck,
  AiOutlineCustomerService,
  AiOutlineReload,
  AiOutlineFire,
  AiOutlineRight,
} from "react-icons/ai";
import { EComLayoutComponent } from "../../components/ecommerce/layout/EComLayoutComponent.tsx";
import { HomepageCarousel } from "../Carousel/HomepageCarousel.tsx";
import { ProductCard } from "../../components/ecommerce/product/ProductCard.tsx";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../../mock/ecommerceMockData.ts";

export const HomePage: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const topRatedProducts = [...MOCK_PRODUCTS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <EComLayoutComponent>
      <div className="space-y-12 pb-6">
        {/* 1. Hero Carousel themed to match Product Page */}
        <HomepageCarousel />

        {/* 2. Value Proposition Highlights */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-6 bg-white rounded-xl border border-gray-200/80 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <AiOutlineTruck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">Free Delivery</h4>
              <p className="text-xs text-gray-500">Orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <AiOutlineSafety size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">100% Genuine</h4>
              <p className="text-xs text-gray-500">Official manufacturer warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <AiOutlineReload size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">30-Day Returns</h4>
              <p className="text-xs text-gray-500">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <AiOutlineCustomerService size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">24/7 Support</h4>
              <p className="text-xs text-gray-500">Dedicated assistance</p>
            </div>
          </div>
        </section>

        {/* 3. Shop by Category */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Shop by Category</h3>
              <p className="text-xs text-gray-500">Explore our curated collections of premium tech and home gear</p>
            </div>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>All Categories</span>
              <AiOutlineRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_CATEGORIES.map((cat) => {
              const productCount = MOCK_PRODUCTS.filter((p) => p.category === cat.slug).length;
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  className="group bg-white p-5 rounded-xl border border-gray-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {productCount} {productCount === 1 ? "Product" : "Products"}
                      </span>
                      <AiOutlineArrowRight
                        size={14}
                        className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 text-base group-hover:text-emerald-600 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {cat.subcategories.map((s) => s.name).join(", ")}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-medium text-emerald-600 group-hover:text-emerald-700">
                    Browse {cat.name} &rarr;
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4. Featured Products (using ProductCard from product page) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Featured Products</h3>
              </div>
              <p className="text-xs text-gray-500">Hand-picked gear with outstanding performance and top ratings</p>
            </div>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All Products</span>
              <AiOutlineRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* 5. Promotional Banner matching Product Page Emerald Theme */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-8 sm:p-10 shadow-xs">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              <AiOutlineFire size={14} className="text-emerald-300" />
              <span>Special Seasonal Campaign</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Upgrade Your Setup with Premium Audio & Computing
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Shop verified, manufacturer-warrantied laptops, high-definition monitors, and noise-cancelling headphones at exclusive seasonal rates.
            </p>
            <div className="pt-2">
              <Link
                to="/products?sort=discount"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-emerald-900 hover:bg-emerald-50 font-semibold text-sm transition-colors shadow-xs"
              >
                <span>Shop Deals & Discounts</span>
                <AiOutlineArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Top Rated Showcase (using ProductCard from product page) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Top Rated By Customers</h3>
              </div>
              <p className="text-xs text-gray-500">Highest rated devices backed by genuine verified customer reviews</p>
            </div>
            <Link
              to="/products?sort=rating"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Explore Top Rated</span>
              <AiOutlineRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      </div>
    </EComLayoutComponent>
  );
};

export default HomePage;
