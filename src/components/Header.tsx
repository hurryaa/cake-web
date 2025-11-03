import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 监听滚动事件，改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 动画变体
  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
  <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
  scrolled
    ? 'backdrop-blur-xl bg-white/95 border-b border-neutral-200/50 shadow-lg py-4'
    : 'backdrop-blur-sm bg-black/30 py-6'
}`}>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo - 重新设计 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="relative group"
            >
              <Link to="/" className={`flex items-center space-x-2 transition-all duration-300 hover:scale-105 ${
                scrolled ? 'text-neutral-900' : 'text-white'
              }`}>
                {/* Logo图标 */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  scrolled
                    ? 'bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg'
                    : 'bg-gradient-to-br from-primary-400/80 to-secondary-400/80 backdrop-blur-sm'
                }`}>
                  <i className="fa-solid fa-birthday-cake text-white text-lg"></i>
                </div>

                {/* Logo文字 */}
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight">Sweet</span>
                  <span className="text-xs font-light tracking-wider opacity-80 -mt-1">Delights</span>
                </div>
              </Link>

            </motion.div>
          
          {/* Desktop Navigation - 重新设计 */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* 导航项容器 */}
            <div className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-white/60 backdrop-blur-md border border-white/30'
                : 'bg-white/10 backdrop-blur-sm border border-white/20'
            }`}>
              {/* 首页 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                >
                  首页
                </Link>
              </motion.div>

              {/* 产品分类下拉 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative group"
              >
                <button className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}>
                  产品分类
                  <i className="fa-solid fa-chevron-down ml-2 text-xs transition-transform duration-300 group-hover:rotate-180"></i>
                </button>

                {/* 下拉菜单 - 毛玻璃效果 */}
                <div className="absolute top-full left-0 mt-2 w-72 backdrop-blur-xl bg-white/90 border border-white/30 rounded-2xl shadow-2xl py-3 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-200/50 mb-2">
                    产品分类
                  </div>

                  <Link to="/categories/dessert-table" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 text-sm transition-all duration-200 group/item">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-cake-candles text-white text-xs"></i>
                    </div>
                    <div>
                      <div className="font-medium">甜品台</div>
                      <div className="text-xs text-neutral-500">精致甜点组合</div>
                    </div>
                  </Link>

                  <Link to="/categories/business-tea" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 text-sm transition-all duration-200 group/item">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-briefcase text-white text-xs"></i>
                    </div>
                    <div>
                      <div className="font-medium">商务茶歇</div>
                      <div className="text-xs text-neutral-500">专业商务服务</div>
                    </div>
                  </Link>

                  <Link to="/categories/baby-birthday" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 text-sm transition-all duration-200 group/item">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-baby text-white text-xs"></i>
                    </div>
                    <div>
                      <div className="font-medium">宝宝生日宴</div>
                      <div className="text-xs text-neutral-500">可爱主题设计</div>
                    </div>
                  </Link>

                  <Link to="/categories/wedding" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 text-sm transition-all duration-200 group/item">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-heart text-white text-xs"></i>
                    </div>
                    <div>
                      <div className="font-medium">婚宴甜品台</div>
                      <div className="text-xs text-neutral-500">浪漫优雅设计</div>
                    </div>
                  </Link>

                  <Link to="/categories/opening" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 text-sm transition-all duration-200 group/item">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-ribbon text-white text-xs"></i>
                    </div>
                    <div>
                      <div className="font-medium">开业甜品台</div>
                      <div className="text-xs text-neutral-500">庆典专用服务</div>
                    </div>
                  </Link>

                  <Link to="/categories/holiday" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 text-sm transition-all duration-200 group/item">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-calendar-star text-white text-xs"></i>
                    </div>
                    <div>
                      <div className="font-medium">主题节日</div>
                      <div className="text-xs text-neutral-500">节日主题定制</div>
                    </div>
                  </Link>
                </div>
              </motion.div>

              {/* 关于我们 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Link
                  to="/about"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                >
                  关于我们
                </Link>
              </motion.div>

              {/* 联系方式 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                >
                  联系方式
                </Link>
              </motion.div>
            </div>

            {/* CTA按钮 - 统一设计 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="ml-6"
            >
              <Link
                to="/booking"
                className="group relative bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center"
              >
                <i className="fa-solid fa-calendar-check mr-2 text-sm"></i>
                在线预订

                {/* 简洁的悬浮效果 */}
                <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </nav>
          
          {/* Mobile menu button - 重新设计 */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`lg:hidden p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
              scrolled
                ? 'bg-white/60 backdrop-blur-md border border-white/30 text-neutral-800 hover:text-primary-600'
                : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:text-primary-300'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
            }`}></i>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Navigation - 毛玻璃全屏菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40 backdrop-blur-xl bg-white/90"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="pt-24 pb-8 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-md mx-auto space-y-2">
                {/* 首页 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center py-4 px-6 rounded-2xl text-neutral-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-home text-white text-sm"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">首页</div>
                      <div className="text-sm text-neutral-500">返回主页</div>
                    </div>
                  </Link>
                </motion.div>

                {/* 产品分类 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-4"
                >
                  <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-2">
                    产品分类
                  </div>
                  <div className="space-y-1">
                    <Link to="/categories/dessert-table" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center py-3 px-4 rounded-xl text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <i className="fa-solid fa-cake-candles text-white text-xs"></i>
                      </div>
                      <span className="font-medium">甜品台</span>
                    </Link>
                    <Link to="/categories/business-tea" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center py-3 px-4 rounded-xl text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <i className="fa-solid fa-briefcase text-white text-xs"></i>
                      </div>
                      <span className="font-medium">商务茶歇</span>
                    </Link>
                    <Link to="/categories/baby-birthday" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center py-3 px-4 rounded-xl text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <i className="fa-solid fa-baby text-white text-xs"></i>
                      </div>
                      <span className="font-medium">宝宝生日宴</span>
                    </Link>
                    <Link to="/categories/wedding" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center py-3 px-4 rounded-xl text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <i className="fa-solid fa-heart text-white text-xs"></i>
                      </div>
                      <span className="font-medium">婚宴甜品台</span>
                    </Link>
                    <Link to="/categories/opening" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center py-3 px-4 rounded-xl text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <i className="fa-solid fa-ribbon text-white text-xs"></i>
                      </div>
                      <span className="font-medium">开业甜品台</span>
                    </Link>
                    <Link to="/categories/holiday" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center py-3 px-4 rounded-xl text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <i className="fa-solid fa-calendar-star text-white text-xs"></i>
                      </div>
                      <span className="font-medium">主题节日</span>
                    </Link>
                  </div>
                </motion.div>

                {/* 关于我们 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center py-4 px-6 rounded-2xl text-neutral-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-info-circle text-white text-sm"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">关于我们</div>
                      <div className="text-sm text-neutral-500">了解我们的故事</div>
                    </div>
                  </Link>
                </motion.div>

                {/* 联系方式 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center py-4 px-6 rounded-2xl text-neutral-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      <i className="fa-solid fa-phone text-white text-sm"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">联系方式</div>
                      <div className="text-sm text-neutral-500">与我们取得联系</div>
                    </div>
                  </Link>
                </motion.div>

                {/* CTA按钮 - 统一尺寸 */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6"
                >
                  <Link
                    to="/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center px-8 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <i className="fa-solid fa-calendar-check mr-2 text-sm"></i>
                    在线预订
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;