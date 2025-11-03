export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  priceRange: [number, number];
  images: string[];
  features: string[];
  popular: boolean;
  seasonal?: boolean;
}

export const products: Product[] = [
  // 甜品台系列
  {
    id: 1,
    name: "经典甜品台",
    category: "甜品台",
    description: "包含多种精致甜点的经典组合，适合各类中小型活动场合，提供多样化的口味选择。",
    priceRange: [888, 1688],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=dessert%20table%20with%20various%20pastries%20and%20macarons%20in%20pastel%20colors&sign=6db5490da007e973097792c142f679de",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=colorful%20dessert%20display%20with%20cupcakes%20cookies%20and%20macarons&sign=40520b97b9bce21784058d104c77ad26",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=elegant%20dessert%20table%20arrangement%20for%20celebration&sign=1a4f9b867e1d1df6098215164e26e45d"
    ],
    features: ["多种甜点组合", "精美摆盘设计", "可定制口味", "适合20-50人"],
    popular: true
  },
  
  // 商务茶歇系列
  {
    id: 2,
    name: "精致商务茶歇",
    category: "商务茶歇",
    description: "为商务会议和办公场合设计的精致茶歇方案，提供便捷食用的点心和饮品组合。",
    priceRange: [58, 128],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=business%20afternoon%20tea%20setup%20with%20sandwiches%20and%20pastries&sign=b32244854abd56586acffa901edfeab3",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=corporate%20tea%20break%20with%20finger%20foods%20and%20drinks&sign=77be660b865277042836b650968ca2d0",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=elegant%20office%20snack%20platter%20with%20variety%20of%20desserts&sign=aaed3fda095ac9ff6ca3f7f5f8917550"
    ],
    features: ["独立包装", "方便食用", "低糖选项", "按人计费"],
    popular: true
  },
  
  // 宝宝生日宴系列
  {
    id: 3,
    name: "童话宝宝宴甜品台",
    category: "宝宝生日宴甜品台",
    description: "专为宝宝生日设计的可爱主题甜品台，采用安全食材，造型可爱，色彩鲜艳。",
    priceRange: [1288, 2688],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=colorful%20children%20birthday%20dessert%20table%20with%20cartoon%20themes&sign=cf3362215cf58c9ed1754be2a193d095",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=kids%20party%20dessert%20display%20with%20animal%20shaped%20cookies&sign=e97e55c3c44349aad7dcd6165050809d",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=baby%20shower%20dessert%20table%20with%20pastel%20colors%20and%20toys&sign=23f9413ad19b50f296161997e1093d47"
    ],
    features: ["儿童安全食材", "可爱造型设计", "主题定制", "适合30-80人"],
    popular: true
  },
  
  // 婚宴甜品台系列
  {
    id: 4,
    name: "浪漫婚宴甜品台",
    category: "婚宴甜品台",
    description: "为婚礼设计的浪漫甜品台，优雅精致，可与婚礼主题和色彩相协调。",
    priceRange: [2888, 6888],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=elegant%20wedding%20dessert%20table%20with%20white%20and%20gold%20decorations&sign=8bc8a9dbc3afc1c7b22c8ba4ac0807a2",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=romantic%20wedding%20dessert%20display%20with%20flowers%20and%20pastries&sign=e8e2d8465802179103f7d29f0580139c",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=luxury%20wedding%20dessert%20table%20arrangement&sign=9540ddec01ec4571bbf8008c60331469"
    ],
    features: ["婚礼主题定制", "精致包装设计", "提供甜品卡", "适合80-200人"],
    popular: true
  },
  
  // 开业甜品台系列
  {
    id: 5,
    name: "庆典开业甜品台",
    category: "开业甜品台",
    description: "为企业开业和庆典活动设计的大型甜品展示，可融入企业LOGO和品牌元素。",
    priceRange: [1888, 5888],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=grand%20opening%20dessert%20table%20with%20company%20logo&sign=bf4278aeef8240235537962b169f663d",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=corporate%20event%20dessert%20display%20with%20branding&sign=9da0940459601407f46baf28dcb9de4c",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=celebration%20dessert%20table%20with%20colorful%20treats&sign=1282c919893cc1c2001c51f09cdfdedc"
    ],
    features: ["品牌元素融入", "大型展示设计", "多人份设计", "适合50-200人"],
    popular: false
  },
  
  // 主题节日甜品台系列
  {
    id: 6,
    name: "中秋主题甜品台",
    category: "主题节日甜品台",
    description: "结合中秋传统元素设计的节日甜品台，包含月饼和季节限定甜品。",
    priceRange: [1588, 3288],
    images: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=mid%20autumn%20festival%20dessert%20table%20with%20mooncakes&sign=4b1e79fb893658385ea90dcf675e70b1",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=chinese%20festival%20dessert%20display%20with%20traditional%20elements&sign=60e3bd7f0f999d49c481ace333e96f60",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=holiday%20dessert%20table%20with%20seasonal%20decorations&sign=31ede886d904a0d08d3adccc2b8434a4"
    ],
    features: ["节日主题设计", "季节限定甜品", "传统与现代结合", "适合30-100人"],
    popular: false,
    seasonal: true
  }
];

// 获取热门产品
export const getPopularProducts = () => {
  return products.filter(product => product.popular);
};

// 获取季节性产品
export const getSeasonalProducts = () => {
  return products.filter(product => product.seasonal);
};

// 按分类获取产品
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

// 获取单个产品详情
export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};