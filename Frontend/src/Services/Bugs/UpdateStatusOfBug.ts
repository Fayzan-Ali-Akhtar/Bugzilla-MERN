import axios from 'axios';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function
import {updateStatusOfBugURL} from "../../Constants/Constants";

export async function updateStatusOfBug(
    bugID: string,
    bugStatus:string
): Promise<void> {
  try {
    const config = {
      headers: {},
    };
    addTokenToRequestHeader(config); // Add token to headers
    
    const requestBody = {
        bugID: bugID,
        bugStatus: bugStatus,
    };
    
    await axios.post(updateStatusOfBugURL, requestBody, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
