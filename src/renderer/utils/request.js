import axios from "axios";
import { Message } from "element-ui";
import qs from "qs";

axios.defaults.baseURL = "http://localhost:8080/notehub";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";

//请求拦截,加入token,考虑localStorage 改 sessionStorage
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("token");
    token && (config.headers.token = "token" + localStorage.getItem("token"));
    return config;
  },
  error => {
    Message({
      showClose: true,
      message: error,
      type: "warning"
    });
    return Promise.reject(error);
  }
);
//拦截response并进行result的错误处理，返回result.data
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error && error.response) {
      let message = "";
      switch (error.response.status) {
        case 400:
          message = "请求错误(400)";
          break;
        // case 401:  break;//未登录
        case 403:
          message = "拒绝访问(403)";
          break;
        case 404:
          message = "请求出错(404)";
          break;
        case 408:
          message = "请求超时(408)";
          break;
        case 500:
          message = "服务器错误(500)";
          break;
        case 501:
          message = "服务未实现(501)";
          break;
        case 502:
          message = "网络错误(502)";
          break;
        case 503:
          message = "服务不可用(503)";
          break;
        case 504:
          message = "网络超时(504)";
          break;
        case 505:
          message = "HTTP版本不受支持(505)";
          break;
        default:
          message = `连接出错(${err.response.status})!`;
      }
      Message({
        message: message,
        duration: 1500
      });
    } else {
      message = "连接服务器失败";
    }
    return Promise.reject(error);
  }
);

const postEncodedRequest = (url, data) => {
  return axios.post(url, data, {
    transformRequest: [
      function(data) {
        // Do whatever you want to transform the data
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ]
  });
};
const postParamRequest = (url, params) => {
  return axios.post(url, qs.stringify(params));
};
const postJsonRequest = (url, data) => {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
const uploadFileRequest = (url, data) => {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const getRequest = (url, params) => {
  return axios.get(url, { params: params });
};

export {
  getRequest,
  postParamRequest,
  postEncodedRequest,
  postJsonRequest,
  uploadFileRequest,
  axios
};
