import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_SERVICE_URL;

const axiosConf = () =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
  });

const genericRequest = async ({ requestType = "get", url, data, signal }) => {
  try {
    const httpClient = axiosConf();
    const response = await httpClient[requestType](url, { ...data, signal });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      console.error("Request error:", e.response);
    } else if (e.name === "AbortError") {
      console.log("Request aborted");
    } else {
      console.error(e);
      throw new Error("Unknown error.");
    }
  }
};

export const get = (url, signal) => {
  return genericRequest({ requestType: "get", url, signal });
};
export const save = (url, data, signal) => {
  return genericRequest({ requestType: "post", url, data, signal });
};
export const remove = (url, signal) => {
  return genericRequest({ requestType: "delete", url, signal });
};
export const update = (url, data, signal) => {
  return genericRequest({ requestType: "put", url, data, signal });
};
