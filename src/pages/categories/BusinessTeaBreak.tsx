import { lazyLoadImage, formatPrice } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FadeInSection from "@/components/FadeInSection";
import { useParallax } from "@/hooks/useParallax";

// 商务茶歇产品数据
const products = [
  {
    id: 1,
    name: "标准商务茶歇",
    description: "适合日常会议的标准茶歇组合，包含多种小点心和饮品。",
    priceRange: [58, 78],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=standard%20business%20afternoon%20tea%20setup&sign=1408b6168dc8827a06dc5dfe4d18c881"
    ],
    features: ["3种点心", "2种饮品", "水果拼盘", "独立包装"],
    suitableFor: "10-30人",
    popular: true
  },
  {
    id: 2,
    name: "高级商务茶歇",
    description: "为重要会议和客户接待设计的高端茶歇，提供更多精致甜点选择。",
    priceRange: [88, 108],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=premium%20business%20afternoon%20tea%20setup&sign=8668e687b9284046797a8d847eaa00be"
    ],
    features: ["5种点心", "3种饮品", "精致水果", "定制摆盘"],
    suitableFor: "10-50人",
    popular: true
  },
  {
    id: 3,
    name: "定制商务茶歇",
    description: "根据企业需求完全定制的茶歇方案，可融入企业品牌元素和特色。",
    priceRange: [108, 128],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=custom%20business%20afternoon%20tea%20setup&sign=0aeced441b8762f6af5adbc8cff41086"
    ],
    features: ["定制点心", "品牌元素", "专属服务", "高端包装"],
    suitableFor: "按需定制",
    popular: false
  }
];

// 案例展示数据
const caseStudies = [
  {
    id: 1,
    title: "季度会议茶歇",
    description: "为某金融公司季度会议提供的标准商务茶歇，服务50人，获得客户一致好评。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=quarterly%20meeting%20business%20tea%20break&sign=0ff01ab5465f25c10bb0416744fbce7b",
    client: "某金融公司",
    eventType: "季度会议"
  },
  {
    id: 2,
    title: "客户接待茶歇",
    description: "为某科技公司重要客户接待设计的高级商务茶歇，融入企业VI元素，提升品牌形象。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=client%20reception%20business%20tea%20break&sign=8d6409a8310395e1f57ab5816d05e104",
    client: "某科技公司",
    eventType: "客户接待"
  },
  {
    id: 3,
    title: "年会茶歇服务",
    description: "为200人大型年会提供的定制化茶歇服务，分时段配送，确保点心新鲜。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=annual%20meeting%20business%20tea%20break&sign=4bf35fef8d20730f117761702b6b791a",
    client: "某跨国企业",
    eventType: "公司年会"
  }
];

// 服务优势数据
const advantages = [
  {
    icon: "fa-clock",
    title: "准时配送",
    description: "专业配送团队确保茶歇准时送达，不耽误会议进程"
  },
  {
    icon: "fa-apple-whole",
    title: "新鲜健康",
    description: "当天制作，选用优质原料，提供健康美味的茶歇体验"
  },
  {
    icon: "fa-boxes-stacked",
    title: "独立包装",
    description: "采用独立包装设计，卫生便捷，适合办公环境使用"
  },
  {
    icon: "fa-pen-to-square",
    title: "定制服务",
    description: "根据企业需求定制茶歇内容，可融入品牌元素和VI设计"
  },
  {
    icon: "fa-utensils",
    title: "多样选择",
    description: "提供多种口味和组合选择，满足不同人群需求"
  },
  {
    icon: "fa-truck-fast",
    title: "专业布置",
    description: "提供现场布置服务，打造专业美观的茶歇区域"
  }
];

export default function BusinessTeaBreak() {
  // 视差效果和引用
  const { ref: heroRef, style: heroStyle } = useParallax(5);
  const productsRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);
  
  const productsInView = useInView(productsRef, { once: true, margin: "-10% 0px" });
  const advantagesInView = useInView(advantagesRef, { once: true, margin: "-10% 0px" });
  const casesInView = useInView(casesRef, { once: true, margin: "-10% 0px" });
  
  // 动画变体
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
  };
  
  const staggerChildren = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };
  
  return (
    <div className="scroll-smooth">
      {/* 页面标题区域 */}
      <div ref={heroRef} style={heroStyle}>
        <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=business%20afternoon%20tea%20setup%20with%20pastries%20and%20coffee%20elegant%20corporate%20style&sign=2bf838c0c7e380f3af6b0b6f7bf7a7bb" 
              alt="商务茶歇" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            {/* 装饰元素 */}
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                商务<span className="font-medium">茶歇</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                为您的商务活动提供精致美味的茶歇解决方案，提升会议体验
              </p>
              
              <div className="mt-8">
                <a 
                  href="#products"
                  className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  探索茶歇套餐
                  <i className="fa-solid fa-arrow-down ml-2"></i>
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* 滚动指示器 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-center"
          >
            <p className="mb-2 text-xs tracking-wider">向下滚动探索更多</p>
            <i className="fa-solid fa-chevron-down text-xs"></i>
          </motion.div>
        </section>
      </div>
      
      {/* 产品展示区域 */}
      <section id="products" ref={productsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">商务茶歇系列</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              为不同规模和场合的商务活动提供专业茶歇服务，提升会议体验
            </p>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
              >
                <div className="h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: product.images[0],
                    alt: product.name,
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  })} />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    {product.popular && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                        热门选择
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-800 font-bold">
                      {formatPrice(product.priceRange[0])} - {formatPrice(product.priceRange[1])} <span className="text-gray-500 font-normal">/人</span>
                    </span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {product.suitableFor}
                    </span>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">包含：</h4>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <i className="fa-solid fa-check text-blue-500 mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a 
                    href="/booking"
                    className="block w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-center font-medium py-2 rounded-lg transition-colors duration-300"
                  >
                    立即预订
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 服务优势区域 */}
      <section ref={advantagesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">商务茶歇服务优势</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              我们提供专业的商务茶歇解决方案，为您的会议增添品质与效率
            </p>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={advantagesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {advantages.map((advantage, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <i className={`fa-solid ${advantage.icon} text-blue-600 text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 案例展示区域 */}
      <section ref={casesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">案例展示</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              我们为众多企业提供过专业的商务茶歇服务，获得一致好评
            </p>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={casesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {caseStudies.map((caseStudy, index) => (
              <motion.div 
                key={caseStudy.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
              >
                <div className="h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: caseStudy.image,
                    alt: caseStudy.title,
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  })} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{caseStudy.title}</h3>
                  <div className="flex gap-3 mb-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {caseStudy.client}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {caseStudy.eventType}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {caseStudy.description}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 text-sm group/link"
                  >
                    查看详情
                    <i className="fa-solid fa-arrow-right ml-2 text-xs transition-transform group-hover/link:translate-x-1"></i>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 订购流程区域 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">简单三步，轻松订购</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              我们简化了商务茶歇的订购流程，让您专注于重要的会议和工作
            </p>
          </FadeInSection>
          
          <div className="max-w-4xl mx-auto relative">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-blue-200 -translate-y-1/2 z-0"></div>
            
            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
            >
              {/* 步骤1 */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">1</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">选择套餐</h4>
                <p className="text-gray-600 text-sm">
                  根据会议规模和预算选择合适的茶歇套餐
                </p>
              </motion.div>
              
              {/* 步骤2 */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">2</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">确认信息</h4>
                <p className="text-gray-600 text-sm">
                  填写配送时间、地点和特殊需求等信息
                </p>
              </motion.div>
              
              {/* 步骤3 */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">3</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">准时送达</h4>
                <p className="text-gray-600 text-sm">
                  我们按时配送并提供专业布置服务
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA区域 */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              提升您的商务会议体验
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              为您的团队和客户提供精致美味的商务茶歇，展现专业企业形象
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/booking"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md transform hover:scale-105"
              >
                立即预订
              </a>
              <a 
                href="/contact"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300"
              >
                咨询详情
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}