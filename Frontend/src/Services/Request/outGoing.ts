import {getTokenFromLocalStorage} from '../../Utils/util';

export function addTokenToRequestHeader(request:any) {
    // getting token from local storage 
    const token = getTokenFromLocalStorage();
    return request.headers.common["Authorization"] = `Bearer ${token}`;
}