import { AxiosRequestConfig } from 'axios';
import {getTokenFromLocalStorage} from './util';

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