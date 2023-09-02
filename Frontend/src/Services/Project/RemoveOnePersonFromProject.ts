import axios from 'axios';
import { addTokenToRequestHeader } from '../../Utils/outGoing';
import { removeOnePersonFromProjectURL } from "../../Constants/Constants";

export async function removeOnePersonFromProjectOnServer(
  projectID: string,
  dataToBeAdded: string, 
  typeToBeAdded: string
): Promise<void> {
  try {
    const config = {
      headers: {},
    };
    addTokenToRequestHeader(config); // Add token to headers
    
    const requestBody = {
      projectid: projectID,
      dataToBeRemoved: dataToBeAdded,
      typeToBeRemoved: typeToBeAdded,
    };
    
    await axios.post(removeOnePersonFromProjectURL, requestBody, config);
  } catch (error) {
    // console.log(error);
    throw error;
  }
}
