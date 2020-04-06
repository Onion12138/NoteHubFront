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

mock.onPost("/noteApi/user/deleteMindMap").reply(200, {
  ...response,
});

mock.onPost("/noteApi/user/updateMindMap").reply(200, {
  ...response,
});

mock.onGet("/noteApi/user/getCollection").reply(200, {
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

mock.onGet("/recommend").reply(200, {
  code: 200,
  message: "success",
  data: [
    {
      id: "1586068543095394114",
      authorEmail: "969023014@qq.com",
      description: "ThreadLocal用法与原理",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:35:43.105",
      updateTime: "2020-04-05T14:35:43.105",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "ThreadLocal",
            children: [
              {
                value: "场景",
                children: [],
              },
            ],
          },
          {
            value: "举例",
            children: [
              {
                value: "原理",
                children: [],
              },
              {
                value: "重要方法",
                children: [],
              },
              {
                value: "内存泄露",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        "场景2：演示用户信息在多层服务中调用 原理Thread类中有ThreadLocalMap成员属性：ThreadLocal.ThreadLocalMap threadLocals = null  ThreadLocal 场景- 每个线程需要一个独享的对象，通常为工具类，如SimpleDateFormat和Random - 每个线程需要保存全局变量，如拦截器中获取用户信息，不同方法直接使用，避免参数传递的麻烦  举例场景：演示30个线程打印30个不同的时间如果将dateFormat声明为static，而不使用threadLocal，会打印出相同时间，因为是线程不安全的 - get()- set()- remove() 内存泄露ThreadLocalMap的每个Entry都是一个对key的弱引用，对value的强引用",
      content:
        '### ThreadLocal\n#### 场景\n- 每个线程需要一个独享的对象，通常为工具类，如SimpleDateFormat和Random。\n- 每个线程需要保存全局变量，如拦截器中获取用户信息，不同方法直接使用，避免参数传递的麻烦。\n### 举例\n场景：演示30个线程打印30个不同的时间\n```java\npublic class Demo1 {\n    public static ExecutorService threadPool = Executors.newFixedThreadPool(10);\n//    public static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");\n    public static void main(String[] args) {\n        for (int i = 0; i < 30; i++) {\n            int finalI = i;\n            threadPool.submit(() -> {\n                String date = date(finalI);\n                System.out.println(date);\n            });\n        }\n    }\n    threadPool.shutdown();\n    public static String date(int seconds){\n        Date date = new Date(1000*seconds);\n        SimpleDateFormat format = ThreadFormat.dateFormatThreadLocal.get();\n        return format.format(date);\n    }\n}\nclass ThreadFormat{\n    public static ThreadLocal<SimpleDateFormat> dateFormatThreadLocal =\n            ThreadLocal.withInitial(()->new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"));\n}\n```\n如果将dateFormat声明为static，而不使用threadLocal，会打印出相同时间，因为是线程不安全的。\n场景2：演示用户信息在多层服务中调用\n```java\npublic class Demo2 {\n    public static void main(String[] args) {\n        new Service1().process();\n    }\n}\nclass User {\n    String name;\n    public User(String name) {\n        this.name = name;\n    }\n}\nclass UserContextHolder {\n    public static ThreadLocal<User> holder = new ThreadLocal<>();\n}\nclass Service1 {\n    public void process() {\n        User user = new User("Onion");\n        UserContextHolder.holder.set(user);\n        new Service2().process();\n    }\n}\nclass Service2 {\n    public void process() {\n        User user = UserContextHolder.holder.get();\n        System.out.println(user.name);\n        new Service3().process();\n    }\n}\nclass Service3 {\n    public void process() {\n        User user = UserContextHolder.holder.get();\n        System.out.println(user.name + " is handsome");\n        UserContextHolder.holder.remove();\n    }\n}\n\n```\n#### 原理\nThread类中有ThreadLocalMap成员属性：ThreadLocal.ThreadLocalMap threadLocals = null;\n每个Thread有一个TheadLocalMap，存储多个ThreadLocal<T>。\n键即为ThreadLocal。\n#### 重要方法\n- initialValue() 延迟加载，调用get时，如果set了，就不需要调用了。通常每个线程只调用一次，remove后再get，可以再次调用。\n- get()\n```java\n    public T get() {\n        Thread t = Thread.currentThread();\n        ThreadLocalMap map = getMap(t);\n        if (map != null) {\n            ThreadLocalMap.Entry e = map.getEntry(this);\n            if (e != null) {\n                @SuppressWarnings("unchecked")\n                T result = (T)e.value;\n                return result;\n            }\n        }\n        return setInitialValue();\n    }  \n    ThreadLocalMap getMap(Thread t) {\n        return t.threadLocals;\n    }\n```\n- set()\n```java\n    public void set(T value) {\n        Thread t = Thread.currentThread();\n        ThreadLocalMap map = getMap(t);\n        if (map != null) {\n            map.set(this, value);\n        } else {\n            createMap(t, value);\n        }\n    }\n```\n- remove()\n```java\n     public void remove() {\n         ThreadLocalMap m = getMap(Thread.currentThread());\n         if (m != null) {\n             m.remove(this);\n         }\n     }\n```\n#### 内存泄露\nThreadLocalMap的每个Entry都是一个对key的弱引用，对value的强引用。线程如果不终止，value无法回收，因为存在如下调用链。Thread->ThreadLocalMap->Entry(key is null)->Value。所以key为null的Entry，set，remove，rehash会把对应的value也置为null。\n```java\npublic class ThreadLocal<T>{\n    static class ThreadLocalMap {\n        static class Entry extends WeakReference<ThreadLocal<?>> {\n            Object value;\n            Entry(ThreadLocal<?> k, Object v) {\n                super(k);\n                value = v;\n            }\n        }\n}\n```\n阿里规约：使用完ThreadLocal后，调用remove方法。',
      valid: true,
    },
    {
      id: "1586068852824991925",
      authorEmail: "969023014@qq.com",
      description: "并发编程不变性",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:40:52.824",
      updateTime: "2020-04-05T14:40:52.824",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "不变性",
            children: [
              {
                value: "final",
                children: [],
              },
              {
                value: "栈封闭",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        "> 分析以下代码运行结果核心思路：是否能在编译时被确定 栈封闭在方法中新建的局部变量，存储在每个线程私有的栈空间，不会有线程安全问题  不变性 final> 把所有属性声明为final是否意味着对象不可变 不一定，如果属性本身也是引用类型，只是引用不可变，引用对象的属性依然可变",
      content:
        '## 不变性\n### final\n> 把所有属性声明为final是否意味着对象不可变？\n\n不一定，如果属性本身也是引用类型，只是引用不可变，引用对象的属性依然可变。\n\n> 分析以下代码运行结果\n\n核心思路：是否能在编译时被确定\n\n```java\nclass FinalStringDemo1 {\n\n    public static void main(String[] args) {\n        String a = "wukong2";\n        final String b = "wukong";\n        String d = "wukong";\n        String c = b + 2;\n        String e = d + 2;\n        System.out.println((a == c)); //true\n        System.out.println((a == e)); //false\n    }\n}\npublic class FinalStringDemo2 {\n\n    public static void main(String[] args) {\n        String a = "wukong2";\n        final String b = getDashixiong();\n        String c = b + 2;\n        System.out.println(a == c); //false\n\n    }\n\n    private static String getDashixiong() {\n        return "wukong";\n    }\n}\n```\n\n\n### 栈封闭\n在方法中新建的局部变量，存储在每个线程私有的栈空间，不会有线程安全问题。\n```java\npublic class StackConfinement implements Runnable {\n\n    int index = 0;\n\n    public void inThread() {\n        int neverGoOut = 0;\n        synchronized (this) {\n            for (int i = 0; i < 10000; i++) {\n                neverGoOut++;\n            }\n        }\n\n        System.out.println("栈内保护的数字是线程安全的：" + neverGoOut);\n    }\n\n    @Override\n    public void run() {\n        for (int i = 0; i < 10000; i++) {\n            index++;\n        }\n        inThread();\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        StackConfinement r1 = new StackConfinement();\n        Thread thread1 = new Thread(r1);\n        Thread thread2 = new Thread(r1);\n        thread1.start();\n        thread2.start();\n        thread1.join();\n        thread2.join();\n        System.out.println(r1.index);\n    }\n}\n```\n',
      valid: true,
    },
    {
      id: "1586068933865126338",
      authorEmail: "969023014@qq.com",
      description: "ThreadLocal原理解析",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:42:13.865",
      updateTime: "2020-04-05T14:42:13.865",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "ThreadLocal",
            children: [
              {
                value: "场景",
                children: [],
              },
              {
                value: "举例",
                children: [],
              },
              {
                value: "原理",
                children: [],
              },
              {
                value: "重要方法",
                children: [],
              },
              {
                value: "内存泄露",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        "场景2：演示用户信息在多层服务中调用 原理Thread类中有ThreadLocalMap成员属性：ThreadLocal.ThreadLocalMap threadLocals = null  ThreadLocal 场景- 每个线程需要一个独享的对象，通常为工具类，如SimpleDateFormat和Random - 每个线程需要保存全局变量，如拦截器中获取用户信息，不同方法直接使用，避免参数传递的麻烦 [12aebb1f3642cb4d74f125d6bb2e9c07.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p552) 重要方法- initialValue() 延迟加载，调用get时，如果set了，就不需要调用了  举例场景：演示30个线程打印30个不同的时间如果将dateFormat声明为static，而不使用threadLocal，会打印出相同时间，因为是线程不安全的",
      content:
        '## ThreadLocal\n### 场景\n- 每个线程需要一个独享的对象，通常为工具类，如SimpleDateFormat和Random。\n- 每个线程需要保存全局变量，如拦截器中获取用户信息，不同方法直接使用，避免参数传递的麻烦。\n### 举例\n场景：演示30个线程打印30个不同的时间\n```java\npublic class Demo1 {\n    public static ExecutorService threadPool = Executors.newFixedThreadPool(10);\n//    public static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");\n    public static void main(String[] args) {\n        for (int i = 0; i < 30; i++) {\n            int finalI = i;\n            threadPool.submit(() -> {\n                String date = date(finalI);\n                System.out.println(date);\n            });\n        }\n    }\n    threadPool.shutdown();\n    public static String date(int seconds){\n        Date date = new Date(1000*seconds);\n        SimpleDateFormat format = ThreadFormat.dateFormatThreadLocal.get();\n        return format.format(date);\n    }\n}\nclass ThreadFormat{\n    public static ThreadLocal<SimpleDateFormat> dateFormatThreadLocal =\n            ThreadLocal.withInitial(()->new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"));\n}\n```\n如果将dateFormat声明为static，而不使用threadLocal，会打印出相同时间，因为是线程不安全的。\n场景2：演示用户信息在多层服务中调用\n```java\npublic class Demo2 {\n    public static void main(String[] args) {\n        new Service1().process();\n    }\n}\nclass User {\n    String name;\n    public User(String name) {\n        this.name = name;\n    }\n}\nclass UserContextHolder {\n    public static ThreadLocal<User> holder = new ThreadLocal<>();\n}\nclass Service1 {\n    public void process() {\n        User user = new User("Onion");\n        UserContextHolder.holder.set(user);\n        new Service2().process();\n    }\n}\nclass Service2 {\n    public void process() {\n        User user = UserContextHolder.holder.get();\n        System.out.println(user.name);\n        new Service3().process();\n    }\n}\nclass Service3 {\n    public void process() {\n        User user = UserContextHolder.holder.get();\n        System.out.println(user.name + " is handsome");\n        UserContextHolder.holder.remove();\n    }\n}\n\n```\n### 原理\nThread类中有ThreadLocalMap成员属性：ThreadLocal.ThreadLocalMap threadLocals = null;\n每个Thread有一个TheadLocalMap，存储多个ThreadLocal<T>。\n键即为ThreadLocal。\n![12aebb1f3642cb4d74f125d6bb2e9c07.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p552)\n### 重要方法\n- initialValue() 延迟加载，调用get时，如果set了，就不需要调用了。通常每个线程只调用一次，remove后再get，可以再次调用。\n- get()\n```java\n    public T get() {\n        Thread t = Thread.currentThread();\n        ThreadLocalMap map = getMap(t);\n        if (map != null) {\n            ThreadLocalMap.Entry e = map.getEntry(this);\n            if (e != null) {\n                @SuppressWarnings("unchecked")\n                T result = (T)e.value;\n                return result;\n            }\n        }\n        return setInitialValue();\n    }  \n    ThreadLocalMap getMap(Thread t) {\n        return t.threadLocals;\n    }\n```\n- set()\n```java\n    public void set(T value) {\n        Thread t = Thread.currentThread();\n        ThreadLocalMap map = getMap(t);\n        if (map != null) {\n            map.set(this, value);\n        } else {\n            createMap(t, value);\n        }\n    }\n```\n- remove()\n```java\n     public void remove() {\n         ThreadLocalMap m = getMap(Thread.currentThread());\n         if (m != null) {\n             m.remove(this);\n         }\n     }\n```\n### 内存泄露\nThreadLocalMap的每个Entry都是一个对key的弱引用，对value的强引用。线程如果不终止，value无法回收，因为存在如下调用链。Thread->ThreadLocalMap->Entry(key is null)->Value。所以key为null的Entry，set，remove，rehash会把对应的value也置为null。\n```java\npublic class ThreadLocal<T>{\n    static class ThreadLocalMap {\n        static class Entry extends WeakReference<ThreadLocal<?>> {\n            Object value;\n            Entry(ThreadLocal<?> k, Object v) {\n                super(k);\n                value = v;\n            }\n        }\n}\n```\n阿里规约：使用完ThreadLocal后，调用remove方法。',
      valid: true,
    },
    {
      id: "1586069055442331132",
      authorEmail: "969023014@qq.com",
      description: "Java线程池原理与应用",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:44:15.443",
      updateTime: "2020-04-05T14:44:15.443",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "线程池",
            children: [
              {
                value: "使用原因",
                children: [],
              },
              {
                value: "线程添加流程图",
                children: [],
              },
              {
                value: "构造函数参数",
                children: [],
              },
              {
                value: "演示",
                children: [],
              },
              {
                value: "经验值",
                children: [],
              },
              {
                value: "常见线程池总结",
                children: [],
              },
              {
                value: "方法",
                children: [],
              },
              {
                value: "拒绝策略",
                children: [],
              },
              {
                value: "钩子函数",
                children: [],
              },
              {
                value: "状态",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        "[3cf35cde920ee256e0d803268d94335c.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p553) 构造函数参数 演示场景1：内存溢出场景2：定时 经验值CPU密集型（加密，计算hash等）：最佳线程数为CPU核心数1-2倍耗时IO型（读写数据库、文件、网络读写等）：最佳线程数可以大于CPU核心数若干倍，参考Brain Goetz的计算方法：线程数=CPU核心数*（1+平均等待时间/平均工作时间） 常见线程池总结| 参数          | Fixed                | Cached            | Scheduled         | Single || ------------- | -------------------- | ----------------- | ----------------- | ------ || corePoolSize  | constructor-arg      | 0                 | constructor-arg   | 1      || maxPoolSize   | same as corePoolSize | Integer.MAX_VALUE | Integer.MAX_VALUE | 1      || keepAliveTime | 0                    | 60 seconds        | 0                 | 0      || workQueue     | Linked               | Synchronous       | DelayedWork       | Linked | 方法 拒绝策略时机- Executor关闭后，提交新任务会被拒绝- Executor对最大线程和工作队列容量使用有限边界并已经达到饱和拒绝策略- AbortPolicy- DiscardPolicy- DiscardOldestPolicy- CallerRunsPolicy 钩子函数 状态- RUNNING：接受新任务并处理排队任务- SHUTDOWN：不接受新任务，处理排队任务- STOP：不接受新任务，不处理排队任务，中断正在进行的任务- TIDYING：所有任务终止，workCOunt为0，将运行terminate()钩子方法- TERMINATED：terminate()运行完成 使用线程池，用少量的线程保持工作，可以反复执行任务，减少线程创建和销毁的开销  线程池 使用原因反复创建线程开销大，过多的线程大量占用内存  线程添加流程图",
      content:
        '## 线程池\n### 使用原因\n反复创建线程开销大，过多的线程大量占用内存。\n使用线程池，用少量的线程保持工作，可以反复执行任务，减少线程创建和销毁的开销。\n### 线程添加流程图\n![3cf35cde920ee256e0d803268d94335c.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p553)\n### 构造函数参数\n```java\npublic ThreadPoolExecutor(int corePoolSize,\n                              int maximumPoolSize,\n                              long keepAliveTime,\n                              TimeUnit unit,\n                              BlockingQueue<Runnable> workQueue,\n                              ThreadFactory threadFactory,\n                              RejectedExecutionHandler handler)\n  //corePoolSize 核心线程数\n  /*\n  1.线程数小于corePoolSize，即使其他工作线程处于空闲状态也会创建新线程来运行任务\n  2.线程数大于等于corePoolSize小于maximumPoolSize，将任务放进队列\n  3.队列已满，线程数小于maximumPoolSize，创建新线程来运行任务\n  4.队列已满，线程数大于等于maximumPoolSize，拒绝该任务\n  */\n  \n  //maximumPoolSize \n  /*\n  1.设置corePoolSize和maximumPoolSize相同，可以创建固定大小的线程池\n  2.设置maximumPoolSize为Integer.MAX_VALUE，可以允许线程池容纳任意数量的并发任务\n  3.如果使用无界队列LinkedBlockingQueue，线程数不会超过corePoolSize\n  4.线程池希望保持较少的线程数，并且只有在负载很大时才增加它\n  */\n  \n  //keepAliveTime\n  /*\n  当前线程数多于corePoolSize，如果多余的线程空闲时间超过keepAliveTime会被终止\n  */\n  \n  //workQueue\n  /*\n  SynchronousQueue：直接交接，无容量\n  LinkedBlockingQueue：无界队列\n  ArrayBlockingQueue：有界队列\n  */\n  \n  //threadFactory 线程工厂\n  /*\n  默认使用Executors.defaultThreadFactory()，创建出的线程都在同一个线程组，拥有同样的NORM_PRIORITY优先级并且都不是守护线程，可以自行制定\n  */\n  \n  //handler 拒绝处理器\n```\n### 演示\n场景1：内存溢出\n```java\npublic class ThreadPool {\n    public static void main(String[] args) {\n        ExecutorService executorService = Executors.newFixedThreadPool(1);\n        for (int i = 0; i < Integer.MAX_VALUE; i++) {\n            executorService.execute(new Task());\n        }\n    }\n}\nclass Task implements Runnable {\n    @Override\n    public void run() {\n        try {\n            Thread.sleep(100000000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n    }\n}\n```\n场景2：定时\n```java\npublic class ThreadPool {\n    Executors executors;\n    public static void main(String[] args) {\n        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(10);\n//        executorService.schedule(new Task(),5, TimeUnit.SECONDS);\n        executorService.scheduleAtFixedRate(new Task(), 1, 3, TimeUnit.SECONDS);\n    }\n}\nclass Task implements Runnable {\n    @Override\n    public void run() {\n        try {\n            Thread.sleep(500);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n        System.out.println(Thread.currentThread().getName());\n    }\n}\n```\n### 经验值\nCPU密集型（加密，计算hash等）：最佳线程数为CPU核心数1-2倍\n耗时IO型（读写数据库、文件、网络读写等）：最佳线程数可以大于CPU核心数若干倍，参考Brain Goetz的计算方法：\n线程数=CPU核心数*（1+平均等待时间/平均工作时间）\n### 常见线程池总结\n| 参数          | Fixed                | Cached            | Scheduled         | Single |\n| ------------- | -------------------- | ----------------- | ----------------- | ------ |\n| corePoolSize  | constructor-arg      | 0                 | constructor-arg   | 1      |\n| maxPoolSize   | same as corePoolSize | Integer.MAX_VALUE | Integer.MAX_VALUE | 1      |\n| keepAliveTime | 0                    | 60 seconds        | 0                 | 0      |\n| workQueue     | Linked               | Synchronous       | DelayedWork       | Linked |\n### 方法\n```java\nvoid shutdown(); //现存任务继续执行，后续任务拒绝。后续调用execute()会抛出RejectedExecutionException\nboolean isShutdown(); //执行shutdown()后会返回true\nboolean isTerminated(); //执行完毕返回true\nboolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException;\n/*\n1.在规定时间内执行完毕（非关闭），返回true\n2.在规定时间未执行完毕，返回false\n3.在规定时间内被中断，抛出InterruptedException\n*/\nList<Runnable> shutdownNow(); //立刻关闭线程池，返回正在等待的线程\n\npublic class ThreadPool1 {\n    public static void main(String[] args) throws InterruptedException {\n        ExecutorService executorService = Executors.newFixedThreadPool(10);\n        for (int i = 0; i < 100; i++) {\n            executorService.execute(new Task());\n        }\n        Thread.sleep(1500);\n        executorService.shutdownNow();\n    }\n}\nclass Task implements Runnable {\n    @Override\n    public void run() {\n        try {\n            Thread.sleep(500);\n            System.out.println(Thread.currentThread().getName());\n        } catch (InterruptedException e) {\n            System.out.println(Thread.currentThread().getName() + "被中断");\n        }\n    }\n}\n```\n### 拒绝策略\n时机\n\n- Executor关闭后，提交新任务会被拒绝\n- Executor对最大线程和工作队列容量使用有限边界并已经达到饱和\n\n拒绝策略\n\n- AbortPolicy\n- DiscardPolicy\n- DiscardOldestPolicy\n- CallerRunsPolicy\n\n### 钩子函数\n```java\npublic class Pauseable extends ThreadPoolExecutor {\n    private boolean isPaused;\n\n    private final ReentrantLock lock = new ReentrantLock();\n\n    private Condition unpaused = lock.newCondition();\n\n    public Pauseable(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue) {\n        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue);\n    }\n    public Pauseable(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory) {\n        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory);\n    }\n    public Pauseable(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, RejectedExecutionHandler handler) {\n        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, handler);\n    }\n    public Pauseable(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler) {\n        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory, handler);\n    }\n\n    @Override\n    protected void beforeExecute(Thread t, Runnable r) {\n        super.beforeExecute(t, r);\n        lock.lock();\n        try {\n            while (isPaused) {\n                unpaused.await();\n            }\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } finally {\n            lock.unlock();\n        }\n    }\n\n    public void pause() {\n        lock.lock();\n        try {\n            isPaused = true;\n        } finally {\n            lock.unlock();\n        }\n    }\n\n    public void resume() {\n        lock.lock();\n        try {\n            isPaused = false;\n            unpaused.signalAll();\n        } finally {\n            lock.unlock();\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Pauseable pauseable = new Pauseable(5, 10, 10L, TimeUnit.SECONDS, new LinkedBlockingQueue<>());\n        Runnable runnable = () -> {\n            System.out.println("我被执行");\n            try {\n                Thread.sleep(10);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        };\n        for (int i = 0; i < 1000; i++) {\n            pauseable.execute(runnable);\n        }\n        Thread.sleep(1500);\n        pauseable.pause();\n        System.out.println("线程池被暂停");\n        Thread.sleep(1500);\n        pauseable.resume();\n        System.out.println("线程池被恢复");\n    }\n}\n```\n### 状态\n- RUNNING：接受新任务并处理排队任务\n- SHUTDOWN：不接受新任务，处理排队任务\n- STOP：不接受新任务，不处理排队任务，中断正在进行的任务\n- TIDYING：所有任务终止，workCOunt为0，将运行terminate()钩子方法\n- TERMINATED：terminate()运行完成\n',
      valid: true,
    },
    {
      id: "1586069132872713516",
      authorEmail: "969023014@qq.com",
      description: "Java并发容器",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:45:32.872",
      updateTime: "2020-04-05T14:45:32.872",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "并发容器",
            children: [
              {
                value: "ConcurrentHashMap",
                children: [],
              },
              {
                value: "copyOnWriteArrayList",
                children: [
                  {
                    value: "场景：",
                    children: [],
                  },
                  {
                    value: "读写规则：",
                    children: [],
                  },
                  {
                    value: "演示：",
                    children: [],
                  },
                  {
                    value: "缺点：",
                    children: [],
                  },
                ],
              },
              {
                value: "并发队列",
                children: [
                  {
                    value: "关系图",
                    children: [],
                  },
                  {
                    value: "接口方法",
                    children: [],
                  },
                  {
                    value: "ArrayBlockingQueue",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      summary:
        " 并发容器 ConcurrentHashMap> 将HashMap变为并发安全的方法> HashMap并发不安全的原因（了解）链表扩容时变成循环链表，导致CPU占用100%以下问题仅在jdk8以下出现，jdk8底层数据结构已经变为红黑树> 组合操作不保证线程安全concurrentHashMap保证多个线程同时get/put的安全解决方法：使用replace，即注释内代码 copyOnWriteArrayList 场景：读多写少 读写规则：读取不加锁，写入不阻塞读取操作，只有写入与写入之间需要同步 演示：迭代器 缺点：- 只能保证最终一致性- 内存占用，写复制 并发队列 关系图 接口方法| 方法 |异常  |特殊值  |阻塞  |超时  || --- | --- | --- | --- | --- ||插入|add(e)|offer(e)| put(e)|offer(e,time,unit)||移除|remove()|poll()|take()|poll(time,unit)||查看|element()|peek()|🈚️|🈚️| ArrayBlockingQueue场景1：10个面试者，1个面试官，3个座位场景2：生产者消费者问题",
      content:
        '## 并发容器\n### ConcurrentHashMap\n> 将HashMap变为并发安全的方法\n```java\nMap<String, String> synchronizedMap = Collections.synchronizedMap(new HashMap<>());\n```\n> HashMap并发不安全的原因（了解）\n\n链表扩容时变成循环链表，导致CPU占用100%\n以下问题仅在jdk8以下出现，jdk8底层数据结构已经变为红黑树\n```java\npublic class EndlessLoop {\n    private static HashMap<Integer, String> map = new HashMap<>(2, 1.5f);\n    public static void main(String[] args) {\n        map.put(5, "C");\n        map.put(7, "B");\n        map.put(3, "A");\n        new Thread(() -> {\n            map.put(15,  "D");\n            System.out.println(map);\n        }, "thread 1").start();\n        new Thread(() -> {\n            map.put(1,  "E");\n            System.out.println(map);\n        }, "thread 2").start();\n    }\n}\n```\n\n\n> 组合操作不保证线程安全\n\nconcurrentHashMap保证多个线程同时get/put的安全\n解决方法：使用replace，即注释内代码\n```java\npublic class OptionsNotSafe implements Runnable {\n\n    private static ConcurrentHashMap<String, Integer> scores = new ConcurrentHashMap<String, Integer>();\n\n    public static void main(String[] args) throws InterruptedException {\n        scores.put("小明", 0);\n        Thread t1 = new Thread(new OptionsNotSafe());\n        Thread t2 = new Thread(new OptionsNotSafe());\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n        System.out.println(scores);\n    }\n\n\n    @Override\n    public void run() {\n        for (int i = 0; i < 1000; i++) {\n           /* while (true) {\n                Integer score = scores.get("小明");\n                Integer newScore = score + 1;\n                boolean b = scores.replace("小明", score, newScore);\n                if (b) {\n                    break;\n                }\n            }*/\n            Integer score = scores.get("小明");\n            Integer newScore = score + 1;\n            scores.put("小明",newScore);\n        }\n\n    }\n}\n```\n### copyOnWriteArrayList\n#### 场景：\n读多写少\n#### 读写规则：\n读取不加锁，写入不阻塞读取操作，只有写入与写入之间需要同步\n#### 演示：\n```java\npublic class CopyOnWriteArrayListDemo1 {\n\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n//        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();\n\n        list.add("1");\n        list.add("2");\n        list.add("3");\n        list.add("4");\n        list.add("5");\n\n        Iterator<String> iterator = list.iterator();\n\n        while (iterator.hasNext()) {\n            System.out.println("list is" + list);\n            String next = iterator.next();\n            System.out.println(next);\n\n            if (next.equals("2")) {\n                list.remove("5");\n            }\n            if (next.equals("3")) {\n                list.add("3 found");\n            }\n        }\n    }\n}\n```\n迭代器\n```java\npublic class CopyOnWriteArrayListDemo2 {\n\n    public static void main(String[] args) throws InterruptedException {\n        CopyOnWriteArrayList<Integer> list = new CopyOnWriteArrayList<>(new Integer[]{1, 2, 3});\n\n        System.out.println(list);\n\n        Iterator<Integer> itr1 = list.iterator();\n\n        list.remove(2);\n        Thread.sleep(1000);\n        System.out.println(list);\n\n        Iterator<Integer> itr2 = list.iterator();\n\n        itr1.forEachRemaining(System.out::println);\n        itr2.forEachRemaining(System.out::println);\n\n    }\n}\n```\n#### 缺点：\n- 只能保证最终一致性\n- 内存占用，写复制\n### 并发队列\n#### 关系图\n#### 接口方法\n\n| 方法 |异常  |特殊值  |阻塞  |超时  |\n| --- | --- | --- | --- | --- |\n|插入|add(e)|offer(e)| put(e)|offer(e,time,unit)|\n|移除|remove()|poll()|take()|poll(time,unit)|\n|查看|element()|peek()|🈚️|🈚️|\n#### ArrayBlockingQueue\n场景1：10个面试者，1个面试官，3个座位\n```java\npublic class ArrayBlockingQueueDemo {\n\n\n    public static void main(String[] args) {\n\n        ArrayBlockingQueue<String> queue = new ArrayBlockingQueue<String>(3);\n\n        Interviewer r1 = new Interviewer(queue);\n        Consumer r2 = new Consumer(queue);\n        new Thread(r1).start();\n        new Thread(r2).start();\n    }\n}\n\nclass Interviewer implements Runnable {\n\n    BlockingQueue<String> queue;\n\n    public Interviewer(BlockingQueue queue) {\n        this.queue = queue;\n    }\n\n    @Override\n    public void run() {\n        System.out.println("10个候选人都来啦");\n        for (int i = 0; i < 10; i++) {\n            String candidate = "Candidate" + i;\n            try {\n                queue.put(candidate);\n                System.out.println("安排好了" + candidate);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        }\n        try {\n            queue.put("stop");\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n    }\n}\n\nclass Consumer implements Runnable {\n\n    BlockingQueue<String> queue;\n\n    public Consumer(BlockingQueue queue) {\n\n        this.queue = queue;\n    }\n\n    @Override\n    public void run() {\n        try {\n            Thread.sleep(1000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n        String msg;\n        try {\n            while(!(msg = queue.take()).equals("stop")){\n                System.out.println(msg + "到了");\n            }\n            System.out.println("所有候选人都结束了");\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n    }\n}\n```\n场景2：生产者消费者问题\n```java\npublic class ProdConsumer_BlockQueueDemo {\n    public static void main(String[] args) {\n        MyResource myResource = new MyResource(new ArrayBlockingQueue<>(10));\n        new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + "\\t生产线程启动");\n            try {\n                myResource.myProd();\n            } catch (Exception e) {\n                e.printStackTrace();\n            }\n        }, "Prod").start();\n        new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + "\\t消费线程启动");\n            try {\n                myResource.myConsumer();\n            } catch (Exception e) {\n                e.printStackTrace();\n            }\n        }, "Consumer").start();\n\n        try { TimeUnit.SECONDS.sleep(5); } catch (InterruptedException e) { e.printStackTrace(); }\n        System.out.println("5s后main叫停，线程结束");\n        try {\n            myResource.stop();\n        } catch (Exception e) {\n            e.printStackTrace();\n        }\n    }\n}\n\nclass MyResource {\n    private volatile boolean flag = true;//默认开启，进行生产+消费\n    private AtomicInteger atomicInteger = new AtomicInteger();\n\n    BlockingQueue<String> blockingQueue = null;\n\n    public MyResource(BlockingQueue<String> blockingQueue) {\n        this.blockingQueue = blockingQueue;\n        System.out.println(blockingQueue.getClass().getName());\n    }\n\n    public void myProd() throws Exception {\n        String data = null;\n        boolean retValue;\n        while (flag) {\n            data = atomicInteger.incrementAndGet() + "";\n            retValue = blockingQueue.offer(data, 2, TimeUnit.SECONDS);\n            if (retValue) {\n                System.out.println(Thread.currentThread().getName() + "\\t插入队列" + data + "成功");\n            } else {\n                System.out.println(Thread.currentThread().getName() + "\\t插入队列" + data + "失败");\n            }\n            TimeUnit.SECONDS.sleep(1);\n        }\n        System.out.println(Thread.currentThread().getName() + "\\t大老板叫停了，flag=false，生产结束");\n    }\n\n    public void myConsumer() throws Exception {\n        String result = null;\n        while (flag) {\n            result = blockingQueue.poll(2, TimeUnit.SECONDS);\n            if (null == result || result.equalsIgnoreCase("")) {\n                flag = false;\n                System.out.println(Thread.currentThread().getName() + "\\t超过2s没有取到蛋糕，消费退出");\n                System.out.println();\n                return;\n            }\n            System.out.println(Thread.currentThread().getName() + "\\t消费队列" + result + "成功");\n        }\n    }\n\n    public void stop() throws Exception {\n        flag = false;\n    }\n}\n```',
      valid: true,
    },
    {
      id: "1586069474193886951",
      authorEmail: "969023014@qq.com",
      description: "Java并发工具类锁的使用",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:51:14.194",
      updateTime: "2020-04-05T14:51:14.195",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "锁",
            children: [
              {
                value: "对比sychronize",
                children: [],
              },
              {
                value: "sychronize的缺点",
                children: [],
              },
              {
                value: "接口方法",
                children: [],
              },
              {
                value: "乐观锁与悲观锁",
                children: [],
              },
              {
                value: "可重入锁与非可重入锁",
                children: [],
              },
              {
                value: "公平锁与非公平锁",
                children: [],
              },
              {
                value: "共享锁与排他锁",
                children: [],
              },
              {
                value: "自旋锁与阻塞锁",
                children: [],
              },
              {
                value: "可中断锁",
                children: [],
              },
              {
                value: "锁优化",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        " 锁 对比sychronize- 原始构成- synchronized时关键字属于jvm- Lock是具体类，是api层面的锁（java.util.）- 使用方法- sychronized不需要用户取手动释放锁，当synchronized代码执行完后系统会自动让线程释放对锁的占用- ReentrantLock则需要用户去手动释放锁若没有主动释放锁，就有可能导致出现死锁现象，需要lock()和unlock()方法配合try/finally语句块来完成- 等待是否可中断- synchronized不可中断，除非抛出异常或者正常运行完成- ReentrantLock可中断，设置超时方法tryLock(long timeout, TimeUnit unit)，或者lockInterruptibly()放代码块中，调用interrupt()方法可中断 [efa13e1296b8e725439cd6464a87158d.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p554)设为true时，则按顺序一份一份打印设为false时，则按顺序打印两份 共享锁与排他锁ReentrantReadWriteLock读锁插队策略公平锁：不允许插队非公平锁：- 写锁可以随时插队- 读锁仅在等待队列头节点不是想获取写锁的线程时可以插队演示读锁插队现象升降级策略：只允许降级，避免死锁使用升降级实现缓存功能下面代码中只有一处修改数据，一直用写锁，降低整体效率  自旋锁与阻塞锁引入：同步资源锁定时间短，线程切换开销大，所以不切换CPU状态原理：\t`CAS`使用场景：多核服务器，并发度不高，临界区比较短小模拟自旋锁 可中断锁synchronized为不可中断锁lock为可中断锁 锁优化JVM- 锁消除- 锁粗化- 自旋锁和自适应个人- 缩小同步代码块- 尽量不锁方法- 减少请求锁次数 lock()不能被中断，一旦陷入死锁会永久等待使用tryLock防止死锁lockInterruptibly 乐观锁与悲观锁悲观锁：每次获取并修改数据时先把数据锁住，对应java中的sychronize和Lock相关类 - 加锁是否公平- synchronized非公平锁- ReentrantLock两者都可以，默认公平锁，构造方法可以传入boolean值，true为公平锁，false为非公平锁- 线程唤醒ReentrantLock用来实现分组唤醒需要要唤醒的线程们，可以精确唤醒，而不是像synchronized要么随机唤醒一个线程要么唤醒全部线程",
      content:
        '## 锁\n### 对比sychronize\n- 原始构成\n    - synchronized时关键字属于jvm\n    - Lock是具体类，是api层面的锁（java.util.）\n- 使用方法\n    - sychronized不需要用户取手动释放锁，当synchronized代码执行完后系统会自动让线程释放对锁的占用\n    - ReentrantLock则需要用户去手动释放锁若没有主动释放锁，就有可能导致出现死锁现象，需要lock()和unlock()方法配合try/finally语句块来完成\n- 等待是否可中断\n    - synchronized不可中断，除非抛出异常或者正常运行完成\n    - ReentrantLock可中断，设置超时方法tryLock(long timeout, TimeUnit unit)，或者lockInterruptibly()放代码块中，调用interrupt()方法可中断。\n- 加锁是否公平\n    - synchronized非公平锁\n    - ReentrantLock两者都可以，默认公平锁，构造方法可以传入boolean值，true为公平锁，false为非公平锁\n- 线程唤醒\nReentrantLock用来实现分组唤醒需要要唤醒的线程们，可以精确唤醒，而不是像synchronized要么随机唤醒一个线程要么唤醒全部线程。\n\n### sychronize的缺点\n效率低：锁释放情况少，试图获取锁不能设定超时，不能中断一个正在试图获得锁的线程。\n不灵活：加锁和释放的时机单一。\n无法知道是否成功获取锁。\n### 接口方法\n```java\n    public void lock();\n    public void lockInterruptibly() throws InterruptedException;\n    public boolean tryLock();\n    public boolean tryLock(long time, TimeUnit unit) throws InterruptedException;\n    public void unlock();\n    public Condition newCondition();\n```\n阿里规约：锁【lock.lock】必须紧跟try代码块，且unlock要放到finally第一行。\n注意：lock()不会在异常时释放锁，一定要在finally中释放锁；lock()不能被中断，一旦陷入死锁会永久等待\n```java\npublic class Demo3{\n    private static Lock lock = new ReentrantLock();\n    public static void main(String[] args) {\n        lock.lock();\n        try {\n            System.out.println(Thread.currentThread().getName()+"执行任务");\n        } finally {\n            lock.unlock();\n        }\n    }\n}\n```\n使用tryLock防止死锁\n```java\npublic class TryLockDeadlock implements Runnable {\n    int flag = 1;\n    static Lock lock1 = new ReentrantLock();\n    static Lock lock2 = new ReentrantLock();\n    @Override\n    public void run() {\n        for (int i = 0; i < 100; i++) {\n            if (flag == 1) {\n                try {\n                    if (lock1.tryLock(800, TimeUnit.MILLISECONDS)) {\n                        try {\n                            System.out.println("线程1获取到了锁1");\n                            Thread.sleep(new Random().nextInt(1000));\n                            if (lock2.tryLock(800, TimeUnit.MILLISECONDS)) {\n                                try {\n                                    System.out.println("线程1获取到了锁2");\n                                    System.out.println("线程1获取到2把锁");\n                                    break;\n                                } finally {\n                                    lock2.unlock();\n                                }\n                            }else {\n                                System.out.println("线程1获取锁2失败，已重试");\n                            }\n                        }finally {\n                            lock1.unlock();\n                            Thread.sleep(new Random().nextInt(1000));\n                        }\n                    }else {\n                        System.out.println("线程1获取锁1失败，已重试");\n                    }\n                }catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }if (flag == 2) {\n                try {\n                    if (lock2.tryLock(800, TimeUnit.MILLISECONDS)) {\n                        try {\n                            System.out.println("线程2获取到了锁2");\n                            Thread.sleep(new Random().nextInt(1000));\n                            if (lock1.tryLock(800, TimeUnit.MILLISECONDS)) {\n                                try {\n                                    System.out.println("线程2获取到了锁1");\n                                    System.out.println("线程2获取到2把锁");\n                                    break;\n                                } finally {\n                                    lock1.unlock();\n                                }\n                            }else {\n                                System.out.println("线程2获取锁1失败，已重试");\n                            }\n                        }finally {\n                            lock2.unlock();\n                            Thread.sleep(new Random().nextInt(1000));\n                        }\n                    }else {\n                        System.out.println("线程2获取锁2失败，已重试");\n                    }\n                }catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        TryLockDeadlock r1 = new TryLockDeadlock();\n        r1.flag = 1;\n        TryLockDeadlock r2 = new TryLockDeadlock();\n        r2.flag = 2;\n        new Thread(r1).start();\n        new Thread(r2).start();\n    }\n}\n```\nlockInterruptibly\n```java\n//lockInterruptibly()\npublic class LockInterrupt implements Runnable {\n    private Lock lock = new ReentrantLock();\n    @Override\n    public void run() {\n        System.out.println(Thread.currentThread().getName() + "尝试获取锁");\n        try {\n            lock.lockInterruptibly();\n            try {\n                System.out.println(Thread.currentThread().getName() + "获取到了锁");\n                Thread.sleep(5000);\n            } catch (InterruptedException e) {\n                System.out.println(Thread.currentThread().getName() + "睡眠期间被中断");\n            } finally {\n                lock.unlock();\n                System.out.println(Thread.currentThread().getName() + "释放了锁");\n            }\n        } catch (InterruptedException e) {\n            System.out.println(Thread.currentThread().getName() + "获得锁期间被中断");\n        }\n    }\n\n    public static void main(String[] args) {\n        LockInterrupt lockInterrupt = new LockInterrupt();\n        Thread thread0 = new Thread(lockInterrupt);\n        Thread thread1 = new Thread(lockInterrupt);\n        thread0.start();\n        thread1.start();\n        try {\n            Thread.sleep(2000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n        thread1.interrupt(); //打印睡眠期间被中断和获得锁期间被中断都有可能\n    }\n}\n```\n### 乐观锁与悲观锁\n悲观锁：每次获取并修改数据时先把数据锁住，对应java中的sychronize和Lock相关类。适合并发写入多，临界区持锁时间比较长，竞争激烈的情况。\n\n乐观锁：不锁住被操作对象，更新时对比数据是否被修改过。适合并发少，大部分为读取的场景。通常采用CAS算法实现。对应java中的原子类，并发容器。\n### 可重入锁与非可重入锁\n```java\npublic class GetHoldCount {\n    private static ReentrantLock lock = new ReentrantLock();\n    private static void accessResource() {\n        lock.lock();\n        try {\n            System.out.println("资源开始处理");\n            if (lock.getHoldCount() < 5) {\n                System.out.println("第" + lock.getHoldCount() + "次处理");\n                accessResource();\n                System.out.println(lock.getHoldCount());\n            }\n        }finally {\n            lock.unlock();\n        }\n    }\n    public static void main(String[] args) {\n        accessResource();\n    }\n}\n```\n### 公平锁与非公平锁\n公平：按照线程请求顺序\n非公平：在一定情况下允许插队，避免唤醒带来的空档期\n![efa13e1296b8e725439cd6464a87158d.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p554)\n```java\npublic class FairLock {\n\n    public static void main(String[] args) {\n        PrintQueue printQueue = new PrintQueue();\n        Thread thread[] = new Thread[10];\n        for (int i = 0; i < 10; i++) {\n            thread[i] = new Thread(new Job(printQueue));\n        }\n        for (int i = 0; i < 10; i++) {\n            thread[i].start();\n            try {\n                Thread.sleep(100);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n}\n\nclass Job implements Runnable {\n\n    PrintQueue printQueue;\n\n    public Job(PrintQueue printQueue) {\n        this.printQueue = printQueue;\n    }\n\n    @Override\n    public void run() {\n        System.out.println(Thread.currentThread().getName() + "开始打印");\n        printQueue.printJob(new Object());\n        System.out.println(Thread.currentThread().getName() + "打印完毕");\n    }\n}\n\nclass PrintQueue {\n\n    private Lock queueLock = new ReentrantLock(true); //false为非公平锁\n\n    public void printJob(Object document) {\n        queueLock.lock();\n        try {\n            int duration = new Random().nextInt(10) + 1;\n            System.out.println(Thread.currentThread().getName() + "正在打印1，需要" + duration+"秒");\n            Thread.sleep(duration * 1000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } finally {\n            queueLock.unlock();\n        }\n\n        queueLock.lock();\n        try {\n            int duration = new Random().nextInt(10) + 1;\n            System.out.println(Thread.currentThread().getName() + "正在打印2，需要" + duration+"秒");\n            Thread.sleep(duration * 1000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } finally {\n            queueLock.unlock();\n        }\n    }\n}\n```\n设为true时，则按顺序一份一份打印\n设为false时，则按顺序打印两份\n### 共享锁与排他锁\nReentrantReadWriteLock读锁插队策略\n公平锁：不允许插队\n非公平锁：\n- 写锁可以随时插队\n- 读锁仅在等待队列头节点不是想获取写锁的线程时可以插队\n```java\npublic class CinemaReadWrite {\n\n    private static ReentrantReadWriteLock reentrantReadWriteLock = new ReentrantReadWriteLock();\n    private static ReentrantReadWriteLock.ReadLock readLock = reentrantReadWriteLock.readLock();\n    private static ReentrantReadWriteLock.WriteLock writeLock = reentrantReadWriteLock.writeLock();\n\n    private static void read() {\n        readLock.lock();\n        try {\n            System.out.println(Thread.currentThread().getName() + "得到了读锁，正在读取");\n            Thread.sleep(1000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } finally {\n            System.out.println(Thread.currentThread().getName() + "释放读锁");\n            readLock.unlock();\n        }\n    }\n\n    private static void write() {\n        writeLock.lock();\n        try {\n            System.out.println(Thread.currentThread().getName() + "得到了写锁，正在写入");\n            Thread.sleep(1000);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } finally {\n            System.out.println(Thread.currentThread().getName() + "释放写锁");\n            writeLock.unlock();\n        }\n    }\n\n    public static void main(String[] args) {\n        new Thread(()->read(),"Thread1").start();\n        new Thread(()->read(),"Thread2").start();\n        new Thread(()->write(),"Thread3").start();\n        new Thread(()->write(),"Thread4").start();\n    }\n}\n```\n演示读锁插队现象\n```java\npublic class NonfairBargeDemo {\n\n    private static ReentrantReadWriteLock reentrantReadWriteLock = new ReentrantReadWriteLock(\n            true);\n\n    private static ReentrantReadWriteLock.ReadLock readLock = reentrantReadWriteLock.readLock();\n    private static ReentrantReadWriteLock.WriteLock writeLock = reentrantReadWriteLock.writeLock();\n\n    private static void read() {\n        System.out.println(Thread.currentThread().getName() + "开始尝试获取读锁");\n        readLock.lock();\n        try {\n            System.out.println(Thread.currentThread().getName() + "得到读锁，正在读取");\n            try {\n                Thread.sleep(20);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        } finally {\n            System.out.println(Thread.currentThread().getName() + "释放读锁");\n            readLock.unlock();\n        }\n    }\n\n    private static void write() {\n        System.out.println(Thread.currentThread().getName() + "开始尝试获取写锁");\n        writeLock.lock();\n        try {\n            System.out.println(Thread.currentThread().getName() + "得到写锁，正在写入");\n            try {\n                Thread.sleep(40);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        } finally {\n            System.out.println(Thread.currentThread().getName() + "释放写锁");\n            writeLock.unlock();\n        }\n    }\n\n    public static void main(String[] args) {\n        new Thread(()->write(),"Thread1").start();\n        new Thread(()->read(),"Thread2").start();\n        new Thread(()->read(),"Thread3").start();\n        new Thread(()->write(),"Thread4").start();\n        new Thread(()->read(),"Thread5").start();\n        new Thread(new Runnable() {\n            @Override\n            public void run() {\n                Thread thread[] = new Thread[1000];\n                for (int i = 0; i < 1000; i++) {\n                    thread[i] = new Thread(() -> read(), "子线程创建的Thread" + i);\n                }\n                for (int i = 0; i < 1000; i++) {\n                    thread[i].start();\n                }\n            }\n        }).start();\n    }\n}\n```\n升降级策略：只允许降级，避免死锁\n```java\npublic class Upgrading {\n\n    private static ReentrantReadWriteLock reentrantReadWriteLock = new ReentrantReadWriteLock(\n            false);\n    private static ReentrantReadWriteLock.ReadLock readLock = reentrantReadWriteLock.readLock();\n    private static ReentrantReadWriteLock.WriteLock writeLock = reentrantReadWriteLock.writeLock();\n\n    private static void readUpgrading() {\n        readLock.lock();\n        try {\n            System.out.println(Thread.currentThread().getName() + "得到了读锁，正在读取");\n            Thread.sleep(1000);\n            System.out.println("升级会带来阻塞");\n            writeLock.lock();\n            System.out.println(Thread.currentThread().getName() + "获取到了写锁，升级成功");\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } finally {\n            System.out.println(Thread.currentThread().getName() + "释放读锁");\n            readLock.unlock();\n        }\n    }\n\n    private static void writeDowngrading() {\n        writeLock.lock();\n        try {\n            System.out.println(Thread.currentThread().getName() + "得到了写锁，正在写入");\n            Thread.sleep(1000);\n            readLock.lock();\n            System.out.println("在不释放写锁的情况下，直接获取读锁，成功降级");\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } finally {\n            readLock.unlock();\n            System.out.println(Thread.currentThread().getName() + "释放写锁");\n            writeLock.unlock();\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n//        System.out.println("先演示降级是可以的");\n//        Thread thread1 = new Thread(() -> writeDowngrading(), "Thread1");\n//        thread1.start();\n//        thread1.join();\n//        System.out.println("------------------");\n//        System.out.println("演示升级是不行的");\n        Thread thread2 = new Thread(() -> readUpgrading(), "Thread2");\n        thread2.start();\n    }\n}\n```\n使用升降级实现缓存功能\n下面代码中只有一处修改数据，一直用写锁，降低整体效率。\n```java\npublic class CachedData {\n    Object data;\n    volatile boolean cacheValid;\n    final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();\n    void processCachedData() {\n        rwl.readLock().lock();\n        if (!cacheValid) {\n            rwl.readLock().unlock();\n            rwl.writeLock().lock();\n            try {\n                if (!cacheValid) {\n                    data = new Object();\n                    cacheValid = true;\n                }\n                rwl.readLock().lock();\n            } finally {\n                rwl.writeLock().unlock();\n            }\n        }\n        try {\n            System.out.println(data);\n        } finally {\n            rwl.readLock().unlock();\n        }\n    }\n}\n```\n### 自旋锁与阻塞锁\n引入：同步资源锁定时间短，线程切换开销大，所以不切换CPU状态\n原理：\t`CAS`\n使用场景：多核服务器，并发度不高，临界区比较短小\n模拟自旋锁\n```java\npublic class SpinLock {\n\n    private AtomicReference<Thread> sign = new AtomicReference<>();\n\n    public void lock() {\n        Thread current = Thread.currentThread();\n        while (!sign.compareAndSet(null, current)) {\n            System.out.println("自旋获取失败，再次尝试");\n        }\n    }\n\n    public void unlock() {\n        Thread current = Thread.currentThread();\n        sign.compareAndSet(current, null);\n    }\n\n    public static void main(String[] args) {\n        SpinLock spinLock = new SpinLock();\n        Runnable runnable = new Runnable() {\n            @Override\n            public void run() {\n                System.out.println(Thread.currentThread().getName() + "开始尝试获取自旋锁");\n                spinLock.lock();\n                System.out.println(Thread.currentThread().getName() + "获取到了自旋锁");\n                try {\n                    Thread.sleep(300);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                } finally {\n                    spinLock.unlock();\n                    System.out.println(Thread.currentThread().getName() + "释放了自旋锁");\n                }\n            }\n        };\n        Thread thread1 = new Thread(runnable);\n        Thread thread2 = new Thread(runnable);\n        thread1.start();\n        thread2.start();\n    }\n}\n```\n### 可中断锁\nsynchronized为不可中断锁\nlock为可中断锁\n### 锁优化\nJVM\n- 锁消除\n- 锁粗化\n- 自旋锁和自适应\n\n个人\n- 缩小同步代码块\n- 尽量不锁方法\n- 减少请求锁次数',
      valid: true,
    },
    {
      id: "1586069520763233245",
      authorEmail: "969023014@qq.com",
      description: "Java并发流程控制",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:52:00.763",
      updateTime: "2020-04-05T14:52:00.763",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "并发流程控制",
            children: [
              {
                value: "概览",
                children: [],
              },
              {
                value: "CountDownLatch",
                children: [],
              },
              {
                value: "Semaphore",
                children: [],
              },
              {
                value: "Condition",
                children: [
                  {
                    value: "基本用法",
                    children: [],
                  },
                  {
                    value: "顺序唤醒",
                    children: [],
                  },
                  {
                    value: "生产者消费者",
                    children: [],
                  },
                ],
              },
              {
                value: "CyclicBarrier",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        "[0e5c66ea7a071386da467074a3b2d988.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p559)signalAll()会唤起所有正在等待的线程signal()唤起等待时间最长的 基本用法 顺序唤醒场景：对线程之间按顺序调用，实现A>B>C三个线程启动，要求AA打印5次，BB打印10次，CC打印15次，一共十轮 生产者消费者 CyclicBarrier和CountDownLatch不同的是，CyclicBarrier可以重复使用 [0939fec4d4f11fe3705ed5da9f695ff9.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p558) CountDownLatch场景1：工厂中，质检，5个工人检查，所有人都认为通过，才算通过  并发流程控制 概览  Semaphore Condition 场景2：模拟100米跑步，5名选手都准备好了，只等裁判员一声令下，所有人同时开始跑步",
      content:
        '## 并发流程控制\n### 概览\n![0939fec4d4f11fe3705ed5da9f695ff9.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p558)\n### CountDownLatch\n场景1：工厂中，质检，5个工人检查，所有人都认为通过，才算通过。\n```java\n   public static void main(String[] args) throws InterruptedException {\n        CountDownLatch latch = new CountDownLatch(5);\n        ExecutorService service = Executors.newFixedThreadPool(5);\n        for (int i = 0; i < 5; i++) {\n            final int no = i + 1;\n            Runnable runnable = new Runnable() {\n\n                @Override\n                public void run() {\n                    try {\n                        Thread.sleep((long) (Math.random() * 10000));\n                        System.out.println("No." + no + "完成了检查。");\n                    } catch (InterruptedException e) {\n                        e.printStackTrace();\n                    } finally {\n                        latch.countDown();\n                    }\n                }\n            };\n            service.submit(runnable);\n        }\n        System.out.println("等待5个人检查完.....");\n        latch.await();\n        System.out.println("所有人都完成了工作，进入下一个环节。");\n    }\n}\n```\n场景2：模拟100米跑步，5名选手都准备好了，只等裁判员一声令下，所有人同时开始跑步。当所有人都到终点后，比赛结束。\n```java\npublic class CountDownLatchDemo1And2 {\n\n    public static void main(String[] args) throws InterruptedException {\n        CountDownLatch begin = new CountDownLatch(1);\n\n        CountDownLatch end = new CountDownLatch(5);\n        ExecutorService service = Executors.newFixedThreadPool(5);\n        for (int i = 0; i < 5; i++) {\n            final int no = i + 1;\n            Runnable runnable = new Runnable() {\n                @Override\n                public void run() {\n                    System.out.println("No." + no + "准备完毕，等待发令枪");\n                    try {\n                        begin.await();\n                        System.out.println("No." + no + "开始跑步了");\n                        Thread.sleep((long) (Math.random() * 10000));\n                        System.out.println("No." + no + "跑到终点了");\n                    } catch (InterruptedException e) {\n                        e.printStackTrace();\n                    } finally {\n                        end.countDown();\n                    }\n                }\n            };\n            service.submit(runnable);\n        }\n        //裁判员检查发令枪...\n        Thread.sleep(5000);\n        System.out.println("发令枪响，比赛开始！");\n        begin.countDown();\n\n        end.await();\n        System.out.println("所有人到达终点，比赛结束");\n    }\n}\n```\n### Semaphore\n```java\npublic class SemaphoreDemo {\n\n    static Semaphore semaphore = new Semaphore(5, true);\n\n    public static void main(String[] args) {\n        ExecutorService service = Executors.newFixedThreadPool(50);\n        for (int i = 0; i < 100; i++) {\n            service.submit(new Task());\n        }\n        service.shutdown();\n    }\n\n    static class Task implements Runnable {\n\n        @Override\n        public void run() {\n            try {\n                semaphore.acquire(3); //一次拿3个\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n            System.out.println(Thread.currentThread().getName() + "拿到了许可证");\n            try {\n                Thread.sleep(2000);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n            System.out.println(Thread.currentThread().getName() + "释放了许可证");\n            semaphore.release(3); //最好和获取的数量一致\n        }\n    }\n}\n```\n### Condition\n![0e5c66ea7a071386da467074a3b2d988.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p559)\nsignalAll()会唤起所有正在等待的线程\nsignal()唤起等待时间最长的\n#### 基本用法\n```java\npublic class ConditionDemo1 {\n    private ReentrantLock lock = new ReentrantLock();\n    private Condition condition = lock.newCondition();\n\n    void method1() throws InterruptedException {\n        lock.lock();\n        try{\n            System.out.println("条件不满足，开始await");\n            condition.await();\n            System.out.println("条件满足了，开始执行后续的任务");\n        }finally {\n            lock.unlock();\n        }\n    }\n\n    void method2() {\n        lock.lock();\n        try{\n            System.out.println("准备工作完成，唤醒其他的线程");\n            condition.signal();\n        }finally {\n            lock.unlock();\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        ConditionDemo1 conditionDemo1 = new ConditionDemo1();\n        new Thread(new Runnable() {\n            @Override\n            public void run() {\n                try {\n                    Thread.sleep(1000);\n                    conditionDemo1.method2();\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        }).start();\n        conditionDemo1.method1();\n    }\n}\n```\n#### 顺序唤醒\n场景：对线程之间按顺序调用，实现A>B>C三个线程启动，要求AA打印5次，BB打印10次，CC打印15次，一共十轮\n```java\npublic class SyncAndReentrantLockDemo {\n    public static void main(String[] args) {\n        ShareData shareData = new ShareData();\n        new Thread(() -> {\n            for (int i = 1; i <= 10; i++) {\n                shareData.print5();\n            }\n        }, "A").start();\n        new Thread(() -> {\n            for (int i = 1; i <= 10; i++) {\n                shareData.print10();\n            }\n        }, "B").start();\n        new Thread(() -> {\n            for (int i = 1; i <= 10; i++) {\n                shareData.print15();\n            }\n        }, "C").start();\n    }\n\n}\n\nclass ShareData {\n    private int number = 1;//A:1 B:2 C:3\n    private Lock lock = new ReentrantLock();\n    private Condition condition1 = lock.newCondition();\n    private Condition condition2 = lock.newCondition();\n    private Condition condition3 = lock.newCondition();\n\n    public void print5() {\n        lock.lock();\n        try {\n            //判断\n            while (number != 1) {\n                condition1.await();\n            }\n            //干活\n            for (int i = 1; i <= 5; i++) {\n                System.out.println(Thread.currentThread().getName() + "\\t" + i);\n            }\n            //通知\n            number = 2;\n            condition2.signal();\n\n        } catch (Exception e) {\n            e.printStackTrace();\n        } finally {\n            lock.unlock();\n        }\n    }\n    public void print10() {\n        lock.lock();\n        try {\n            //判断\n            while (number != 2) {\n                condition2.await();\n            }\n            //干活\n            for (int i = 1; i <= 10; i++) {\n                System.out.println(Thread.currentThread().getName() + "\\t" + i);\n            }\n            //通知\n            number = 3;\n            condition3.signal();\n\n        } catch (Exception e) {\n            e.printStackTrace();\n        } finally {\n            lock.unlock();\n        }\n    }\n    public void print15() {\n        lock.lock();\n        try {\n            //判断\n            while (number != 3) {\n                condition3.await();\n            }\n            //干活\n            for (int i = 1; i <= 15; i++) {\n                System.out.println(Thread.currentThread().getName() + "\\t" + i);\n            }\n            //通知\n            number = 1;\n            condition1.signal();\n\n        } catch (Exception e) {\n            e.printStackTrace();\n        } finally {\n            lock.unlock();\n        }\n    }\n}\n```\n#### 生产者消费者\n```java\npublic class ConditionDemo2 {\n\n    private int queueSize = 10;\n    private PriorityQueue<Integer> queue = new PriorityQueue<Integer>(queueSize);\n    private Lock lock = new ReentrantLock();\n    private Condition notFull = lock.newCondition();\n    private Condition notEmpty = lock.newCondition();\n\n    public static void main(String[] args) {\n        ConditionDemo2 conditionDemo2 = new ConditionDemo2();\n        Producer producer = conditionDemo2.new Producer();\n        Consumer consumer = conditionDemo2.new Consumer();\n        producer.start();\n        consumer.start();\n    }\n\n    class Consumer extends Thread {\n\n        @Override\n        public void run() {\n            consume();\n        }\n\n        private void consume() {\n            while (true) {\n                lock.lock();\n                try {\n                    while (queue.size() == 0) {\n                        System.out.println("队列空，等待数据");\n                        try {\n                            notEmpty.await();\n                        } catch (InterruptedException e) {\n                            e.printStackTrace();\n                        }\n                    }\n                    queue.poll();\n                    notFull.signalAll();\n                    System.out.println("从队列里取走了一个数据，队列剩余" + queue.size() + "个元素");\n                } finally {\n                    lock.unlock();\n                }\n            }\n        }\n    }\n\n    class Producer extends Thread {\n\n        @Override\n        public void run() {\n            produce();\n        }\n\n        private void produce() {\n            while (true) {\n                lock.lock();\n                try {\n                    while (queue.size() == queueSize) {\n                        System.out.println("队列满，等待有空余");\n                        try {\n                            notFull.await();\n                        } catch (InterruptedException e) {\n                            e.printStackTrace();\n                        }\n                    }\n                    queue.offer(1);\n                    notEmpty.signalAll();\n                    System.out.println("向队列插入了一个元素，队列剩余空间" + (queueSize - queue.size()));\n                } finally {\n                    lock.unlock();\n                }\n            }\n        }\n    }\n\n}\n```\n### CyclicBarrier\n和CountDownLatch不同的是，CyclicBarrier可以重复使用\n```java\npublic class CyclicBarrierDemo {\n    public static void main(String[] args) {\n        CyclicBarrier cyclicBarrier = new CyclicBarrier(5, new Runnable() {\n            @Override\n            public void run() {\n                System.out.println("所有人都到场了， 大家统一出发！");\n            }\n        });\n        for (int i = 0; i < 10; i++) {\n            new Thread(new Task(i, cyclicBarrier)).start();\n        }\n    }\n\n    static class Task implements Runnable{\n        private int id;\n        private CyclicBarrier cyclicBarrier;\n\n        public Task(int id, CyclicBarrier cyclicBarrier) {\n            this.id = id;\n            this.cyclicBarrier = cyclicBarrier;\n        }\n\n        @Override\n        public void run() {\n            System.out.println("线程" + id + "现在前往集合地点");\n            try {\n                Thread.sleep((long) (Math.random()*10000));\n                System.out.println("线程"+id+"到了集合地点，开始等待其他人到达");\n                cyclicBarrier.await();\n                System.out.println("线程"+id+"出发了");\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            } catch (BrokenBarrierException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n}\n```',
      valid: true,
    },
    {
      id: "1586069621787826035",
      authorEmail: "969023014@qq.com",
      description: "并发编程Future",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:53:41.787",
      updateTime: "2020-04-05T14:53:41.787",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "Future",
            children: [
              {
                value: "Runnable缺陷",
                children: [],
              },
              {
                value: "get结果",
                children: [],
              },
              {
                value: "示例",
                children: [],
              },
              {
                value: "取消",
                children: [],
              },
              {
                value: "FutureTask",
                children: [],
              },
              {
                value: "注意点",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        "当确信任务能够处理interrupt时，可以指定Future.cancel(true)，Future.cancel(false)仅用于避免启动尚未启动的任务，适用于未能处理中断的任务/不清楚人去是否支持取消/需要等待已经开始的任务执行完成  Future Runnable缺陷- 没有返回值- 无法抛出异常 get结果- 正常完成：返回结果- 尚未完成：阻塞等待完成- 执行时抛出异常：抛出ExecutionException- 任务取消：CancellationException- 超时：TimeoutException 示例多任务抛出异常isDone()返回true超时 取消- 未开始执行，返回true- 已经完成或取消，取消失败，返回false- 已经开始执行，会根据参数mayInterruptIfRunning做判断  FutureTask 注意点- 用for循环批量获取结果时容易发生一部分线程慢的情况，应该使用timeout限制- 生命周期无法后退 为True时会发送中断信号",
      content:
        '## Future\n### Runnable缺陷\n- 没有返回值\n- 无法抛出异常\n### get结果\n- 正常完成：返回结果\n- 尚未完成：阻塞等待完成\n- 执行时抛出异常：抛出ExecutionException\n- 任务取消：CancellationException\n- 超时：TimeoutException\n### 示例\n```java\npublic class OneFuture {\n\n    public static void main(String[] args) {\n        ExecutorService service = Executors.newFixedThreadPool(10);\n        Future<Integer> future = service.submit(new CallableTask());\n        try {\n            System.out.println(future.get());\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } catch (ExecutionException e) {\n            e.printStackTrace();\n        }\n        service.shutdown();\n    }\n\n    static class CallableTask implements Callable<Integer> {\n\n        @Override\n        public Integer call() throws Exception {\n            Thread.sleep(3000);\n            return new Random().nextInt();\n        }\n    }\n\n}\n```\n多任务\n```java\npublic class MultiFutures {\n\n    public static void main(String[] args) throws InterruptedException {\n        ExecutorService service = Executors.newFixedThreadPool(20);\n        ArrayList<Future> futures = new ArrayList<>();\n        for (int i = 0; i < 20; i++) {\n            Future<Integer> future = service.submit(new CallableTask());\n            futures.add(future);\n        }\n        Thread.sleep(5000);\n        for (int i = 0; i < 20; i++) {\n            Future<Integer> future = futures.get(i);\n            try {\n                Integer integer = future.get();\n                System.out.println(integer);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            } catch (ExecutionException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n\n    static class CallableTask implements Callable<Integer> {\n\n        @Override\n        public Integer call() throws Exception {\n            Thread.sleep(3000);\n            return new Random().nextInt();\n        }\n    }\n}\n```\n抛出异常\nisDone()返回true\n```java\npublic class GetException {\n\n    public static void main(String[] args) {\n        ExecutorService service = Executors.newFixedThreadPool(20);\n        Future<Integer> future = service.submit(new CallableTask());\n\n\n        try {\n            for (int i = 0; i < 5; i++) {\n                System.out.println(i);\n                Thread.sleep(500);\n            }\n            System.out.println(future.isDone());\n            future.get();\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n            System.out.println("InterruptedException异常");\n        } catch (ExecutionException e) {\n            e.printStackTrace();\n            System.out.println("ExecutionException异常");\n        }\n    }\n\n\n    static class CallableTask implements Callable<Integer> {\n\n        @Override\n        public Integer call() throws Exception {\n            throw new IllegalArgumentException("Callable抛出异常");\n        }\n    }\n}\n```\n超时\n```java\npublic class Timeout {\n\n    private static final Ad DEFAULT_AD = new Ad("无网络时候的默认广告");\n    private static final ExecutorService exec = Executors.newFixedThreadPool(10);\n\n    static class Ad {\n\n        String name;\n\n        public Ad(String name) {\n            this.name = name;\n        }\n\n        @Override\n        public String toString() {\n            return "Ad{" +\n                    "name=\'" + name + \'\\\'\' +\n                    \'}\';\n        }\n    }\n\n\n    static class FetchAdTask implements Callable<Ad> {\n\n        @Override\n        public Ad call() throws Exception {\n            try {\n                Thread.sleep(3000);\n            } catch (InterruptedException e) {\n                System.out.println("sleep期间被中断了");\n                return new Ad("被中断时候的默认广告");\n            }\n            return new Ad("旅游订票哪家强？找某程");\n        }\n    }\n\n\n    public void printAd() {\n        Future<Ad> f = exec.submit(new FetchAdTask());\n        Ad ad;\n        try {\n            ad = f.get(2000, TimeUnit.MILLISECONDS);\n        } catch (InterruptedException e) {\n            ad = new Ad("被中断时候的默认广告");\n        } catch (ExecutionException e) {\n            ad = new Ad("异常时候的默认广告");\n        } catch (TimeoutException e) {\n            ad = new Ad("超时时候的默认广告");\n            System.out.println("超时，未获取到广告");\n            boolean cancel = f.cancel(true);//会收到InterruptedException\n            System.out.println("cancel的结果：" + cancel);\n        }\n        exec.shutdown();\n        System.out.println(ad);\n    }\n\n    public static void main(String[] args) {\n        Timeout timeout = new Timeout();\n        timeout.printAd();\n    }\n}\n```\n### 取消\n- 未开始执行，返回true\n- 已经完成或取消，取消失败，返回false\n- 已经开始执行，会根据参数mayInterruptIfRunning做判断。为True时会发送中断信号。当确信任务能够处理interrupt时，可以指定Future.cancel(true)，Future.cancel(false)仅用于避免启动尚未启动的任务，适用于未能处理中断的任务/不清楚人去是否支持取消/需要等待已经开始的任务执行完成。\n### FutureTask\n```java\npublic class FutureTaskDemo {\n\n    public static void main(String[] args) {\n        Task task = new Task();\n        FutureTask<Integer> integerFutureTask = new FutureTask<>(task);\n//        new Thread(integerFutureTask).start();\n        ExecutorService service = Executors.newCachedThreadPool();\n        service.submit(integerFutureTask);\n\n        try {\n            System.out.println("task运行结果："+integerFutureTask.get());\n\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        } catch (ExecutionException e) {\n            e.printStackTrace();\n        }\n    }\n}\n\nclass Task implements Callable<Integer> {\n\n    @Override\n    public Integer call() throws Exception {\n        System.out.println("子线程正在计算");\n        Thread.sleep(3000);\n        int sum = 0;\n        for (int i = 0; i < 100; i++) {\n            sum += i;\n        }\n        return sum;\n    }\n}\n```\n### 注意点\n- 用for循环批量获取结果时容易发生一部分线程慢的情况，应该使用timeout限制\n- 生命周期无法后退',
      valid: true,
    },
    {
      id: "1586069654742344518",
      authorEmail: "969023014@qq.com",
      description: "线程",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:54:14.742",
      updateTime: "2020-04-05T14:54:14.742",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "线程",
            children: [
              {
                value: "创建新线程",
                children: [
                  {
                    value: "两种方式",
                    children: [],
                  },
                  {
                    value: "示例",
                    children: [],
                  },
                  {
                    value: "对比",
                    children: [],
                  },
                ],
              },
              {
                value: "启动线程",
                children: [
                  {
                    value: "start",
                    children: [],
                  },
                  {
                    value: "run",
                    children: [],
                  },
                ],
              },
              {
                value: "停止线程",
                children: [
                  {
                    value: "普通情况",
                    children: [],
                  },
                  {
                    value: "阻塞情况",
                    children: [],
                  },
                  {
                    value: "无法中断",
                    children: [],
                  },
                  {
                    value: "最佳实践",
                    children: [],
                  },
                  {
                    value: "方法辨析",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      summary:
        '调用run方法，只会由主线程调用，而调用start才会创建新线程 停止线程 普通情况 阻塞情况停止线程，抛出异常每次迭代都阻塞,则不需要在while中判断isInterrupted 无法中断下例代码中，当线程正确响应中断后，中断状态会被清除 最佳实践在方法签名中抛出异常 那么在run()就会强制try/catch如果无法传递中断，使用Thread.currentThread().interrupt()恢复中断 方法辨析注意：interrupted方法返回的是调用此方法的线程中断状态  线程 创建新线程 两种方式- 继承Thread- 实现Runnable接口 示例示例代码打印"我来自Thread" 对比- 代码架构角度- 新建线程损耗- 双继承问题 启动线程 start3个阶段- 检查线程状态由源码可知，线程不能start两次，否则会抛出IllegalThreadStateException的异常- 加入线程组- 调用native start0()方法 runtarget即Runnable对象为何不直接调用run',
      content:
        '## 线程\n### 创建新线程\n#### 两种方式\n- 继承Thread\n```java\npublic class ThreadStyle extends Thread{\n    @Override\n    public void run() {\n        System.out.println("用Thread类实现线程");\n    }\n    public static void main(String[] args) {\n        new ThreadStyle().start();\n    }\n}\n```\n- 实现Runnable接口\n```java\npublic class RunnableStyle implements Runnable{\n    public static void main(String[] args) {\n        Thread thread = new Thread(new RunnableStyle());\n        thread.start();\n    }\n    @Override\n    public void run() {\n        System.out.println("用Runnable方法实现线程");\n    }\n}\n```\n#### 示例\n示例代码打印"我来自Thread"\n```java\npublic class BothRunnableThread {\n    public static void main(String[] args) {\n        new Thread(new Runnable() {\n            @Override\n            public void run() {\n                System.out.println("我来自Runnable");\n            }\n        }) {\n            @Override\n            public void run() {\n                System.out.println("我来自Thread");\n            }\n        }.start();\n    }\n}\n```\n#### 对比\n- 代码架构角度\n- 新建线程损耗\n- 双继承问题\n\n### 启动线程\n#### start\n3个阶段\n- 检查线程状态\n由源码可知，线程不能start两次，否则会抛出IllegalThreadStateException的异常\n```java\n if (threadStatus != 0)\n    throw new IllegalThreadStateException();\n```\n- 加入线程组\n```java\ngroup.add(this);\n```\n- 调用native start0()方法\n#### run\ntarget即Runnable对象\n```java\n @Override\n public void run() {\n     if (target != null) {\n        target.run();\n     }\n }\n```\n为何不直接调用run？\n调用run方法，只会由主线程调用，而调用start才会创建新线程\n### 停止线程\n#### 普通情况\n```java\npublic class RightWayStopThreadWithoutSleep implements Runnable {\n    @Override\n    public void run() {\n        int num = 0;\n        while (!Thread.currentThread().isInterrupted() && num <= Integer.MAX_VALUE / 2) {\n            if (num % 10000 == 0) {\n                System.out.println(num + "是10000的倍数");\n            }\n            num++;\n        }\n        System.out.println("任务运行结束了");\n    }\n    public static void main(String[] args) throws InterruptedException {\n        Thread thread = new Thread(new RightWayStopThreadWithoutSleep());\n        thread.start();\n        Thread.sleep(2000);\n        thread.interrupt();\n    }\n}\n```\n#### 阻塞情况\n停止线程，抛出异常\n```java\npublic class RightWayStopThreadWithSleep {\n    public static void main(String[] args) throws InterruptedException {\n        Runnable runnable = () -> {\n            int num = 0;\n            try {\n                while (num <= 300 && !Thread.currentThread().isInterrupted()) {\n                    if (num % 100 == 0) {\n                        System.out.println(num + "是100的倍数");\n                    }\n                    num++;\n                }\n                Thread.sleep(1000);\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        };\n        Thread thread = new Thread(runnable);\n        thread.start();\n        Thread.sleep(500);\n        thread.interrupt();\n    }\n}\n```\n每次迭代都阻塞,则不需要在while中判断isInterrupted\n```java\npublic class RightWayStopThreadWithSleepEveryLoop {\n    public static void main(String[] args) throws InterruptedException {\n        Runnable runnable = () -> {\n            int num = 0;\n            try {\n                while (num <= 10000) {\n                    if (num % 100 == 0) {\n                        System.out.println(num + "是100的倍数");\n                    }\n                    num++;\n                    Thread.sleep(10);\n                }\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        };\n        Thread thread = new Thread(runnable);\n        thread.start();\n        Thread.sleep(5000);\n        thread.interrupt();\n    }\n}\n```\n#### 无法中断\n下例代码中，当线程正确响应中断后，中断状态会被清除\n```java\npublic class CantInterrupt {\n\n    public static void main(String[] args) throws InterruptedException {\n        Runnable runnable = () -> {\n            int num = 0;\n            while (num <= 10000 && !Thread.currentThread().isInterrupted()) {\n                if (num % 100 == 0) {\n                    System.out.println(num + "是100的倍数");\n                }\n                num++;\n                try {\n                    Thread.sleep(10);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        };\n        Thread thread = new Thread(runnable);\n        thread.start();\n        Thread.sleep(5000);\n        thread.interrupt();\n    }\n}\n```\n#### 最佳实践\n在方法签名中抛出异常 那么在run()就会强制try/catch\n```java\npublic class RightWayStopThreadInProd implements Runnable {\n\n    @Override\n    public void run() {\n        while (true && !Thread.currentThread().isInterrupted()) {\n            System.out.println("go");\n            try {\n                throwInMethod();\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n                //保存日志、停止程序\n                System.out.println("保存日志");\n                e.printStackTrace();\n            }\n        }\n    }\n\n    private void throwInMethod() throws InterruptedException {\n            Thread.sleep(2000);\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Thread thread = new Thread(new RightWayStopThreadInProd());\n        thread.start();\n        Thread.sleep(1000);\n        thread.interrupt();\n    }\n}\n```\n如果无法传递中断，使用Thread.currentThread().interrupt()恢复中断\n```java\npublic class RightWayStopThreadInProd2 implements Runnable {\n\n    @Override\n    public void run() {\n        while (true) {\n            if (Thread.currentThread().isInterrupted()) {\n                System.out.println("Interrupted，程序运行结束");\n                break;\n            }\n            reInterrupt();\n        }\n    }\n\n    private void reInterrupt() {\n        try {\n            Thread.sleep(2000);\n        } catch (InterruptedException e) {\n            Thread.currentThread().interrupt();\n            e.printStackTrace();\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Thread thread = new Thread(new RightWayStopThreadInProd2());\n        thread.start();\n        Thread.sleep(1000);\n        thread.interrupt();\n    }\n}\n```\n#### 方法辨析\n注意：interrupted方法返回的是调用此方法的线程中断状态。\n```java\nstatic boolean interrupted() //清除中断\nThread.interrupted() //同上\nboolean isInterrupted() //不清除中断状态\n```',
      valid: true,
    },
    {
      id: "1586069727500636377",
      authorEmail: "969023014@qq.com",
      description: "Thread和Object重要方法",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:55:27.5",
      updateTime: "2020-04-05T14:55:27.5",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "概览",
            children: [],
          },
          {
            value: "wait",
            children: [
              {
                value: "注意点",
                children: [],
              },
              {
                value: "示例",
                children: [],
              },
            ],
          },
          {
            value: "notify&notifyAll",
            children: [
              {
                value: "区别",
                children: [],
              },
              {
                value: "实现生产者消费者",
                children: [],
              },
              {
                value: "交替打印100内奇偶数",
                children: [],
              },
            ],
          },
          {
            value: "sleep",
            children: [],
          },
          {
            value: "join",
            children: [],
          },
          {
            value: "yield",
            children: [],
          },
        ],
      },
      summary:
        "[4d6ef05e49cc38a1151106e4b91de223.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p562) wait 注意点- 必须在sychronize块中- wait会释放锁 示例 notify&notifyAll 区别notify唤醒随机一个线程notifyAll唤醒所有 实现生产者消费者 交替打印100内奇偶数 sleepsleep让线程进入time_waiting状态，不占用CPU，但不释放锁  join主线程等待子线程，期间处于waiting状态 不需要在同步代码块内  yield作用：释放时间片，但jvm不保证遵循 中断后，抛出InterruptedException并清除中断状态",
      content:
        '### 概览\n![4d6ef05e49cc38a1151106e4b91de223.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p562)\n### wait\n#### 注意点\n- 必须在sychronize块中\n- wait会释放锁\n#### 示例\n```java\npublic class Wait {\n\n    public static Object object = new Object();\n\n    static class Thread1 extends Thread {\n\n        @Override\n        public void run() {\n            synchronized (object) {\n                System.out.println(Thread.currentThread().getName() + "开始执行了");\n                try {\n                    object.wait();\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n                System.out.println("线程" + Thread.currentThread().getName() + "获取到了锁。");\n            }\n        }\n    }\n\n    static class Thread2 extends Thread {\n\n        @Override\n        public void run() {\n            synchronized (object) {\n                object.notify();\n                System.out.println("线程" + Thread.currentThread().getName() + "调用了notify()");\n            }\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Thread1 thread1 = new Thread1();\n        Thread2 thread2 = new Thread2();\n        thread1.start();\n        Thread.sleep(200);\n        thread2.start();\n    }\n}\n```\n### notify&notifyAll\n#### 区别\nnotify唤醒随机一个线程\nnotifyAll唤醒所有\n#### 实现生产者消费者\n```java\npublic class ProducerConsumerModel {\n    public static void main(String[] args) {\n        EventStorage eventStorage = new EventStorage();\n        Producer producer = new Producer(eventStorage);\n        Consumer consumer = new Consumer(eventStorage);\n        new Thread(producer).start();\n        new Thread(consumer).start();\n    }\n}\n\nclass Producer implements Runnable {\n\n    private EventStorage storage;\n\n    public Producer(\n            EventStorage storage) {\n        this.storage = storage;\n    }\n\n    @Override\n    public void run() {\n        for (int i = 0; i < 100; i++) {\n            storage.put();\n        }\n    }\n}\n\nclass Consumer implements Runnable {\n\n    private EventStorage storage;\n\n    public Consumer(\n            EventStorage storage) {\n        this.storage = storage;\n    }\n\n    @Override\n    public void run() {\n        for (int i = 0; i < 100; i++) {\n            storage.take();\n        }\n    }\n}\n\nclass EventStorage {\n\n    private int maxSize;\n    private LinkedList<Date> storage;\n\n    public EventStorage() {\n        maxSize = 10;\n        storage = new LinkedList<>();\n    }\n\n    public synchronized void put() {\n        while (storage.size() == maxSize) {\n            try {\n                wait();\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        }\n        storage.add(new Date());\n        System.out.println("仓库里有了" + storage.size() + "个产品。");\n        notify();\n    }\n\n    public synchronized void take() {\n        while (storage.size() == 0) {\n            try {\n                wait();\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        }\n        System.out.println("拿到了" + storage.poll() + "，现在仓库还剩下" + storage.size());\n        notify();\n    }\n}\n```\n#### 交替打印100内奇偶数\n```java\npublic class WaitNotifyPrintOddEveWait {\n\n    private static int count = 0;\n    private static final Object lock = new Object();\n\n\n    public static void main(String[] args) {\n        new Thread(new TurningRunner(), "偶数").start();\n        new Thread(new TurningRunner(), "奇数").start();\n    }\n\n    //1. 拿到锁，我们就打印\n    //2. 打印完，唤醒其他线程，自己就休眠\n    static class TurningRunner implements Runnable {\n\n        @Override\n        public void run() {\n            while (count <= 100) {\n                synchronized (lock) {\n                    //拿到锁就打印\n                    System.out.println(Thread.currentThread().getName() + ":" + count++);\n                    lock.notify();\n                    if (count <= 100) {\n                        try {\n                            //如果任务还没结束，就让出当前的锁，并休眠\n                            lock.wait();\n                        } catch (InterruptedException e) {\n                            e.printStackTrace();\n                        }\n                    }\n                }\n            }\n        }\n    }\n}\n```\n### sleep\nsleep让线程进入time_waiting状态，不占用CPU，但不释放锁。\n中断后，抛出InterruptedException并清除中断状态。不需要在同步代码块内。\n```java\npublic class SleepInterrupted implements Runnable{\n\n    public static void main(String[] args) throws InterruptedException {\n        Thread thread = new Thread(new SleepInterrupted());\n        thread.start();\n        Thread.sleep(6500);\n        thread.interrupt();\n    }\n    @Override\n    public void run() {\n        for (int i = 0; i < 10; i++) {\n            System.out.println(new Date());\n            try {\n                TimeUnit.SECONDS.sleep(1);\n            } catch (InterruptedException e) {\n                System.out.println("我被中断了！");\n                e.printStackTrace();\n            }\n        }\n    }\n}\n```\n### join\n主线程等待子线程，期间处于waiting状态。\n注释代码为join的等价代码。\n```java\npublic class JoinPrinciple {\n\n    public static void main(String[] args) throws InterruptedException {\n        Thread thread = new Thread(new Runnable() {\n            @Override\n            public void run() {\n                try {\n                    Thread.sleep(1000);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n                System.out.println(Thread.currentThread().getName() + "执行完毕");\n            }\n        });\n\n        thread.start();\n        System.out.println("开始等待子线程运行完毕");\n        thread.join();\n//        synchronized (thread) {\n//            thread.wait();\n//        }\n        System.out.println("所有子线程执行完毕");\n    }\n}\n```\n### yield\n作用：释放时间片，但jvm不保证遵循\n',
      valid: true,
    },
    {
      id: "1586069751251980882",
      authorEmail: "969023014@qq.com",
      description: "线程异常处理",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:55:51.251",
      updateTime: "2020-04-05T14:55:51.251",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "必要性",
            children: [],
          },
          {
            value: "自定义Handler",
            children: [],
          },
        ],
      },
      summary:
        " 必要性- 子线程不容易发现异常- 子线程异常无法用try catch捕获- 提高健壮性 自定义Handler使用",
      content:
        '### 必要性\n- 子线程不容易发现异常\n- 子线程异常无法用try catch捕获\n- 提高健壮性\n### 自定义Handler\n```java\npublic class MyUncaughtExceptionHandler implements Thread.UncaughtExceptionHandler {\n\n    private String name;\n\n    public MyUncaughtExceptionHandler(String name) {\n        this.name = name;\n    }\n\n    @Override\n    public void uncaughtException(Thread t, Throwable e) {\n        Logger logger = Logger.getAnonymousLogger();\n        logger.log(Level.WARNING, "线程异常，终止啦" + t.getName());\n        System.out.println(name + "捕获了异常" + t.getName() + "异常");\n    }\n}\n```\n使用\n```java\npublic class UseOwnUncaughtExceptionHandler implements Runnable {\n\n    public static void main(String[] args) throws InterruptedException {\n        Thread.setDefaultUncaughtExceptionHandler(new MyUncaughtExceptionHandler("捕获器1"));\n\n        new Thread(new UseOwnUncaughtExceptionHandler(), "MyThread-1").start();\n        Thread.sleep(300);\n        new Thread(new UseOwnUncaughtExceptionHandler(), "MyThread-2").start();\n        Thread.sleep(300);\n        new Thread(new UseOwnUncaughtExceptionHandler(), "MyThread-3").start();\n        Thread.sleep(300);\n        new Thread(new UseOwnUncaughtExceptionHandler(), "MyThread-4").start();\n    }\n\n\n    @Override\n    public void run() {\n        throw new RuntimeException();\n    }\n}\n```',
      valid: true,
    },
    {
      id: "1586069804925582366",
      authorEmail: "969023014@qq.com",
      description: "Java内存模型",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:56:44.925",
      updateTime: "2020-04-05T14:56:44.926",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "JMM",
            children: [
              {
                value: "重排序",
                children: [
                  {
                    value: "好处",
                    children: [],
                  },
                  {
                    value: "演示",
                    children: [],
                  },
                ],
              },
              {
                value: "可见性",
                children: [],
              },
              {
                value: "happens-before",
                children: [
                  {
                    value: "概念",
                    children: [],
                  },
                  {
                    value: "规则",
                    children: [],
                  },
                ],
              },
              {
                value: "Volatile",
                children: [
                  {
                    value: "3大特性",
                    children: [],
                  },
                  {
                    value: "使用场景",
                    children: [],
                  },
                  {
                    value: "与sychronize",
                    children: [],
                  },
                  {
                    value: "单例模式",
                    children: [],
                  },
                ],
              },
              {
                value: "原子性",
                children: [
                  {
                    value: "原子操作",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      summary:
        "=> x=1,y=1指令重排序后可能出现x=0,y=0解决方案：使用volatile禁止重排序 可见性 happens-before 概念动作A发生在动作B前，动作B保证看到动作A 规则- 单线程- 锁操作- volatile- 线程启动- join- 传递- 中断一个线程被其他线程中断，检测中断或抛出异常一定看得到- 构造方法最后一条指令一定先于finalize- 工具类中 Volatile 3大特性- 保证可见性示例见可见性代码- 不保证原子性- 禁止指令重排序 使用场景- 纯赋值，无状态变量- 触发器 与sychronize如果一个变量只是被各个线程赋值，可以用volatile代替sychronize，因为赋值操作是原子的  单例模式对于instance=new SingleDemo()操作，实际上分三步确保线程安全，对双重检查锁的单例模式进行如下优化 原子性 原子操作- 除long和double之外的基本类型赋值- 引用赋值- 原子类的操作对于long和double，在32位的jvm上不是原子的，因为可分为2个32位操作写入，可以用volatile解决  JMM 重排序 好处提高处理速度 演示分析可知，一共有3种情况- a=1 注意：原子操作的组合不一定是原子操作 在64位上是原子的",
      content:
        '## JMM\n### 重排序\n#### 好处\n提高处理速度\n#### 演示\n```java\npublic class OutOfOrderExecution {\n\n    private static int x = 0, y = 0;\n    private static int a = 0, b = 0;\n\n    public static void main(String[] args) throws InterruptedException {\n        int i = 0;\n        for (; ; ) {\n            i++;\n            x = 0;\n            y = 0;\n            a = 0;\n            b = 0;\n\n            CountDownLatch latch = new CountDownLatch(3);\n\n            Thread one = new Thread(new Runnable() {\n                @Override\n                public void run() {\n                    try {\n                        latch.countDown();\n                        latch.await();\n                    } catch (InterruptedException e) {\n                        e.printStackTrace();\n                    }\n                    a = 1;\n                    x = b;\n                }\n            });\n            Thread two = new Thread(new Runnable() {\n                @Override\n                public void run() {\n                    try {\n                        latch.countDown();\n                        latch.await();\n                    } catch (InterruptedException e) {\n                        e.printStackTrace();\n                    }\n                    b = 1;\n                    y = a;\n                }\n            });\n            two.start();\n            one.start();\n            latch.countDown();\n            one.join();\n            two.join();\n\n            String result = "第" + i + "次（" + x + "," + y + ")";\n            if (x == 0 && y == 0) {\n                System.out.println(result);\n                break;\n            } else {\n                System.out.println(result);\n            }\n        }\n    }\n\n\n}\n```\n分析可知，一共有3种情况\n- a=1;x=b;b=1;y=a; => x=0,y=1\n- b=1;y=a;a=1;x=a; => y=0,x=1\n- b=1;a=1;x=b;y=a; => x=1,y=1\n\n指令重排序后可能出现x=0,y=0\n解决方案：使用volatile禁止重排序\n### 可见性\n```java\npublic class VolatileDemo {\n    public static void main(String[] args) {\n        visibilityByVolatile();//验证volatile的可见性\n    }\n\n    /**\n     * volatile可以保证可见性，及时通知其他线程，主物理内存的值已经被修改\n     */\n    public static void visibilityByVolatile() {\n        MyData myData = new MyData();\n\n        //第一个线程\n        new Thread(() -> {\n            System.out.println(Thread.currentThread().getName() + "\\t come in");\n            try {\n                //线程暂停3s\n                TimeUnit.SECONDS.sleep(3);\n                myData.addToSixty();\n                System.out.println(Thread.currentThread().getName() + "\\t update value:" + myData.num);\n            } catch (Exception e) {\n                // TODO Auto-generated catch block\n                e.printStackTrace();\n            }\n        }, "thread1").start();\n        //第二个线程是main线程\n        while (myData.num == 0) {\n            //如果myData的num一直为零，main线程一直在这里循环\n        }\n        System.out.println(Thread.currentThread().getName() + "\\t mission is over, num value is " + myData.num);\n    }\n}\nclass MyData {\n    volatile int num = 0;\n    public void addToSixty() {\n        this.num = 60;\n    }\n}\n```\n### happens-before\n#### 概念\n动作A发生在动作B前，动作B保证看到动作A\n#### 规则\n- 单线程\n- 锁操作\n- volatile\n- 线程启动\n- join\n- 传递\n- 中断\n一个线程被其他线程中断，检测中断或抛出异常一定看得到\n- 构造方法最后一条指令一定先于finalize\n- 工具类中\n \n### Volatile\n#### 3大特性\n- 保证可见性\n示例见可见性代码\n- 不保证原子性\n```java\npublic class VolatileDemo {\n\n    public static void main(String[] args) {\n//        visibilityByVolatile();//验证volatile的可见性\n        atomicByVolatile();//验证volatile不保证原子性\n    }\n    \n    public static void atomicByVolatile(){\n        MyData myData = new MyData();\n        for(int i = 1; i <= 20; i++){\n            new Thread(() ->{\n                for(int j = 1; j <= 1000; j++){\n                    myData.addSelf();\n                    myData.atomicAddSelf();\n                }\n            },"Thread "+i).start();\n        }\n        //等待上面的线程都计算完成后，再用main线程取得最终结果值\n        try {\n            TimeUnit.SECONDS.sleep(4);\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n        while (Thread.activeCount()>2){\n            Thread.yield();\n        }\n        System.out.println(Thread.currentThread().getName()+"\\t finally num value is "+myData.num);\n        System.out.println(Thread.currentThread().getName()+"\\t finally atomicnum value is "+myData.atomicInteger);\n    }\n}\n\nclass MyData {\n    volatile int num = 0;\n    public void addToSixty() {\n        this.num = 60;\n    }\n    public void addSelf(){\n        num++;\n    }\n    AtomicInteger atomicInteger = new AtomicInteger();\n    public void atomicAddSelf(){\n        atomicInteger.getAndIncrement();\n    }\n}\n```\n- 禁止指令重排序\n#### 使用场景\n- 纯赋值，无状态变量\n- 触发器\n#### 与sychronize\n如果一个变量只是被各个线程赋值，可以用volatile代替sychronize，因为赋值操作是原子的。\n#### 单例模式\n对于instance=new SingleDemo()操作，实际上分三步\n```java\nmemory = allocate();     //1.分配对象内存空间\ninstance(memory);\t//2.初始化对象\ninstance = memory;\t//3.设置instance执行刚分配的内存地址，此时instance!=null\n```\n确保线程安全，对双重检查锁的单例模式进行如下优化\n```java\npublic class SingletonDemo {\n    private static volatile SingletonDemo instance = null;\n\n    private SingletonDemo() {}\n\n    public static SingletonDemo getInstance() {\n        if (instance == null) {\n            synchronized (SingletonDemo.class) {\n                if (instance == null) {\n                    instance = new SingletonDemo();\n                }\n            }\n        }\n        return instance;\n    }\n\n    public static void main(String[] args) {\n        for (int i = 0; i < 10; i++) {\n            new Thread(() -> {\n                SingletonDemo.getInstance();\n            }, "Thread " + i).start();\n        }\n    }\n}\n```\n### 原子性\n#### 原子操作\n- 除long和double之外的基本类型赋值\n- 引用赋值\n- 原子类的操作\n\n对于long和double，在32位的jvm上不是原子的，因为可分为2个32位操作写入，可以用volatile解决；在64位上是原子的。\n\n注意：原子操作的组合不一定是原子操作',
      valid: true,
    },
    {
      id: "1586069842812837424",
      authorEmail: "969023014@qq.com",
      description: "多线程死锁问题",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:57:22.812",
      updateTime: "2020-04-05T14:57:22.812",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "死锁",
            children: [
              {
                value: "必要条件",
                children: [],
              },
              {
                value: "手写必然死锁",
                children: [],
              },
              {
                value: "哲学家就餐",
                children: [],
              },
              {
                value: "工具类检测",
                children: [],
              },
              {
                value: "Tips",
                children: [],
              },
            ],
          },
          {
            value: "活锁",
            children: [],
          },
        ],
      },
      summary:
        " 死锁 必要条件- 互斥- 请求与保持- 不剥夺- 循环等待 手写必然死锁 哲学家就餐 工具类检测 Tips- 设置超时时间 tryLock- 优先使用并发类而非自己设计- 降低锁使用粒度- 避免锁的嵌套- 专锁专用 活锁程序并没有阻塞，但却得不到进展演示：",
      content:
        '### 死锁\n#### 必要条件\n- 互斥\n- 请求与保持\n- 不剥夺\n- 循环等待\n#### 手写必然死锁\n```java\npublic class MustDeadLock implements Runnable {\n\n    int flag = 1;\n\n    static Object o1 = new Object();\n    static Object o2 = new Object();\n\n    public static void main(String[] args) {\n        MustDeadLock r1 = new MustDeadLock();\n        MustDeadLock r2 = new MustDeadLock();\n        r1.flag = 1;\n        r2.flag = 0;\n        Thread t1 = new Thread(r1);\n        Thread t2 = new Thread(r2);\n        t1.start();\n        t2.start();\n    }\n\n    @Override\n    public void run() {\n        System.out.println("flag = " + flag);\n        if (flag == 1) {\n            synchronized (o1) {\n                try {\n                    Thread.sleep(500);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n                synchronized (o2) {\n                    System.out.println("线程1成功拿到两把锁");\n                }\n            }\n        }\n        if (flag == 0) {\n            synchronized (o2) {\n                try {\n                    Thread.sleep(500);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n                synchronized (o1) {\n                    System.out.println("线程2成功拿到两把锁");\n                }\n            }\n        }\n    }\n}\n```\n#### 哲学家就餐\n```java\npublic class DiningPhilosophers {\n\n    public static class Philosopher implements Runnable {\n\n        private Object leftChopstick;\n\n        public Philosopher(Object leftChopstick, Object rightChopstick) {\n            this.leftChopstick = leftChopstick;\n            this.rightChopstick = rightChopstick;\n        }\n\n        private Object rightChopstick;\n\n        @Override\n        public void run() {\n            try {\n                while (true) {\n                    doAction("Thinking");\n                    synchronized (leftChopstick) {\n                        doAction("Picked up left chopstick");\n                        synchronized (rightChopstick) {\n                            doAction("Picked up right chopstick - eating");\n                            doAction("Put down right chopstick");\n                        }\n                        doAction("Put down left chopstick");\n                    }\n                }\n            } catch (InterruptedException e) {\n                e.printStackTrace();\n            }\n        }\n\n        private void doAction(String action) throws InterruptedException {\n            System.out.println(Thread.currentThread().getName() + " " + action);\n            Thread.sleep((long) (Math.random() * 10));\n        }\n    }\n\n    public static void main(String[] args) {\n        Philosopher[] philosophers = new Philosopher[5];\n        Object[] chopsticks = new Object[philosophers.length];\n        for (int i = 0; i < chopsticks.length; i++) {\n            chopsticks[i] = new Object();\n        }\n        for (int i = 0; i < philosophers.length; i++) {\n            Object leftChopstick = chopsticks[i];\n            Object rightChopstick = chopsticks[(i + 1) % chopsticks.length];\n            if (i == philosophers.length - 1) {\n                philosophers[i] = new Philosopher(rightChopstick, leftChopstick);\n            } else {\n                philosophers[i] = new Philosopher(leftChopstick, rightChopstick);\n            }\n            new Thread(philosophers[i], "哲学家" + (i + 1) + "号").start();\n        }\n    }\n}\n```\n#### 工具类检测\n```java\n    ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();\n    long[] deadlockedThreads = threadMXBean.findDeadlockedThreads();\n    if (deadlockedThreads != null && deadlockedThreads.length > 0) {\n         for (int i = 0; i < deadlockedThreads.length; i++) {\n             ThreadInfo threadInfo = threadMXBean.getThreadInfo(deadlockedThreads[i]);\n             System.out.println("发现死锁" + threadInfo.getThreadName());\n         }\n     }\n```\n#### Tips\n- 设置超时时间 tryLock\n- 优先使用并发类而非自己设计\n- 降低锁使用粒度\n- 避免锁的嵌套\n- 专锁专用\n### 活锁\n程序并没有阻塞，但却得不到进展\n演示：\n```java\npublic class LiveLock {\n    static class Spoon {\n        private Diner owner;\n        public Spoon(Diner owner) {\n            this.owner = owner;\n        }\n        public Diner getOwner() {\n            return owner;\n        }\n        public void setOwner(Diner owner) {\n            this.owner = owner;\n        }\n        public synchronized void use() {\n            System.out.printf("%s吃完了!", owner.name);\n        }\n    }\n    static class Diner {\n        private String name;\n        private boolean isHungry;\n        public Diner(String name) {\n            this.name = name;\n            isHungry = true;\n        }\n        public void eatWith(Spoon spoon, Diner spouse) {\n            while (isHungry) {\n                if (spoon.owner != this) {\n                    try {\n                        Thread.sleep(1);\n                    } catch (InterruptedException e) {\n                        e.printStackTrace();\n                    }\n                    continue;\n                }\n                Random random = new Random();\n                if (spouse.isHungry && random.nextInt(10) < 9) {\n                    System.out.println(name + ": 亲爱的" + spouse.name + "你先吃吧");\n                    spoon.setOwner(spouse);\n                    continue;\n                }\n                spoon.use();\n                isHungry = false;\n                System.out.println(name + ": 我吃完了");\n                spoon.setOwner(spouse);\n            }\n        }\n    }\n    public static void main(String[] args) {\n        Diner husband = new Diner("牛郎");\n        Diner wife = new Diner("织女");\n        Spoon spoon = new Spoon(husband);\n        new Thread(new Runnable() {\n            @Override\n            public void run() {\n                husband.eatWith(spoon, wife);\n            }\n        }).start();\n        new Thread(new Runnable() {\n            @Override\n            public void run() {\n                wife.eatWith(spoon, husband);\n            }\n        }).start();\n    }\n}\n```',
      valid: true,
    },
    {
      id: "1586069884117399022",
      authorEmail: "969023014@qq.com",
      description: "Leetcode多线程习题题解",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T14:58:04.117",
      updateTime: "2020-04-05T14:58:04.117",
      tag: "编程语言/Java",
      titleTree: {
        value: "",
        children: [
          {
            value: "交替打印foobar",
            children: [
              {
                value: "题面(1115)",
                children: [],
              },
              {
                value: "Semaphore",
                children: [],
              },
              {
                value: "无锁自旋",
                children: [],
              },
            ],
          },
          {
            value: "打印零与奇偶数",
            children: [
              {
                value: "题面(1116)",
                children: [],
              },
              {
                value: "Semaphore",
                children: [],
              },
              {
                value: "Lock&Condition",
                children: [],
              },
            ],
          },
          {
            value: "H20生成",
            children: [
              {
                value: "题面(1117)",
                children: [],
              },
              {
                value: "Semaphore",
                children: [],
              },
            ],
          },
          {
            value: "交替打印字符串",
            children: [
              {
                value: "题面(1195)",
                children: [],
              },
              {
                value: "CyclicBarrier",
                children: [],
              },
            ],
          },
          {
            value: "哲学家进餐",
            children: [
              {
                value: "题面(1226)",
                children: [],
              },
              {
                value: "Semaphore+Lock",
                children: [],
              },
              {
                value: "使用Volatile实现轻量同步",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        ' 打印零与奇偶数 题面(1116)假设有这么一个类：相同的一个 ZeroEvenOdd 类实例将会传递给三个不同的线程：线程 A 将调用 zero()，它只输出 0  Semaphore 交替打印字符串 题面(1195)编写一个可以从 1 到 n 输出代表这个数字的字符串的程序，但是：如果这个数字可以被 3 整除，输出 "fizz"  交替打印foobar 题面(1115)我们提供一个类：两个不同的线程将会共用一个 FooBar 实例 每个线程都有一个 printNumber 方法来输出一个整数 线程 B 将调用 even()，它只输出偶数',
      content:
        '## 交替打印foobar\n### 题面(1115)\n我们提供一个类：\n```java\nclass FooBar {\n  public void foo() {\n    for (int i = 0; i < n; i++) {\n      print("foo");\n    }\n  }\n\n  public void bar() {\n    for (int i = 0; i < n; i++) {\n      print("bar");\n    }\n  }\n}\n```\n两个不同的线程将会共用一个 FooBar 实例。其中一个线程将会调用 foo() 方法，另一个线程将会调用 bar() 方法。\n请设计修改程序，以确保 "foobar" 被输出 n 次。\n### Semaphore\n```java\npublic class FooBar {\n    private int n;\n    Semaphore foo = new Semaphore(1);\n    Semaphore bar = new Semaphore(0);\n    public FooBar(int n) {\n        this.n = n;\n    }\n    public void foo(Runnable printFoo) throws InterruptedException {\n        for (int i = 0; i < n; i++) {\n            foo.acquire();\n            printFoo.run();\n            bar.release();\n        }\n    }\n    public void bar(Runnable printBar) throws InterruptedException {\n        for (int i = 0; i < n; i++) {\n            bar.acquire();\n            printBar.run();\n            foo.release();\n        }\n    }\n}\n```\n### 无锁自旋\n此方法提交会超时。\n注意：i++只能写在if内。\n```java\nclass FooBar {\n    private int n;\n\n    public FooBar(int n) {\n        this.n = n;\n    }\n\n    volatile boolean permitFoo = true;\n\n    public void foo(Runnable printFoo) throws InterruptedException {     \n        for (int i = 0; i < n; ) {\n            if(permitFoo) {\n        \tprintFoo.run();\n            \ti++;\n            \tpermitFoo = false;\n            }\n        }\n    }\n\n    public void bar(Runnable printBar) throws InterruptedException {       \n        for (int i = 0; i < n; ) {\n            if(!permitFoo) {\n        \tprintBar.run();\n        \ti++;\n        \tpermitFoo = true;\n            }\n        }\n    }\n}\n```\n## 打印零与奇偶数\n### 题面(1116)\n假设有这么一个类：\n```java\nclass ZeroEvenOdd {\n  public ZeroEvenOdd(int n) { ... }      // 构造函数\n  public void zero(printNumber) { ... }  // 仅打印出 0\n  public void even(printNumber) { ... }  // 仅打印出 偶数\n  public void odd(printNumber) { ... }   // 仅打印出 奇数\n}\n```\n相同的一个 ZeroEvenOdd 类实例将会传递给三个不同的线程：\n线程 A 将调用 zero()，它只输出 0 。\n线程 B 将调用 even()，它只输出偶数。\n线程 C 将调用 odd()，它只输出奇数。\n每个线程都有一个 printNumber 方法来输出一个整数。请修改给出的代码以输出整数序列 010203040506... ，其中序列的长度必须为 2n。\n### Semaphore\n```java\nclass ZeroEvenOdd {\n    private int n;\n    public ZeroEvenOdd(int n) {\n        this.n = n;\n    }\n    Semaphore z = new Semaphore(1);\n    Semaphore e = new Semaphore(0);\n    Semaphore o = new Semaphore(0);\n    public void zero(IntConsumer printNumber) throws InterruptedException {\n        for(int i=0; i<n;i++) {\n        \tz.acquire();\n        \tprintNumber.accept(0);\n        \tif((i&1)==0) {\n        \t\to.release();\n        \t}else {\n        \t\te.release();\n        \t}\n        }\n    }\n    public void even(IntConsumer printNumber) throws InterruptedException {\n        for(int i=2; i<=n; i+=2) {\n        \te.acquire();\n        \tprintNumber.accept(i);\n        \tz.release();\n        }\n    }\n    public void odd(IntConsumer printNumber) throws InterruptedException {\n        for(int i=1; i<=n; i+=2) {\n        \to.acquire();\n        \tprintNumber.accept(i);\n        \tz.release();\n        }\n    }\n}\n```\n### Lock&Condition\n```java\npublic class ZeroEvenOdd {\n    private int n;\n    private Lock lock = new ReentrantLock();\n    private Condition zero = lock.newCondition();\n    private Condition even = lock.newCondition();\n    private Condition odd = lock.newCondition();\n    private volatile int current;\n    private volatile AtomicInteger i = new AtomicInteger(1);\n    public ZeroEvenOdd(int n) {\n        this.n = n;\n        this.current = 0;\n    }\n    public void zero(IntConsumer printNumber) throws InterruptedException {\n        lock.lock();\n        while (i.get() <= n){\n            if (current != 0)\n                zero.await();\n            printNumber.accept(0);\n            if (i.get() % 2 == 0) {\n                current = 2;\n                even.signal();\n            }\n            else {\n                current = 1;\n                odd.signal();\n            }\n            zero.await();\n        }\n        odd.signal();\n        even.signal();\n        lock.unlock();\n    }\n    public void even(IntConsumer printNumber) throws InterruptedException {\n        lock.lock();\n        while (i.get() <= n) {\n            if (current != 2)\n                even.await();\n            else {\n                printNumber.accept(i.getAndIncrement());\n                current = 0;\n                zero.signal();\n            }\n        }\n        lock.unlock();\n    }\n    public void odd(IntConsumer printNumber) throws InterruptedException {\n        lock.lock();\n        while (i.get() <= n) {\n            if (current != 1)\n                odd.await();\n            else {\n                printNumber.accept(i.getAndIncrement());\n                current = 0;\n                zero.signal();\n            }\n        }\n        lock.unlock();\n    }\n}\n```\n## H20生成\n### 题面(1117)\n现在有两种线程，氢 oxygen 和氧 hydrogen，你的目标是组织这两种线程来产生水分子。\n如果一个氧线程到达屏障时没有氢线程到达，它必须等候直到两个氢线程到达。\n如果一个氢线程到达屏障时没有其它线程到达，它必须等候直到一个氧线程和另一个氢线程到达。\n书写满足这些限制条件的氢、氧线程同步代码。\n### Semaphore\n```java\npublic class H2O {\n    public H2O() {}\n    private Semaphore h = new Semaphore(2);//供给给氧的氢的数量\n    private Semaphore o = new Semaphore(0);\n    public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {\n        h.acquire();\n        releaseHydrogen.run();\n        o.release();\n    }\n    public void oxygen(Runnable releaseOxygen) throws InterruptedException {\n        o.acquire(2);\n        releaseOxygen.run();\n        h.release(2);\n    }\n}\n```\n## 交替打印字符串\n### 题面(1195)\n编写一个可以从 1 到 n 输出代表这个数字的字符串的程序，但是：\n如果这个数字可以被 3 整除，输出 "fizz"。\n如果这个数字可以被 5 整除，输出 "buzz"。\n如果这个数字可以同时被 3 和 5 整除，输出 "fizzbuzz"。\n例如，当 n = 15，输出： 1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz。\n### CyclicBarrier\n```java\npublic class FizzBuzz {\n    private int n;\n    private CyclicBarrier cyclicBarrier = new CyclicBarrier(4);\n    public FizzBuzz(int n) {\n        this.n = n;\n    }\n    public void fizz(Runnable printFizz) throws InterruptedException {\n        for (int i = 0; i <= n; i++) {\n            if (i % 3 == 0 && i % 5 != 0) {\n                printFizz.run();\n            }\n            try {\n                cyclicBarrier.await();\n            } catch (BrokenBarrierException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n    public void buzz(Runnable printBuzz) throws InterruptedException {\n        for (int i = 0; i <= n; i++) {\n            if (i % 5 == 0 && i % 3 != 0) {\n                printBuzz.run();\n            }\n            try {\n                cyclicBarrier.await();\n            } catch (BrokenBarrierException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n    public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {\n        for (int i = 0; i <= n; i++) {\n            if (i % 5 == 0 && i % 3 == 0) {\n                printFizzBuzz.run();\n            }\n            try {\n                cyclicBarrier.await();\n            } catch (BrokenBarrierException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n    public void number(IntConsumer printNumber) throws InterruptedException {\n        for (int i = 0; i <= n; i++) {\n            if (i % 5 != 0 && i % 3 != 0) {\n                printNumber.accept(i);\n            }\n            try {\n                cyclicBarrier.await();\n            } catch (BrokenBarrierException e) {\n                e.printStackTrace();\n            }\n        }\n    }\n}\n```\n## 哲学家进餐\n### 题面(1226)\n参见官网\n### Semaphore+Lock\n思路：为5个勺子加锁，并限制最多4个哲学家一起吃饭\n```java\nclass DiningPhilosophers {\n    private Semaphore semaphore = new Semaphore(4);\n    private Lock[] forks = new ReentrantLock[5];\n    public DiningPhilosophers() {\n        for (int i = 0; i < 5; i++) {\n            forks[i] = new ReentrantLock();\n        }\n    }\n    public void wantsToEat(int philosopher,\n                           Runnable pickLeftFork,\n                           Runnable pickRightFork,\n                           Runnable eat,\n                           Runnable putLeftFork,\n                           Runnable putRightFork) throws InterruptedException {\n        semaphore.acquire();\n        int leftFork = (philosopher + 1) % 5;\n        int rightFork = philosopher;\n        forks[leftFork].lock();\n        forks[rightFork].lock();\n        pickLeftFork.run();\n        pickRightFork.run();\n        eat.run();\n        putLeftFork.run();\n        putRightFork.run();\n        forks[leftFork].unlock();\n        forks[rightFork].unlock();\n        semaphore.release();\n    }\n}\n```\n### 使用Volatile实现轻量同步\n```java\nclass DiningPhilosophers {\n    private Semaphore semaphore = new Semaphore(4);\n    private volatile boolean[] used = new boolean[5];\n    public DiningPhilosophers() { }\n    public void wantsToEat(int philosopher,\n                           Runnable pickLeftFork,\n                           Runnable pickRightFork,\n                           Runnable eat,\n                           Runnable putLeftFork,\n                           Runnable putRightFork) throws InterruptedException {\n        semaphore.acquire();\n        int leftFork = (philosopher + 1) % 5;\n        int rightFork = philosopher;\n        while (used[leftFork])\n            Thread.sleep(1);\n        used[leftFork] = true;\n        while (used[rightFork])\n            Thread.sleep(1);\n        used[rightFork] = true;\n        pickLeftFork.run();\n        pickRightFork.run();\n        eat.run();\n        putLeftFork.run();\n        putRightFork.run();\n        used[leftFork] = false;\n        used[rightFork] = false;\n        semaphore.release();\n    }\n}\n\n```',
      valid: true,
    },
    {
      id: "1586070016656885387",
      authorEmail: "969023014@qq.com",
      description: "图论基础",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T15:00:16.656",
      updateTime: "2020-04-05T15:00:16.656",
      tag: "学科基础/数据结构",
      titleTree: {
        value: "",
        children: [
          {
            value: "图的表示",
            children: [
              {
                value: "基于邻接表",
                children: [],
              },
              {
                value: "复杂度",
                children: [],
              },
            ],
          },
          {
            value: "图的遍历",
            children: [
              {
                value: "深度优先遍历(基于递归)",
                children: [],
              },
              {
                value: "复杂度",
                children: [],
              },
              {
                value: "应用",
                children: [],
              },
              {
                value: "深度优先遍历(基于栈)",
                children: [],
              },
              {
                value: "广度优先遍历",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        " 复杂度$O(V+E)$ 应用- 求图联通分量- 求两点是否可达- 求两点一条路径- 检测图中是否有环- 二分图检测- 寻找图中桥和割点- 拓扑排序- 哈密尔顿路径 深度优先遍历(基于栈)需要注意的是，此算法和递归方式得出的遍历结果不太相同  图的表示 基于邻接表无向无权图，邻接表红黑树实现 复杂度|          | 空间     | 建图时间              | 查看两点是否相邻    | 查找点所有邻边      || -------- | -------- | ----------------- | ------------------- | ------------------- || 邻接矩阵 | $O(V^2)$ | $O(E)$            | $O(1)$              | $ O(V) $            || 邻接链表 | $O(V+E)$ | $O(E),O(E*V)$查重 | $O(degree(v)),O(V)$ | $O(degree(v)),O(V)$ || 邻接树   | $O(V+E)$ | $O(ElogV)$        | $O(logV)$           | $O(degree(v)),O(V)$ | 图的遍历 深度优先遍历(基于递归)其中pre为先序遍历结果，post为后序遍历结果 构造函数中使用for循环，防止存在多个联通分量遍历不到  广度优先遍历和深度优先遍历stack实现类似，只是换了数据结构 这是由栈的特点决定的",
      content:
        '## 图的表示\n### 基于邻接表\n无向无权图，邻接表红黑树实现\n```java\npublic class Graph {\n    private int V;\n    private int E;\n    private TreeSet<Integer>[] adj;\n    public Graph(String filename){\n        File file = new File(filename);\n        try(Scanner scanner = new Scanner(file)){\n            V = scanner.nextInt();\n            if(V <= 0)\n                throw new IllegalArgumentException("V must be non-negative");\n            adj = new TreeSet[V];\n            for(int i=0;i<V;i++)\n                adj[i] = new TreeSet<>();\n            E = scanner.nextInt();\n            if(E < 0)\n                throw new IllegalArgumentException("E must be non-negative");\n            for(int i=0;i<E;i++){\n                int a = scanner.nextInt();\n                validateVertex(a);\n                int b = scanner.nextInt();\n                validateVertex(b);\n                if(a == b)\n                    throw new IllegalArgumentException("self loop is detected");\n                if(adj[a].contains(b))\n                    throw new IllegalArgumentException("parallel graph");\n                adj[a].add(b);\n                adj[b].add(a);\n            }\n        }\n        catch (IOException e){\n            e.printStackTrace();\n        }\n    }\n    private void validateVertex(int v){\n        if(v < 0 || v >= V)\n            throw new IllegalArgumentException("invalid v");\n    }\n    public int getV(){\n        return V;\n    }\n    public int getE(){\n        return E;\n    }\n    public boolean hasEdge(int v, int w){\n        validateVertex(v);\n        validateVertex(w);\n        return adj[v].contains(w);\n    }\n    public Iterable <Integer> adj(int v){\n        validateVertex(v);\n        return adj[v];\n    }\n    public int degree(int v){\n        validateVertex(v);\n        return adj[v].size();\n    }\n    @Override\n    public String toString(){\n        StringBuilder sb = new StringBuilder();\n        sb.append(String.format("V = %d, E = %d\\n",V,E));\n        for(int v=0;v<V;v++) {\n            sb.append(String.format("%d : ",v));\n            for(int w:adj[v])\n                sb.append(String.format("%d ", w));\n            sb.append("\\n");\n        }\n        return sb.toString();\n    }\n}\n\n```\n### 复杂度\n|          | 空间     | 建图时间              | 查看两点是否相邻    | 查找点所有邻边      |\n| -------- | -------- | ----------------- | ------------------- | ------------------- |\n| 邻接矩阵 | $O(V^2)$ | $O(E)$            | $O(1)$              | $ O(V) $            |\n| 邻接链表 | $O(V+E)$ | $O(E),O(E*V)$查重 | $O(degree(v)),O(V)$ | $O(degree(v)),O(V)$ |\n| 邻接树   | $O(V+E)$ | $O(ElogV)$        | $O(logV)$           | $O(degree(v)),O(V)$ |\n## 图的遍历\n### 深度优先遍历(基于递归)\n其中pre为先序遍历结果，post为后序遍历结果。\n构造函数中使用for循环，防止存在多个联通分量遍历不到。\n```java\npublic class GraphDFS {\n    private Graph graph;\n    private boolean[] visited;\n    private List<Integer> post = new ArrayList<>();\n    private List<Integer> pre = new ArrayList<>();\n    public GraphDFS(Graph graph) {\n        this.graph = graph;\n        visited = new boolean[graph.getV()];\n        for (int i = 0; i < graph.getV(); i++) {\n            if (!visited[i]){\n                dfs(i);\n            }\n        }\n    }\n    private void dfs(int v){\n        visited[v] = true;\n        pre.add(v);\n        for(int w : graph.adj(v)){\n            if (!visited[w]){\n                dfs(w);\n            }\n        }\n        post.add(v);\n    }\n    public Iterable<Integer> preOrder() {\n        return pre;\n    }\n    public Iterable<Integer> postOrder() {\n        return post;\n    }\n}\n```\n### 复杂度\n$O(V+E)$\n### 应用\n- 求图联通分量\n- 求两点是否可达\n- 求两点一条路径\n- 检测图中是否有环\n- 二分图检测\n- 寻找图中桥和割点\n- 拓扑排序\n- 哈密尔顿路径\n### 深度优先遍历(基于栈)\n```java\n    private void dfsNoRecursive(int v) {\n        Stack<Integer> stack = new Stack<>();\n        stack.push(v);\n        visited[v] = true;\n        while (!stack.empty()){\n            int current = stack.pop();\n            pre.add(current);\n            for (int w : graph.adj(current)) {\n                if (!visited[w]) {\n                    stack.push(w);\n                    visited[w] = true;\n                }\n            }\n        }\n    }\n```\n需要注意的是，此算法和递归方式得出的遍历结果不太相同。这是由栈的特点决定的。\n### 广度优先遍历\n和深度优先遍历stack实现类似，只是换了数据结构。\n```java\npublic class GraphBFS {\n    private Graph graph;\n    private boolean[] visited;\n    private List<Integer> order;\n    public GraphBFS(Graph graph) {\n        this.graph = graph;\n        order = new ArrayList<>();\n        visited = new boolean[graph.getV()];\n        for (int i = 0; i < graph.getV(); i++) {\n            if (!visited[i]){\n                bfs(i);\n            }\n        }\n    }\n    private void bfs(int v) {\n        Queue<Integer> queue = new LinkedList<>();\n        queue.add(v);\n        visited[v] = true;\n        while (!queue.isEmpty()){\n            int current = queue.poll();\n            order.add(v);\n            for (int w : graph.adj(current)) {\n                if (!visited[w]) {\n                    queue.add(w);\n                    visited[w] = true;\n                }\n            }\n        }\n    }\n    public Iterable<Integer> getOrder() {\n        return order;\n    }\n}\n```',
      valid: true,
    },
    {
      id: "1586070230670104540",
      authorEmail: "969023014@qq.com",
      description: "图的遍历应用",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T15:03:50.67",
      updateTime: "2020-04-05T15:03:50.671",
      tag: "学科基础/数据结构",
      titleTree: {
        value: "",
        children: [
          {
            value: "无向图连通分量个数",
            children: [],
          },
          {
            value: "单源路径",
            children: [
              {
                value: "DFS",
                children: [],
              },
              {
                value: "BFS",
                children: [],
              },
            ],
          },
          {
            value: "环检测",
            children: [],
          },
          {
            value: "二分图检测",
            children: [],
          },
          {
            value: "无权图最短路径",
            children: [],
          },
        ],
      },
      summary:
        " BFS 环检测核心算法：找到了一个已经访问过的节点且该节点不是上一个访问的节点 二分图检测核心算法：用两种颜色对图染色 无权图最短路径  无向图连通分量个数使用components替代原先的visited，属于一个联通分量的id相同  单源路径 DFS提前结束递归，t应该在构造函数时确定，不需要遍历所有顶点",
      content:
        "## 无向图连通分量个数\n使用components替代原先的visited，属于一个联通分量的id相同。\n```java\npublic class GraphCC {\n    private Graph graph;\n    private int[] components;\n    private int count = 0;\n    public GraphCC(Graph graph) {\n        this.graph = graph;\n        components = new int[graph.getV()];\n        for (int i = 0; i < graph.getV(); i++) {\n            if (components[i] == 0){\n                dfs(i, ++count);\n            }\n        }\n    }\n    private void dfs(int v, int id){\n        components[v] = id;\n        for(int w : graph.adj(v))\n            if (components[w] == 0)\n                dfs(w, id);\n    }\n    public int getCount() {\n        return count;\n    }\n    public boolean isConnected(int v, int w){\n        return components[v] == components[w];\n    }\n    public ArrayList<Integer>[] getComponents(){\n        ArrayList<Integer>[] res = new ArrayList[count];\n        for(int i=0;i<count;i++)\n            res[i] = new ArrayList<Integer>();\n        for(int v=0;v<graph.getV();v++)\n            res[components[v]].add(v);\n        return res;\n    }\n}\n```\n## 单源路径\n### DFS\n```java\npublic class SingleSourcePath { \n    private Graph graph;\n    private int[] pre;\n    private int s;\n    public SingleSourcePath(Graph graph, int s) {\n        this.graph = graph;\n        pre = new int[graph.getV()];\n        this.s = s;\n        Arrays.fill(pre,-1);\n        dfs(s, s);\n    }\n    private void dfs(int v, int previous){\n        pre[v] = previous;\n        for(int w : graph.adj(v)){\n            if (pre[w] == -1){\n                dfs(w, v);\n            }\n        }\n    }\n    private Iterable<Integer> path(int t){\n        List<Integer> res = new ArrayList<>();\n        if (pre[t] == -1)\n            return res;\n        int cur = t;\n        while (cur != s){\n            res.add(cur);\n            cur = pre[cur];\n        }\n        res.add(s);\n        Collections.reverse(res);\n        return res;\n    }\n}\n```\n提前结束递归，t应该在构造函数时确定，不需要遍历所有顶点。\n```java\n    private boolean dfs(int v, int previous){\n        pre[v] = previous;\n        if (v == t)\n            return true;\n        for(int w : graph.adj(v)){\n           if (pre[w] == -1){\n                if(dfs(w, v)){\n                    return true;\n                }\n            }\n        }\n        return false;\n    }\n```\n### BFS\n```java\nprivate void bfs(int s) {\n        Queue<Integer> queue = new LinkedList<>();\n        queue.add(s);\n        visited[s] = true;\n        pre[s] = s;\n        if(s == t)\n            return;\n        while (!queue.isEmpty()){\n            int v = queue.remove();\n            for (int w: g.adj(v)) {\n                if (!visited[w]){\n                    queue.add(w);\n                    visited[w] = true;\n                    pre[w] = v;\n                    if(w == t)\n                        return;\n                }\n\n            }\n        }\n    }\n```\n## 环检测\n核心算法：找到了一个已经访问过的节点且该节点不是上一个访问的节点\n```java\npublic class CircleDetection {\n    private Graph graph;\n    private boolean[] visited;\n    private boolean hasCycle;\n    public CircleDetection(Graph graph) {\n        this.graph = graph;\n        visited = new boolean[graph.getV()];\n        for (int i = 0; i < graph.getV(); i++) {\n            if (!visited[i]) {\n                if(dfs(i, i)) {\n                    hasCycle = true;\n                    break;\n                }\n            }\n        }\n    }\n    public boolean hasCycle() {\n        return hasCycle;\n    }\n    private boolean dfs(int v, int previous){\n        visited[v] = true;\n        for(int w : graph.adj(v)){\n            if (!visited[w]){\n                if (dfs(w, v)){\n                    return true;\n                }\n            } else if (previous != w) {\n                return true;\n            }\n        }\n        return false;\n    }\n}\n```\n## 二分图检测\n核心算法：用两种颜色对图染色\n```java\npublic class BipartitionDetection {\n    private Graph graph;\n    private int[] colors;\n    private boolean isBipartite;\n    public BipartitionDetection(Graph graph) {\n        this.graph = graph;\n        colors = new int[graph.getV()];\n        Arrays.fill(colors,-1);\n        for (int i = 0; i < graph.getV(); i++) {\n            if (colors[i] == -1) {\n                if(!dfs(i, 0)) {\n                    isBipartite = false;\n                    break;\n                }\n            }\n        }\n    }\n    public boolean isBipartite() {\n        return isBipartite;\n    }\n    private boolean dfs(int v, int color){\n        colors[v] = color;\n        for(int w : graph.adj(v)){\n            if (colors[w] == -1){\n                if (!dfs(w, 1 - color)){\n                    return false;\n                }\n            } else if (colors[w] == color) {\n                return false;\n            }\n        }\n        return true;\n    }\n}\n```\n## 无权图最短路径\n```java\npublic class USSSPath {\n    private Graph g;\n    private int s;\n    private boolean[] visited;\n    private int[] pre;\n    private int[] dis;\n    public USSSPath(Graph g, int s) {\n        g.validateVertex(s);\n        this.g = g;\n        this.s = s;\n        visited = new boolean[g.getV()];\n        pre = new int[g.getV()];\n        dis = new int[g.getV()];\n        Arrays.fill(pre, - 1);\n        bfs(s);\n    }\n    private void bfs(int s) {\n        Queue<Integer> queue = new LinkedList<>();\n        queue.add(s);\n        visited[s] = true;\n        pre[s] = s;\n        dis[s] = 0;\n        while (!queue.isEmpty()){\n            int v = queue.remove();\n            for (int w: g.adj(v)) {\n                if (!visited[w]){\n                    queue.add(w);\n                    visited[w] = true;\n                    pre[w] = v;\n                    dis[w] = dis[v] + 1;\n                }\n            }\n        }\n    }\n    public boolean isConnectedTo(int t) {\n        g.validateVertex(t);\n        return visited[t];\n    }\n    public int distance(int t){\n        g.validateVertex(t);\n        return dis[t];\n    }\n    public Iterable<Integer> path(int t) {\n        ArrayList<Integer> res = new ArrayList<>();\n        if (! isConnectedTo(t))\n            return res;\n        int cur = t;\n        while (cur != s) {\n            res.add(cur);\n            cur = pre[cur];\n        }\n        res.add(s);\n        Collections.reverse(res);\n        return res;\n    }\n}\n\n```",
      valid: true,
    },
    {
      id: "1586070259942176966",
      authorEmail: "969023014@qq.com",
      description: "Leetcode图论建模",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T15:04:19.942",
      updateTime: "2020-04-05T15:04:19.942",
      tag: "学科基础/算法",
      titleTree: {
        value: "",
        children: [
          {
            value: "二进制矩阵中的最短路径",
            children: [],
          },
          {
            value: "打开转盘锁",
            children: [],
          },
          {
            value: "水桶问题",
            children: [],
          },
          {
            value: "滑动谜题",
            children: [],
          },
        ],
      },
      summary:
        "[819f58d756c1f595068bd0db0ef2b94e.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p568) 滑动谜题本题对应Leetcode中国站773号问题 分析状态转移  二进制矩阵中的最短路径本题对应Leetcode中国站1091号问题 打开转盘锁本题对应Leetcode中国站752号问题 水桶问题有两个水桶，一个装5升，一个装3升，怎么利用这两个水桶，得到4升水",
      content:
        '## 二进制矩阵中的最短路径\n本题对应Leetcode中国站1091号问题\n```java\nclass Solution {\n    class Point{\n        int x;\n        int y;\n        public Point(int x, int y) {\n            this.x = x;\n            this.y = y;\n        }\n    }\n    public int shortestPathBinaryMatrix(int[][] grid) {\n        int m = grid.length;\n        int n = grid[0].length;\n        if (grid[0][0] == 1 || grid[m-1][n-1] == 1)\n            return -1;\n        int[][] dir = {{1,-1},{1,0},{1,1},{0,-1},{0,1},{-1,-1},{-1,0},{-1,1}};\n        Queue<Point> queue = new LinkedList<>();\n        queue.add(new Point(0, 0));\n        grid[0][0] = 1;\n        int distance = 0;\n        while (!queue.isEmpty()){\n            distance ++;\n            int size = queue.size();\n            for (int j = 0; j < size; j++) {\n                Point point = queue.poll();\n                int x = point.x;\n                int y = point.y;\n                if (x == m - 1 && y == n - 1)\n                    return distance;\n                for (int i = 0; i < 8; i++) {\n                    int newX = x + dir[i][0];\n                    int newY = y + dir[i][1];\n                    if (newX < 0 || newY < 0 || newX >= n || newY >= n)\n                        continue;\n                    if(grid[newX][newY] == 1)\n                        continue;\n                    queue.add(new Point(newX, newY));\n                    grid[newX][newY] = 1;\n                }\n            }\n        }\n        return -1;\n    }\n}\n```\n## 打开转盘锁\n本题对应Leetcode中国站752号问题\n```java\nclass Solution {\n    public int openLock(String[] deadends, String target) {\n        HashSet<String> deadSet = new HashSet<>(Arrays.asList(deadends));\n        if (deadSet.contains(target))\n            return -1;\n        if (deadSet.contains("0000"))\n            return -1;\n        if ("0000".equals(target))\n            return 0;\n        Queue<String> queue = new LinkedList<>();\n        HashMap<String, Integer> visited = new HashMap<>();\n        queue.add("0000");\n        visited.put("0000",0);\n        while (!queue.isEmpty()){\n            String cur = queue.poll();\n            char[] chars = cur.toCharArray();\n            ArrayList<String> nextStr = new ArrayList<>();\n            for (int i = 0; i < 4; i++) {\n                char original = chars[i];\n                chars[i] = Character.forDigit((chars[i] - \'0\' + 1) % 10, 10);\n                nextStr.add(new String(chars));\n                chars[i] = original;\n                chars[i] = Character.forDigit((chars[i] - \'0\' + 9) % 10, 10);\n                nextStr.add(new String(chars));\n                chars[i] = original;\n            }\n            for(String next : nextStr) {\n                if (! deadSet.contains(next) && ! visited.containsKey(next)) {\n                    queue.add(next);\n                    visited.put(next, visited.get(cur) + 1);\n                    if (next.equals(target))\n                        return visited.get(next);\n                }\n            }\n        }\n        return -1;\n    }\n}\n```\n## 水桶问题\n有两个水桶，一个装5升，一个装3升，怎么利用这两个水桶，得到4升水？\n分析状态转移\n![819f58d756c1f595068bd0db0ef2b94e.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p568)\n```java\npublic class WaterPuzzle {\n    private int[] pre;\n    private int end = -1;\n    public WaterPuzzle(){\n        Queue<Integer> queue = new LinkedList<>();\n        boolean[] visited = new boolean[100];\n        pre = new int[100];\n        queue.add(0);\n        visited[0] = true;\n        while (!queue.isEmpty()){\n            int cur = queue.remove();\n            int a = cur / 10;\n            int b = cur % 10;\n            ArrayList<Integer> nexts = new ArrayList<>();\n            nexts.add(5*10+b);\n            nexts.add(a*10+3);\n            nexts.add(b);\n            nexts.add(a*10);\n            int x = Math.min(a, 3-b);\n            nexts.add((a-x)*10+b+x);\n            int y = Math.min(5-a, b);\n            nexts.add((a+y)*10+b-y);\n            for (int next : nexts) {\n                if(!visited[next]){\n                    queue.add(next);\n                    visited[next] = true;\n                    pre[next] = cur;\n                    if(next / 10 == 4 || next % 10 == 4) {\n                        end = next;\n                        return;\n                    }\n                }\n            }\n        }\n    }\n    public Iterable<Integer> result(){\n        ArrayList<Integer> res = new ArrayList<>();\n        if(end == -1)\n            return res;\n        int cur = end;\n        while (cur != 0){\n            res.add(cur);\n            cur = pre[cur];\n        }\n        res.add(0);\n        Collections.reverse(res);\n        return res;\n    }\n}\n```\n## 滑动谜题\n本题对应Leetcode中国站773号问题\n```java\nclass Solution {\n    private int[][] dirs = {{-1,0},{1,0},{0,1},{0,-1}};\n    public int slidingPuzzle(int[][] board) {\n        Queue<String> queue = new LinkedList<>();\n        HashMap<String,Integer>visited = new HashMap<>();\n        String init = boardToString(board);\n        if(init.equals("123450"))\n            return 0;\n        queue.add(init);\n        visited.put(init,0);\n        while(!queue.isEmpty()){\n            String cur = queue.remove();\n            ArrayList<String>nexts = getNexts(cur);\n            for(String next:nexts){\n                if(!visited.containsKey(next)){\n                    queue.add(next);\n                    visited.put(next,visited.get(cur)+1);\n                    if(next.equals("123450"))\n                        return visited.get(next);\n                }\n            }\n        }\n        return -1;\n    }\n    private ArrayList<String> getNexts(String s){\n        int [][] cur = stringToBoard(s);\n        int zero;\n        for(zero=0;zero<6;zero++)\n            if(cur[zero/3][zero%3] == 0)\n                break;\n        ArrayList<String> res = new ArrayList<>();\n        int zx = zero/3,zy = zero%3;\n        for(int d=0;d<4;d++){\n            int nextx = zx + dirs[d][0];\n            int nexty = zy + dirs[d][1];\n            if(nextx>=0&&nextx<2&&nexty>=0&&nexty<3){\n                swap(cur,zx,zy,nextx,nexty);\n                res.add(boardToString(cur));\n                swap(cur,zx,zy,nextx,nexty);\n            }\n        }\n        return res;\n    }\n    private void swap(int[][]board, int x1, int y1, int x2, int y2){\n        int t = board[x1][y1];\n        board[x1][y1] = board[x2][y2];\n        board[x2][y2] = t;\n    }\n    private String boardToString(int [][]board){\n        StringBuilder sb = new StringBuilder();\n        for(int i=0;i<2;i++)\n            for(int j=0;j<3;j++)\n                sb.append(board[i][j]);\n        return sb.toString();\n    }\n    private int[][] stringToBoard(String s){\n        int[][] board = new int[2][3];\n        for(int i=0;i<6;i++)\n            board[i/3][i%3] = s.charAt(i) - \'0\';\n        return board;\n    }\n}\n```',
      valid: true,
    },
    {
      id: "1586070285567267113",
      authorEmail: "969023014@qq.com",
      description: "最小生成树",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T15:04:45.568",
      updateTime: "2020-04-05T15:04:45.568",
      tag: "学科基础/算法",
      titleTree: {
        value: "",
        children: [
          {
            value: "带权图",
            children: [],
          },
          {
            value: "切分定理",
            children: [],
          },
          {
            value: "Kruskal算法",
            children: [],
          },
          {
            value: "Prim算法",
            children: [],
          },
        ],
      },
      summary:
        "复杂度$ElogE$(基于并查集) Prim算法注意：- 优先队列中不一定存储的都是横切边，需要判断 使用并查集高效地判断是否成环，这个过程是动态的，不适合采用DFS  Kruskal算法算法核心：只要边权值短且不组成环，则选择该边，所以需要先对边排序 将底层数据结构改为TreeMap Map的遍历技巧 切分定理如果一个边的两个端点，属于切分不同的两边，这个边称为横切边",
      content:
        '## 带权图\n为简化处理，权值定义为Integer。\n将底层数据结构改为TreeMap。\n```java\npublic class WeightedGraph implements Cloneable {\n    private int V;\n    private int E;\n    private TreeMap<Integer, Integer>[] adj;\n    public boolean isDirected;\n    @Override\n    public Object clone() {\n        try{\n            WeightedGraph cloned = (WeightedGraph) super.clone();\n            cloned.adj = new TreeMap[V];\n            for (int i = 0; i < V; i++) {\n                cloned.adj[i] = new TreeMap<>();\n                for (Map.Entry<Integer, Integer> entry: adj[i].entrySet())\n                    cloned.adj[i].put(entry.getKey(), entry.getValue());\n            }\n            return cloned;\n        }catch (CloneNotSupportedException e){\n            e.printStackTrace();\n        }\n        return null;\n    }\n    public WeightedGraph(String filename, boolean isDirected){\n        this.isDirected = isDirected;\n        File file = new File(filename);\n        try(Scanner scanner = new Scanner(file)){\n            V = scanner.nextInt();\n            if(V <= 0)\n                throw new IllegalArgumentException("V must be non-negative");\n            adj = new TreeMap[V];\n            for(int i=0;i<V;i++)\n                adj[i] = new TreeMap<>();\n            E = 0;\n            int e = scanner.nextInt();\n            if(e < 0)\n                throw new IllegalArgumentException("E must be non-negative");\n            for(int i = 0; i < e; i++){\n                int a = scanner.nextInt();\n                int b = scanner.nextInt();\n                int weight = scanner.nextInt();\n                addEdge(a, b, weight);\n            }\n        }\n        catch (IOException e){\n            e.printStackTrace();\n        }\n    }\n    public WeightedGraph(String filename){\n        this(filename, false);\n    }\n    public WeightedGraph(int V, boolean directed){\n        this.V = V;\n        this.isDirected = directed;\n        this.E = 0;\n        adj = new TreeMap[V];\n        for (int i = 0; i < V; i++) {\n            adj[i] = new TreeMap<>();\n        }\n    }\n    public void addEdge(int a, int b, int v){\n        validateVertex(a);\n        validateVertex(b);\n        if(a == b)\n            throw new IllegalArgumentException("self loop is detected");\n        if(adj[a].containsKey(b))\n            throw new IllegalArgumentException("parallel graph");\n        adj[a].put(b, v);\n        if (!isDirected)\n            adj[b].put(a, v);\n        this.E ++;\n    }\n    public void validateVertex(int v){\n        if(v < 0 || v >= V)\n            throw new IllegalArgumentException("invalid v");\n    }\n    public int getV(){\n        return V;\n    }\n    public int getE(){\n        return E;\n    }\n    public boolean hasEdge(int v, int w){\n        validateVertex(v);\n        validateVertex(w);\n        return adj[v].containsKey(w);\n    }\n    public Iterable<Integer> adj(int v){\n        validateVertex(v);\n        return adj[v].keySet();\n    }\n    public int getWeight(int v, int w){\n        if(hasEdge(v, w))\n            return adj[v].get(w);\n        throw new IllegalArgumentException(String.format("No edge %d-%d", v, w));\n    }\n    public int degree(int v){\n        validateVertex(v);\n        return adj[v].size();\n    }\n    public void setWeight(int v, int w, int newWeight){\n        if (!hasEdge(v, w))\n            throw new IllegalArgumentException();\n        adj[v].put(w, newWeight);\n        if (!isDirected)\n            adj[w].put(v, newWeight);\n    }\n    public void removeEdge(int v, int w){\n        validateVertex(v);\n        validateVertex(w);\n        if (adj[v].containsKey(w))\n            E --;\n        adj[v].remove(w);\n        if (!isDirected)\n            adj[w].remove(v);\n    }\n    @Override\n    public String toString(){\n        StringBuilder sb = new StringBuilder();\n        sb.append(String.format("V=%d, E=%d\\n",V,E));\n        for(int v=0;v<V;v++) {\n            sb.append(String.format("%d : ",v));\n            for(Map.Entry<Integer, Integer> entry: adj[v].entrySet())\n                sb.append(String.format("(%d: %d)", entry.getKey(), entry.getValue()));\n            sb.append("\\n");\n        }\n        return sb.toString();\n    }\n}\n```\nMap的遍历技巧\n```java\nfor(Map.Entry<Integer, Integer> entry: adj[v].entrySet())\n```\n## 切分定理\n如果一个边的两个端点，属于切分不同的两边，这个边称为横切边。\n横切边中最短的边，属于最小生成树。\n## Kruskal算法\n算法核心：只要边权值短且不组成环，则选择该边，所以需要先对边排序。\n注意：需要先判断联通分量个数，判断联通分量的算法类没有给出。\n使用并查集高效地判断是否成环，这个过程是动态的，不适合采用DFS。\n```java\npublic class Kruskal {\n    private WeightedGraph g;\n    private ArrayList<WeightedEdge> mst;\n    public Kruskal(WeightedGraph g) {\n        this.g = g;\n        mst = new ArrayList<>();\n        //判断联通分量个数，如果联通分量大于1，直接return\n        ArrayList<WeightedEdge> edges = new ArrayList<>();\n        for (int i = 0; i < g.getV(); i++)\n            for (int w: g.adj(i))\n                if(i < w) //无向图，只选择存一条边\n                    edges.add(new WeightedEdge(i, w, g.getWeight(i, w)));\n\n        Collections.sort(edges);\n        UnionFind6 uf = new UnionFind6(g.getV());\n        for(WeightedEdge edge: edges){\n            int v = edge.getV();\n            int w = edge.getW();\n            if(!uf.isConnected(v, w)){\n                mst.add(edge);\n                uf.unionElements(v, w);\n            }\n        }\n    }\n    public ArrayList<WeightedEdge> result(){\n        return mst;\n    }\n}\n\nclass WeightedEdge implements Comparable<WeightedEdge>{\n    private int v, w, weight;\n    public WeightedEdge(int v, int w, int weight) {\n        this.v = v;\n        this.w = w;\n        this.weight = weight;\n    }\n    @Override\n    public String toString(){\n        return String.format("(%d-%d: %d)", v, w, weight);\n    }\n    @Override\n    public int compareTo(WeightedEdge other) {\n        return weight - other.weight;\n    }\n    public int getV() {\n        return v;\n    }\n    public int getW() {\n        return w;\n    }\n    public int getWeight() {\n        return weight;\n    }\n}\n```\n复杂度$ElogE$(基于并查集)\n## Prim算法\n注意：\n- 优先队列中不一定存储的都是横切边，需要判断。\n- 默认的排序规则即权值最小的边。\n- 使用visited判断是否为横切边。\n```java\npublic class Prim {\n    private WeightedGraph g;\n    private ArrayList<WeightedEdge> mst;\n    public Prim(WeightedGraph g){\n        this.g = g;\n        mst = new ArrayList<>();\n        // 判断联通分量\n        boolean [] visited = new boolean[g.getV()];\n        visited[0] = true;\n        Queue<WeightedEdge> pq = new PriorityQueue<>();\n        for (int w : g.adj(0))\n            pq.add(new WeightedEdge(0, w, g.getWeight(0, w)));\n        while (!pq.isEmpty()){\n            WeightedEdge minEdge = pq.remove();\n            if(visited[minEdge.getV()] && visited[minEdge.getW()])\n                continue;\n            mst.add(minEdge);\n            int newv = visited[minEdge.getV()] ? minEdge.getW() : minEdge.getV();\n            visited[newv] = true;\n            for (int w : g.adj(newv))\n                if (!visited[w])\n                    pq.add(new WeightedEdge(newv, w, g.getWeight(newv, w)));\n\n        }\n}\n```\n复杂度$ElogE$(基于优先队列)\n',
      valid: true,
    },
    {
      id: "1586070312190220366",
      authorEmail: "969023014@qq.com",
      description: "有权图最短路径",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T15:05:12.191",
      updateTime: "2020-04-05T15:05:12.191",
      tag: "学科基础/算法",
      titleTree: {
        value: "",
        children: [
          {
            value: "有权图最短路径",
            children: [
              {
                value: "Dijkstra算法",
                children: [],
              },
              {
                value: "Bellman-Ford算法",
                children: [
                  {
                    value: "核心思想",
                    children: [],
                  },
                  {
                    value: "注意",
                    children: [],
                  },
                  {
                    value: "复杂度",
                    children: [],
                  },
                  {
                    value: "实现",
                    children: [],
                  },
                ],
              },
              {
                value: "Floyed算法",
                children: [],
              },
            ],
          },
        ],
      },
      summary:
        " 有权图最短路径 Dijkstra算法算法适用于无负权边的单源最短路径复杂度$ElogE$注意：可能有潜在的数值溢出风险 Bellman-Ford算法 核心思想定义dis[v]是从s到v且经过边数不超过k的最短距离，则操作找到从s到w且边数不超过k+1的最短距离  复杂度$O(V*E)$ 实现 Floyed算法求解所有点对最短路径，可以包含负权边，检测负权环 不包含负权环的最短路经过的边数最多为V-1，找到边数最多为V-1的最短路后，如果还存在边数为V的更短路，则存在负权环 算法还可以检测是否存在负权环  注意当存在负权环时没有最短路径",
      content:
        '## 有权图最短路径\n### Dijkstra算法\n算法适用于无负权边的单源最短路径\n复杂度$ElogE$\n注意：可能有潜在的数值溢出风险\n```java\npublic class Dijkstra {\n    private WeightedGraph g;\n    private int s;\n    private int[] dis;\n    private int[] pre;\n    private boolean[] visited;\n    private class Node implements Comparable<Node>{\n        public int v, distance;\n        public Node(int v, int distance){\n            this.v = v;\n            this.distance = distance;\n        }\n        @Override\n        public int compareTo(Node other) {\n            return distance - other.distance;\n        }\n    }\n    public Dijkstra(WeightedGraph g, int s){\n        this.g = g;\n        g.validateVertex(s);\n        this.s = s;\n        dis = new int[g.getV()];\n        pre = new int[g.getV()];\n        Arrays.fill(dis, Integer.MAX_VALUE);\n        dis[s] = 0;\n        pre[s] = s;\n        visited = new boolean[g.getV()];\n        PriorityQueue<Node> queue = new PriorityQueue<>();\n        queue.add(new Node(s, 0));\n        while (!queue.isEmpty()){\n            int cur = queue.remove().v;\n            if (visited[cur])\n                continue;\n            visited[cur] = true;\n            for (int w : g.adj(cur)) {\n                if(!visited[w]){\n                    if (dis[cur] + g.getWeight(cur, w) < dis[w]) {\n                        dis[w] = dis[cur] + g.getWeight(cur, w);\n                        pre[w] = cur;\n                        queue.add(new Node(w, dis[w]));\n                    }\n                }\n            }\n        }\n    }\n    public boolean isConnectedTo(int v){\n        g.validateVertex(v);\n        return visited[v];\n    }\n    public int distanceTo(int v){\n        g.validateVertex(v);\n        return dis[v];\n    }\n}\n```\n### Bellman-Ford算法\n#### 核心思想\n定义dis[v]是从s到v且经过边数不超过k的最短距离，则操作\n```java\nif(dis[v] + g.getWeight(v, w) < dis[w])\n    dis[w] = dis[v] + g.getWeight(v, w);\n```\n找到从s到w且边数不超过k+1的最短距离。\n#### 注意\n当存在负权环时没有最短路径。对无向图而言，存在负权边就存在负权环。算法还可以检测是否存在负权环。不包含负权环的最短路经过的边数最多为V-1，找到边数最多为V-1的最短路后，如果还存在边数为V的更短路，则存在负权环。\n#### 复杂度\n$O(V*E)$\n#### 实现\n```java\npublic class BellmanFord {\n    private WeightedGraph g;\n    private int s;\n    private int[] dis;\n    private int[] pre;\n    private boolean hasNegativeCircle;\n    public BellmanFord(WeightedGraph g, int s){\n        this.g = g;\n        g.validateVertex(s);\n        this.s = s;\n        dis = new int[g.getV()];\n        pre = new int[g.getV()];\n        Arrays.fill(dis, Integer.MAX_VALUE);\n        dis[s] = 0;\n        Arrays.fill(pre, -1);\n        for (int pass = 1; pass < g.getV(); pass++) {\n            for (int v = 0; v < g.getV(); v++)\n                for (int w : g.adj(v))\n                    if (dis[v] != Integer.MAX_VALUE && dis[v] + g.getWeight(v, w) < dis[w]) {\n                        dis[w] = dis[v] + g.getWeight(v, w);\n                        pre[w] = v;\n                    }\n        }\n        for (int v = 0; v < g.getV(); v++)\n            for (int w : g.adj(v))\n                if (dis[v] != Integer.MAX_VALUE && dis[v] + g.getWeight(v, w) < dis[w])\n                    hasNegativeCircle = true;\n    }\n    public boolean hasNegCycle(){\n        return hasNegativeCircle;\n    }\n    public boolean isConnectedTo(int v){\n        g.validateVertex(v);\n        return dis[v] != Integer.MAX_VALUE;\n    }\n    public int distanceTo(int v){\n        g.validateVertex(v);\n        if (hasNegativeCircle)\n            throw new RuntimeException("图中存在负权环");\n        return dis[v];\n    }\n    public Iterable<Integer> path(int t){\n        ArrayList<Integer> res = new ArrayList<>();\n        if (!isConnectedTo(t))\n            return res;\n        int cur = t;\n        while (cur != s){\n            res.add(cur);\n            cur = pre[cur];\n        }\n        res.add(s);\n        Collections.reverse(res);\n        return res;\n    }\n    }\n}\n```\n### Floyed算法\n求解所有点对最短路径，可以包含负权边，检测负权环。\n复杂度$O(V^3)$\n```java\npublic class Floyed {\n    private WeightedGraph g;\n    private int [][] dis;\n    private boolean hasNegativeCycle = false;\n    public Floyed(WeightedGraph g){\n        this.g = g;\n        dis = new int[g.getV()][g.getV()];\n        for (int i = 0; i < g.getV(); i++)\n            Arrays.fill(dis[i], Integer.MAX_VALUE);\n        for (int v = 0; v < g.getV(); v++) {\n            dis[v][v] = 0;\n            for (int w: g.adj(v))\n                dis[v][w] = g.getWeight(v, w);\n        }\n        for (int t = 0; t < g.getV(); t++)\n            for (int v = 0; v < g.getV(); v++)\n                for (int w = 0; w < g.getV(); w++)\n                    if (dis[v][t] != Integer.MAX_VALUE && dis[t][w] != Integer.MAX_VALUE &&\n                            dis[v][t] + dis[t][w] < dis[v][w])\n                        dis[v][w] = dis[v][t] + dis[t][w];\n\n        for (int v = 0; v < g.getV(); v++)\n            if (dis[v][v] < 0) {\n                hasNegativeCycle = true;\n                break;\n            }\n    }\n}\n```',
      valid: true,
    },
    {
      id: "1586070345894218581",
      authorEmail: "969023014@qq.com",
      description: "有向图算法",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T15:05:45.894",
      updateTime: "2020-04-05T15:05:45.894",
      tag: "学科基础/算法",
      titleTree: {
        value: "",
        children: [
          {
            value: "环检测",
            children: [],
          },
          {
            value: "拓扑排序",
            children: [
              {
                value: "队列实现",
                children: [],
              },
              {
                value: "深度优先遍历后序实现",
                children: [],
              },
              {
                value: "复杂度",
                children: [],
              },
            ],
          },
          {
            value: "强连通分量",
            children: [
              {
                value: "反图",
                children: [],
              },
              {
                value: "连通分量",
                children: [],
              },
            ],
          },
          {
            value: "总结",
            children: [],
          },
        ],
      },
      summary:
        "[97e19ac20025ceda69ea3b46e8b72865.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p571)总结：反图的DFS后序的逆序做CC，复杂度$O(V+E)$ 反图 连通分量 总结- 有向图中不存在- floodfill- 最小生成树- 桥和割点- 二分图检测- 有向图和无向图一样- 遍历- 最短路径- 有向图和无向图有差异- 环检测- 度- 欧拉路径- 有向图特有- 拓扑排序- 强连通分量 [1d78b6ba8cda152d82040cd4e1b16033.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p569)将所有强连通分量看做一个点，得到的一定是有向无环图 [22a12cde92c3ebaa598132c66ad6ae28.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p570)  队列实现 深度优先遍历后序实现图的拓扑排序结果即为后序的逆序，但是不适用于存在环的有向图  环检测 拓扑排序注意：拓扑排序不一定有解，可以进行环检测",
      content:
        "## 环检测\n```java\npublic class DirectedCycleDetection {\n    private Graph g;\n    private boolean[] visited;\n    private boolean[] onPath;\n    private boolean hasCycle = false;\n    public DirectedCycleDetection(Graph G){\n        this.g = G;\n        visited = new boolean[G.getV()];\n        onPath = new boolean[G.getV()];\n        for(int v = 0; v < g.getV(); v++)\n            if(!visited[v])\n                if(dfs(v, v)){\n                    hasCycle = true;\n                    break;\n                }\n    }\n    private boolean dfs(int v, int parent){\n        visited[v] = true;\n        onPath[v] = true;\n        for(int w: g.adj(v))\n            if(!visited[w]) {\n                if(dfs(w, v))\n                    return true;\n            }\n            else if(onPath[w])\n                return true;\n        onPath[v] = false;\n        return false;\n    }\n    public boolean hasCircle(){\n        return hasCycle;\n    }\n}\n```\n## 拓扑排序\n注意：拓扑排序不一定有解，可以进行环检测。必须有向无环图才能进行拓扑排序。\n### 队列实现\n```java\npublic class TopoSort {\n    private Graph g;\n    private ArrayList<Integer> res;\n    private boolean hasCycle = false;\n    public TopoSort(Graph g){\n        if (!g.isDirected())\n            throw new IllegalArgumentException();\n        this.g = g;\n        res = new ArrayList<>();\n        int []indegrees = new int[g.getV()];\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < g.getV(); i++) {\n            indegrees[i] = g.inDegree(i);\n            if (indegrees[i] == 0)\n                q.add(i);\n        }\n        while (!q.isEmpty()){\n            int cur = q.remove();\n            res.add(cur);\n            for (int next : g.adj(cur)){\n                indegrees[next] --;\n                if (indegrees[next] == 0)\n                    q.add(next);\n            }\n        }\n        if (res.size() != g.getV()){\n            hasCycle = true;\n            res.clear();\n        }\n    }\n    public boolean hasCycle(){\n        return hasCycle;\n    }\n    public ArrayList<Integer> result(){\n        return res;\n    }\n}\n```\n### 深度优先遍历后序实现\n图的拓扑排序结果即为后序的逆序，但是不适用于存在环的有向图。\n```java\npublic class TopoSort2 {\n    private Graph g;\n    private ArrayList<Integer> res;\n    private boolean hasCycle = false;\n    public TopoSort2(Graph g){\n        if (!g.isDirected())\n            throw new IllegalArgumentException();\n        this.g = g;\n        res = new ArrayList<>();\n        hasCycle = new DirectedCycleDetection(g).hasCircle();\n        if (hasCycle)\n            return;\n        GraphDFS dfs = new GraphDFS(g);\n        for (int v : dfs.post()) {\n            res.add(v);\n        }\n        Collections.reverse(res);\n    }\n    public boolean hasCycle(){\n        return hasCycle;\n    }\n    public ArrayList<Integer> result(){\n        return res;\n    }\n}\n```\n### 复杂度\n两种方法复杂度均为$O(V+E)$\n## 强连通分量\n在一个强连通分量中，任意两点都可达。\n![1d78b6ba8cda152d82040cd4e1b16033.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p569)\n将所有强连通分量看做一个点，得到的一定是有向无环图。\n![22a12cde92c3ebaa598132c66ad6ae28.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p570)\n![97e19ac20025ceda69ea3b46e8b72865.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p571)\n总结：反图的DFS后序的逆序做CC，复杂度$O(V+E)$\n### 反图\n```java\npublic Graph reverseGraph(){\n        TreeSet<Integer> []rAdj = new TreeSet[V];\n        for (int i = 0; i < V; i++)\n            rAdj[i] = new TreeSet<>();\n        for (int v = 0; v < V; v++)\n            for (int w : adj(v))\n                rAdj[w].add(v);\n        return new Graph(rAdj, directed);\n}\n```\n### 连通分量\n```java\npublic class SCC {\n    private Graph g;\n    private int[] visited;\n    private int count = 0;\n    public SCC(Graph G){\n        if (!G.isDirected())\n            throw new IllegalArgumentException();\n        this.g = G;\n        visited = new int[G.getV()];\n        Arrays.fill(visited, - 1);\n        GraphDFS dfs = new GraphDFS(g.reverseGraph());\n        ArrayList<Integer> order = new ArrayList<>();\n        for (int v : dfs.post())\n           order.add(v);\n        Collections.reverse(order);\n        for (int v : order) {\n            if (visited[v] == -1){\n                dfs(v, count);\n                count ++;\n            }\n        }\n    }\n    private void dfs(int v, int count){\n        visited[v] = count;\n        for(int w: g.adj(v))\n            if(visited[w] == -1)\n                dfs(w, count);\n    }\n    public boolean isConnected(int v, int w){\n        g.validateVertex(v);\n        g.validateVertex(w);\n        return visited[v] == visited[w];\n    }\n    public ArrayList<Integer>[] components(){\n        ArrayList<Integer>[] res = new ArrayList[count];\n        for(int i=0;i<count;i++)\n            res[i] = new ArrayList<>();\n        for(int v=0;v<g.getV();v++)\n            res[visited[v]].add(v);\n        return res;\n    }\n    public int getCount(){\n        return count;\n    }\n\n}\n```\n## 总结\n- 有向图中不存在\n    - floodfill\n    - 最小生成树\n    - 桥和割点\n    - 二分图检测\n- 有向图和无向图一样\n    - 遍历\n    - 最短路径\n- 有向图和无向图有差异\n    - 环检测\n    - 度\n    - 欧拉路径\n- 有向图特有\n    - 拓扑排序\n    - 强连通分量",
      valid: true,
    },
    {
      id: "1586070533639485687",
      authorEmail: "969023014@qq.com",
      description: "网络流与匹配",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T15:08:53.639",
      updateTime: "2020-04-05T15:08:53.64",
      tag: "学科基础/算法",
      titleTree: {
        value: "",
        children: [
          {
            value: "Ford-Fulkerson思想",
            children: [],
          },
          {
            value: "实现",
            children: [],
          },
          {
            value: "建模",
            children: [],
          },
          {
            value: "匹配问题",
            children: [],
          },
        ],
      },
      summary:
        "[f901eb7a938ca5140aded9269e153928.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p572) 实现使用BFS寻找增广路径Ford-Fulkerson 复杂度$O(maxflow*E)$Edmonds-Karp算法 复杂度$O(VE^2)$ 建模在职业棒球赛中，每队打162场比赛 [9b6fcdd91983e5d749aac2b2b43663d3.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p574)最大流即为匹配数练习：Leetcode LCP4覆盖问题 [c42eddbe1e3d4d23eecc239c37379c2f.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p573)分析可知，如果最大流为27，说明还有机会，否则一定会被淘汰 如果有平局，则进行加赛 分析Detroit队是否有夺冠希望",
      content:
        '## Ford-Fulkerson思想\n![f901eb7a938ca5140aded9269e153928.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p572)\n## 实现\n使用BFS寻找增广路径\nFord-Fulkerson 复杂度$O(maxflow*E)$\nEdmonds-Karp算法 复杂度$O(VE^2)$\n```java\npublic class MaxFlow {\n    private WeightedGraph network;\n    private WeightedGraph rG;\n    private int s, t;\n    private int maxFlow = 0;\n    public MaxFlow(WeightedGraph network, int s, int t){\n        if (!network.isDirected)\n            throw new IllegalArgumentException("");\n        if (network.getV() < 2)\n            throw new IllegalArgumentException("at least 2 nodes");\n        if (s == t)\n            throw new IllegalArgumentException("s and t should be different");\n        network.validateVertex(s);\n        network.validateVertex(t);\n        this.network = network;\n        this.s = s;\n        this.t = t;\n        this.rG = new WeightedGraph(network.getV(), true);\n        for (int i = 0; i < network.getV(); i++) {\n            for (int w : network.adj(i)) {\n                int c = network.getWeight(i, w);\n                rG.addEdge(i, w, c);\n                rG.addEdge(w, i, 0);\n            }\n        }\n        while (true){\n            ArrayList<Integer> path = getAugmentingPath();\n            if (path.size() == 0)\n                break;\n            int f = Integer.MAX_VALUE;\n            for (int i = 1; i < path.size(); i++) {\n                int v = path.get(i-1);\n                int w = path.get(i);\n                f = Math.min(f, rG.getWeight(v, w));\n            }\n            maxFlow += f;\n            for (int i = 1; i < path.size(); i++) {\n                int v = path.get(i-1);\n                int w = path.get(i);\n                rG.setWeight(v, w, rG.getWeight(v, w) - f);\n                rG.setWeight(w, v, rG.getWeight(w, v) + f);\n            }\n        }\n    }\n    private ArrayList<Integer> getAugmentingPath(){\n        Queue<Integer> queue = new LinkedList<>();\n        int [] pre = new int[network.getV()];\n        Arrays.fill(pre, -1);\n        queue.add(s);\n        pre[s] = s;\n        while (!queue.isEmpty()){\n            int cur = queue.remove();\n            if (cur == t)\n                break;\n            for (int next : rG.adj(cur)) {\n                if (pre[next] == - 1 && rG.getWeight(cur, next) > 0) {\n                    pre[next] = cur;\n                    queue.add(next);\n                }\n            }\n        }\n        ArrayList<Integer> res = new ArrayList<>();\n        if (pre[t] == -1)\n            return res;\n        int cur = t;\n        while (cur != s){\n            res.add(cur);\n            cur = pre[cur];\n        }\n        res.add(s);\n        Collections.reverse(res);\n        return res;\n    }\n    public int result(){\n        return maxFlow;\n    }\n    public int flow(int v, int w){\n        if (!network.hasEdge(v, w))\n            throw new IllegalArgumentException();\n        return rG.getWeight(w, v);\n    }\n}\n```\n## 建模\n在职业棒球赛中，每队打162场比赛。如果有平局，则进行加赛。比赛过程中如果一个队伍无论如何都不可能获胜，则淘汰。分析Detroit队是否有夺冠希望。\n![c42eddbe1e3d4d23eecc239c37379c2f.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p573)\n分析可知，如果最大流为27，说明还有机会，否则一定会被淘汰。\n## 匹配问题\n红色边表示流量为1，黑色边表示流量为0\n![9b6fcdd91983e5d749aac2b2b43663d3.png](evernotecid://2E23DE9A-BB4E-4F82-88A0-C617282DE726/appyinxiangcom/23337086/ENResource/p574)\n最大流即为匹配数\n```java\npublic class BipartiteMatching {\n    private Graph g;\n    private int maxMatching;\n    public BipartiteMatching(Graph g){\n        BipartitionDetection bd = new BipartitionDetection(g);\n        if (!bd.isBipartite())\n            throw new IllegalArgumentException("is not graph");\n        this.g = g;\n        int [] colors = bd.colors();\n        WeightedGraph network = new WeightedGraph(g.getV()+2, true);\n        for (int v = 0; v < g.getV(); v++) {\n            if (colors[v] == 0)\n                network.addEdge(g.getV(), v,1);\n            else\n                network.addEdge(v, g.getV()+1, 1);\n            for (int w : g.adj(v))\n                if (v < w){\n                    if (colors[v] == 0)\n                        network.addEdge(v, w, 1);\n                    else\n                        network.addEdge(w, v, 1);\n                }\n        }\n        MaxFlow mf = new MaxFlow(network, g.getV(), g.getV()+1);\n        maxMatching = mf.result();\n    }\n    public int getMaxMatching(){\n        return maxMatching;\n    }\n    public boolean isPerfectMatching(){\n        return maxMatching * 2 == g.getV();\n    }\n}\n```\n练习：Leetcode LCP4覆盖问题',
      valid: true,
    },
    {
      id: "1586078822215299389",
      authorEmail: "969023014@qq.com",
      description: "归并排序其他应用",
      authority: true,
      forkFrom: "",
      createTime: "2020-04-05T17:27:02.227",
      updateTime: "2020-04-05T17:27:02.227",
      tag: "学科基础/算法",
      titleTree: {
        value: "",
        children: [
          {
            value: "翻转对",
            children: [],
          },
        ],
      },
      summary:
        "你需要返回给定数组中的重要翻转对的数量  翻转对Leetcode 493题给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对",
      content:
        "## 翻转对\nLeetcode 493题\n给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对。\n\n你需要返回给定数组中的重要翻转对的数量。\n```java\nclass Solution {\n    private int[] temp;\n    public int reversePairs(int[] nums) {\n        int n = nums.length;\n        temp = new int[n];\n        return mergeCount(nums, 0, n-1);\n    }\n    private int mergeCount(int[] nums, int start, int end){\n        if(start >= end)\n            return 0;\n        int mid = start + end >> 1;\n        int left = mergeCount(nums, start, mid);\n        int right = mergeCount(nums, mid+1, end);\n        int midCount = 0;\n        for(int i = start; i <= end; i++)\n            temp[i] = nums[i];    \n        int i = start, j = mid+1;\n        while(i <= mid && j <= end){\n            if((long)nums[i] > (long)2*nums[j]){\n                midCount += mid - i + 1;\n                j++;\n            }else{\n                i++;\n            }\n        }\n        i = start;\n        j = mid + 1;\n        for(int k=start;k<=end;k++){\n            if(i > mid){\n                nums[k] = temp[j++];\n            }else if(j > end){\n                nums[k] = temp[i++];\n            }else if(temp[i]<temp[j]){\n                nums[k] = temp[i++];\n            }else{\n                nums[k] = temp[j++];\n            }\n        }\n        return left + right + midCount;\n    }\n}\n```",
      valid: true,
    },
  ],
});
