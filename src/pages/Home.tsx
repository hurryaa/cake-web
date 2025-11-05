import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPopularProducts, getSeasonalProducts } from "@/data/products";
import { formatPrice, lazyLoadImage } from "@/lib/utils";
import InteractiveBackground from "@/components/InteractiveBackground";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const heroStats = [
  {
    label: "成功案例",
    value: "5000+",
    description: "遍布婚礼、企业与高端庆典",
  },
  {
    label: "客户满意度",
    value: "98%",
    description: "真实评价见证服务品质",
  },
  {
    label: "专业团队",
    value: "15+",
    description: "资深甜品师与活动设计师",
  },
];

const categoryHighlights = [
  {
    title: "甜品台",
    description: "多款精致甜点组合，满足不同口味与主题需求",
    icon: "fa-cake-candles",
    link: "/categories/dessert-table",
    people: "20-80人",
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=elegant%20dessert%20table%20display%20with%20macarons&sign=aa39673f54707c1aa44a0a995d0b2aa0",
    accent: "from-primary-500/10 to-secondary-500/10",
  },
  {
    title: "商务茶歇",
    description: "便捷精致的茶歇方案，为商务会议增添专业体验",
    icon: "fa-briefcase",
    link: "/categories/business-tea",
    people: "10-200人",
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=business%20tea%20break%20setup%20with%20pastries&sign=d2db5b2ca9ad5d1b9c4ece15a1ad0d8b",
    accent: "from-blue-500/10 to-primary-500/10",
  },
  {
    title: "宝宝生日宴",
    description: "安全健康的童趣甜品，为孩子留下甜蜜回忆",
    icon: "fa-baby",
    link: "/categories/baby-birthday",
    people: "30-100人",
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=colorful%20kids%20birthday%20dessert%20table&sign=f5d7f74a1cb5f1c3c0f4f776b40c0404",
    accent: "from-secondary-500/10 to-primary-500/10",
  },
  {
    title: "婚宴甜品台",
    description: "浪漫优雅的婚礼甜品，为宾客献上视觉与味觉盛宴",
    icon: "fa-heart",
    link: "/categories/wedding",
    people: "80-200人",
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=luxury%20wedding%20dessert%20table%20with%20flowers&sign=2980a5cc42005c2798fffe82fa55f3f1",
    accent: "from-rose-500/10 to-primary-500/10",
  },
  {
    title: "开业庆典",
    description: "品牌定制甜品设计，强化活动记忆点",
    icon: "fa-ribbon",
    link: "/categories/opening",
    people: "50-300人",
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=grand%20opening%20dessert%20display&sign=c143554323f48bc057ca488c23b0e887",
    accent: "from-amber-500/10 to-primary-500/10",
  },
  {
    title: "主题节日",
    description: "融合传统与创意的节日限定甜品，打造沉浸式体验",
    icon: "fa-calendar-days",
    link: "/categories/holiday",
    people: "30-150人",
    image:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=seasonal%20holiday%20dessert%20table&sign=0f8c1c1b44c496619ef89809c1c4c298",
    accent: "from-purple-500/10 to-primary-500/10",
  },
];

const servicePillars = [
  {
    title: "定制设计",
    description: "根据活动主题、色彩与宾客构成量身打造甜品台设计方案。",
    icon: "fa-palette",
  },
  {
    title: "全程托管",
    description: "从选品、制作到配送、布置与撤场，全流程专业团队负责。",
    icon: "fa-headset",
  },
  {
    title: "品质保证",
    description: "精选优质食材与食品安全标准，每一口都兼顾口感与健康。",
    icon: "fa-award",
  },
];

const processSteps = [
  {
    title: "沟通需求",
    description: "设计顾问了解活动信息与预算，输出初步方案建议。",
    icon: "fa-comments",
  },
  {
    title: "设计确认",
    description: "提供视觉效果图与甜品清单，支持试吃与多轮调整。",
    icon: "fa-brush",
  },
  {
    title: "现场呈现",
    description: "专业团队现场搭建、布置与收尾，确保活动顺利进行。",
    icon: "fa-truck",
  },
  {
    title: "售后跟进",
    description: "活动后回访总结，提供图像素材与服务优化建议。",
    icon: "fa-handshake",
  },
];

const categorySlugMap: Record<string, string> = {
  甜品台: "dessert-table",
  商务茶歇: "business-tea",
  宝宝生日宴甜品台: "baby-birthday",
  婚宴甜品台: "wedding",
  开业甜品台: "opening",
  主题节日甜品台: "holiday",
};

export default function Home() {
  const popularProducts = getPopularProducts();
  const seasonalProducts = getSeasonalProducts();

  const popularByCategory = popularProducts.reduce(
    (acc, product) => {
      const key = product.category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(product);
      return acc;
    },
    {} as Record<string, typeof popularProducts>
  );

  const seasonalHighlight = seasonalProducts[0];

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=luxury%20dessert%20event%20hall%20with%20warm%20lighting&sign=5a5f0a504dc3ff86f1a1528b893c3e14"
            alt="SweetDelights hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/20" />
        </div>

        <div className="relative z-10">
          <InteractiveBackground className="py-28 md:py-32 lg:py-40">
            <div className="container mx-auto px-4">
              <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
                  >
                    <i className="fa-solid fa-sparkles text-primary-200" />
                    定制甜品体验 · 专属庆典策划
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mt-6 text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl"
                  >
                    打造令人难忘的
                    <span className="font-semibold text-primary-200"> 甜蜜时刻</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
                  >
                    从婚礼、商务活动到品牌发布会，我们以匠心手作的甜品与专业设计团队，为每一场活动提供高定化、沉浸式的甜品体验。
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-10 flex flex-col gap-4 sm:flex-row"
                  >
                    <Link
                      to="/booking"
                      className="inline-flex items-center justify-center rounded-full bg-primary-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600"
                    >
                      <i className="fa-solid fa-calendar-check mr-2" /> 立即预订
                    </Link>
                    <Link
                      to="/about"
                      className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                    >
                      <i className="fa-solid fa-circle-info mr-2" /> 了解品牌
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-12 grid gap-6 sm:grid-cols-3"
                  >
                    {heroStats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                      >
                        <p className="text-sm uppercase tracking-widest text-white/60">
                          {item.label}
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-white">
                          {item.value}
                        </p>
                        <p className="mt-2 text-sm text-white/70">{item.description}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <Card variant="glass" className="bg-white/90">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-2xl text-neutral-900">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                          <i className="fa-solid fa-crown" />
                        </span>
                        热门活动推荐
                      </CardTitle>
                      <CardDescription>
                        即刻解锁最受欢迎的高端甜品台方案
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
                        <div>
                          <p className="text-sm text-neutral-500">婚宴甜品台</p>
                          <p className="mt-1 text-lg font-semibold text-neutral-900">
                            浪漫星光系列
                          </p>
                        </div>
                        <span className="rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-600">
                          限量预约
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4">
                        <div>
                          <p className="text-sm text-neutral-500">商务茶歇</p>
                          <p className="mt-1 text-lg font-semibold text-neutral-900">
                            峯会行政套餐
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-neutral-500">
                          ¥128/人 起
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-neutral-200/60 pt-4">
                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                      >
                        获取定制方案 <i className="fa-solid fa-arrow-right" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </InteractiveBackground>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              SERVICES
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              全场景甜品服务，一站式满足
            </h2>
            <p className="mt-4 text-neutral-600">
              无论是婚礼、企业活动还是节日庆典，我们都能提供契合主题的定制甜品解决方案。
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {categoryHighlights.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card variant="hover" className="overflow-hidden">
                  <div className={`relative h-48 bg-gradient-to-br ${item.accent}`}>
                    <img
                      {...lazyLoadImage({
                        src: item.image,
                        alt: item.title,
                        className: "h-full w-full object-cover",
                      })}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-800">
                      <i className={`fa-solid ${item.icon}`} />
                    </div>
                    <div className="absolute bottom-5 left-5 text-white/85 text-sm font-medium">
                      适合人数：{item.people}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="justify-between">
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                    >
                      查看详情 <i className="fa-solid fa-arrow-right" />
                    </Link>
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800"
                    >
                      预约咨询 <i className="fa-solid fa-calendar" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products with Tabs */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
                POPULAR
              </span>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
                热门套餐，口碑之选
              </h2>
              <p className="mt-4 max-w-2xl text-neutral-600">
                精选广受欢迎的甜品套餐，覆盖婚礼、商务、宝宝宴等多种场景，灵感随心搭配。
              </p>
            </div>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-2 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-50"
            >
              定制我的甜品台 <i className="fa-solid fa-wand-magic-sparkles" />
            </Link>
          </motion.div>

          <Tabs
            defaultValue={Object.keys(popularByCategory)[0] ?? "甜品台"}
            className="mt-12"
          >
            <TabsList className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-3 bg-neutral-100/80 p-1.5">
              {Object.keys(popularByCategory).map((category) => (
                <TabsTrigger key={category} value={category} className="px-6 py-2">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(popularByCategory).map(([category, products]) => (
              <TabsContent key={category} value={category}>
                <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <Card key={product.id} variant="hover" className="flex h-full flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          {...lazyLoadImage({
                            src: product.images[0],
                            alt: product.name,
                            className: "h-full w-full object-cover",
                          })}
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800">
                          人气推荐
                        </div>
                      </div>
                      <CardHeader className="flex-1">
                        <CardTitle className="text-2xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                        <div className="mt-6 space-y-2">
                          {product.features.slice(0, 4).map((feature) => (
                            <div key={feature} className="flex items-center text-sm text-neutral-600">
                              <i className="fa-solid fa-circle-check mr-2 text-primary-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between border-t border-neutral-200 pt-4">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-neutral-400">
                            价格区间
                          </p>
                          <p className="text-lg font-semibold text-primary-600">
                            {`${formatPrice(product.priceRange[0])} - ${formatPrice(product.priceRange[1])}`}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Link
                            to={`/categories/${categorySlugMap[product.category] ?? "dessert-table"}`}
                            className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                          >
                            了解详情
                          </Link>
                          <Link
                            to="/booking"
                            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800"
                          >
                            立即咨询
                          </Link>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Seasonal Highlight */}
      {seasonalHighlight && (
        <section className="bg-gradient-to-r from-primary-50 via-secondary-50 to-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">
                  SEASONAL
                </span>
                <h2 className="mt-6 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
                  {seasonalHighlight.name}
                </h2>
                <p className="mt-4 text-neutral-600">{seasonalHighlight.description}</p>
                <div className="mt-6 space-y-3">
                  {seasonalHighlight.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-neutral-600">
                      <i className="fa-solid fa-check mr-2 text-primary-500" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/booking"
                    className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600"
                  >
                    预约品鉴 <i className="fa-solid fa-mug-saucer ml-2" />
                  </Link>
                  <Link
                    to={`/categories/${categorySlugMap[seasonalHighlight.category] ?? "holiday"}`}
                    className="inline-flex items-center justify-center rounded-full border border-primary-200 px-6 py-3 text-sm font-semibold text-primary-600 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-100"
                  >
                    查看详情 <i className="fa-solid fa-arrow-right ml-2" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card variant="glass" className="overflow-hidden">
                  <div className="relative h-[360px]">
                    <img
                      {...lazyLoadImage({
                        src: seasonalHighlight.images[0],
                        alt: seasonalHighlight.name,
                        className: "h-full w-full object-cover",
                      })}
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-primary-600">
                      {formatPrice(seasonalHighlight.priceRange[0])} 起
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Service Pillars */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              EXPERIENCE
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
              我们如何确保每一场活动完美呈现
            </h2>
            <p className="mt-4 text-neutral-600">
              由跨学科团队协作完成，从视觉创意到品控执行，打造高标准、高颜值的甜品体验。
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {servicePillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card variant="glass" className="bg-white/90 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <i className={`fa-solid ${pillar.icon} text-xl`} />
                  </div>
                  <CardTitle className="mt-6 text-2xl text-neutral-900">
                    {pillar.title}
                  </CardTitle>
                  <CardDescription className="mt-4 text-neutral-600">
                    {pillar.description}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-neutral-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-200">
                PROCESS
              </span>
              <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
                四步打造专属甜品体验
              </h2>
            </div>
            <p className="max-w-xl text-base text-white/70">
              每一步都有专人陪伴，确保设计落地、执行无忧。我们关注细节，让您专注于庆祝快乐。
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card variant="glass" className="border-white/10 bg-white/10 p-8 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/20 text-primary-200">
                    <i className={`fa-solid ${step.icon} text-xl`} />
                  </div>
                  <CardTitle className="mt-6 text-2xl text-white">{step.title}</CardTitle>
                  <CardDescription className="mt-4 text-white/70">
                    {step.description}
                  </CardDescription>
                  <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/60">
                    0{index + 1}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=delicate%20dessert%20handover%20moment&sign=6a57f96b4bfa1f6c15c1cb3f52d4ef5c"
            alt="预订SweetDelights"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/80" />
        </div>
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-light tracking-tight sm:text-4xl"
              >
                准备好让您的活动闪耀甜蜜光彩了吗？
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-4 text-base text-white/80"
              >
                提交预订需求，专属顾问将在24小时内与您联系，提供个性化甜品设计方案。
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600"
                >
                  <i className="fa-solid fa-calendar-week" /> 立即预约
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <i className="fa-solid fa-comments" /> 联系顾问
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
