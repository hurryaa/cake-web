import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">
              404
            </h1>
            <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-br from-primary-500 to-secondary-500"></div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4"
        >
          页面未找到
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-neutral-600 text-lg mb-8 leading-relaxed"
        >
          抱歉，您访问的页面不存在或已被移除
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
          >
            <i className="fa-solid fa-home mr-2"></i>
            返回首页
          </Link>
          
          <Link
            to="/booking"
            className="inline-flex items-center justify-center bg-white hover:bg-neutral-50 text-neutral-800 px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-neutral-200 font-medium"
          >
            <i className="fa-solid fa-calendar-check mr-2"></i>
            在线预订
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
