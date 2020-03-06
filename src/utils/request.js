import axios from 'axios'

let base = 'http://localhost:8080/notehub';
export const postParamRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    params: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': 'token' + localStorage.getItem("token")
    }
  });
}
export const postJsonRequest = (url, data) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'token': 'token' + localStorage.getItem("token")
        }
    }); 
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    params:params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':'token' + localStorage.getItem("token")
    },
    url: `${base}${url}`
  });
}