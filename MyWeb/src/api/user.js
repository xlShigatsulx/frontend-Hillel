import { get, post } from './httpClient.js';

export async function getUser(id, signal) {
  return await get(`users/${id}`, signal);
}

export async function signupApi(data, signal) {
  return await post('signup', data, signal);
}

export async function loginApi(data, signal) {
  return await post('login', data, signal);
}
