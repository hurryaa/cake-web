import { lazyLoadImage, formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import { useParallax } from "@/hooks/useParallax";

// 开业甜品台产品数据
const products = [
  {
    id: 1,
    name: "经典开业甜品台",
    description: "适合中小型开业活动的经典甜品台组合，包含多种精致点心和饮品。",
    priceRange: [1888, 2688],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=grand%20opening%20dessert%20table%20with%20red%20and%20gold%20decorations&sign=4f0b0ad79d46212681994ec25d789b15"
    ],
    features: ["定制企业LOGO", "多层蛋糕塔", "马卡龙塔", "开业主题饼干", "水果拼盘"],
    suitableFor: "50-80人",
    popular: true
  },
  {
    id: 2,
    name: "豪华开业甜品台",
    description: "为高端开业庆典设计的豪华甜品台，包含定制大型蛋糕和多样精致甜点。",
    priceRange: [2888, 4288],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=luxury%20opening%20dessert%20table%20with%20tiered%20cake&sign=7a332453c838cf80195a77857a562f43"
    ],
    features: ["定制大型庆典蛋糕", "品牌主题设计", "高端甜点组合", "水晶装饰", "定制糖艺摆件"],
    suitableFor: "80-150人",
    popular: true
  },
  {
    id: 3,
    name: "简约开业甜品台",
    description: "适合小型开业活动或门店日常展示的简约风格甜品台。",
    priceRange: [1288, 1888],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=minimalist%20opening%20dessert%20table%20design&sign=b22dc1f74dbaa0c9068579609ffe514b"
    ],
    features: ["简约设计风格", "精选甜点组合", "可重复使用展示架", "企业色定制"],
    suitableFor: "30-50人",
    popular: false
  }
];

// 案例展示数据
const caseStudies = [
  {
    id: 1,
    title: "高端商场开业",
    description: "为奢侈品商场开业设计的豪华甜品台，融合金色与品牌元素，彰显高端定位。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=luxury%20mall%20opening%20dessert%20display&sign=e27fd47c654fa1fd31f5869af3b4865d",
    businessType: "高端零售",
    scale: "200人活动"
  },
  {
    id: 2,
    title: "科技公司开业",
    description: "为科技创业公司开业设计的现代风格甜品台，融入公司产品元素和未来感设计。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=tech%20company%20opening%20dessert%20table&sign=7a2d06f16560f21130cd67e1011bb769",
    businessType: "科技企业",
    scale: "100人活动"
  },
  {
    id: 3,
    title: "连锁餐厅开业",
    description: "为连锁餐厅开业设计的主题甜品台，融入餐厅特色美食元素和品牌色调。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=restaurant%20opening%20dessert%20table&sign=c9b1aff4582e4c144230c468b1529be6",
    businessType: "餐饮行业",
    scale: "150人活动"
  }
];

// 开业甜品台优势
const advantages = [
  {
    icon: "fa-trophy",
    title: "提升品牌形象",
    description: "精致的甜品台展示能有效提升企业开业活动档次，给宾客留下深刻印象"
  },
  {
    icon: "fa-users",
    title: "促进人际互动",
    description: "甜品台成为活动焦点，促进宾客交流，营造轻松愉快的氛围"
  },
  {
    icon: "fa-camera",
    title: "社交媒体传播",
    description: "高颜值甜品台设计，激发宾客拍照分享，扩大品牌社交传播"
  },
  {
    icon: "fa-percent",
    title: "高性价比",
    description: "相比传统餐饮，甜品台单位成本更低，视觉效果更佳"
  },
  {
    icon: "fa-clock",
    title: "持久展示",
    description: "可长时间展示不影响品质，适合全天开业活动"
  },
  {
    icon: "fa-pencil",
    title: "品牌定制",
    description: "可定制企业LOGO和品牌元素，强化品牌传播"
  }
];

export default function OpeningDessert() {
  const [openIndex, setOpenIndex] = useState(-1);
  
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
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=grand%20opening%20celebration%20with%20dessert%20table&sign=b9cea2d6880773a29947f770d193f42c" 
              alt="开业甜品台" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            {/* 装饰元素 */}
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                开业<span className="font-medium">甜品台</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                为您的开业庆典打造令人印象深刻的甜品展示，提升品牌形象
              </p>
              
              <div className="mt-8">
                <a 
                  href="#products"
                  className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  探索开业甜品台
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
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">开业甜品台系列</h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              多种档次的开业甜品台选择，满足不同规模和风格的开业活动需求
            </p>
          </FadeInSection>
          
           <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
              >
                <div className="h-56 overflow-hidden flex-shrink-0">
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
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        热门选择
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm flex-grow">
                    {product.description}
                  </p>
                  <div className="mb-6 flex-shrink-0">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-red-600 font-bold">
                        {formatPrice(product.priceRange[0])} - {formatPrice(product.priceRange[1])}
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
                            <i className="fa-solid fa-check text-red-500 mr-2 text-xs"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 mt-auto">
                       <Link
                         to="/booking"
                        className="block w-full bg-red-50 hover:bg-red-100 text-red-700 text-center font-medium py-2 rounded-lg transition-colors duration-300"
                      >
                        立即预订
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 开业甜品台优势 */}
      <section ref={advantagesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">开业甜品台优势</h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              为您的开业活动打造令人印象深刻的甜品展示，提升品牌形象
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
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <i className={`fa-solid ${advantage.icon} text-red-500 text-xl`}></i>
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
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">开业案例展示</h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              我们为各行业客户打造的成功开业甜品台案例，提供灵感参考
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
                    <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">
                      {caseStudy.businessType}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {caseStudy.scale}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {caseStudy.description}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-red-600 font-medium hover:text-red-700 text-sm group/link"
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
      
      {/* 定制流程区域 */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              打造令人难忘的开业庆典
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              定制专属开业甜品台，为您的品牌增添亮点，给宾客留下深刻印象
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/booking"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md transform hover:scale-105"
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