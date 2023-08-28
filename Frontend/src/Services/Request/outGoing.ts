import { AxiosRequestConfig } from 'axios';
import {getTokenFromLocalStorage} from '../../Utils/util';

export function addTokenToRequestHeader(request: AxiosRequestConfig) {
    const token = getTokenFromLocalStorage();
    if (!request.headers) {
      request.headers = {}; 
    }
    request.headers['Authorization'] = `Bearer ${token}`;
  }