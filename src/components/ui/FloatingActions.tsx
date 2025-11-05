import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-neutral-100">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-2xl shadow-primary-500/40 transition-shadow duration-300 hover:shadow-primary-500/60"
              aria-label="回到顶部"
            >
              <svg className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray={`${scrollProgress * 1.5} 150`}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <i className="fa-solid fa-arrow-up text-base" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-2"
        >
          <Link
            to="/booking"
            className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent-500 to-accent-600 shadow-xl shadow-accent-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent-500/50"
            aria-label="在线预订"
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <i className="fa-solid fa-calendar-check text-base text-white" />
          </Link>

          <button
            type="button"
            onClick={() => window.open("tel:13880692892", "_self")}
            className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50"
            aria-label="拨打电话"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="h-full w-full rounded-full bg-emerald-400" />
            </motion.div>
            <i className="fa-solid fa-phone text-base text-white" />
          </button>
        </motion.div>
      </div>
    </>
  );
}
