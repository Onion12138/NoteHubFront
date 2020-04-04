import MockAdapter from "axios-mock-adapter";
import { axios } from "./request";

const mock = new MockAdapter(axios);

const response = {
  code: 200,
  message: "success",
};

mock.onPost("/noteApi/user/login").reply(200, {
  ...response,
  data: {
    profileUrl: "https://avatars2.githubusercontent.com/u/33611404?s=400&v=4",
    email: "969023014@qq.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2OTAyMzAxNEBxcS5jb20ifQ.eyJleHAiOjE1ODQ1MzczMTh9.NXc5rZol6Tdyoxzl9qGLFHM9pv4wB2RaW0wDsiXGSp8",
    username: "onion",
  },
});

mock.onPost("/noteApi/user/register").reply(200, {
  ...response,
});

mock.onPost("/noteApi/user/uploadProfile").reply(200, {
  ...response,
  data: {
    url: "https://avatars2.githubusercontent.com/u/33611404?s=400&v=4",
  },
});

mock.onPost("/noteApi/user/addMindMap").reply(200, {
  ...response,
});

mock.onGet("/noteApi/user/findUser").reply(200, {
  ...response,
  data: {
    email: "969023014@qq.com",
    username: "onion",
    profileUrl: "https://avatars2.githubusercontent.com/u/33611404?s=400&v=4",
  },
});

mock.onGet("/noteApi/note/counter").reply(200, {
  ...response,
  data: {
    star: "12",
    hate: "5",
    collect: "2",
    fork: "0",
    view: "100",
  },
});

mock.onPost("/noteApi/note/starOrHate").reply(200, {
  ...response,
});

mock.onPost("/noteApi/user/collectNote").reply(200, {
  ...response,
});

mock.onGet("/noteApi/note/findOne").reply(200, {
  ...response,
  data: {
    id: "1583672134533332739",
    authorEmail: "969023014@qq.com",
    description: "Redis笔记",
    authority: true,
    forkFrom: "",
    createTime: "2020-03-08T20:55:34.548",
    updateTime: "2020-03-08T20:55:34.548",
    tag: "后端开发,NoSQL",
    keywords:
      "缓存,Redis,key,数据库,缓存数据,超热,数据,请求,过期,预热,降级,服务器,命中,查询,无法,预警,限流,用户,系统启动,获取数据",
    titleTree: {
      label: "",
      children: [
        {
          label: "Redis",
          children: [
            {
              label: "Docker",
              children: [],
            },
            {
              label: "企业级解决方案",
              children: [
                {
                  label: "缓存预热",
                  children: [],
                },
                {
                  label: "缓存雪崩",
                  children: [],
                },
                {
                  label: "缓存击穿",
                  children: [],
                },
                {
                  label: "缓存穿透",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    summary:
      "在一个较短时间内缓存中较多的key集中过期Redis未命中向数据库获取数据数据库同时接受大量请求无法及时处理Redis大量请求积压数据库崩溃重启后缓存中仍然无数据可用",
    content:
      '## Redis\n\n### Docker\n\n```shell\ndocker run -di -p 6379:6379 --label redis redis --requirepass "969023014"\n```\n\n```yml\nspring:\n\tredis:\n    host: 120.77.176.55\n    port: 6379\n    password: 123456\n```\n\n\n\nredis模拟用于降级处理的预警\n\n```java\nprivate Object saveOrderFail(HttpServeletRequest request){\n  \tString saveOrderKey = "save-order";\n  \tString sendValue = redisTemplate.opsForValue().get(saveOrderKey);\n  \tfinal String ip = request.getRemoteAddr();\n  \tnew Thread(()->{\n      \tif(StringUtils.isBlank(sendValue)) {\n          \tSystem.out.println("用户下单失败,IP地址为":ip);\n          \tredisTemplate.opsForValue().set(saveOrderKey,"save-order-fail",20,TimeUnit.SECONDS);\n        }else{\n          \tSystem.out.println("20s内不要重复发送短信");\n        }\n    }).start();\n}\n```\n\n### 企业级解决方案\n\n#### 缓存预热\n\n系统启动前，提前将相关的缓存数据直接加载到缓存系统，避免用户在请求时，先查询数据库，然后将数据缓存。用户直接查询实现被预热的缓存数据。\n\n#### 缓存雪崩\n\n在一个较短时间内，缓存中较多的key集中过期。Redis未命中，向数据库获取数据，数据库同时接受大量请求无法及时处理，Redis大量请求积压，数据库崩溃，重启后缓存中仍然无数据可用。\n\n解决办法\n\n- 页面静态化\n- 多级缓存\n- 灾难预警机制\n- 限流降级\n\n- 数据有效期调整\n- LRU与LFU切换\n- 超热数据使用永久Key\n\n#### 缓存击穿\n\n某个超热key过期，对数据库服务器造成压力。Redis正常。\n\n#### 缓存穿透\n\n非正常URL访问，Redis无法命中，服务器无法查询到数据。\n\n解决方法\n\n- 缓存null\n- 白名单策略\n- 实时监控\n- key加密',
    valid: true,
  },
});

mock.onPost("/noteApi/note/publish").reply(200, {
  ...response,
  data: "1583672134533332739",
});

mock.onPost("/noteApi/user/mindMapNote").reply(200, {
  ...response,
});

mock.onGet("/noteApi/user/getMindMap", { params: { num: "0" } }).reply(200, {
  ...response,
  data: {
    children: [
      {
        children: [
          {
            children: [],
            label: "机器学习",
            value: "机器学习",
          },
          {
            children: [],
            label: "深度学习",
            value: "深度学习",
          },
          {
            children: [],
            label: "计算机视觉",
            value: "计算机视觉",
          },
          {
            children: [],
            label: "自然语言处理",
            value: "自然语言处理",
          },
        ],
        label: "人工智能",
        value: "人工智能",
      },
      {
        children: [
          {
            children: [],
            label: "前端框架",
            value: "前端框架",
          },
          {
            children: [],
            label: "Html/css",
            value: "Html/css",
          },
          {
            children: [],
            label: "前端工具",
            value: "前端工具",
          },
        ],
        label: "前端开发",
        value: "前端开发",
      },
      {
        children: [
          {
            children: [],
            label: "Spring全家桶",
            value: "Spring全家桶",
          },
          {
            children: [],
            label: "微服务",
            value: "微服务",
          },
          {
            children: [],
            label: "Python框架",
            value: "Python框架",
          },
          {
            children: [],
            label: "关系数据库",
            value: "关系数据库",
          },
          {
            children: [
              {
                children: null,
                label: "Redis笔记",
                value: "1583672134533332739",
              },
            ],
            label: "NoSQL",
            value: "NoSQL",
          },
          {
            children: [],
            label: "分布式",
            value: "分布式",
          },
          {
            children: [],
            label: "后端工具",
            value: "后端工具",
          },
        ],
        label: "后端开发",
        value: "后端开发",
      },
      {
        children: [
          {
            children: [],
            label: "iOS开发",
            value: "iOS开发",
          },
          {
            children: [],
            label: "安卓开发",
            value: "安卓开发",
          },
          {
            children: [],
            label: "微信小程序",
            value: "微信小程序",
          },
        ],
        label: "移动开发",
        value: "移动开发",
      },
      {
        children: [
          {
            children: [],
            label: "Linux",
            value: "Linux",
          },
          {
            children: [],
            label: "软件测试",
            value: "软件测试",
          },
          {
            children: [],
            label: "虚拟化技术",
            value: "虚拟化技术",
          },
          {
            children: [],
            label: "服务器",
            value: "服务器",
          },
        ],
        label: "测试运维",
        value: "测试运维",
      },
      {
        children: [
          {
            children: [],
            label: "云计算",
            value: "云计算",
          },
          {
            children: [],
            label: "数据挖掘",
            value: "数据挖掘",
          },
          {
            children: [],
            label: "大数据框架",
            value: "大数据框架",
          },
          {
            children: [],
            label: "数学建模",
            value: "数学建模",
          },
        ],
        label: "大数据",
        value: "大数据",
      },
      {
        children: [
          {
            children: [],
            label: "高等数学",
            value: "高等数学",
          },
          {
            children: [],
            label: "线性代数",
            value: "线性代数",
          },
          {
            children: [],
            label: "离散数学",
            value: "离散数学",
          },
          {
            children: [],
            label: "概率论与数理统计",
            value: "概率论与数理统计",
          },
          {
            children: [],
            label: "凸优化",
            value: "凸优化",
          },
        ],
        label: "数学",
        value: "数学",
      },
      {
        children: [
          {
            children: [],
            label: "操作系统",
            value: "操作系统",
          },
          {
            children: [],
            label: "计算机网络",
            value: "计算机网络",
          },
          {
            children: [],
            label: "计算机组成",
            value: "计算机组成",
          },
          {
            children: [],
            label: "数据库原理",
            value: "数据库原理",
          },
          {
            children: [],
            label: "编译原理",
            value: "编译原理",
          },
          {
            children: [],
            label: "数据结构",
            value: "数据结构",
          },
          {
            children: [],
            label: "算法",
            value: "算法",
          },
          {
            children: [],
            label: "面向对象分析与设计",
            value: "面向对象分析与设计",
          },
        ],
        label: "学科基础",
        value: "学科基础",
      },
      {
        children: [
          {
            children: [],
            label: "Java",
            value: "Java",
          },
          {
            children: [],
            label: "Python",
            value: "Python",
          },
          {
            children: [],
            label: "C",
            value: "C",
          },
          {
            children: [],
            label: "C++",
            value: "C++",
          },
          {
            children: [],
            label: "Javascript",
            value: "Javascript",
          },
          {
            children: [],
            label: "其他语言",
            value: "其他语言",
          },
        ],
        label: "编程语言",
        value: "编程语言",
      },
      {
        children: [
          {
            children: [],
            label: "分类太渣",
            value: "分类太渣",
          },
          {
            children: [],
            label: "想自定义",
            value: "想自定义",
          },
        ],
        label: "其他",
        value: "其他",
      },
    ],
    label: "默认索引",
    value: "默认索引",
  },
});

mock.onGet("/noteApi/user/getMindMap").reply(200, {
  ...response,
  data: [
    {
      children: [
        {
          children: [],
          label: "概念",
          value: "概念",
        },
        {
          children: [],
          label: "原理",
          value: "原理",
        },
        {
          children: [
            {
              children: [],
              label: "存储过程",
              value: "存储过程",
            },
          ],
          label: "SQL",
          value: "SQL",
        },
        {
          children: [
            {
              children: [],
              label: "Redis笔记",
              value: "1583672134533332739",
            },
          ],
          label: "应用",
          value: "应用",
        },
        {
          children: [
            {
              children: [],
              label: "与SpringBoot",
              value: "与SpringBoot",
            },
          ],
          label: "实战",
          value: "实战",
        },
      ],
      label: "数据库",
      value: "数据库",
    },
  ],
});

mock.onGet("/noteApi/note/findTag").reply(200, {
  data: [
    {
      id: 0,
      value: "人工智能",
      label: "人工智能",
      children: [
        {
          id: 12,
          value: "机器学习",
          label: "机器学习",
          children: null,
        },
        {
          id: 13,
          value: "深度学习",
          label: "深度学习",
          children: null,
        },
        {
          id: 14,
          value: "计算机视觉",
          label: "计算机视觉",
          children: null,
        },
        {
          id: 15,
          value: "自然语言处理",
          label: "自然语言处理",
          children: null,
        },
      ],
    },
    {
      id: 1,
      value: "前端开发",
      label: "前端开发",
      children: [
        {
          id: 24,
          value: "前端框架",
          label: "前端框架",
          children: null,
        },
        {
          id: 25,
          value: "Html/css",
          label: "Html/css",
          children: null,
        },
        {
          id: 26,
          value: "前端工具",
          label: "前端工具",
          children: null,
        },
      ],
    },
    {
      id: 2,
      value: "后端开发",
      label: "后端开发",
      children: [
        {
          id: 36,
          value: "Spring全家桶",
          label: "Spring全家桶",
          children: null,
        },
        {
          id: 37,
          value: "微服务",
          label: "微服务",
          children: null,
        },
        {
          id: 38,
          value: "Python框架",
          label: "Python框架",
          children: null,
        },
        {
          id: 39,
          value: "关系数据库",
          label: "关系数据库",
          children: null,
        },
        {
          id: 40,
          value: "NoSQL",
          label: "NoSQL",
          children: null,
        },
        {
          id: 41,
          value: "分布式",
          label: "分布式",
          children: null,
        },
        {
          id: 42,
          value: "后端工具",
          label: "后端工具",
          children: null,
        },
      ],
    },
    {
      id: 3,
      value: "移动开发",
      label: "移动开发",
      children: [
        {
          id: 48,
          value: "iOS开发",
          label: "iOS开发",
          children: null,
        },
        {
          id: 49,
          value: "安卓开发",
          label: "安卓开发",
          children: null,
        },
        {
          id: 50,
          value: "微信小程序",
          label: "微信小程序",
          children: null,
        },
      ],
    },
    {
      id: 4,
      value: "测试运维",
      label: "测试运维",
      children: [
        {
          id: 60,
          value: "Linux",
          label: "Linux",
          children: null,
        },
        {
          id: 61,
          value: "软件测试",
          label: "软件测试",
          children: null,
        },
        {
          id: 62,
          value: "虚拟化技术",
          label: "虚拟化技术",
          children: null,
        },
        {
          id: 63,
          value: "服务器",
          label: "服务器",
          children: null,
        },
      ],
    },
    {
      id: 5,
      value: "大数据",
      label: "大数据",
      children: [
        {
          id: 72,
          value: "云计算",
          label: "云计算",
          children: null,
        },
        {
          id: 73,
          value: "数据挖掘",
          label: "数据挖掘",
          children: null,
        },
        {
          id: 74,
          value: "大数据框架",
          label: "大数据框架",
          children: null,
        },
        {
          id: 75,
          value: "数学建模",
          label: "数学建模",
          children: null,
        },
      ],
    },
    {
      id: 6,
      value: "数学",
      label: "数学",
      children: [
        {
          id: 84,
          value: "高等数学",
          label: "高等数学",
          children: null,
        },
        {
          id: 85,
          value: "线性代数",
          label: "线性代数",
          children: null,
        },
        {
          id: 86,
          value: "离散数学",
          label: "离散数学",
          children: null,
        },
        {
          id: 87,
          value: "概率论与数理统计",
          label: "概率论与数理统计",
          children: null,
        },
        {
          id: 88,
          value: "凸优化",
          label: "凸优化",
          children: null,
        },
      ],
    },
    {
      id: 7,
      value: "学科基础",
      label: "学科基础",
      children: [
        {
          id: 96,
          value: "操作系统",
          label: "操作系统",
          children: null,
        },
        {
          id: 97,
          value: "计算机网络",
          label: "计算机网络",
          children: null,
        },
        {
          id: 98,
          value: "计算机组成",
          label: "计算机组成",
          children: null,
        },
        {
          id: 99,
          value: "数据库原理",
          label: "数据库原理",
          children: null,
        },
        {
          id: 100,
          value: "编译原理",
          label: "编译原理",
          children: null,
        },
        {
          id: 101,
          value: "数据结构",
          label: "数据结构",
          children: null,
        },
        {
          id: 102,
          value: "算法",
          label: "算法",
          children: null,
        },
        {
          id: 103,
          value: "面向对象分析与设计",
          label: "面向对象分析与设计",
          children: null,
        },
      ],
    },
    {
      id: 8,
      value: "编程语言",
      label: "编程语言",
      children: [
        {
          id: 108,
          value: "Java",
          label: "Java",
          children: null,
        },
        {
          id: 109,
          value: "Python",
          label: "Python",
          children: null,
        },
        {
          id: 110,
          value: "C",
          label: "C",
          children: null,
        },
        {
          id: 111,
          value: "C++",
          label: "C++",
          children: null,
        },
        {
          id: 112,
          value: "Javascript",
          label: "Javascript",
          children: null,
        },
        {
          id: 113,
          value: "其他语言",
          label: "其他语言",
          children: null,
        },
      ],
    },
    {
      id: 9,
      value: "其他",
      label: "其他",
      children: [
        {
          id: 120,
          value: "分类太渣",
          label: "分类太渣",
          children: null,
        },
        {
          id: 121,
          value: "想自定义",
          label: "想自定义",
          children: null,
        },
      ],
    },
  ],
});

mock.onGet("/searchApi/search").reply(200, {
  ...response,
  data: {
    content: [
      {
        id: "1583672134533332739",
        email: "969023014@qq.com",
        createTime: "2020-03-08",
        updateTime: "2020-03-08",
        summary:
          "在一个较短时间内缓存中较多的key集中过期Redis未命中向数据库获取数据数据库同时接受大量请求无法及时处理Redis大量请求积压数据库崩溃重启后缓存中仍然无数据可用",
        keywords:
          "缓存,Redis,key,数据库,缓存数据,超热,数据,请求,过期,预热,降级,服务器,命中,查询,无法,预警,限流,用户,系统启动,获取数据",
        description: "Redis笔记",
      },
    ],
    pageable: {
      sort: {
        unsorted: true,
        sorted: false,
        empty: true,
      },
      offset: 0,
      pageSize: 10,
      pageNumber: 0,
      unpaged: false,
      paged: true,
    },
    facets: [],
    aggregations: null,
    scrollId: null,
    maxScore: 1.0097005,
    totalPages: 1,
    totalElements: 1,
    size: 10,
    first: true,
    numberOfElements: 1,
    number: 0,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    last: true,
    empty: false,
  },
});

mock.onGet("/noteApi/note/findByTag").reply(200, {
  ...response,
  data: {
    content: [
      {
        id: "1583672134533332739",
        authorEmail: "969023014@qq.com",
        description: "Redis笔记",
        authority: true,
        forkFrom: "",
        createTime: "2020-03-08T20:55:34.548",
        updateTime: "2020-03-08T20:55:34.548",
        tag: "后端开发,NoSQL",
        keywords:
          "缓存,Redis,key,数据库,缓存数据,超热,数据,请求,过期,预热,降级,服务器,命中,查询,无法,预警,限流,用户,系统启动,获取数据",
        titleTree: {
          label: "",
          children: [
            {
              label: "Redis",
              children: [
                {
                  label: "Docker",
                  children: [],
                },
                {
                  label: "企业级解决方案",
                  children: [
                    {
                      label: "缓存预热",
                      children: [],
                    },
                    {
                      label: "缓存雪崩",
                      children: [],
                    },
                    {
                      label: "缓存击穿",
                      children: [],
                    },
                    {
                      label: "缓存穿透",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        summary:
          "在一个较短时间内缓存中较多的key集中过期Redis未命中向数据库获取数据数据库同时接受大量请求无法及时处理Redis大量请求积压数据库崩溃重启后缓存中仍然无数据可用",
        content:
          '## Redis\n\n### Docker\n\n```shell\ndocker run -di -p 6379:6379 --name redis redis --requirepass "969023014"\n```\n\n```yml\nspring:\n\tredis:\n    host: 120.77.176.55\n    port: 6379\n    password: 123456\n```\n\n\n\nredis模拟用于降级处理的预警\n\n```java\nprivate Object saveOrderFail(HttpServeletRequest request){\n  \tString saveOrderKey = "save-order";\n  \tString sendValue = redisTemplate.opsForValue().get(saveOrderKey);\n  \tfinal String ip = request.getRemoteAddr();\n  \tnew Thread(()->{\n      \tif(StringUtils.isBlank(sendValue)) {\n          \tSystem.out.println("用户下单失败,IP地址为":ip);\n          \tredisTemplate.opsForValue().set(saveOrderKey,"save-order-fail",20,TimeUnit.SECONDS);\n        }else{\n          \tSystem.out.println("20s内不要重复发送短信");\n        }\n    }).start();\n}\n```\n\n### 企业级解决方案\n\n#### 缓存预热\n\n系统启动前，提前将相关的缓存数据直接加载到缓存系统，避免用户在请求时，先查询数据库，然后将数据缓存。用户直接查询实现被预热的缓存数据。\n\n#### 缓存雪崩\n\n在一个较短时间内，缓存中较多的key集中过期。Redis未命中，向数据库获取数据，数据库同时接受大量请求无法及时处理，Redis大量请求积压，数据库崩溃，重启后缓存中仍然无数据可用。\n\n解决办法\n\n- 页面静态化\n- 多级缓存\n- 灾难预警机制\n- 限流降级\n\n- 数据有效期调整\n- LRU与LFU切换\n- 超热数据使用永久Key\n\n#### 缓存击穿\n\n某个超热key过期，对数据库服务器造成压力。Redis正常。\n\n#### 缓存穿透\n\n非正常URL访问，Redis无法命中，服务器无法查询到数据。\n\n解决方法\n\n- 缓存null\n- 白名单策略\n- 实时监控\n- key加密',
        valid: true,
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false,
    },
    totalPages: 1,
    totalElements: 1,
    last: true,
    size: 10,
    first: true,
    numberOfElements: 1,
    number: 0,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    empty: false,
  },
});
