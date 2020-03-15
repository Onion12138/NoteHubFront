import MockAdapter from "axios-mock-adapter";
import { axios } from "./request";

const mock = new MockAdapter(axios);

const response = {
  code: "0",
  message: "OK",
  data: {}
};

mock.onPost("/noteApi/user/login").reply(200, {
  ...response,
  data: {
    token: "safd",
    email: "123456@qq.com",
    username: "hahah",
    profileUrl: "http://123",
    collectNotes: "123",
    collectIndexes: "12"
  }
});

mock.onPost("/noteApi/user/register").reply(200, {
  ...response
});
