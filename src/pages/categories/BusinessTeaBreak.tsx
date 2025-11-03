import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectGallery from "@/components/ProjectGallery";
import { businessTeaCases } from "@/data/projectCases";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const features = [
  {
    icon: "fa-truck-fast",
    title: "准时配送",
    description: "专业物流团队，保障茶歇准时送达，不耽误会议进程。",
  },
  {
    icon: "fa-box-open",
    title: "独立包装",
    description: "精心设计的独立包装，卫生便捷，适合商务场景。",
  },
  {
    icon: "fa-chart-line",
    title: "品牌呈现",
    description: "可融入企业VI元素，提升品牌形象与活动质感。",
  },
  {
    icon: "fa-headset",
    title: "专属服务",
    description: "从方案规划到现场布置，全程顾问式服务，灵活应对需求。",
  },
];

const pricingTiers = [
  {
    name: "标准茶歇",
    priceRange: "¥58-78",
    unit: "/人",
    description: "日常会议首选",
    guestCount: "10-30人",
    features: [
      "4款精品点心",
      "咖啡与茶饮",
      "新鲜水果拼盘",
      "基础布置",
      "2小时现场服务",
    ],
    popular: false,
  },
  {
    name: "商务行政",
    priceRange: "¥88-118",
    unit: "/人",
    description: "高端会议推荐",
    guestCount: "30-80人",
    features: [
      "6款精致点心",
      "精品咖啡机",
      "品牌元素融入",
      "定制布置方案",
      "3小时现场服务",
      "VIP接待团队",
    ],
    popular: true,
  },
  {
    name: "旗舰定制",
    priceRange: "¥128-168",
    unit: "/人",
    description: "重要接待、发布会",
    guestCount: "80-200人",
    features: [
      "10款创意点心",
      "主题互动区",
      "分时段补给",
      "多语种服务",
      "现场直播支持",
      "多媒体设备",
    ],
    popular: false,
  },
];

const faqs = [
  {
    q: "茶歇可以按人头计价吗？",
    a: "可以，我们的茶歇方案均支持按人头计价，最终费用根据人数与套餐选择计算。",
  },
  {
    q: "能否根据企业品牌进行定制？",
    a: "支持提供品牌LOGO、企业专属色彩、定制餐牌等服务，需提前提供设计素材。",
  },
  {
    q: "会议现场是否提供布置与清洁？",
    a: "包含标准布置与会后清洁服务，大型活动可安排驻场服务人员。",
  },
  {
    q: "是否提供发票和合同？",
    a: "我们提供正规增值税发票及合同，满足企业财务需求。",
  },
];

export default function BusinessTeaBreak() {
  return (
    <div className="scroll-smooth">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=modern%20corporate%20meeting%20tea%20break%20setup&sign=2bf838c0c7e380f3af6b0b6f7bf7a7bb"
            alt="商务茶歇"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 py-32 md:py-40">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                <i className="fa-solid fa-mug-hot text-primary-200" />
                BUSINESS TEA BREAK
              </span>

              <h1 className="mt-6 text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
                商务<span className="font-semibold">茶歇服务</span>
              </h1>

              <p className="mt-6 text-xl leading-relaxed text-white/85">
                以专业服务和精致茶点，为您的会议、路演、客户接待提供高效能量补给。
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600"
                >
                  <i className="fa-solid fa-calendar-check" />
                  获取报价
                </Link>
                <a
                  href="#cases"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <i className="fa-solid fa-briefcase" />
                  查看案例
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              ADVANTAGES
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              为什么选择我们的茶歇服务
            </h2>
            <p className="mt-4 text-neutral-600">
              结合商务礼仪、品牌形象与美味体验，打造专业且令人印象深刻的茶歇服务。
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-8">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                      <i className={`fa-solid ${feature.icon} text-xl`} />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-neutral-900">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-50 to-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              PACKAGES
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              茶歇套餐方案
            </h2>
            <p className="mt-4 text-neutral-600">
              根据活动规模和形式，选择适合的茶歇套餐，亦可提供完全定制化方案。
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  variant={tier.popular ? "gradient" : "default"}
                  className={`relative h-full ${tier.popular ? "border-2 border-primary-500" : ""}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                        <i className="fa-solid fa-star" />
                        热门选择
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="mt-2">{tier.description}</CardDescription>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-primary-600">
                        {tier.priceRange}
                      </span>
                      <span className="text-neutral-600">{tier.unit}</span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-600">适合 {tier.guestCount}</p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <i className="fa-solid fa-circle-check mt-0.5 text-primary-500" />
                          <span className="text-sm text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/booking"
                      className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 ${
                        tier.popular
                          ? "bg-neutral-900 text-white shadow-lg hover:bg-neutral-800"
                          : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      预定此套餐 <i className="fa-solid fa-arrow-right text-xs" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-600">
              需要全天候或多场次服务？
              <Link
                to="/contact"
                className="ml-2 font-semibold text-primary-600 hover:text-primary-700"
              >
                联系顾问获取定制方案 →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <section id="cases" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              PROJECT SHOWCASE
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              企业茶歇案例
            </h2>
            <p className="mt-4 text-neutral-600">
              了解我们如何为不同企业打造高品质的茶歇体验，呈现专业与品味。
            </p>
          </motion.div>

          <ProjectGallery projects={businessTeaCases} />
        </div>
      </section>

      <section className="bg-neutral-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              常见问题
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-start gap-4 text-lg">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        <i className="fa-solid fa-question text-sm" />
                      </span>
                      {faq.q}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-16">
                    <p className="leading-relaxed text-neutral-600">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600" />
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center text-white"
            >
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
                准备好升级您的商务茶歇体验了吗？
              </h2>
              <p className="mt-4 text-lg text-white/90">
                告诉我们您的会议安排，专属顾问将在24小时内反馈方案与报价。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <i className="fa-solid fa-calendar-week" />
                  填写需求
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <i className="fa-solid fa-comments" />
                  咨询顾问
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
