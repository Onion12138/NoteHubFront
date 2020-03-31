import MockAdapter from "axios-mock-adapter";
import { axios } from "./request";

const mock = new MockAdapter(axios);

const response = {
  code: 200,
  message: "success"
};

mock.onPost("/noteApi/user/login").reply(200, {
  ...response,
  data: {
    profileUrl: "https://avatars2.githubusercontent.com/u/33611404?s=400&v=4",
    email: "969023014@qq.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2OTAyMzAxNEBxcS5jb20ifQ.eyJleHAiOjE1ODQ1MzczMTh9.NXc5rZol6Tdyoxzl9qGLFHM9pv4wB2RaW0wDsiXGSp8",
    username: "onion"
  }
});

mock.onPost("/noteApi/user/register").reply(200, {
  ...response
});

mock.onPost("/noteApi/user/uploadProfile").reply(200, {
  ...response,
  data: {
    url: "https://avatars2.githubusercontent.com/u/33611404?s=400&v=4"
  }
});

mock.onGet("/noteApi/user/getMindMap").reply(200, {
  ...response,
  data: {
    name: "sdfsf",
    children: [
      {
        children: [],
        name: "概念",
        value: "概念"
      },
      {
        children: [],
        name: "原理",
        value: "原理"
      },
      {
        children: [
          {
            children: [],
            name: "存储过程",
            value: "存储过程"
          }
        ],
        name: "SQL",
        value: "SQL"
      },
      {
        children: [
          {
            children: [],
            name: "Redis笔记",
            value: "1583672134533332739"
          }
        ],
        name: "应用",
        value: "应用"
      },
      {
        children: [
          {
            children: [],
            name: "与SpringBoot",
            value: "与SpringBoot"
          }
        ],
        name: "实战",
        value: "实战"
      }
    ],
    name: "数据库",
    value: "数据库"
  }
});
