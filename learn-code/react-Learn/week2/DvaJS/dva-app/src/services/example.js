import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function getProlist() {
  return request('http://localhost:3000/prolist')
}