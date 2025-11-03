import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import { lazyLoadImage } from "@/lib/utils";
import FadeInSection from "@/components/FadeInSection";

const teamMembers = [{
    id: 1,
    name: "陈甜品师",
    position: "创始人 & 首席甜点师",
    bio: "拥有15年法式甜点制作经验，曾在巴黎知名甜品店工作，擅长将传统工艺与现代美学相结合",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pastry%20chef%20portrait%20professional%20elegant%20female%20asian&sign=33433043a8eb04c244bb9db7a687ce6b"
}, {
    id: 2,
    name: "林设计师",
    position: "创意总监",
    bio: "曾任职于国际设计公司，专注甜品台视觉设计，擅长将客户需求转化为独特的甜品艺术",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=creative%20director%20portrait%20professional%20elegant%20male%20asian&sign=f10937e9bbbc3ee0f58e56647b8c6ef3"
}, {
    id: 3,
    name: "王运营",
    position: "客户体验总监",
    bio: "拥有丰富的高端活动策划经验，负责客户关系与项目管理，确保每一场活动完美呈现",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=customer%20experience%20director%20professional%20elegant%20female%20asian&sign=804df2a0901a52abc830b221d8d9373d"
}];

const brandTimeline = [{
    year: "2015",
    event: "品牌创立于北京，专注高端甜品定制服务"
}, {
    year: "2017",
    event: "推出首个主题甜品台系列，获得市场广泛认可"
}, {
    year: "2019",
    event: "服务超过500场高端活动，成为业内知名品牌"
}, {
    year: "2022",
    event: "开设中央厨房，扩大生产能力，服务全国客户"
}, {
    year: "2024",
    event: "推出企业定制服务，与多家知名企业建立合作关系"
}];

const brandStats = [{
    value: "5000+",
    label: "成功案例"
}, {
    value: "98%",
    label: "客户满意度"
}, {
    value: "15+",
    label: "专业甜品师"
}, {
    value: "100+",
    label: "企业合作伙伴"
}];

export default function About() {
    const {
        ref: heroRef,
        style: heroStyle
    } = useParallax(5);

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 4);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const {
        ref: statsRef,
        style: statsStyle
    } = useParallax(-3);

    const brandStoryRef = useRef<HTMLDivElement>(null);
    const brandValuesRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    const brandStoryInView = useInView(brandStoryRef, {
        triggerOnce: true,
        margin: "-10% 0px"
    });

    const brandValuesInView = useInView(brandValuesRef, {
        triggerOnce: true,
        margin: "-10% 0px"
    });

    const teamInView = useInView(teamRef, {
        triggerOnce: true,
        margin: "-10% 0px"
    });

    const timelineInView = useInView(timelineRef, {
        triggerOnce: true,
        margin: "-10% 0px"
    });

    const statsInView = useInView(statsRef, {
        triggerOnce: true,
        margin: "-10% 0px"
    });

    const fadeInUp = {
        hidden: {
            opacity: 0,
            y: 30
        },

        visible: {
            opacity: 1,
            y: 0
        },

        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0]
        }
    };

    const staggerChildren = {
        hidden: {},

        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const NumberCounter = (
        {
            end,
            duration = 2000,
            prefix = "",
            suffix = "",
            isVisible
        }: {
            end: number;
            duration?: number;
            prefix?: string;
            suffix?: string;
            isVisible: boolean;
        }
    ) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!isVisible) {
                setCount(0);
                return;
            }

            let startTime: number;
            let animationFrame: number;

            const updateCount = (timestamp: number) => {
                if (!startTime)
                    startTime = timestamp;

                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easeOutQuad = (t: number) => t * (2 - t);
                const currentCount = Math.floor(end * easeOutQuad(progress));
                setCount(currentCount);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(updateCount);
                }
            };

            animationFrame = requestAnimationFrame(updateCount);
            return () => cancelAnimationFrame(animationFrame);
        }, [end, duration, isVisible]);

        return (
            <div
                className="text-3xl md:text-4xl font-light text-gray-900 mb-1"
                style={{
                    fontWeight: "normal",
                    fontFamily: "\"Noto Sans SC\", sans-serif",
                    fontSynthesisStyle: "auto",
                    backgroundColor: "#0A0A0A"
                }}>0111+{prefix}{count}{suffix}
            </div>
        );
    };

    return (
        <div className="scroll-smooth bg-gray-50">
            {}
            <section
                className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
                <div ref={heroRef} style={heroStyle} className="absolute inset-0 z-0">
                    <img
                        src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=elegant%20pastry%20shop%20interior%20design%20minimalist%20luxury%20warm%20lighting&sign=cf8afaddfd864a7d54e9749503cb8237"
                        alt="关于我们"
                        className="w-full h-full object-cover" />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    {}
                    <div
                        className="absolute top-1/4 right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
                    <div
                        className="absolute bottom-1/4 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1.0]
                        }}>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">关于<span className="font-medium">SweetDelights</span>
                        </h1>
                        <p
                            className="text-white/90 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">我们致力于为每一个特别时刻，创造令人难忘的甜蜜体验，用匠心与创意传递幸福与美好
                                                                    </p>
                        <motion.a
                            href="#story"
                            whileHover={{
                                y: 5
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 10
                            }}
                            className="inline-flex items-center text-white group">
                            <span className="text-sm font-medium tracking-wide">探索我们的故事</span>
                            <i
                                className="fa-solid fa-chevron-down ml-2 text-xs transition-transform group-hover:translate-y-1"></i>
                        </motion.a>
                    </motion.div>
                </div>
                {}
                <motion.div
                    animate={{
                        y: [0, 10, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-center z-10">
                    <p className="mb-2 text-xs tracking-wider">向下滚动探索更多</p>
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                </motion.div>
            </section>
            {}
            <section className="py-12 bg-white border-b border-gray-100">
                <div ref={statsRef} style={statsStyle} className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                        {brandStats.map((stat, index) => <motion.div
                            key={index}
                            className="text-center p-4 opacity-0"
                            initial={{
                                opacity: 0,
                                y: 20
                            }}
                            animate={statsInView ? {
                                opacity: 1,
                                y: 0
                            } : {
                                opacity: 0,
                                y: 20
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1
                            }}>
                            <NumberCounter
                                end={stat.label === "成功案例" ? 5000 : parseInt(stat.value)}
                                duration={2000}
                                suffix={stat.label === "成功案例" ? "+" : ""}
                                isVisible={statsInView} />
                            <div className="text-sm text-gray-500 tracking-wide">{stat.label}</div>
                        </motion.div>)}
                    </div>
                </div>
            </section>
            {}
            <section id="story" ref={brandStoryRef} className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <FadeInSection delay={0.1} className="max-w-3xl mx-auto text-center mb-16">
                        <h2
                            className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">品牌故事</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">每一款甜品背后，都有一段关于热爱与匠心的故事
                                                                    </p>
                    </FadeInSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                        {}
                        <div
                            className="absolute -top-10 -left-10 w-20 h-20 border border-amber-200 rounded-lg -z-10 hidden md:block"></div>
                        <div
                            className="absolute -bottom-10 -right-10 w-32 h-32 border border-pink-100 rounded-lg -z-10 hidden md:block"></div>
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate={brandStoryInView ? "visible" : "hidden"}
                            className="order-2 lg:order-1">
                            <div className="space-y-6 text-gray-700">
                                <p className="text-lg leading-relaxed">SweetDelights创立于2015年，源于创始人陈甜品师对甜点艺术的热爱与追求。在巴黎学艺多年后，她带着对甜品的独特理解回到中国，希望将法式甜点的精致与东方人的口味偏好完美融合。
                                                                                        </p>
                                <p className="leading-relaxed">我们坚持以高品质原料为基础，融合创新设计与传统工艺，为客户打造兼具视觉美感与味觉享受的甜品体验。每一款产品都承载着我们对品质的执着与对美的追求。
                                                                                        </p>
                                <p className="leading-relaxed">如今，SweetDelights已成为业内知名的高端甜品定制品牌，我们将继续秉持初心，为更多客户创造令人难忘的甜蜜体验。
                                                                                        </p>
                            </div>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.95
                                }}
                                animate={brandStoryInView ? {
                                    opacity: 1,
                                    scale: 1
                                } : {
                                    opacity: 0,
                                    scale: 0.95
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3
                                }}
                                className="mt-10 inline-block">
                                 <Link
                                     to="/contact"
                                    className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">了解更多品牌故事
                                                                                          <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                                </Link>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate={brandStoryInView ? "visible" : "hidden"}
                            transition={{
                                delay: 0.2
                            }}
                            className="order-1 lg:order-2 relative">
                            {}
                            <div className="rounded-xl overflow-hidden shadow-xl relative z-10">
                                {}
                                <div className="relative h-[400px] overflow-hidden">
                                    {[
                                        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=artisan%20pastry%20making%20process%20elegant%20lighting%20close-up&sign=2efd174351da0329d95e51975eff7077",
                                        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=pastry%20chef%20decorating%20cake%20with%20flowers&sign=d7ba55fa90c062434a61172239ac14db",
                                        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=dessert%20display%20case%20with%20assorted%20pastries&sign=595f28818df7d34caf493572478489d7",
                                        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=pastry%20workshop%20with%20natural%20light&sign=d25200f52b7ee4c57fe2cca02a35ef66"
                                    ].map((img, index) => <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`}>
                                        <img
                                            {...lazyLoadImage({
                                                src: img,
                                                alt: `品牌故事图片 ${index + 1}`
                                            })}
                                            className="w-full h-full object-cover" />
                                    </div>)}
                                    {}
                                    <button
                                        onClick={() => setCurrentSlide(prev => (prev - 1 + 4) % 4)}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                        aria-label="上一张">
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <button
                                        onClick={() => setCurrentSlide(prev => (prev + 1) % 4)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                        aria-label="下一张">
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                    {}
                                    <div
                                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {[0, 1, 2, 3].map(index => <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white w-8" : "bg-white/50"}`}
                                            aria-label={`切换到图片 ${index + 1}`}></button>)}
                                    </div>
                                </div>
                            </div>
                            {}
                            {/* 装饰图片 - 位于品牌故事区域左下角的装饰元素，增强视觉层次感 */}
                            <div
                                className="absolute -bottom-6 -left-6 w-48 h-48 rounded-xl overflow-hidden shadow-lg hidden md:block z-0">
                                <img 
                                    src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=decorative%20pastry%20pattern%20elegant%20design&sign=a0495547bbee20b1e2d198196b818b32" 
                                    alt="装饰图案" 
                                    className="w-full h-full object-cover opacity-20"
                                />
                            </div>
                            {}
                            <div
                                className="absolute -top-4 -right-4 w-24 h-24 border-2 border-amber-200 rounded-xl -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </section>
            {}
            <section
                ref={brandValuesRef}
                className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate={brandValuesInView ? "visible" : "hidden"}
                        className="max-w-3xl mx-auto text-center mb-16">
                        <h2
                            className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">品牌理念</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">我们的核心价值观，指导着每一款产品的诞生
                                                                    </p>
                    </motion.div>
                    <motion.div
                        variants={staggerChildren}
                        initial="hidden"
                        animate={brandValuesInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[{
                            title: "品质至上",
                            description: "精选全球优质原料，坚持手工制作，每一款产品都经过严格品控",
                            icon: "fa-trophy"
                        }, {
                            title: "创新设计",
                            description: "融合艺术与美食，不断创新甜品形式与口味，打造独特视觉与味觉体验",
                            icon: "fa-lightbulb"
                        }, {
                            title: "用心服务",
                            description: "从设计到配送，全程专业团队跟进，确保每一个细节都尽善尽美",
                            icon: "fa-heart"
                        }].map((item, index) => <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group">
                            <div
                                className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-amber-100 transition-colors duration-300">
                                <i className={`fa-solid ${item.icon} text-amber-500 text-xl`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{item.title}</h3>
                            <p className="text-gray-600 text-center leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>)}
                    </motion.div>
                </div>
            </section>
            {}
            <section ref={teamRef} className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate={teamInView ? "visible" : "hidden"}
                        className="max-w-3xl mx-auto text-center mb-16">
                        <h2
                            className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">我们的团队</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">由甜品师、设计师和服务专家组成的专业团队，为您打造完美甜品体验
                                                                    </p>
                    </motion.div>
                    <motion.div
                        variants={staggerChildren}
                        initial="hidden"
                        animate={teamInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {teamMembers.map(
                            member => <motion.div key={member.id} variants={fadeInUp} className="group">
                                <div
                                    className="rounded-xl overflow-hidden mb-6 bg-gray-100 aspect-square relative overflow-hidden"><img
                                        {...lazyLoadImage({
                                            src: member.image,
                                            alt: member.name,
                                            className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        })} />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-amber-500 mb-3">{member.position}</p>
                                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>
            {}
            <section ref={timelineRef} className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate={timelineInView ? "visible" : "hidden"}
                        className="max-w-3xl mx-auto text-center mb-16">
                        <h2
                            className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-4">品牌历程</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">SweetDelights的成长足迹，每一步都离不开客户的支持与信任
                                                                    </p>
                    </motion.div>
                    <div ref={statsRef} style={statsStyle} className="max-w-4xl mx-auto relative">
                        {}
                        <div
                            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
                        <motion.div
                            variants={staggerChildren}
                            initial="hidden"
                            animate={timelineInView ? "visible" : "hidden"}
                            className="space-y-16 md:space-y-24">
                            {brandTimeline.map((item, index) => <motion.div
                                key={index}
                                variants={fadeInUp}
                                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                <div className="md:w-5/12 text-right md:pr-12 md:text-right">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.year}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.event}</p>
                                </div>
                                <div
                                    className="hidden md:flex z-10 w-10 h-10 rounded-full bg-amber-500 text-white items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                                    <i className="fa-solid fa-arrow-right transform rotate-45"></i>
                                </div>
                                <div
                                    className="md:w-5/12 md:pl-12 mt-6 md:mt-0 flex justify-center md:justify-start">
                                    <div
                                        className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center md:hidden">
                                        <i className="fa-solid fa-arrow-down text-amber-500"></i>
                                    </div>
                                </div>
                            </motion.div>)}
                        </motion.div>
                    </div>
                </div>
            </section>
            {}
            <section
                className="py-24 bg-gradient-to-r from-amber-500 to-amber-600 text-white relative overflow-hidden">
                {}
                <div
                    className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div
                    className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.8
                        }}
                        className="max-w-3xl mx-auto text-center">
                        <h2
                            className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">让我们一起创造甜蜜回忆
                                                                    </h2>
                        <p className="text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">无论您是需要为婚礼、庆典还是企业活动定制甜品，我们都将为您提供专业服务，让每一刻都充满甜蜜与惊喜
                                                                    </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="/booking"
                                className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">立即预订
                                                                              </a>
                            <a
                                href="/contact"
                                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300">联系我们
                                                                              </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}