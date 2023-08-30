import axios from 'axios';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function
import { addOnePersonToProjectURL } from "../../Constants/Constants";

export async function addOnePersonToProjectOnServer(
  projectID: string,
  dataToBeAdded: string, // Replace 'any' with the appropriate type
  typeToBeAdded: string
): Promise<void> {
  try {
    const config = {
      headers: {},
    };
    addTokenToRequestHeader(config); // Add token to headers
    
    const requestBody = {
      projectid: projectID,
      dataToBeAdded: dataToBeAdded,
      typeToBeAdded: typeToBeAdded,
    };
    
    await axios.post(addOnePersonToProjectURL, requestBody, config);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
