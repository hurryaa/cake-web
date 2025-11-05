import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "如何预订甜品台服务？",
    answer:
      "您可以通过我们的在线预订系统提交订单，或直接联系我们的客服团队。我们建议至少提前2周预订，以确保有充足的时间进行定制设计和准备。对于大型活动，建议提前1个月预订。",
    category: "预订流程",
  },
  {
    id: 2,
    question: "甜品台的价格是如何计算的？",
    answer:
      "价格主要基于以下因素：宾客人数、甜品种类和数量、定制设计复杂度、配送距离等。我们提供不同预算的套餐选择，也可以根据您的需求进行个性化定制。具体报价请通过在线预订系统获取或联系我们的顾问。",
    category: "价格相关",
  },
  {
    id: 3,
    question: "可以提供试吃服务吗？",
    answer:
      "当然可以！对于大型活动（宾客超过50人），我们提供免费试吃服务。您可以品尝3-5款不同的甜品，帮助您做出最佳选择。小型活动也可以预约试吃，会收取少量费用，该费用将在正式订单中抵扣。",
    category: "服务内容",
  },
  {
    id: 4,
    question: "配送范围是哪里？",
    answer:
      "我们主要服务成都市区及周边地区。对于市区内的订单，我们提供免费配送和现场布置服务。周边地区可能会收取额外的配送费用。具体配送范围和费用请咨询我们的客服团队。",
    category: "配送服务",
  },
  {
    id: 5,
    question: "甜品的保质期是多久？",
    answer:
      "我们所有甜品都是当天新鲜制作，建议在活动当天食用完毕以保证最佳口感。如有剩余，大部分甜品可以冷藏保存1-2天。我们会在配送时提供详细的保存说明。",
    category: "产品质量",
  },
  {
    id: 6,
    question: "可以根据主题进行定制吗？",
    answer:
      "绝对可以！我们的设计团队会根据您的活动主题、色彩偏好、场地风格等因素，为您量身定制甜品台设计方案。无论是婚礼、生日宴、企业活动还是节日庆典，我们都能为您打造独一无二的甜品体验。",
    category: "定制服务",
  },
  {
    id: 7,
    question: "如何处理食物过敏问题？",
    answer:
      "我们非常重视食物安全。在预订时，请告知我们您或宾客的过敏信息，我们会提供无过敏原替代选项或调整食谱。常见的过敏原包括坚果、乳制品、鸡蛋、麸质等，我们都可以提供相应的替代方案。",
    category: "特殊需求",
  },
  {
    id: 8,
    question: "取消或修改订单的政策是什么？",
    answer:
      "活动前7天以上取消可全额退款；3-7天取消收取30%手续费；3天内取消收取50%手续费；活动当天取消恕不退款。订单修改请至少提前3天通知，我们会尽力配合您的需求调整。",
    category: "预订流程",
  },
];

const categories = ["全部", ...Array.from(new Set(faqData.map((item) => item.category)))];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQ =
    selectedCategory === "全部"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-neutral-50/50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-6">
            常见问题
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            快速找到您关心的问题答案
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFAQ.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                        <i className="fa-solid fa-question text-primary-600 text-sm" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                          {item.question}
                        </h3>
                        <span className="text-xs text-primary-600 font-medium mt-1 inline-block">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <i className="fa-solid fa-chevron-down text-neutral-400 group-hover:text-primary-500 transition-colors duration-300" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-[4.5rem]">
                          <p className="text-neutral-700 leading-relaxed">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-600 mb-6">还有其他问题？</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-phone" />
            联系我们
          </a>
        </motion.div>
      </div>
    </section>
  );
}
