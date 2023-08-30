import axios from 'axios';
import { addTokenToRequestHeader } from '../Request/outGoing'; // Import the token function
import {deleteBugURL} from "../../Constants/Constants";

export async function deleteBug(
    bugID: string,
): Promise<void> {
  try {
    const config = {
      headers: {},
    };
    addTokenToRequestHeader(config); // Add token to headers
    
    const requestBody = {
        bugID: bugID,
    };
    
    await axios.post(deleteBugURL, requestBody, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
