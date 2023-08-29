import { AxiosRequestConfig } from 'axios';
import {getTokenFromLocalStorage} from '../../Utils/util';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  body?: { [key: string]: any };
}

export function addTokenToRequestHeader(request: AxiosRequestConfig) {
    const token = getTokenFromLocalStorage();
    if (!request.headers) {
      request.headers = {}; 
    }
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  // // Function to add ID to the request body
  // export function addIdToRequestBody(request: CustomAxiosRequestConfig, id: string) {
  //   if (!request.body) {
  //     request.body = {};
  //   }
  //   request.body['id'] = id;
  // }