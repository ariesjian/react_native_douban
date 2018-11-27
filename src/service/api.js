import request from '../utils/request';
import Config from '../common/config';
import { stringify } from 'qs';
export async function queryBrands(page = 1) {
  return request(`${Config.API_HOST}brands?page=${page}`);
}
export async function getInTheaters(params) { // 获取热映列表数据
  return request(`${Config.API_HOST}/movie/in_theaters?${stringify(params)}`);
}

// 电影详情
export async function getDetail(id,params) { // 获取热映列表数据
  return request(`${Config.API_HOST}/movie/subject/${id}?${stringify(params)}`);
}
//  电影搜索 https://api.douban.com/v2/movie/search
export async function getSearch(params) { // 获取热映列表数据
    return request(`${Config.API_HOST}/movie/search?${stringify(params)}`);
}


