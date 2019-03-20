 import axios from 'axios';

 export const base = 'http://10.4.0.142:8080/bookSystem';
 axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
 export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
 //export const requestLoginOut = params => { return axios.get(`${base}/loginOut`, params)};
 export const getBookTypeList = params => { return axios.get(`${base}/bookTypeList`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

 export const removeBookType = params => { return axios.get(`${base}/removeBookType`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };