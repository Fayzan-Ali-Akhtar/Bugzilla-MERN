import axios, { AxiosRequestConfig } from 'axios';

export async function newGetData<T>(
  url: string,
  config?: AxiosRequestConfig // Pass the config as an optional parameter
): Promise<T> {
  try {
    const response = await axios.get<T>(url, config); // Pass the config to the API request
    return response.data;
  } catch (error) {
    throw error;
  }
}
