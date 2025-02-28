import { get } from "./httpClient.js";

export async function getData(endpoint, signal) {
  return await get(`/${endpoint}`, signal);
}
