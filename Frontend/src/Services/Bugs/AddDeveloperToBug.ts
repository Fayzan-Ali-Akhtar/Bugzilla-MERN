import axios from 'axios';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function
import {addDeveloperToBugURL} from "../../Constants/Constants";

export async function addDeveloperToBug(
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
    
    await axios.post(addDeveloperToBugURL, requestBody, config);
  } catch (error) {
    throw error;
  }
}