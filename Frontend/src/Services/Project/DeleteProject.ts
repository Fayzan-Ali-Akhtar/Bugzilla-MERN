import axios from 'axios';
import { addTokenToRequestHeader } from '../Request/outGoing'; // Import the token function
import { delteProjectURL } from "../../Constants/Constants";

export async function deleteProjectFromServer(
  projectID: string,
): Promise<void> {
  try {
    const config = {
      headers: {},
    };
    addTokenToRequestHeader(config); // Add token to headers
    
    const requestBody = {
        projectid: projectID,
    };
    
    await axios.post(delteProjectURL, requestBody, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
