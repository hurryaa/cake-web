import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AuthContext } from '@/contexts/authContext';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import NotificationCenter, { useNotifications } from "@/components/NotificationCenter";
import LoadingSpinner from "@/components/LoadingSpinner";

// 页面导入
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";
import About from "@/pages/About";

// 分类页面导入
import DessertTable from "@/pages/categories/DessertTable";
import BusinessTeaBreak from "@/pages/categories/BusinessTeaBreak";
import BabyBirthday from "@/pages/categories/BabyBirthday";
import WeddingDessert from "@/pages/categories/WeddingDessert";
import ThemeHoliday from "@/pages/categories/ThemeHoliday";
import OpeningDessert from "@/pages/categories/OpeningDessert";

// 布局组件 - 包含Header和Footer
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

export default function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  const logout = () => {
    setIsAuthenticated(false);
    addNotification({
      type: 'success',
      title: '退出成功',
      message: '您已成功退出登录',
      duration: 3000
    });
  };

  // 页面切换时滚动到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // 欢迎通知（仅首次访问）
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        addNotification({
          type: 'info',
          title: '欢迎来到 SweetDelights',
          message: '探索我们精致的甜品服务，为您的特殊时刻增添甜蜜',
          duration: 5000,
          action: {
            label: '立即预订',
            onClick: () => window.location.href = '/booking'
          }
        });
        localStorage.setItem('hasVisited', 'true');
      }, 2000);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><Home /></Layout>
                  </motion.div>
                } 
              />

              <Route 
                path="/contact" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><Contact /></Layout>
                  </motion.div>
                } 
              />
              
              <Route 
                path="/booking" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><Booking /></Layout>
                  </motion.div>
                } 
              />
              
              <Route 
                path="/about" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><About /></Layout>
                  </motion.div>
                } 
              />
              
              {/* 分类页面路由 */}
              <Route 
                path="/categories/dessert-table" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><DessertTable /></Layout>
                  </motion.div>
                } 
              />
              
              <Route 
                path="/categories/business-tea" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><BusinessTeaBreak /></Layout>
                  </motion.div>
                } 
              />
              
              <Route 
                path="/categories/baby-birthday" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><BabyBirthday /></Layout>
                  </motion.div>
                } 
              />
              
              <Route 
                path="/categories/wedding" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><WeddingDessert /></Layout>
                  </motion.div>
                } 
              />

              <Route 
                path="/categories/holiday" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><ThemeHoliday /></Layout>
                  </motion.div>
                } 
              />
              
              <Route 
                path="/categories/opening" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout><OpeningDessert /></Layout>
                  </motion.div>
                } 
              />
              
              {/* 404页面 */}
              <Route 
                path="*" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Layout>
                      <div className="text-center py-20 bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">页面未找到</h2>
                        <p className="text-gray-600 mb-6">抱歉，您访问的页面不存在</p>
                        <a href="/" className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-300">
                          返回首页
                        </a>
                      </div>
                    </Layout>
                  </motion.div>
                } 
              />
            </Routes>
          </AnimatePresence>

          {/* 浮动操作按钮 */}
          <FloatingActionButton />

          {/* 通知中心 */}
          <NotificationCenter
            notifications={notifications}
            onRemove={removeNotification}
          />
    </AuthContext.Provider>
  );
}
