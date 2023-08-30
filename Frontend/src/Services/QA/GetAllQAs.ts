import { getAllQAsURL, User } from "../../Constants/Constants";
import { newGetData } from '../GetData/NewGetData';
import { addTokenToRequestHeader } from '../../Utils/outGoing'; // Import the token function

export async function fetchAllQAsFromServer(): Promise<User[]> {
  try {
    const config = { headers: {} }; // Initialize headers
    addTokenToRequestHeader(config); // Add token to headers
    const qasData:any = await newGetData<any[]>(getAllQAsURL, config);
    const qas = qasData.qas;
    // Making the array of developers in the correct foemat to be used in the frontend
    const arrQAs:User[] = qas.map((qa: any) => {
        const existingProject = {
            id: qa._id,
            firstName: qa.firstName,
            lastName: qa.lastName,
            email: qa.email,
            password: qa.password,
            userType: qa.userType,
            };
        return existingProject;
    });
    return arrQAs;

  } catch (error) {
    console.log(error);
    throw error;
  }
}
