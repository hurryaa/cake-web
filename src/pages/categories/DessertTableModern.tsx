import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectGallery from "@/components/ProjectGallery";
import { dessertTableCases } from "@/data/projectCases";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

const features = [
  {
    icon: "fa-wand-magic-sparkles",
    title: "定制设计",
    description: "根据活动主题和色彩偏好，量身定制独特的甜品台方案。",
  },
  {
    icon: "fa-utensils",
    title: "多样选择",
    description: "提供50+种甜品选择，满足不同口味和饮食需求。",
  },
  {
    icon: "fa-leaf",
    title: "健康食材",
    description: "精选优质原料，严格品质把控，确保新鲜健康。",
  },
  {
    icon: "fa-truck",
    title: "一站服务",
    description: "从设计、制作到配送、布置，提供全流程专业服务。",
  },
];

const pricingTiers = [
  {
    name: "经典套餐",
    priceRange: "¥60-80",
    unit: "/人",
    description: "适合中小型活动",
    guestCount: "20-50人",
    features: [
      "3层定制蛋糕",
      "60个精致甜点",
      "基础装饰布置",
      "现场服务2小时",
      "标准餐具配套",
    ],
    popular: false,
  },
  {
    name: "豪华套餐",
    priceRange: "¥100-130",
    unit: "/人",
    description: "最受欢迎的选择",
    guestCount: "50-100人",
    features: [
      "5层定制蛋糕",
      "100个高端甜点",
      "精美装饰布置",
      "现场服务3小时",
      "高端餐具配套",
      "专业摄影服务",
    ],
    popular: true,
  },
  {
    name: "尊享套餐",
    priceRange: "¥150-200",
    unit: "/人",
    description: "顶级奢华体验",
    guestCount: "100+人",
    features: [
      "7层定制蛋糕",
      "150个奢华甜点",
      "主题场景布置",
      "全程管家服务",
      "VIP级别配套",
      "专业摄影摄像",
      "定制礼品包装",
    ],
    popular: false,
  },
];

const faqs = [
  {
    q: "甜品台需要提前多久预订？",
    a: "建议至少提前2-3周预订，大型活动建议提前1个月，以确保有充足时间进行设计和准备。",
  },
  {
    q: "可以根据主题定制甜品吗？",
    a: "当然可以！我们的设计团队会根据您的活动主题、色彩偏好和场地风格，为您量身定制独特的甜品台方案。",
  },
  {
    q: "甜品台的配送和布置服务包含在价格内吗？",
    a: "市区内的配送和标准布置服务包含在套餐价格内，特殊装饰需求和周边地区配送可能需要额外收费。",
  },
  {
    q: "可以提供试吃服务吗？",
    a: "对于大型活动（宾客超过50人），我们提供免费试吃服务。小型活动也可预约试吃，费用可在正式订单中抵扣。",
  },
];

export default function DessertTableModern() {
  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=luxury%20dessert%20table%20display%20elegant%20pastel%20colors&sign=hero123"
            alt="精致甜品台"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
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
                <i className="fa-solid fa-cake-candles text-primary-200" />
                DESSERT TABLE
              </span>

              <h1 className="mt-6 text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
                精致<span className="font-semibold">甜品台</span>
              </h1>

              <p className="mt-6 text-xl leading-relaxed text-white/90">
                为您的特殊时刻打造视觉与味觉的双重盛宴，每一款甜品都是艺术与匠心的完美呈现。
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600"
                >
                  <i className="fa-solid fa-calendar-check" />
                  立即预订
                </Link>
                <a
                  href="#cases"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <i className="fa-solid fa-images" />
                  查看案例
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              WHY CHOOSE US
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              我们的服务优势
            </h2>
            <p className="mt-4 text-neutral-600">
              专业团队为您提供从设计到执行的全流程服务，确保每一个细节都完美呈现。
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

      {/* Pricing Section */}
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
              PRICING
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              套餐方案
            </h2>
            <p className="mt-4 text-neutral-600">
              灵活的套餐选择，满足不同规模和预算的活动需求。
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
                        最受欢迎
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
                      选择套餐 <i className="fa-solid fa-arrow-right text-xs" />
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
              需要更多定制化方案？
              <Link to="/contact" className="ml-2 font-semibold text-primary-600 hover:text-primary-700">
                联系我们的顾问团队 →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases Section */}
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
              SUCCESS STORIES
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              成功案例展示
            </h2>
            <p className="mt-4 text-neutral-600">
              查看我们为客户打造的精彩甜品台案例，每一个都是独一无二的艺术作品。
            </p>
          </motion.div>

          <ProjectGallery projects={dessertTableCases} />
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* CTA Section */}
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
                开始定制您的专属甜品台
              </h2>
              <p className="mt-4 text-lg text-white/90">
                专业顾问将在24小时内与您联系，提供个性化设计方案和详细报价。
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <i className="fa-solid fa-calendar-week" />
                  在线预订
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
