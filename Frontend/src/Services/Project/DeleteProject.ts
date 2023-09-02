import axios from 'axios';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function
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
    throw error;
  }
}
