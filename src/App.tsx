import type { ComponentType, ReactNode } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "@/contexts/authContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/ui/FloatingActions";
import NotificationCenter, { useNotifications } from "@/components/NotificationCenter";

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
import NotFound from "@/pages/NotFound";

// 基础布局组件
const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-grow bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {children}
    </main>
    <Footer />
  </div>
);

// 页面过渡动画组件
const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
    className="min-h-full"
  >
    {children}
  </motion.div>
);

// 路由配置类型
type AppRoute = {
  path: string;
  component: ComponentType;
  withLayout?: boolean;
};

// 路由配置表
const ROUTES: AppRoute[] = [
  { path: "/", component: Home },
  { path: "/contact", component: Contact },
  { path: "/booking", component: Booking },
  { path: "/about", component: About },
  { path: "/categories/dessert-table", component: DessertTable },
  { path: "/categories/business-tea", component: BusinessTeaBreak },
  { path: "/categories/baby-birthday", component: BabyBirthday },
  { path: "/categories/wedding", component: WeddingDessert },
  { path: "/categories/holiday", component: ThemeHoliday },
  { path: "/categories/opening", component: OpeningDessert },
  { path: "*", component: NotFound },
];

export default function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  const logout = () => {
    setIsAuthenticated(false);
    addNotification({
      type: "success",
      title: "退出成功",
      message: "您已成功退出登录",
      duration: 3000,
    });
  };

  // 页面切换滚动至顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // 首次访问欢迎通知
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      const timer = setTimeout(() => {
        addNotification({
          type: "info",
          title: "欢迎来到 SweetDelights",
          message: "探索我们精致的甜品服务，为您的特殊时刻增添甜蜜",
          duration: 5000,
          action: {
            label: "立即预订",
            onClick: () => {
              window.location.href = "/booking";
            },
          },
        });
        localStorage.setItem("hasVisited", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [addNotification]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {ROUTES.map(({ path, component: Component, withLayout = true }) => {
            const content = withLayout ? (
              <Layout>
                <Component />
              </Layout>
            ) : (
              <Component />
            );

            return (
              <Route
                key={path}
                path={path}
                element={<PageTransition>{content}</PageTransition>}
              />
            );
          })}
        </Routes>
      </AnimatePresence>

      <FloatingActions />

      <NotificationCenter notifications={notifications} onRemove={removeNotification} />
    </AuthContext.Provider>
  );
}
