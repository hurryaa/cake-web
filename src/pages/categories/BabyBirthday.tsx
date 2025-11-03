import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectGallery from "@/components/ProjectGallery";
import { babyBirthdayCases } from "@/data/projectCases";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const features = [
  {
    icon: "fa-baby",
    title: "儿童安全食材",
    description: "使用低糖、低敏食材，严格控制添加，守护宝贝健康。",
  },
  {
    icon: "fa-hat-wizard",
    title: "主题定制",
    description: "根据宝宝喜好打造专属故事主题，营造沉浸式氛围。",
  },
  {
    icon: "fa-gamepad",
    title: "互动体验",
    description: "设计互动游戏与拍照区域，让孩子们尽情玩乐。",
  },
  {
    icon: "fa-camera-retro",
    title: "全程记录",
    description: "提供摄影摄像、现场引导服务，留住每个精彩瞬间。",
  },
];

const pricingTiers = [
  {
    name: "暖心派对",
    priceRange: "¥70-90",
    unit: "/人",
    description: "温馨周岁宴",
    guestCount: "30-50人",
    features: [
      "主题蛋糕",
      "60个儿童甜点",
      "基础布置与气球",
      "儿童安全餐具",
      "2小时现场服务",
    ],
    popular: false,
  },
  {
    name: "梦幻派对",
    priceRange: "¥90-120",
    unit: "/人",
    description: "人气首选",
    guestCount: "50-80人",
    features: [
      "主题造型蛋糕",
      "80个定制甜点",
      "梦幻舞台布景",
      "亲子互动环节",
      "专业摄影摄像",
      "3小时管家服务",
    ],
    popular: true,
  },
  {
    name: "明星派对",
    priceRange: "¥130-160",
    unit: "/人",
    description: "高端专属",
    guestCount: "80-120人",
    features: [
      "多层主题蛋糕",
      "120个奢华甜点",
      "大型主题搭建",
      "主持与表演",
      "明星化妆区",
      "定制伴手礼",
    ],
    popular: false,
  },
];

const faqs = [
  {
    q: "甜点是否适合儿童食用？",
    a: "我们采用低糖、低脂、无酒精的食材，严格控制过敏源，保证儿童安全食用。",
  },
  {
    q: "可以提供主题设计建议吗？",
    a: "有专属设计师为您推荐主题风格，并根据宝宝喜好定制视觉物料与互动环节。",
  },
  {
    q: "现场服务包含哪些内容？",
    a: "包含布置搭建、甜品补给、互动引导、现场清洁等，让家长更轻松。",
  },
  {
    q: "是否提供摄影摄像？",
    a: "可选配专业摄影、视频拍摄及即影即有打印服务，记录珍贵瞬间。",
  },
];

export default function BabyBirthday() {
  return (
    <div className="scroll-smooth">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=cute%20baby%20birthday%20dessert%20table%20party&sign=c09425d6c72ec89fa7d8340160341675"
            alt="宝宝生日甜品台"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 py-32 md:py-40">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white/85 backdrop-blur-sm">
                <i className="fa-solid fa-baby text-secondary-200" />
                BABY BIRTHDAY
              </span>

              <h1 className="mt-6 text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
                宝宝<span className="font-semibold">主题生日宴</span>
              </h1>

              <p className="mt-6 text-xl leading-relaxed text-white/85">
                用甜蜜的味道和童话般的布景，为宝贝的成长记录下独一无二的纪念日。
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary-600"
                >
                  <i className="fa-solid fa-calendar-check" />
                  预约策划
                </Link>
                <a
                  href="#cases"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <i className="fa-solid fa-photo-film" />
                  浏览案例
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
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-500">
              HIGHLIGHTS
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              宝宝生日宴服务亮点
            </h2>
            <p className="mt-4 text-neutral-600">
              让孩子开心、家长省心，我们关注每一个细节，打造充满童趣与温度的生日派对。
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
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
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

      <section className="bg-gradient-to-b from-secondary-50 via-white to-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-500">
              PACKAGES
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              生日宴套餐推荐
            </h2>
            <p className="mt-4 text-neutral-600">
              从温馨亲友聚会到大型主题派对，灵活选择满足不同预算与人数需求。
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
                  className={`relative h-full ${tier.popular ? "border-2 border-secondary-500" : ""}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-secondary-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                        <i className="fa-solid fa-heart" />
                        热门推荐
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="mt-2">{tier.description}</CardDescription>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-secondary-600">
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
                          <i className="fa-solid fa-circle-check mt-0.5 text-secondary-500" />
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
                      预约此套餐 <i className="fa-solid fa-arrow-right text-xs" />
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
              想打造专属主题王国？
              <Link
                to="/contact"
                className="ml-2 font-semibold text-secondary-600 hover:text-secondary-700"
              >
                联系策划师 →
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
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-500">
              HAPPY MOMENTS
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              甜蜜生日派对案例
            </h2>
            <p className="mt-4 text-neutral-600">
              记录宝贝成长的珍贵时刻，我们用镜头与甜品，讲述属于你的生日故事。
            </p>
          </motion.div>

          <ProjectGallery projects={babyBirthdayCases} />
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
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-500">
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
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600">
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
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 via-primary-500 to-secondary-600" />
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
                让我们一起为宝贝打造专属的童话派对
              </h2>
              <p className="mt-4 text-lg text-white/90">
                留下快乐童年的甜蜜瞬间，即刻与策划团队沟通专属方案。
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
