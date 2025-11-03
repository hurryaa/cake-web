import Banner from "@/components/Banner";
import { getPopularProducts, getSeasonalProducts } from "@/data/products";
import { useRef } from "react";
import { motion, useInView, useAnimation, useEffect } from "framer-motion";
import { lazyLoadImage, formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import InteractiveBackground from "@/components/InteractiveBackground";
import MagneticButton from "@/components/MagneticButton";


export default function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const popularProducts = getPopularProducts();
  const seasonalProducts = getSeasonalProducts();
  
  // 首页Banner图片
  const bannerImage = "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=colorful%20dessert%20display%20with%20macarons%20cupcakes%20and%20pastries%20in%20pastel%20colors&sign=8cca87149850dd7ef66a8b5169c2b2df";
  
  return (
    <div className="scroll-smooth">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
      <Banner
        title="甜蜜时刻，从这里开始"
        subtitle="为您的特殊场合打造精致美味的甜品体验"
        ctaText="立即预订"
        ctaLink="/booking"
        imageUrl={bannerImage}
      />
      
      </motion.div>
      {/* 特色分类区域 - 毛玻璃效果 */}
      <InteractiveBackground className="py-20 relative">
        {/* 毛玻璃背景 */}
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-neutral-50/80 via-primary-50/30 to-secondary-50/30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-800 mb-6">
              我们的特色服务
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-base leading-relaxed">
              为各种场合提供专业的甜品解决方案，从精致的商务茶歇到盛大的婚礼甜品台，每一款产品都融合了匠心工艺与艺术美感
            </p>
          </motion.div>          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 甜品台 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-neutral-200 group-hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=assorted%20dessert%20table%20with%20various%20pastries&sign=709f4faabebcf62ee9ab68f727258268",
                    alt: "甜品台展示",
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  })} />

                  {/* 简洁的图标标识 */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-cake-candles text-primary-500 text-sm"></i>
                  </div>

                  {/* 悬浮信息层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="bg-white/95 backdrop-blur-sm text-neutral-900 text-sm font-medium px-4 py-2 rounded-full inline-flex items-center shadow-sm">
                        <i className="fa-solid fa-users mr-2 text-primary-500"></i>
                        适合20-50人
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    甜品台
                  </h3>
                  <p className="text-neutral-600 mb-5 text-sm leading-relaxed">
                    多种精致甜点的完美组合，为您的活动增添甜蜜氛围
                  </p>
                  <Link
                    to="/categories/dessert-table"
                    className="inline-flex items-center bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    了解更多
                    <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* 商务茶歇 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-neutral-200 group-hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=business%20afternoon%20tea%20setup%20with%20pastries%20and%20drinks&sign=46e949f0128512be24149958d88dee57",
                    alt: "商务茶歇展示",
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  })} />

                  {/* 简洁的图标标识 */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-briefcase text-primary-500 text-sm"></i>
                  </div>

                  {/* 悬浮信息层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="bg-white/95 backdrop-blur-sm text-neutral-900 text-sm font-medium px-4 py-2 rounded-full inline-flex items-center shadow-sm">
                        <i className="fa-solid fa-clock mr-2 text-primary-500"></i>
                        商务专用
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    商务茶歇
                  </h3>
                  <p className="text-neutral-600 mb-5 text-sm leading-relaxed">
                    为商务会议和办公场合提供精致便捷的茶歇解决方案
                  </p>
                  <Link
                    to="/categories/business-tea"
                    className="inline-flex items-center bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    了解更多
                    <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* 宝宝生日宴甜品台 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-neutral-200 group-hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=children%20birthday%20dessert%20table%20with%20cartoon%20themes&sign=c09425d6c72ec89fa7d8340160341675",
                    alt: "宝宝生日宴甜品台展示",
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  })} />

                  {/* 简洁的图标标识 */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-baby text-primary-500 text-sm"></i>
                  </div>

                  {/* 悬浮信息层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="bg-white/95 backdrop-blur-sm text-neutral-900 text-sm font-medium px-4 py-2 rounded-full inline-flex items-center shadow-sm">
                        <i className="fa-solid fa-heart mr-2 text-primary-500"></i>
                        儿童专属
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    宝宝生日宴甜品台
                  </h3>
                  <p className="text-neutral-600 mb-5 text-sm leading-relaxed">
                    可爱有趣的主题设计，为宝宝的特殊日子增添欢乐氛围
                  </p>
                  <Link
                    to="/categories/baby-birthday"
                    className="inline-flex items-center bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    了解更多
                    <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* 婚宴甜品台 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-neutral-200 group-hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=elegant%20wedding%20dessert%20table%20with%20flowers&sign=42e8386f7abe466b62adc1d2420ed5b6",
                    alt: "婚宴甜品台展示",
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  })} />

                  {/* 简洁的图标标识 */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-rings-wedding text-primary-500 text-sm"></i>
                  </div>

                  {/* 悬浮信息层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="bg-white/95 backdrop-blur-sm text-neutral-900 text-sm font-medium px-4 py-2 rounded-full inline-flex items-center shadow-sm">
                        <i className="fa-solid fa-heart mr-2 text-primary-500"></i>
                        浪漫婚礼
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    婚宴甜品台
                  </h3>
                  <p className="text-neutral-600 mb-5 text-sm leading-relaxed">
                    浪漫优雅的设计，为您的婚礼增添甜蜜回忆
                  </p>
                  <Link
                    to="/categories/wedding"
                    className="inline-flex items-center bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    了解更多
                    <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* 开业甜品台 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-neutral-200 group-hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=grand%20opening%20dessert%20table%20with%20celebration%20decorations&sign=e40a3110534a578904308bd43d39d97c",
                    alt: "开业甜品台展示",
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  })} />

                  {/* 简洁的图标标识 */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-ribbon text-primary-500 text-sm"></i>
                  </div>

                  {/* 悬浮信息层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="bg-white/95 backdrop-blur-sm text-neutral-900 text-sm font-medium px-4 py-2 rounded-full inline-flex items-center shadow-sm">
                        <i className="fa-solid fa-star mr-2 text-primary-500"></i>
                        开业庆典
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    开业甜品台
                  </h3>
                  <p className="text-neutral-600 mb-5 text-sm leading-relaxed">
                    为您的开业庆典打造引人注目的甜品展示，留下深刻印象
                  </p>
                  <Link
                    to="/categories/opening"
                    className="inline-flex items-center bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    了解更多
                    <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* 主题节日甜品台 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-neutral-200 group-hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=holiday%20theme%20dessert%20table%20with%20festive%20decorations&sign=ba80dcfa6edbd704a2186f9322a6c5bc",
                    alt: "主题节日甜品台展示",
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  })} />

                  {/* 简洁的图标标识 */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-calendar-days text-primary-500 text-sm"></i>
                  </div>

                  {/* 悬浮信息层 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="bg-white/95 backdrop-blur-sm text-neutral-900 text-sm font-medium px-4 py-2 rounded-full inline-flex items-center shadow-sm">
                        <i className="fa-solid fa-sparkles mr-2 text-primary-500"></i>
                        节日主题
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    主题节日甜品台
                  </h3>
                  <p className="text-neutral-600 mb-5 text-sm leading-relaxed">
                    结合节日主题的创意甜品设计，为您的庆祝活动增添特色
                  </p>
                  <Link
                    to="/categories/holiday"
                    className="inline-flex items-center bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    了解更多
                    <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </motion.div>
           </div>
         </div>
       </InteractiveBackground>
      
      {/* 热门产品区域 - 高级感设计 */}
       <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-6">
                热门产品
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed">
                精选最受欢迎的甜品组合，为您的活动提供完美选择
              </p>
            </div>
            <Link
              to="/categories/dessert-table"
              className="hidden md:inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium px-8 py-3 rounded-full mt-6 md:mt-0 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              查看全部
              <i className="fa-solid fa-arrow-right ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-neutral-100 hover:border-neutral-200 h-full group-hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    <img {...lazyLoadImage({
                      src: product.images[0],
                      alt: product.name,
                      className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    })} />

                    {/* 简洁的价格标签 */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      热门
                    </div>

                    {/* 悬浮信息层 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full">
                        <div className="bg-white/95 backdrop-blur-sm text-neutral-900 text-sm font-medium px-4 py-2 rounded-full inline-flex items-center shadow-sm">
                          <i className="fa-solid fa-users mr-2 text-primary-500"></i>
                          适合20-50人
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-neutral-600 mb-6 text-sm line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xs font-medium text-neutral-500 mb-3 uppercase tracking-wider">
                        包含特色
                      </h4>
                      <ul className="space-y-2">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-neutral-700">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                      <span className="text-primary-600 font-bold text-xl">
                        {formatPrice(product.priceRange[0])} 起
                      </span>
                      <Link
                        to={`/categories/${product.category === '甜品台' ? 'dessert-table' :
                          product.category === '商务茶歇' ? 'business-tea' :
                          product.category === '宝宝生日宴甜品台' ? 'baby-birthday' :
                          product.category === '婚宴甜品台' ? 'wedding' :
                          product.category === '开业甜品台' ? 'opening' : 'holiday'}`}
                        className="bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                      >
                        查看详情
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/categories/dessert-table"
              className="inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              查看全部产品
              <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </Link>
          </div>
        </div>
      </section>
      
      {/* 季节限定区域 */}
       {seasonalProducts.length > 0 && (
        <section className="py-20 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-xs font-medium mb-6">
                  季节限定
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-800 mb-6">
                  {seasonalProducts[0].name}
                </h2>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  {seasonalProducts[0].description}
                </p>
                <ul className="space-y-4 mb-8">
                  {seasonalProducts[0].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fa-solid fa-check text-gray-500 mr-3 mt-1"></i>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/booking"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300"
                  >
                    立即预订
                  </Link>
                  <Link 
                    to={`/categories/${seasonalProducts[0].category === '主题节日甜品台' ? 'holiday' : 'dessert-table'}`}
                    className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300"
                  >
                    了解更多
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="relative z-10 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <img {...lazyLoadImage({
                      src: seasonalProducts[0].images[0],
                      alt: seasonalProducts[0].name,
                      className: "w-full h-auto"
                    })} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* 客户评价区域 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-800 mb-6">客户的甜蜜反馈</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-base leading-relaxed">
              听听我们的客户如何评价他们的甜品体验，每一条反馈都是我们前进的动力
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 评价卡片 1 */}
            <div ref={sliderRef} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-6">
                <div className="text-yellow-400 flex">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic text-sm leading-relaxed">
                "婚礼甜品台超出了我们的期望，不仅美观精致，味道也非常棒。所有宾客都赞不绝口，成为了婚礼上的一大亮点！"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden mr-4">
                  <img src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=bride%20portrait%20avatar&sign=4339e79a43d3bb38c88a116c37fb55a1" alt="客户头像" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">张小姐</h4>
                  <p className="text-gray-500 text-xs">婚礼客户</p>
                </div>
              </div>
            </div>
            
            {/* 评价卡片 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-6">
                <div className="text-yellow-400 flex">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic text-sm leading-relaxed">
                "公司开业活动选择了SweetDelights的甜品台，设计专业且符合我们的品牌形象，甜品新鲜美味，服务也非常周到。"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden mr-4">
                  <img src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=businessman%20avatar&sign=094191c5bbb4d27e64765f7f8fbc8125" alt="客户头像" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">李先生</h4>
                  <p className="text-gray-500 text-xs">企业客户</p>
                </div>
              </div>
            </div>
            
            {/* 评价卡片 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-6">
                <div className="text-yellow-400 flex">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic text-sm leading-relaxed">
                "为女儿的生日派对定制了主题甜品台，设计可爱又精致，孩子们非常喜欢。工作人员还提供了专业的摆放建议，非常贴心。"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden mr-4">
                  <img src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=mother%20avatar&sign=c3b1eebbe67ae0f2fb631d241e39e0f9" alt="客户头像" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">王女士</h4>
                  <p className="text-gray-500 text-xs">生日宴客户</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 预订CTA区域 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-800 mb-6">准备好为您的活动增添甜蜜了吗？</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-10 text-base leading-relaxed">
            联系我们，让我们一起打造令人难忘的甜品体验，每一款产品都融合匠心工艺与艺术美感
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/booking"
              className="btn-shimmer bg-white text-neutral-800 hover:bg-neutral-50 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-soft hover:shadow-md transform hover:scale-105"
            >
              立即在线预订
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white/30 text-neutral-800 hover:bg-white/10 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm"
            >
              联系我们
            </Link>
          </div>
        </div>
      </section>
    
    </div>
  );
}