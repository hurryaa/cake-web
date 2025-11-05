import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "首页", to: "/" },
  { label: "关于我们", to: "/about" },
  { label: "联系方式", to: "/contact" },
];

const categoryLinks = [
  {
    label: "甜品台",
    to: "/categories/dessert-table",
    icon: "fa-cake-candles",
    gradient: "from-primary-500 to-primary-600",
    description: "高颜值甜品台定制",
  },
  {
    label: "商务茶歇",
    to: "/categories/business-tea",
    icon: "fa-mug-hot",
    gradient: "from-secondary-500 to-secondary-600",
    description: "企业会议茶歇服务",
  },
  {
    label: "宝宝生日宴",
    to: "/categories/baby-birthday",
    icon: "fa-baby",
    gradient: "from-accent-500 to-accent-600",
    description: "童趣主题派对策划",
  },
  {
    label: "婚宴甜品台",
    to: "/categories/wedding",
    icon: "fa-heart",
    gradient: "from-rose-500 to-rose-600",
    description: "浪漫婚礼甜品台",
  },
  {
    label: "开业庆典",
    to: "/categories/opening",
    icon: "fa-ribbon",
    gradient: "from-emerald-500 to-emerald-600",
    description: "品牌开业仪式甜品",
  },
  {
    label: "主题节日",
    to: "/categories/holiday",
    icon: "fa-calendar-days",
    gradient: "from-purple-500 to-purple-600",
    description: "节庆主题甜品设计",
  },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500 shadow-lg shadow-primary-500/25 transition-transform duration-300 group-hover:scale-105"
          >
            <i className="fa-solid fa-birthday-cake text-lg text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-neutral-900">Sweet</span>
            <span className="-mt-1 text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
              Delights
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full border px-2.5 py-1.5 transition-all duration-300",
              scrolled
                ? "border-white/60 bg-white/80 shadow-sm"
                : "border-white/30 bg-white/40 backdrop-blur-md"
            )}
          >
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  location.pathname === link.to
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                    : scrolled
                    ? "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    : "text-neutral-600 hover:bg-white/60 hover:text-neutral-900"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="group relative">
              <button
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  scrolled
                    ? "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    : "text-neutral-600 hover:bg-white/60 hover:text-neutral-900"
                )}
              >
                产品分类
                <i className="fa-solid fa-chevron-down text-[10px] transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-1/2 top-[115%] w-[620px] -translate-x-1/2 rounded-3xl border border-white/70 bg-white/95 p-6 opacity-0 shadow-2xl shadow-primary-500/10 ring-1 ring-white/60 backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                    全部产品线
                  </p>
                  <span className="text-xs text-neutral-400">为不同场景打造的甜品体验</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {categoryLinks.map((category) => (
                    <Link
                      key={category.to}
                      to={category.to}
                      className="group/item flex items-start gap-3 rounded-2xl border border-neutral-100 bg-white/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:bg-primary-50/60"
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg shadow-primary-500/20 transition-transform duration-300 group-hover/item:scale-110",
                          category.gradient
                        )}
                      >
                        <i className={cn("fa-solid", category.icon)} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-neutral-900">
                          {category.label}
                        </span>
                        <span className="text-xs text-neutral-500">{category.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  location.pathname === link.to
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                    : scrolled
                    ? "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    : "text-neutral-600 hover:bg-white/60 hover:text-neutral-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/booking"
              className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
              <i className="fa-solid fa-calendar-check text-sm" />
              <span className="relative">在线预订</span>
            </Link>
          </motion.div>
        </nav>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className={cn(
            "relative flex h-11 w-11 items-center justify-center rounded-full border text-base transition-all duration-300 lg:hidden",
            scrolled
              ? "border-white/70 bg-white/90 text-neutral-800 shadow-sm"
              : "border-white/50 bg-white/70 text-neutral-700"
          )}
          aria-label="打开菜单"
        >
          <i className="fa-solid fa-bars" />
        </button>
      </div>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

export default Header;
