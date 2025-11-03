import { lazyLoadImage, formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

// 宝宝生日宴甜品台产品数据
const products = [
  {
    id: 1,
    name: "童话主题甜品台",
    description: "充满童趣的童话主题甜品台，包含多种卡通造型甜点和定制蛋糕。",
    priceRange: [1288, 1888],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=fairy%20tale%20theme%20baby%20birthday%20dessert%20table&sign=21d6676c66a4e4f5e4325d7a5385c632"
    ],
    features: ["定制主题蛋糕", "卡通马卡龙", "造型饼干", "果汁饮料"],
    suitableFor: "30-50人",
    popular: true
  },
  {
    id: 2,
    name: "动物乐园甜品台",
    description: "可爱动物造型的甜品台，色彩丰富，深受小朋友喜爱。",
    priceRange: [1388, 1988],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=animal%20theme%20baby%20birthday%20dessert%20table&sign=21ff8017b5a76b54d596370f3d768ca7"
    ],
    features: ["动物造型蛋糕", "主题饼干", "水果杯", "定制糖霜饼干"],
    suitableFor: "30-50人",
    popular: true
  },
  {
    id: 3,
    name: "公主主题甜品台",
    description: "粉色梦幻公主主题甜品台，满足小公主的生日梦想。",
    priceRange: [1488, 2088],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=princess%20theme%20baby%20birthday%20dessert%20table&sign=d405a0fbb88dfe96073fa54b89bbb2fb"
    ],
    features: ["公主城堡蛋糕", "粉色马卡龙", "星星甜点", "定制姓名牌"],
    suitableFor: "40-60人",
    popular: false
  },
  {
    id: 4,
    name: "超级英雄甜品台",
    description: "为小男孩设计的超级英雄主题甜品台，充满力量与勇气元素。",
    priceRange: [1488, 2088],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=superhero%20theme%20baby%20birthday%20dessert%20table&sign=a8d77b8e26a8f70c4f5f2c93d059014d"
    ],
    features: ["英雄造型蛋糕", "主题 cupcakes", "能量饮料", "定制面具饼干"],
    suitableFor: "40-60人",
    popular: false
  }
];

// 案例展示数据
const caseStudies = [
  {
    id: 1,
    title: "小熊维尼主题生日宴",
    description: "为2岁宝宝设计的小熊维尼主题甜品台，色彩温馨，造型可爱。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=winnie%20the%20pooh%20theme%20birthday%20dessert%20table&sign=e1ade172e3cd5662356163ad7e8a6444",
    age: "2岁",
    guests: "30人"
  },
  {
    id: 2,
    title: "冰雪奇缘主题生日宴",
    description: "为4岁女孩设计的冰雪奇缘主题甜品台，蓝色系为主，梦幻浪漫。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=frozen%20theme%20birthday%20dessert%20table&sign=4e188ddfcb5a8492d5836a27303195f7",
    age: "4岁",
    guests: "40人"
  },
  {
    id: 3,
    title: "恐龙主题生日宴",
    description: "为5岁男孩设计的恐龙主题甜品台，充满冒险与探索元素。",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=dinosaur%20theme%20birthday%20dessert%20table&sign=79caa2405d2280954fa833b5dfbfd6b4",
    age: "5岁",
    guests: "35人"
  }
];

// 服务内容数据
const services = [
  {
    icon: "fa-cake-candles",
    title: "定制主题设计",
    description: "根据宝宝喜好和年龄，设计专属生日主题甜品台"
  },
  {
    icon: "fa-child-reaching",
    title: "儿童友好配方",
    description: "采用低糖配方，确保适合儿童食用，健康无添加"
  },
  {
    icon: "fa-palette",
    title: "创意造型设计",
    description: "专业甜品师手工制作各种可爱造型甜点，吸引孩子注意力"
  },
  {
    icon: "fa-camera",
    title: "拍照打卡区",
    description: "精心布置甜品台，打造完美拍照背景，留下美好回忆"
  },
  {
    icon: "fa-truck-fast",
    title: "准时配送布置",
    description: "专业团队准时送达并现场布置，确保活动顺利进行"
  },
  {
    icon: "fa-gift",
    description: "提供甜品台相关派对用品，一站式满足派对需求"
  }
];

export default function BabyBirthday() {
  const [openIndex, setOpenIndex] = useState(-1);
  return (
    <div className="scroll-smooth">
      {/* 页面标题区域 */}
      <section className="relative h-64 md:h-80 flex items-center">
       <div className="absolute inset-0 z-0">
         <img 
           src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=baby%20birthday%20dessert%20table%20with%20colorful%20treats&sign=1a00494cdd51e3b57c55c2a4e53f7978" 
           alt="宝宝生日宴甜品台" 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
           <h1 className="text-4xl md:text-5xl font-bold text-white">宝宝生日宴甜品台</h1>
           <p className="text-white/90 mt-2">为宝宝打造梦幻可爱的生日甜品台，留下美好回忆</p>
        </div>
      </section>
      
      {/* 产品展示区域 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">主题甜品台系列</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              多种可爱主题选择，为宝宝打造专属生日甜品台，让派对更加精彩
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div 
                key={product.id}
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
                      <span className="bg-amber-100 text-amber-600 text-xs px-2 py-1 rounded-full">
                        热门选择
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-amber-600 font-bold">
                      {formatPrice(product.priceRange[0])} - {formatPrice(product.priceRange[1])}
                    </span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {product.suitableFor}
                    </span>
                  </div>
                   <Link
                     to="/booking"
                    className="block w-full bg-amber-50 hover:bg-amber-100 text-amber-700 text-center font-medium py-2 rounded-lg transition-colors duration-300"
                  >
                    立即预订
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 服务内容区域 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">宝宝生日宴专属服务</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们提供全方位的宝宝生日宴甜品台服务，让派对更加完美
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <i className={`fa-solid ${service.icon} text-pink-500 text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 案例展示区域 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">生日宴案例展示</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              看看我们为其他宝宝打造的精彩生日宴甜品台，获取灵感
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <motion.div 
                key={caseStudy.id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="h-56 overflow-hidden">
                   <img {...lazyLoadImage({
                     src: caseStudy.image,
                     alt: caseStudy.title,
                     className: "w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                   })}/>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{caseStudy.title}</h3>
                  <div className="flex gap-3 mb-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {caseStudy.age}生日
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {caseStudy.guests}
                    </span>
                  </div>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-pink-500 font-medium hover:text-pink-600 text-sm"
                  >
                    查看详情
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 定制流程区域 */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">宝宝生日宴定制流程</h2>
              <p className="text-gray-600">
                简单四步，为宝宝打造完美生日甜品台
              </p>
            </div>
            
            <div className="relative">
              {/* 连接线 */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-pink-200 -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {/* 步骤1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">1</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">选择主题</h4>
                  <p className="text-gray-600 text-sm">
                    根据宝宝喜好选择或定制生日主题
                  </p>
                </div>
                
                {/* 步骤2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">2</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">确认方案</h4>
                  <p className="text-gray-600 text-sm">
                    确认甜品内容、价格和布置方案
                  </p>
                </div>
                
                {/* 步骤3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">3</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">支付定金</h4>
                  <p className="text-gray-600 text-sm">
                    支付30%定金锁定日期和方案
                  </p>
                </div>
                
                {/* 步骤4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10 shadow-lg">4</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">现场布置</h4>
                  <p className="text-gray-600 text-sm">
                    活动当天准时配送并专业布置
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 常见问题区域 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">常见问题</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              关于宝宝生日宴甜品台的常见问题解答，如有其他疑问欢迎联系我们
            </p>
          </div>
          
           <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                <button 
                  className="w-full px-6 py-4 text-left font-medium text-gray-800 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
                >
                  <span>宝宝生日宴甜品台适合多大孩子？</span>
                  <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${openIndex === 0 ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`px-6 pb-4 text-gray-600 overflow-hidden transition-all duration-300 ${openIndex === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  我们的宝宝生日宴甜品台适合1-12岁的儿童生日派对。针对不同年龄段的孩子，我们会调整甜品的甜度、造型复杂度和尺寸，确保适合相应年龄段的孩子食用和欣赏。
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                <button 
                  className="w-full px-6 py-4 text-left font-medium text-gray-800 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
                >
                  <span>甜品是否适合儿童食用？糖分含量如何控制？</span>
                  <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${openIndex === 1 ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`px-6 pb-4 text-gray-600 overflow-hidden transition-all duration-300 ${openIndex === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  我们专为儿童设计的甜品采用低糖配方，比普通甜品糖分降低30%左右，同时不使用人工色素和防腐剂。所有甜品都符合儿童食品安全标准，家长可以放心让孩子食用。
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                <button 
                  className="w-full px-6 py-4 text-left font-medium text-gray-800 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
                >
                  <span>可以在蛋糕上添加宝宝的照片吗？</span>
                  <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${openIndex === 2 ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`px-6 pb-4 text-gray-600 overflow-hidden transition-all duration-300 ${openIndex === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  可以。我们提供可食用照片打印服务，您只需提供清晰的宝宝照片，我们会将其制作成可食用糖纸，装饰在生日蛋糕上。这项服务需要额外收费50元，并请提前3天提供照片。
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                <button 
                  className="w-full px-6 py-4 text-left font-medium text-gray-800 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === 3 ? -1 : 3)}
                >
                  <span>需要提前多久预订？</span>
                  <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${openIndex === 3 ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`px-6 pb-4 text-gray-600 overflow-hidden transition-all duration-300 ${openIndex === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  建议至少提前2周预订宝宝生日宴甜品台，特别是在节假日和周末等高峰期，建议提前3-4周预订以确保日期可用。定制程度高的主题可能需要更长的准备时间。
                </div>
              </div>
            </div>
        </div>
      </section>
      
      {/* CTA区域 */}
       <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">为宝宝打造难忘的生日回忆</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            定制专属宝宝生日宴甜品台，让派对更加精彩，留下美好回忆
          </p>
          <a 
             href="/booking"
              className="bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-amber-900 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-md"
            >
            立即预订
          </a>
        </div>
      </section>
    </div>
  );
}