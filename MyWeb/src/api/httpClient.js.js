import axios from 'axios';

const axiosConf = () =>
  axios.create({
    baseURL: import.meta.env.VITE_BASE_SERVICE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 2000,
  });

const genericRequest = async ({ requestType, url, data, signal }) => {
  try {
    const httpClient = axiosConf();
    const response = await httpClient[requestType](
      url,
      {
        ...data,
      },
      signal
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error:', error.response);
      throw new Error(error.response.data?.message || 'Request failed');
    } else {
      console.error('Unknown error:', error);
      throw new Error(
        'UnknownError. ' + (error.message || 'No details available')
      );
    }
  }
};

export async function get(url, signal) {
  return genericRequest({ requestType: 'get', url, signal });
}

export async function post(url, data, signal) {
  return genericRequest({ requestType: 'post', url, signal, data });
}

export async function remove(url, signal) {
  return genericRequest({ requestType: 'delete', url, signal });
}

export async function put(url, data, signal) {
  return genericRequest({ requestType: 'put', url, signal, data });
}
