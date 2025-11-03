import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  event?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "张小姐",
    role: "婚礼客户",
    event: "2024年春季婚礼",
    content:
      "SweetDelights为我们的婚礼打造的甜品台真是太完美了！每一款甜点都精致美味，宾客们赞不绝口。从设计到现场布置，团队都非常专业，让我们的大日子更加难忘。",
    rating: 5,
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=elegant%20asian%20bride%20portrait%20professional%20happy&sign=7e1d5f9c9a0e4b3a8e6f1d2c3a4b5e6f",
  },
  {
    id: 2,
    name: "李先生",
    role: "企业客户",
    event: "年度峰会茶歇",
    content:
      "我们公司的年度峰会选择了SweetDelights的商务茶歇服务，品质和服务都超出预期。参会者都对甜品印象深刻，给我们的活动增色不少。强烈推荐！",
    rating: 5,
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=professional%20business%20man%20portrait%20confident%20asian&sign=8f2e6a0b1c9d3e4a5f6b7c8d9e0f1a2b",
  },
  {
    id: 3,
    name: "王女士",
    role: "生日宴客户",
    event: "宝宝周岁宴",
    content:
      "为女儿的周岁宴订制的甜品台简直太可爱了！从主题设计到每一款甜点的造型，都充满创意和巧思。孩子和家长们都玩得很开心，感谢团队的用心！",
    rating: 5,
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=happy%20young%20mother%20portrait%20asian%20warm&sign=9a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d",
  },
  {
    id: 4,
    name: "陈总",
    role: "企业客户",
    event: "新店开业",
    content:
      "开业庆典的甜品台让来宾们留下了深刻印象。不仅外观精美，口味也很赞。SweetDelights团队的专业和高效让我们非常满意，下次活动还会选择他们。",
    rating: 5,
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=successful%20businessman%20portrait%20professional%20asian&sign=0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-6">
            客户评价
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            听听我们的客户对SweetDelights服务的真实反馈
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="glass" className="p-8 md:p-12">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {testimonials[currentIndex].image && (
                    <div className="flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                      >
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary-100 shadow-lg">
                          <img
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                          <i className="fa-solid fa-quote-right text-white text-lg" />
                        </div>
                      </motion.div>
                    </div>
                  )}

                  <div className="flex-grow text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.i
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                          className="fa-solid fa-star text-amber-400 text-lg"
                        />
                      ))}
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-neutral-700 text-lg leading-relaxed mb-6 italic"
                    >
                      "{testimonials[currentIndex].content}"
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <p className="text-neutral-900 font-semibold text-lg mb-1">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-neutral-600 text-sm mb-1">
                        {testimonials[currentIndex].role}
                      </p>
                      {testimonials[currentIndex].event && (
                        <p className="text-primary-600 text-sm font-medium">
                          {testimonials[currentIndex].event}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-neutral-50 transition-all duration-300 group"
            aria-label="上一条评价"
          >
            <i className="fa-solid fa-chevron-left text-neutral-600 group-hover:text-neutral-900 transition-colors" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-neutral-50 transition-all duration-300 group"
            aria-label="下一条评价"
          >
            <i className="fa-solid fa-chevron-right text-neutral-600 group-hover:text-neutral-900 transition-colors" />
          </button>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary-500"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`跳转到第${index + 1}条评价`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
