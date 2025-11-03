import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getProductsByCategory } from "@/data/products";
import { useParallax } from "@/hooks/useParallax";
import { lazyLoadImage, formatPrice } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

export default function DessertTable() {
  // 价格范围状态
  const [priceRange, setPriceRange] = useState([800, 2000]);
  const { ref: parallaxRef, style: parallaxStyle } = useParallax(8);
  const [openIndex, setOpenIndex] = useState(-1);
  // 获取甜品台分类下的产品
  const products = getProductsByCategory("甜品台");
  
  // 引用和视图检测
  const productsRef = useRef<HTMLDivElement>(null);
  const productsInView = useInView(productsRef, { once: true, margin: "-10% 0px" });
  
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
  
  // 案例展示数据
  const caseStudies = [
    {
      id: 1,
      title: "生日派对甜品台",
      description: "为30人生日派对设计的粉色主题甜品台，包含多种精致甜点和定制蛋糕。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=birthday%20party%20dessert%20table%20pink%20theme&sign=0ad3343c44986a7f7e9d5035bc1e1e35",
      client: "张女士",
      eventType: "生日派对"
    },
    {
      id: 2,
      title: "公司年会甜品台",
      description: "为100人公司年会设计的商务风格甜品台，融合企业VI色彩，提供多样化甜点选择。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=corporate%20annual%20dinner%20dessert%20table&sign=b216d4b6f9acf4141813c25d6c6f7c5a",
      client: "某科技公司",
      eventType: "公司年会"
    },
    {
      id: 3,
      title: "朋友聚会甜品台",
      description: "为20人朋友聚会设计的休闲风格甜品台，提供多种小份甜点，方便分享品尝。",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=friends%20gathering%20dessert%20table&sign=ad2895a8e38773fe21b10910bd1015c8",
      client: "李先生",
      eventType: "朋友聚会"
    }
  ];
  
  return (
    <div className="scroll-smooth bg-gray-50">
       {/* 页面标题区域 */}
       <div ref={parallaxRef} style={parallaxStyle}>
       <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-md-primary/10 to-md-secondary/10 z-0"></div>
       <div className="absolute inset-0 z-0">
         <img 
           src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=assorted%20dessert%20table%20display%20with%20macarons%20cupcakes%20and%20pastries%20in%20pastel%20colors&sign=2799f9fa6cdd9cbef98debc0f0834fab" 
           alt="精美甜品台展示" 
           className="w-full h-full object-cover transform scale-105"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
         
         {/* 装饰元素 */}
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
       </div>
       
       <div className="container mx-auto px-4 relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
         >
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
             精致<span className="font-medium">甜品台</span>
           </h1>
           <p className="text-white/90 text-lg md:text-xl max-w-2xl">
             为各类活动打造的精致甜品组合，让每一刻都充满甜蜜与惊喜
           </p>
           
           <div className="mt-8">
             <a 
               href="#products"
               className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg transform hover:scale-105"
             >
               探索甜品台系列
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
      <section id="products" ref={productsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">甜品台系列</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              精选最受欢迎的甜品组合，为您的活动提供完美选择，每一款产品都融合了匠心工艺与艺术美感
            </p>
          </FadeInSection>
          
           {/* 价格区间滑块 */}
          <FadeInSection delay={0.3} className="mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">价格范围: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</h3>
              <input
                type="range"
                min="800"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([800, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>¥800</span>
                <span>¥5000+</span>
              </div>
            </div>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-60 overflow-hidden relative group">
                  <img {...lazyLoadImage({
                    src: product.images[0],
                    alt: product.name,
                    className: "w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                  })} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-between items-center">
                        <span className="bg-white/90 text-gray-900 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                          适合20-50人
                        </span>
                        <span className="text-white/90 text-sm font-medium">
                          {formatPrice(product.priceRange[0])} 起
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">包含</h4>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <i className="fa-solid fa-check text-amber-500 mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                   <Link 
                    to="/booking"
                    className="block w-full bg-amber-50 hover:bg-amber-100 text-amber-700 text-center font-medium py-2.5 rounded-lg transition-colors duration-300"
                  >
                    立即预订
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 服务内容说明 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">我们的服务内容</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              精选最受欢迎的甜品组合，为您的活动提供完美选择，每一款产品都融合了匠心工艺与艺术美感
            </p>
          </div>
          
           {/* 价格区间滑块 */}
          <FadeInSection delay={0.3} className="mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">价格范围: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</h3>
              <input
                type="range"
                min="800"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([800, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>¥800</span>
                <span>¥5000+</span>
              </div>
            </div>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-60 overflow-hidden relative group">
                  <img {...lazyLoadImage({
                    src: product.images[0],
                    alt: product.name,
                    className: "w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                  })} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex justify-between items-center">
                        <span className="bg-white/90 text-gray-900 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                          适合20-50人
                        </span>
                        <span className="text-white/90 text-sm font-medium">
                          {formatPrice(product.priceRange[0])} 起
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">包含</h4>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <i className="fa-solid fa-check text-amber-500 mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                   <Link 
                    to="/booking"
                    className="block w-full bg-amber-50 hover:bg-amber-100 text-amber-700 text-center font-medium py-2.5 rounded-lg transition-colors duration-300"
                  >
                    立即预订
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 服务内容说明 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">我们的服务内容</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              专业的甜品台服务，从设计到配送全程为您贴心服务，让您的活动更加完美
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "fa-palette", title: "个性化设计",
                description: "根据您的活动主题、色彩偏好和场地环境，提供专属甜品台设计方案"
              },
              {
                icon: "fa-cake-candles", title: "多样化甜品",
                description: "提供多种口味和造型的甜品选择，包括蛋糕、马卡龙、饼干、挞类等多种品类"
              },
              {
                icon: "fa-truck-fast", title: "专业配送",
                description: "专业配送团队准时送达，确保甜品新鲜美味，配送范围覆盖全市区"
              },
              {
                icon: "fa-users-gear", title: "现场布置",
                description: "专业人员现场布置甜品台，确保展示效果最佳，活动后负责场地清理"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <i className={`fa-solid ${service.icon} text-pink-500 text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 开业甜品台优势 */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-800 mb-4">开业甜品台优势</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
              为您的开业活动打造令人印象深刻的甜品展示，提升品牌形象
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "fa-trophy", title: "提升品牌形象",
                description: "精致的甜品台展示能有效提升企业开业活动档次，给宾客留下深刻印象"
              },
              {
                icon: "fa-users", title: "促进人际互动",
                description: "甜品台成为活动焦点，促进宾客交流，营造轻松愉快的氛围"
              },
              {
                icon: "fa-camera", title: "社交媒体传播",
                description: "高颜值甜品台设计，激发宾客拍照分享，扩大品牌社交传播"
              },
              {
                icon: "fa-percent", title: "高性价比",
                description: "相比传统餐饮，甜品台单位成本更低，视觉效果更佳"
              }
            ].map((advantage, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fa-solid ${advantage.icon} text-amber-500 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 bg-white rounded-2xl shadow-md p-8 md:p-12 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">开业甜品台定制流程</h3>
            
            <div className="relative">
              {/* 连接线 */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                {/* 步骤1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">1</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">初步咨询</h4>
                  <p className="text-gray-600 text-sm">
                    沟通开业活动规模、主题和预算需求
                  </p>
                </div>
                
                {/* 步骤2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">2</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">方案设计</h4>
                  <p className="text-gray-600 text-sm">
                    提供3D效果图和详细甜品方案，包含品牌元素融入
                  </p>
                </div>
                
                {/* 步骤3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">3</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">样品试吃</h4>
                  <p className="text-gray-600 text-sm">
                    提供甜品样品试吃，调整口味和造型细节
                  </p>
                </div>
                
                {/* 步骤4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">4</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">确认预订</h4>
                  <p className="text-gray-600 text-sm">
                    签订合同并支付50%定金，锁定服务日期
                  </p>
                </div>
                
                {/* 步骤5 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">5</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">现场布置</h4>
                  <p className="text-gray-600 text-sm">
                    活动前3小时到场布置，活动后专业清理
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 案例展示区域 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">案例展示</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              查看我们为不同客户设计的甜品台案例，获取灵感
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <motion.div 
                key={caseStudy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="h-56 overflow-hidden">
                  <img {...lazyLoadImage({
                    src: caseStudy.image,
                    alt: caseStudy.title,
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  })} />
                </div>
                
                <div className="p-6">
                  <div className="flex gap-3 mb-3">
                    <span className="bg-gray-50 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {caseStudy.eventType}
                    </span>
                    <span className="bg-pink-50 text-pink-700 text-xs px-3 py-1 rounded-full">
                      {caseStudy.client}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{caseStudy.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {caseStudy.description}
                  </p>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center text-pink-500 font-medium hover:text-pink-600 text-sm group/link"
                  >
                    查看详情
                    <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover/link:translate-x-1"></i>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/contact" 
              className="inline-block border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full transition-colors"
            >
              查看更多案例
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA区域 */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-pink-600 text-white relative overflow-hidden">
        {/* 装饰元素 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              准备好为您的活动增添甜蜜了吗？
            </h2>
            <p className="text-white/90 text-lg mb-8">
              联系我们，定制专属于您的甜品台方案，让每一刻都充满甜蜜与惊喜
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/booking"
                className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                立即预订
              </a>
              <a 
                href="/contact"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                联系咨询
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}