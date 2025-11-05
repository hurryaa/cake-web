import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectGallery from "@/components/ProjectGallery";
import { weddingCases } from "@/data/projectCases";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const features = [
  {
    icon: "fa-palette",
    title: "主题定制",
    description: "根据婚礼主题色与场地风格，打造独一无二的甜品台设计。",
  },
  {
    icon: "fa-sparkles",
    title: "奢华呈现",
    description: "高端食材、精致摆盘、浪漫装饰，呈现婚礼的至高品味。",
  },
  {
    icon: "fa-camera",
    title: "全程记录",
    description: "配备专业摄影团队，记录甜品台每一个美好瞬间。",
  },
  {
    icon: "fa-user-tie",
    title: "管家服务",
    description: "专属婚礼策划师全程跟进，确保每一个细节完美无瑕。",
  },
];

const pricingTiers = [
  {
    name: "浪漫经典",
    priceRange: "¥120-150",
    unit: "/人",
    description: "小型精致婚礼",
    guestCount: "50-100人",
    features: [
      "5层婚礼蛋糕",
      "120个精品甜点",
      "浪漫主题布置",
      "鲜花装饰",
      "4小时现场服务",
      "专业摄影",
    ],
    popular: false,
  },
  {
    name: "梦幻奢华",
    priceRange: "¥180-220",
    unit: "/人",
    description: "人气婚礼套餐",
    guestCount: "100-200人",
    features: [
      "7层定制蛋糕",
      "200个高端甜点",
      "梦幻场景搭建",
      "灯光氛围",
      "全天管家服务",
      "摄影摄像",
      "定制伴手礼",
    ],
    popular: true,
  },
  {
    name: "皇室殿堂",
    priceRange: "¥280-350",
    unit: "/人",
    description: "顶级婚礼体验",
    guestCount: "200+人",
    features: [
      "10层宫廷蛋糕",
      "300个奢华甜点",
      "宫廷级装饰",
      "定制香槟区",
      "明星团队服务",
      "全程直播",
      "礼宾车队",
      "高端伴手礼",
    ],
    popular: false,
  },
];

const faqs = [
  {
    q: "婚礼甜品台需要提前多久预订？",
    a: "建议至少提前3-6个月预订，旺季（5-10月）建议提前半年以上，以便充分沟通设计方案。",
  },
  {
    q: "可以试吃和看样吗？",
    a: "当然可以！我们提供免费试吃服务，并可安排到往期婚礼现场参观实景效果。",
  },
  {
    q: "甜品台与婚礼场地如何配合？",
    a: "我们会提前到场地勘察，根据场地风格、空间布局和婚礼主题，定制专属设计方案。",
  },
  {
    q: "是否包含配送和现场布置？",
    a: "是的，所有套餐均包含配送、现场布置、全程服务及活动结束后的撤场清洁。",
  },
];

export default function WeddingDessert() {
  return (
    <div className="scroll-smooth">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=elegant%20luxury%20wedding%20dessert%20table%20romantic%20roses&sign=wedding123"
            alt="婚礼甜品台"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-rose-900/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
        </div>

        <div className="relative z-10 py-32 md:py-44">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md"
              >
                <i className="fa-solid fa-heart text-rose-300" />
                WEDDING DESSERT TABLE
              </motion.span>

              <h1 className="mt-8 font-serif text-5xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
                婚礼<span className="font-medium">甜品台</span>
              </h1>

              <p className="mt-8 text-xl leading-relaxed text-white/90">
                在人生最重要的时刻，用精致甜品与浪漫装饰，为爱情故事书写最甜蜜的篇章。
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-semibold text-rose-600 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-white/40"
                >
                  <i className="fa-solid fa-calendar-check" />
                  预约婚礼策划
                </Link>
                <a
                  href="#cases"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-10 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                >
                  <i className="fa-solid fa-images" />
                  浏览婚礼案例
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="bg-white py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mb-20 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-rose-500">
              WHY CHOOSE US
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
              婚礼甜品台服务亮点
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              为每一对新人量身打造，让婚礼甜品台成为宾客津津乐道的美好回忆。
            </p>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full border-neutral-100 transition-all duration-500 hover:-translate-y-2 hover:border-rose-200 hover:shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <i className={`fa-solid ${feature.icon} text-2xl`} />
                    </div>
                    <h3 className="mb-4 text-xl font-semibold text-neutral-900">{feature.title}</h3>
                    <p className="leading-relaxed text-neutral-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-rose-50/50 via-white to-white py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mb-20 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-rose-500">
              PRICING PACKAGES
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
              婚礼套餐方案
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              从浪漫小型婚礼到盛大宫廷式婚宴，灵活套餐满足不同规模与预算。
            </p>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card
                  variant={tier.popular ? "gradient" : "default"}
                  allowOverflow={tier.popular}
                  className={`relative h-full ${
                    tier.popular ? "scale-105 border-2 border-rose-500 shadow-2xl" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl">
                        <i className="fa-solid fa-crown" />
                        最受欢迎
                      </span>
                    </div>
                  )}

                  <CardHeader className="pb-8 pt-12 text-center">
                    <CardTitle className="font-serif text-3xl">{tier.name}</CardTitle>
                    <CardDescription className="mt-3 text-base">{tier.description}</CardDescription>
                    <div className="mt-8">
                      <span className="text-5xl font-bold text-rose-600">{tier.priceRange}</span>
                      <span className="text-neutral-600">{tier.unit}</span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-neutral-600">
                      适合 {tier.guestCount}
                    </p>
                  </CardHeader>

                  <CardContent className="px-8 pb-10">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <i className="fa-solid fa-circle-check mt-1 text-rose-500" />
                          <span className="text-sm leading-relaxed text-neutral-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/booking"
                      className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 ${
                        tier.popular
                          ? "bg-neutral-900 text-white shadow-xl hover:shadow-2xl"
                          : "border-2 border-neutral-200 bg-white text-neutral-700 hover:border-rose-300 hover:bg-rose-50"
                      }`}
                    >
                      选择此套餐 <i className="fa-solid fa-arrow-right text-xs" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-neutral-600">
              需要更高端的定制方案？
              <Link to="/contact" className="ml-2 font-semibold text-rose-600 hover:text-rose-700">
                联系我们的婚礼顾问 →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <section id="cases" className="bg-white py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mb-20 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-rose-500">
              REAL WEDDINGS
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
              真实婚礼案例
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              见证我们为新人打造的浪漫时刻，每一场婚礼都是独一无二的爱情故事。
            </p>
          </motion.div>

          <ProjectGallery projects={weddingCases} />
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-50 to-white py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-rose-500">
              FAQ
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light tracking-tight text-neutral-900">
              常见问题
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-neutral-200 transition-all duration-300 hover:border-rose-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-4 text-lg">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                        <i className="fa-solid fa-question text-sm" />
                      </span>
                      {faq.q}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-18">
                    <p className="leading-relaxed text-neutral-600">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center text-white"
            >
              <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">
                让我们为您的婚礼增添甜蜜时刻
              </h2>
              <p className="mt-6 text-xl leading-relaxed text-white/90">
                专业婚礼策划团队将在24小时内与您联系，提供专属设计方案与详细报价。
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-sm font-semibold text-rose-600 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-white/40"
                >
                  <i className="fa-solid fa-calendar-week" />
                  预约婚礼策划
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-full border-2 border-white px-10 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
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
