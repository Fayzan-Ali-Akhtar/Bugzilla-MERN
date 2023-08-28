import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getTokenFromLocalStorage } from '../../Utils/util';

export function addTokenToRequestHeader<T>(request: AxiosRequestConfig) {
  const token = getTokenFromLocalStorage();
  if (request.headers) {
    request.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export async function makeAuthorizedApiCall<T>(
  url: string,
  requestData: any
): Promise<T> {
  const axiosInstance: AxiosInstance = axios.create();

  const config: AxiosRequestConfig = {
    method: 'get', // You can customize this based on your API call method
    url: url,
    data: requestData,
  };

  addTokenToRequestHeader(config);

  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Usage
export async function getDataFromServer(apiUrl:string,requestData:any) {
//   const apiUrl = 'https://your.api.endpoint';
//   const requestData = {}; // Your request data

  try {
    // const responseData = await makeAuthorizedApiCall<YourResponseType>(
    const responseData = await makeAuthorizedApiCall<any>(
      apiUrl,
      requestData
    );
    console.log('API response:', responseData);
  } catch (error) {
    console.error('API error:', error);
  }
}
