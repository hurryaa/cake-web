import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "首页", path: "/", icon: "fa-home" },
  { label: "关于我们", path: "/about", icon: "fa-circle-info" },
  { label: "联系方式", path: "/contact", icon: "fa-phone" },
];

const categories = [
  {
    label: "甜品台",
    path: "/categories/dessert-table",
    icon: "fa-cake-candles",
    gradient: "from-primary-500 to-primary-600",
  },
  {
    label: "商务茶歇",
    path: "/categories/business-tea",
    icon: "fa-mug-hot",
    gradient: "from-secondary-500 to-secondary-600",
  },
  {
    label: "宝宝生日宴",
    path: "/categories/baby-birthday",
    icon: "fa-baby",
    gradient: "from-accent-500 to-accent-600",
  },
  {
    label: "婚宴甜品台",
    path: "/categories/wedding",
    icon: "fa-heart",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    label: "开业庆典",
    path: "/categories/opening",
    icon: "fa-ribbon",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    label: "主题节日",
    path: "/categories/holiday",
    icon: "fa-calendar-days",
    gradient: "from-purple-500 to-purple-600",
  },
];

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          />

          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden"
          >
            <div className="relative h-full">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
                <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
                    <i className="fa-solid fa-birthday-cake text-lg text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-neutral-900">Sweet</span>
                    <span className="text-xs text-neutral-500 -mt-1">Delights</span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-all duration-300 hover:bg-neutral-200 active:scale-95"
                  aria-label="关闭菜单"
                >
                  <i className="fa-solid fa-times text-lg" />
                </button>
              </div>

              <div className="p-6">
                <motion.div
                  custom={0}
                  initial="closed"
                  animate="open"
                  variants={itemVariants}
                  className="mb-8"
                >
                  <Link
                    to="/booking"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4 text-white shadow-lg shadow-primary-500/30 transition-all duration-300 active:scale-95"
                  >
                    <i className="fa-solid fa-calendar-check" />
                    <span className="font-semibold">立即预订</span>
                  </Link>
                </motion.div>

                <div className="mb-8">
                  <motion.h3
                    custom={1}
                    initial="closed"
                    animate="open"
                    variants={itemVariants}
                    className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-neutral-500"
                  >
                    导航菜单
                  </motion.h3>
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        custom={index + 2}
                        initial="closed"
                        animate="open"
                        variants={itemVariants}
                      >
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                            location.pathname === item.path
                              ? "bg-primary-50 text-primary-600"
                              : "text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                              location.pathname === item.path
                                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                : "bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200"
                            }`}
                          >
                            <i className={`fa-solid ${item.icon}`} />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <motion.h3
                    custom={6}
                    initial="closed"
                    animate="open"
                    variants={itemVariants}
                    className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-neutral-500"
                  >
                    产品分类
                  </motion.h3>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.path}
                        custom={index + 7}
                        initial="closed"
                        animate="open"
                        variants={itemVariants}
                      >
                        <Link
                          to={category.path}
                          onClick={onClose}
                          className={`group flex flex-col items-center gap-3 rounded-2xl border p-4 transition-all duration-300 ${
                            location.pathname === category.path
                              ? "border-primary-200 bg-primary-50"
                              : "border-neutral-200 bg-white hover:border-primary-200 hover:bg-primary-50"
                          }`}
                        >
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                          >
                            <i className={`fa-solid ${category.icon}`} />
                          </div>
                          <span className="text-center text-xs font-medium text-neutral-800">
                            {category.label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  custom={13}
                  initial="closed"
                  animate="open"
                  variants={itemVariants}
                  className="mt-8 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <i className="fa-solid fa-phone" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-500">咨询热线</p>
                      <p className="font-semibold text-neutral-900">138 8069 2892</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
                      aria-label="微信"
                    >
                      <i className="fa-brands fa-weixin" />
                    </a>
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
                      aria-label="微博"
                    >
                      <i className="fa-brands fa-weibo" />
                    </a>
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-600"
                      aria-label="Instagram"
                    >
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
