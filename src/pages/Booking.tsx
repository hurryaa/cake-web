import { useState, useEffect } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FadeInSection from "@/components/FadeInSection";
import { useParallax } from "@/hooks/useParallax";
import {
  initEmailService,
  sendBookingEmail,
  validateEmailConfig,
  formatErrorMessage,
  type BookingFormData
} from "@/services/emailService";

// 服务类型选项
const serviceTypes = [
  { id: 1, name: "甜品台", priceRange: [888, 1688] },
  { id: 2, name: "商务茶歇", priceRange: [58, 128] },
  { id: 3, name: "宝宝生日宴甜品台", priceRange: [1288, 2688] },
  { id: 4, name: "婚宴甜品台", priceRange: [2888, 6888] },
  { id: 5, name: "开业甜品台", priceRange: [1888, 5888] },
  { id: 6, name: "主题节日甜品台", priceRange: [1588, 3288] },
];

// 人数选项
const peopleOptions = [
  { id: 1, name: "10人以下", multiplier: 1 },
  { id: 2, name: "10-30人", multiplier: 1.5 },
  { id: 3, name: "30-50人", multiplier: 2 },
  { id: 4, name: "50-100人", multiplier: 3 },
  { id: 5, name: "100人以上", multiplier: 5 },
];

export default function Booking() {
  const [openIndex, setOpenIndex] = useState(-1);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    serviceType: "",
    people: "",
    date: "",
    time: "",
    location: "",
    specialRequirements: "",
  });

  const [priceEstimate, setPriceEstimate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailConfigValid, setEmailConfigValid] = useState(false);

  // 初始化邮件服务
  useEffect(() => {
    const initService = async () => {
      try {
        const isValid = await validateEmailConfig();
        setEmailConfigValid(isValid);

        if (isValid) {
          console.log('✅ Email service is ready');
        } else {
          console.warn('⚠️ Email service is not properly configured');
        }
      } catch (error) {
        console.error('❌ Failed to initialize email service:', error);
        setEmailConfigValid(false);
      }
    };

    initService();
  }, []);
  
  // 视差效果和引用
  const { ref: heroRef, style: heroStyle } = useParallax(5);
  const faqRef = useRef<HTMLDivElement>(null);
  
  const faqInView = useInView(faqRef, { once: true, margin: "-10% 0px" });
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 计算价格估算
    if ((name === "serviceType" || name === "people") && formData.serviceType && value) {
      calculatePriceEstimate(formData.serviceType, value);
    }
  };
  
  // 计算价格估算
  const calculatePriceEstimate = (serviceTypeId: string, peopleId: string) => {
    const service = serviceTypes.find(s => s.id.toString() === serviceTypeId);
    const people = peopleOptions.find(p => p.id.toString() === peopleId);
    
    if (service && people) {
      const basePrice = (service.priceRange[0] + service.priceRange[1]) / 2;
      const estimatedPrice = Math.round(basePrice * people.multiplier);
      setPriceEstimate(formatPrice(estimatedPrice));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 表单验证
    const requiredFields = ["name", "phone", "serviceType", "people", "date", "time", "location"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error(`请填写以下必填字段: ${missingFields.join(", ")}`);
      return;
    }

    // 检查邮件服务状态
    if (!emailConfigValid) {
      toast.error("邮件服务暂不可用，请稍后重试或直接联系我们：400-123-4567");
      return;
    }

    setIsSubmitting(true);

    try {
      // 准备邮件数据
      const emailData: BookingFormData = {
        ...formData,
        priceEstimate: priceEstimate || "待确认"
      };

      // 发送邮件
      const success = await sendBookingEmail(emailData);

      if (success) {
        toast.success("🎉 预订信息已成功发送！我们将在24小时内与您联系确认详情。", {
          duration: 6000,
        });

        // 重置表单
        setFormData({
          name: "",
          phone: "",
          serviceType: "",
          people: "",
          date: "",
          time: "",
          location: "",
          specialRequirements: "",
        });
        setPriceEstimate("");
      } else {
        throw new Error("邮件发送失败");
      }
    } catch (error) {
      console.error("提交预订失败:", error);
      const errorMessage = formatErrorMessage(error);
      toast.error(`❌ ${errorMessage}`, {
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 获取选中的服务类型名称
  const getSelectedServiceName = () => {
    const service = serviceTypes.find(s => s.id.toString() === formData.serviceType);
    return service ? service.name : "";
  };
  
  // 获取选中的服务价格范围
  const getSelectedServicePriceRange = () => {
    const service = serviceTypes.find(s => s.id.toString() === formData.serviceType);
    return service ? `${formatPrice(service.priceRange[0])} - ${formatPrice(service.priceRange[1])}` : "";
  };
  
  return (
    <div className="scroll-smooth">
      {/* 页面标题区域 */}
      <div ref={heroRef} style={heroStyle}>
        <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=booking%20dessert%20table%20service%20elegant%20pastry%20display&sign=2f3e0f4820d337caf755c8cc48ca9826" 
              alt="在线预订" 
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                在线<span className="font-medium">预订</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                轻松预订您的专属甜品服务，为活动增添甜蜜
              </p>
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
      
      {/* 预订表单区域 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <FadeInSection delay={0.1} className="bg-white rounded-xl shadow-sm p-8 md:p-10 border border-gray-100">
                <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-6">预订信息</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">姓名 <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="serviceType" className="block text-gray-700 mb-2 font-medium">服务类型 <span className="text-red-500">*</span></label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        required
                      >
                        <option value="">请选择服务类型</option>
                        {serviceTypes.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} ({formatPrice(service.priceRange[0])} - {formatPrice(service.priceRange[1])})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="people" className="block text-gray-700 mb-2 font-medium">预计人数 <span className="text-red-500">*</span></label>
                      <select
                        id="people"
                        name="people"
                        value={formData.people}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        required
                      >
                        <option value="">请选择人数范围</option>
                        {peopleOptions.map(people => (
                          <option key={people.id} value={people.id}>{people.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-gray-700 mb-2 font-medium">活动日期 <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-gray-700 mb-2 font-medium">活动时间 <span className="text-red-500">*</span></label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-gray-700 mb-2 font-medium">活动地点 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="请输入详细地址或场馆名称"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="specialRequirements" className="block text-gray-700 mb-2 font-medium">特殊要求</label>
                    <textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      rows={4}
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      placeholder="如有特殊口味要求、主题风格或其他需求，请在此说明"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-300 transform shadow-sm hover:shadow-md ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-amber-500 hover:bg-amber-600 hover:scale-[1.02]'
                      } text-white`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                          发送中...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <i className="fa-solid fa-paper-plane mr-2"></i>
                          提交预订
                        </span>
                      )}
                    </button>
                    <p className="text-center text-gray-500 text-sm mt-3">
                      {emailConfigValid
                        ? "✅ 提交后我们将在24小时内与您联系确认详情"
                        : "⚠️ 邮件服务连接中，请稍候或直接致电：400-123-4567"}
                    </p>
                  </div>
                </form>
              </FadeInSection>
            </div>
            
            <div>
              <FadeInSection delay={0.2} className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 sticky top-24">
                <h2 className="text-2xl font-light tracking-tight text-gray-900 mb-6">订单摘要</h2>
                
                {formData.serviceType || formData.people ? (
                  <div className="space-y-4 text-gray-700">
                    {formData.serviceType && (
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <span>服务类型:</span>
                        <span className="font-medium">{getSelectedServiceName()}</span>
                      </div>
                    )}
                    
                    {formData.serviceType && (
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <span>基础价格:</span>
                        <span>{getSelectedServicePriceRange()}</span>
                      </div>
                    )}
                    
                    {formData.people && (
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <span>人数范围:</span>
                        <span className="font-medium">
                          {peopleOptions.find(p => p.id.toString() === formData.people)?.name}
                        </span>
                      </div>
                    )}
                    
                    {formData.date && (
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <span>活动日期:</span>
                        <span>{formData.date}</span>
                      </div>
                    )}
                    
                    {priceEstimate && (
                      <div className="flex justify-between pt-3 border-t border-gray-200 mt-3">
                        <span className="font-bold text-lg">预估价格:</span>
                        <span className="font-bold text-lg text-amber-500">{priceEstimate}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <i className="fa-solid fa-cart-shopping text-4xl mb-4 opacity-30"></i>
                    <p>选择服务类型和人数后显示价格估算</p>
                  </div>
                )}
                
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-4">预订须知</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li className="flex items-start">
                      <i className="fa-solid fa-info-circle text-amber-500 mt-1 mr-2"></i>
                      <span>请至少提前3天预订，大型活动建议提前1-2周预订</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-info-circle text-amber-500 mt-1 mr-2"></i>
                      <span>预订确认后需支付30%定金，活动结束后支付尾款</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-info-circle text-amber-500 mt-1 mr-2"></i>
                      <span>如需取消预订，请提前48小时通知，否则定金不予退还</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-info-circle text-amber-500 mt-1 mr-2"></i>
                      <span>我们提供免费配送服务（限市区内），超出范围需加收配送费</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-gray-900 mb-4">咨询热线</h3>
                  <a 
                    href="tel:4001234567"
                    className="flex items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-800 font-medium py-3 rounded-lg transition-colors duration-300"
                  >
                    <i className="fa-solid fa-phone mr-2"></i> 400-123-4567
                  </a>
                  <p className="text-center text-gray-500 text-sm mt-2">
                    周一至周日 9:00-18:00
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
      
      {/* 常见问题区域 */}
      <section ref={faqRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">常见问题</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600">
              了解更多关于我们甜品服务的信息，如有其他疑问欢迎联系我们
            </p>
          </FadeInSection>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto space-y-4"
          >
            {[
              {
                question: "如何确定适合我活动的甜品数量？",
                answer: "我们通常建议每位宾客准备3-5件不同种类的甜品。在您预订时，我们的客服会根据活动类型、人数和时长为您提供专业的甜品数量建议，确保既能满足需求又不会浪费。"
              },
              {
                question: "可以定制甜品的口味和造型吗？",
                answer: "是的，我们提供定制服务。您可以选择甜品口味、颜色和造型，甚至可以融入您的活动主题或企业LOGO。定制服务可能需要额外收费，具体请咨询客服，我们将根据定制复杂程度提供详细报价。"
              },
              {
                question: "配送和现场布置额外收费吗？",
                answer: "市区内配送和基础布置免费。超出市区范围会根据距离收取配送费，如需特殊布置或定制展示道具可能需要额外收费。具体配送范围和费用标准，请咨询客服了解详情。"
              },
              {
                question: "如何保存剩余甜品？",
                answer: "大部分甜品建议冷藏保存，保质期为2-3天。具体保存方法和保质期我们会随产品提供说明卡。奶油类甜品建议当天食用完毕以保证最佳口感，其他甜品请按照说明卡上的指示保存。"
              },
              {
                question: "可以提供食品过敏信息和成分说明吗？",
                answer: "是的，我们可以提供所有甜品的成分说明和可能含有的过敏原信息（如坚果、乳制品、麸质等）。如需了解详细信息，请在预订时告知客服，我们将为您提供完整的产品成分表。"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100"
              >
                <button 
                  className="w-full px-6 py-4 text-left font-medium text-gray-900 flex justify-between items-center focus:outline-none group"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >              
                  <span className="group-hover:text-amber-500 transition-colors">{item.question}</span>
                  <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''} group-hover:text-amber-500`}></i>
                </button>
                <div className={`px-6 pb-4 text-gray-600 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {item.answer}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <FadeInSection delay={0.3} className="text-center mt-12">
            <p className="text-gray-600 mb-4">还有其他问题？</p>
            <a 
              href="/contact"
              className="inline-flex items-center text-amber-500 hover:text-amber-600 font-medium transition-colors group"
            >
              联系我们获取更多帮助
              <i className="fa-solid fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1"></i>
            </a>
          </FadeInSection>
        </div>
      </section>
      
      {/* CTA区域 */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection delay={0.1} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              准备好为您的活动增添甜蜜了吗？
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              联系我们，让我们一起打造令人难忘的甜品体验，每一款产品都融合匠心工艺与艺术美感
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact"
                className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 transform hover:scale-105 shadow-md"
              >
                联系我们
              </a>
              <a 
                href="#"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300"
              >
                查看案例
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}