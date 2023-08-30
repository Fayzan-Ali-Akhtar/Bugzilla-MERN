import axios from 'axios';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function
import { createProjectURL } from "../../Constants/Constants";

export async function createProjectOnServer(
  title: string,
): Promise<void> {
  try {
    const config = {
      headers: {},
    };
    addTokenToRequestHeader(config); // Add token to headers
    
    const requestBody = {
    title: title,
    };
    
    await axios.post(createProjectURL, requestBody, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
