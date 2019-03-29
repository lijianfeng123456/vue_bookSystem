import axios from 'axios';

//跨域请求到服务器
export const base = 'http://10.4.0.142:8080/bookSystem';
//export const base = 'http://192.168.31.169:8080/bookSystem';
//设置axios请求头
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;Access-Control-Allow-Headers"
}
//一.系统api
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const modifyPassword = params => { return axios.post(`${base}/modifyPassword`, params).then(res => res.data); };
//TODO 考虑改为-> 图书分类 /bookType/xxx,图书列表 /book/xxx

//二.图书管理
//1.图书分类
export const getBookTypeList = params => { return axios.get(`${base}/bookTypeList`, { params: params }); };
export const removeBookType = params => { return axios.get(`${base}/removeBookType`, { params: params }); };
export const batchRemoveBookType = params => { return axios.get(`${base}/batchRemoveBookType`, { params: params }); };
export const editBookType = params => { return axios.get(`${base}/BookType`, { params: params }); };
export const addBookType = params => { return axios.get(`${base}/addBookType`, { params: params }); };
//2.图书列表
export const addBook = params => { return axios.get(`${base}/addBook`, { params: params }); };
export const getBookList = params => { return axios.get(`${base}/getBookList`, { params: params }); };
export const removeBook = params => { return axios.get(`${base}/removeBook`, { params: params }); };
export const batchRemoveBook = params => { return axios.get(`${base}/batchRemoveBook`, { params: params }); };
export const editBook = params => { return axios.get(`${base}/BookType`, { params: params }); };

//三.会员管理
//1.会员详情
export const getMemberList = params => { return axios.get(`${base}/getMemberList`, { params: params }); };
export const getMember = params => { return axios.get(`${base}/getMember`, { params: params }); };
//2.会员等级
export const getMemberLevelList = params => { return axios.get(`${base}/getMemberLevelList`, { params: params }); };
//3.支付？(充钱)调sdk




