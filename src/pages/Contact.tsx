import { lazyLoadImage } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FadeInSection from "@/components/FadeInSection";
import { useParallax } from "@/hooks/useParallax";

export default function Contact() {
  // 视差效果和引用
  const { ref: heroRef, style: heroStyle } = useParallax(5);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  
  const contactInfoInView = useInView(contactInfoRef, { once: true, margin: "-10% 0px" });
  const studioInView = useInView(studioRef, { once: true, margin: "-10% 0px" });
  
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
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=contact%20us%20pastry%20shop%20elegant%20interior&sign=6b85f58d2ab20fd91803cef936c62080" 
              alt="联系方式" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            {/* 装饰元素 */}
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
                联系<span className="font-medium">我们</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                随时与我们联系，我们将竭诚为您服务，为您的活动打造完美甜品体验
              </p>
              
              <div className="mt-8">
                   <Link
                     to="#contact-info"
                  className="inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  获取联系方式
                  <i className="fa-solid fa-arrow-down ml-2"></i>
                </Link>
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
      
      {/* 联系信息区域 */}
      <section id="contact-info" ref={contactInfoRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">私人定制咨询</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              我们提供专属私人定制服务，添加微信客服了解更多详情，获取一对一专业咨询
            </p>
          </FadeInSection>
          
          <div className="max-w-5xl mx-auto">
            {/* 微信客服引导卡片 */}
            <FadeInSection delay={0.2} className="bg-white rounded-2xl shadow-sm p-8 md:p-12 backdrop-blur-sm border border-gray-100 relative overflow-hidden">
              {/* 装饰元素 */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full opacity-20 blur-3xl -mr-20 -mt-20"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* 微信二维码 */}
                <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-100 flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <img {...lazyLoadImage({
                      src: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=wechat%20qr%20code%20template%20with%20elegant%20design&sign=685de496a2fef294e35d0856690c64d1",
                      alt: "微信客服二维码",
                      className: "w-64 h-64 object-cover rounded-lg"
                    })} />
                  </div>
                </div>
                
                {/* 引导文字 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">添加微信客服</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    扫描上方二维码添加微信客服，获取专属私人定制方案，我们将为您提供一对一专业咨询服务。
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "获取最新产品信息和定制方案",
                      "专业客服一对一咨询服务",
                      "了解季节性优惠和活动信息"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <i className="fa-solid fa-check text-amber-600"></i>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-gray-500 text-sm italic">
                    客服工作时间: 周一至周日 9:00-18:00
                  </p>
                </div>
              </div>
            </FadeInSection>
            
            {/* 联系信息区域 */}
            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate={contactInfoInView ? "visible" : "hidden"}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: "fa-map-marker-alt",
                  title: "地址",
                  content: "北京市朝阳区建国路88号甜蜜广场101室"
                },
                {
                  icon: "fa-phone",
                  title: "电话",
                  content: "400-123-4567",
                  extra: "周一至周日 9:00-18:00"
                },
                {
                  icon: "fa-envelope",
                  title: "邮箱",
                  content: "info@sweetdelights.com"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                    <i className={`fa-solid ${item.icon} text-amber-600 group-hover:text-white text-xl transition-colors duration-300`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 mb-1">{item.content}</p>
                  {item.extra && (
                    <p className="text-gray-500 text-sm">{item.extra}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 店铺环境区域 */}
      <section ref={studioRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">我们的工作室</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              欢迎来到我们的甜品工作室，感受甜蜜的氛围和专业的制作环境
            </p>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={studioInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden h-48 bg-white p-1 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <img {...lazyLoadImage({
                  src: `https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=elegant%20pastry%20shop%20interior%20design%20${i}`,
                  alt: `店铺环境${i}`,
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-lg"
                })} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA区域 */}
          <FadeInSection delay={0.3} className="mt-16 text-center">
            <a 
              href="/booking"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              立即预订您的专属甜品服务
            </a>
          </FadeInSection>
        </div>
      </section>
      
      {/* 联系表单区域 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">发送咨询信息</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              填写以下表单，我们的客服将尽快与您联系，为您提供专业咨询服务
            </p>
          </FadeInSection>
          
          <FadeInSection delay={0.2} className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">姓名 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">电话 <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-gray-700 mb-2 font-medium">咨询服务类型</label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                >
                  <option value="">请选择服务类型</option>
                  <option value="dessert-table">甜品台定制</option>
                  <option value="business-tea">商务茶歇</option>
                  <option value="baby-birthday">宝宝生日宴</option>
                  <option value="wedding">婚宴甜品</option>
                  <option value="opening">开业甜品</option>
                  <option value="holiday">节日主题甜品</option>
                  <option value="other">其他咨询</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">咨询内容 <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                  placeholder="请详细描述您的需求，例如活动类型、日期、人数等信息"
                  required
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                >
                  提交咨询
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  提交后我们将在24小时内与您联系
                </p>
              </div>
            </form>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}