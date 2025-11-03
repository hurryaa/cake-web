import { Link } from "react-router-dom";
import { lazyLoadImage, formatPrice } from "@/lib/utils";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import { useParallax } from "@/hooks/useParallax";

// 婚礼甜品台产品数据
const products = [
  {
    id: 1,
    name: "浪漫经典甜品台",
    description: "融合传统与现代元素的经典婚礼甜品台，包含多层婚礼蛋糕和精致甜点。",
    priceRange: [2888, 4288],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=romantic%20wedding%20dessert%20table%20with%20white%20and%20gold%20decorations&sign=00b7c2ecdbf58c966717dcc3c28dade9"
    ],
    features: ["定制婚礼蛋糕", "马卡龙塔", "香槟杯甜点", "水果塔", "定制糖霜饼干"],
    suitableFor: "80-120人",
    popular: true
  },
  {
    id: 2,
    name: "奢华水晶甜品台",
    description: "采用水晶和镜面元素打造的奢华甜品台，搭配精致花艺，彰显高端品味。",
    priceRange: [3888, 5688],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=luxury%20wedding%20dessert%20table%20with%20crystal%20decorations&sign=5c22b3d23687faf26fdcb17eaf7134fc"
    ],
    features: ["水晶装饰蛋糕", "镜面展示架", "定制糖艺装饰", "香槟塔", "个性化甜品标签"],
    suitableFor: "120-200人",
    popular: true
  },
  {
    id: 3,
    name: "田园清新甜品台",
    description: "以自然元素为主的清新风格甜品台，适合户外或田园风格婚礼。",
    priceRange: [2288, 3688],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=rustic%20wedding%20dessert%20table%20with%20natural%20elements&sign=8b6c63623d323a82feb54c88da8236c7"
    ],
    features: ["鲜花装饰蛋糕", "木质展示架", "水果甜点", "手工饼干", "定制婚礼饼干"],
    suitableFor: "60-100人",
    popular: false
  }
];

// 案例展示数据
const caseStudies = [
  {
    id: 1,
    title: "教堂婚礼甜品台",
    description: "为传统教堂婚礼设计的典雅甜品台，融合宗教元素与现代甜点艺术。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=church%20wedding%20dessert%20table&sign=ea8908fdb397d5af57510a01a89dd431",
    style: "传统典雅",
    guests: "150人"
  },
  {
    id: 2,
    title: "海滩婚礼甜品台",
    description: "为海滩婚礼设计的清新风格甜品台，采用海洋元素和轻盈色调。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=beach%20wedding%20dessert%20table&sign=20ed6dea1e333e010e882231fcaf0018",
    style: "清新浪漫",
    guests: "100人"
  },
  {
    id: 3,
    title: "城堡婚礼甜品台",
    description: "为城堡婚礼设计的奢华甜品台，融合皇室元素和金色装饰。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=castle%20wedding%20dessert%20table&sign=fe250cc096e7fef5f02a039027f2b1e1",
    style: "奢华皇室",
    guests: "200人"
  }
];

// 婚礼甜品台优势
const advantages = [
  {
    icon: "fa-heart",
    title: "浪漫设计",
    description: "融合婚礼主题与甜品艺术，打造浪漫氛围，为您的特殊日子增添甜蜜回忆"
  },
  {
    icon: "fa-paintbrush",
    title: "定制服务",
    description: "根据婚礼主题、色彩和风格，提供个性化甜品台设计，彰显独特品味"
  },
  {
    icon: "fa-camera",
    title: "拍照亮点",
    description: "精心设计的甜品台成为婚礼拍照焦点，留下美好回忆"
  },
  {
    icon: "fa-truck",
    title: "专业配送",
    description: "专业团队现场布置，确保甜品新鲜美观，准时送达"
  },
  {
    icon: "fa-users",
    title: "贴心服务",
    description: "从设计到售后的全程贴心服务，让您无后顾之忧"
  },
  {
    icon: "fa-certificate",
    title: "品质保证",
    description: "选用优质原料，精湛工艺，确保甜品口感与美观兼具"
  }
];

export default function WeddingDessert() {
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
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=wedding%20dessert%20table%20with%20flowers%20and%20pastries&sign=fa8d47f9cdc83669be79067d0ccfbe22" 
              alt="婚礼甜品台" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            {/* 装饰元素 */}
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                婚礼<span className="font-medium">甜品台</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                为您的特殊日子打造浪漫精致的甜品台，留下甜蜜回忆
              </p>
              
              <div className="mt-8">
                <a 
                  href="#products"
                  className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  探索婚礼甜品台
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
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">婚礼甜品台系列</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              多种风格的婚礼甜品台选择，为您的特殊日子增添甜蜜与浪漫
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
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
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
                      <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                        热门选择
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-pink-600 font-bold">
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
                          <i className="fa-solid fa-check text-pink-500 mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                   <Link 
                    to="/booking"
                    className="block w-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-center font-medium py-2 rounded-lg transition-colors duration-300"
                  >
                    立即预订
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 婚礼甜品台优势 */}
      <section ref={advantagesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">婚礼甜品台优势</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              为您的婚礼提供专业甜品台服务，打造浪漫甜蜜的回忆
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
                <div className="w-14 h-14 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                  <i className={`fa-solid ${advantage.icon} text-pink-500 text-xl`}></i>
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
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">婚礼案例展示</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              我们为不同风格婚礼设计的甜品台案例，为您提供灵感
            </p>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={casesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {caseStudies.map((caseStudy) => (
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
                    <span className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded-full">
                      {caseStudy.style}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {caseStudy.guests}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {caseStudy.description}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-pink-600 font-medium hover:text-pink-700 text-sm group/link"
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
      
      {/* CTA区域 */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              为您的特殊日子增添甜蜜回忆
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              定制专属婚礼甜品台，让您的婚礼更加浪漫难忘
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/booking"
                className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md transform hover:scale-105"
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