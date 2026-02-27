// 商品数据 - 花冠专卖店永盛烟酒
// 规格说明：香烟(盒/条)、白酒(瓶/提/箱)、礼盒(单规格)

const products = [
  // ========== 香烟（8款）==========
  {
    id: 1,
    name: "中华（软盒）",
    price: { "1盒": 65, "1条": 650 },
    category: "香烟",
    tags: ["热销"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=中华"
  },
  {
    id: 2,
    name: "玉溪（软盒）",
    price: { "1盒": 23, "1条": 230 },
    category: "香烟",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=玉溪"
  },
  {
    id: 3,
    name: "芙蓉王（硬盒）",
    price: { "1盒": 25, "1条": 250 },
    category: "香烟",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=芙蓉王"
  },
  {
    id: 4,
    name: "黄鹤楼（软盒）",
    price: { "1盒": 19, "1条": 190 },
    category: "香烟",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=黄鹤楼"
  },
  {
    id: 5,
    name: "利群（软盒）",
    price: { "1盒": 15, "1条": 150 },
    category: "香烟",
    tags: ["热销"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=利群"
  },
  {
    id: 6,
    name: "云烟（软盒）",
    price: { "1盒": 22, "1条": 220 },
    category: "香烟",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=云烟"
  },
  {
    id: 7,
    name: "南京（硬盒）",
    price: { "1盒": 12, "1条": 120 },
    category: "香烟",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=南京"
  },
  {
    id: 8,
    name: "苏烟（软盒）",
    price: { "1盒": 48, "1条": 480 },
    category: "香烟",
    tags: ["新品"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=苏烟"
  },

  // ========== 白酒（10款）==========
  {
    id: 11,
    name: "茅台（飞天）53°",
    price: { "1瓶": 1499 },
    category: "白酒",
    tags: ["热销"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=茅台"
  },
  {
    id: 12,
    name: "五粮液（普五）",
    price: { "1瓶": 899, "1提": 1798, "1箱": 5394 },
    category: "白酒",
    tags: ["热销"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=五粮液"
  },
  {
    id: 13,
    name: "剑南春（水晶剑）",
    price: { "1瓶": 458, "1提": 916, "1箱": 2748 },
    category: "白酒",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=剑南春"
  },
  {
    id: 14,
    name: "洋河（梦之蓝）",
    price: { "1瓶": 368, "1提": 736, "1箱": 2208 },
    category: "白酒",
    tags: ["新品"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=洋河"
  },
  {
    id: 15,
    name: "泸州老窖（特曲）",
    price: { "1瓶": 288, "1提": 576, "1箱": 1728 },
    category: "白酒",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=泸州老窖"
  },
  {
    id: 16,
    name: "郎酒（青花郎）",
    price: { "1瓶": 368, "1提": 736, "1箱": 2208 },
    category: "白酒",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=郎酒"
  },
  {
    id: 17,
    name: "汾酒（青花20）",
    price: { "1瓶": 168, "1提": 336, "1箱": 1008 },
    category: "白酒",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=汾酒"
  },
  {
    id: 18,
    name: "古井贡（年份原浆）",
    price: { "1瓶": 198, "1提": 396, "1箱": 1188 },
    category: "白酒",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=古井贡"
  },
  {
    id: 19,
    name: "舍得（智慧版）",
    price: { "1瓶": 458, "1提": 916, "1箱": 2748 },
    category: "白酒",
    tags: ["新品"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=舍得"
  },
  {
    id: 20,
    name: "水井坊（井台）",
    price: { "1瓶": 528, "1提": 1056, "1箱": 3168 },
    category: "白酒",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=水井坊"
  },

  // ========== 礼盒（7款）==========
  {
    id: 21,
    name: "中秋礼盒",
    price: { "1盒": 288 },
    category: "礼盒",
    tags: ["热销"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=中秋礼盒"
  },
  {
    id: 22,
    name: "春节套装",
    price: { "1套": 688 },
    category: "礼盒",
    tags: ["新品"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=春节套装"
  },
  {
    id: 23,
    name: "烟酒组合礼盒",
    price: { "1盒": 398 },
    category: "礼盒",
    tags: ["热销"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=烟酒组合"
  },
  {
    id: 24,
    name: "送礼佳品礼盒",
    price: { "1盒": 568 },
    category: "礼盒",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=送礼佳品"
  },
  {
    id: 25,
    name: "福字礼盒",
    price: { "1盒": 388 },
    category: "礼盒",
    tags: [],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=福字礼盒"
  },
  {
    id: 26,
    name: "豪华礼盒",
    price: { "1盒": 888 },
    category: "礼盒",
    tags: ["新品"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=豪华礼盒"
  },
  {
    id: 27,
    name: "实惠礼盒",
    price: { "1盒": 168 },
    category: "礼盒",
    tags: ["热销"],
    image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=实惠礼盒"
  }
];

// 店铺信息
const shopInfo = {
  name: "花冠专卖店永盛烟酒",
  phone: "138-0000-0000",
  address: "请添加地址",
  banner: "花冠专卖店永盛烟酒",
  wechat: ""
};
