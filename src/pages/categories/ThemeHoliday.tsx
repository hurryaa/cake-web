import { lazyLoadImage, formatPrice } from "@/lib/utils";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import { useParallax } from "@/hooks/useParallax";

// 主题节日甜品台产品数据
const products = [
  {
    id: 1,
    name: "春节主题甜品台",
    description: "融合传统春节元素的主题甜品台，包含生肖造型甜点和节庆装饰，营造浓厚节日氛围。",
    priceRange: [1588, 2688],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=chinese%20new%20year%20dessert%20table%20with%20red%20and%20gold%20decorations&sign=2b29fc5dac82263f635e5b8754010f67"
    ],
    features: ["生肖造型甜点", "节庆主题蛋糕", "传统糕点组合", "定制糖艺装饰", "节日饮品"],
    suitableFor: "50-80人",
    popular: true
  },
  {
    id: 2,
    name: "中秋主题甜品台",
    description: "以月亮、兔子等中秋元素设计的甜品台，包含月饼、桂花糕等传统与创新结合的甜点。",
    priceRange: [1688, 2888],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=mid%20autumn%20festival%20dessert%20table%20with%20moon%20and%20rabbit%20elements&sign=f853911a0bf2021b2048109ee4a7bf2e"
    ],
    features: ["定制月饼组合", "兔子造型甜点", "桂花糕", "水果塔", "中秋主题装饰"],
    suitableFor: "50-100人",
    popular: true
  },
  {
    id: 3,
    name: "圣诞主题甜品台",
    description: "充满圣诞氛围的甜品台，包含圣诞树、姜饼人等经典元素，适合圣诞派对和节日庆祝。",
    priceRange: [1888, 3288],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=christmas%20dessert%20table%20with%20tree%20and%20gingerbread%20elements&sign=dbd864394e304e9d1d8b10e63b73a96a"
    ],
    features: ["圣诞树造型蛋糕", "姜饼人饼干", "圣诞主题马卡龙", "热红酒", "节日糖果"],
    suitableFor: "60-120人",
    popular: false
  },
  {
    id: 4,
    name: "新年主题甜品台",
    description: "迎接新年的主题甜品台，融合数字和烟花元素，象征新的开始和美好祝愿。",
    priceRange: [1688, 2988],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=new%20year%20dessert%20table%20with%20numbers%20and%20fireworks%20elements&sign=9167ac0b08c88657e2d8193fdefdb7d5"
    ],
    features: ["数字造型蛋糕", "烟花主题甜点", "新年马卡龙", "香槟塔", "定制祝福语饼干"],
    suitableFor: "80-150人",
    popular: false
  }
];

// 节日案例展示数据
const caseStudies = [
  {
    id: 1,
    title: "企业年会春节甜品台",
    description: "为某科技公司年会设计的春节主题甜品台，融合公司元素与传统春节装饰，营造欢乐氛围。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=corporate%20spring%20festival%20dessert%20table&sign=99542262364855fadba9bdcf74f8c973",
    holiday: "春节",
    scale: "200人活动"
  },
  {
    id: 2,
    title: "商场中秋主题活动",
    description: "为高端商场中秋促销活动设计的大型甜品台，吸引顾客驻足拍照，提升商场人气。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=shopping%20mall%20mid%20autumn%20dessert%20table&sign=a775f531f285e36eb7794e63f26ec862",
    holiday: "中秋节",
    scale: "商场公共区域展示"
  },
  {
    id: 3,
    title: "酒店圣诞主题下午茶",
    description: "为五星级酒店设计的圣诞主题下午茶甜品台，融合西方圣诞元素与东方口味偏好。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=hotel%20christmas%20afternoon%20tea%20dessert%20table&sign=74c981deb441c2af7b3e0264c4e4208f",
    holiday: "圣诞节",
    scale: "酒店大堂展示"
  }
];

// 节日甜品台优势
const advantages = [
  {
    icon: "fa-calendar",
    title: "节日氛围营造",
    description: "专业设计团队根据不同节日特点，打造符合节日氛围的甜品台，增强活动主题感"
  },
  {
    icon: "fa-palette",
    title: "主题定制设计",
    description: "可根据特定节日主题或企业品牌元素，定制独特甜品造型和展示方式"
  },
  {
    icon: "fa-camera",
    title: "拍照打卡亮点",
    description: "高颜值甜品台设计，成为活动亮点，激发宾客拍照分享，扩大活动影响力"
  },
  {
    icon: "fa-users",
    title: "人群吸引力",
    description: "精美甜品台能有效吸引人流，提升活动人气，适合商场、展会等公共场所"
  },
  {
    icon: "fa-lightbulb",
    title: "创意融合",
    description: "将传统节日元素与现代甜品艺术相结合，创造独特视觉和味觉体验"
  },
  {
    icon: "fa-hand-holding-heart",
    title: "定制服务",
    description: "提供从设计到现场布置的全程定制服务，满足不同客户的个性化需求"
  }
];

export default function ThemeHoliday() {
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
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=colorful%20holiday%20dessert%20table%20with%20festive%20decorations&sign=0d8af03c8003643795b5da778f1dd5b9" 
              alt="主题节日甜品台" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            {/* 装饰元素 */}
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                主题<span className="font-medium">节日甜品台</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                为各类节日庆典打造专属主题甜品台，增添节日氛围，创造难忘回忆
              </p>
              
              <div className="mt-8">
                <a 
                  href="#products"
                  className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  探索节日甜品台
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
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">节日甜品台系列</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              为不同节日定制的主题甜品台，融合节日元素与甜品艺术，打造独特节日体验
            </p>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                      <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                        热门选择
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-purple-600 font-bold">
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
                          <i className="fa-solid fa-check text-purple-500 mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a 
                    href="/booking"
                    className="block w-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-center font-medium py-2 rounded-lg transition-colors duration-300"
                  >
                    立即预订
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 节日甜品台优势 */}
      <section ref={advantagesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">节日甜品台优势</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              为节日活动增添亮点，打造独特视觉焦点，提升活动氛围与人气
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
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <i className={`fa-solid ${advantage.icon} text-purple-500 text-xl`}></i>
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
      
      {/* 节日案例展示区域 */}
      <section ref={casesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">节日案例展示</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              我们为不同节日和场合打造的主题甜品台案例，为您提供灵感
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
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                      {caseStudy.holiday}
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
                    className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 text-sm group/link"
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
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">节日甜品台定制流程</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              简单四步，为您的节日活动打造完美主题甜品台
            </p>
          </FadeInSection>
          
          <div className="max-w-4xl mx-auto relative">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-purple-200 -translate-y-1/2 z-0"></div>
            
            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
            >
              {/* 步骤1 */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">1</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">需求沟通</h4>
                <p className="text-gray-600 text-sm">
                  确定节日主题、活动规模和预算需求
                </p>
              </motion.div>
              
              {/* 步骤2 */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">2</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">方案设计</h4>
                <p className="text-gray-600 text-sm">
                  提供节日主题甜品台设计方案和效果图
                </p>
              </motion.div>
              
              {/* 步骤3 */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">3</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">确认制作</h4>
                <p className="text-gray-600 text-sm">
                  确认方案并支付定金，开始制作甜品
                </p>
              </motion.div>
              
              {/* 步骤4 */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">4</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">现场布置</h4>
                <p className="text-gray-600 text-sm">
                  活动当天准时配送并专业布置
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA区域 */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              为您的节日活动增添甜蜜亮点
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              定制专属节日主题甜品台，打造独特节日体验，让活动更加难忘
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/booking"
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md transform hover:scale-105"
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