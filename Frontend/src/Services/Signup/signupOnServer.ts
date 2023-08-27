import { base_URL, User } from "../../Constants/Constants";
import { postData } from '../PostData/PostData';
import {saveUserToLocalStorage,saveTokenToLocalStorage,getUserObj} from '../../Utils/util'

// Function to fetch comments from the server
export async function signupUserOnServer(newUser: User): Promise<User> {
  try {
    const user_type:string = newUser.userType;
    let signup_url = base_URL + `/${newUser.userType}` + '/signup';
    
    console.log("yo1")
    const postDataResponse:any = await postData<User>(signup_url, newUser);
    // Signed Up User is 
    console.log("yo2")
    console.log(postDataResponse);
    // if()
    // console.log(postDataResponse.manager.firstName);
    // console.log(typeof (postDataResponse.manager.firstName));
    console.log (postDataResponse);
    console.log (user_type);

    let savedUser: User|undefined = getUserObj(postDataResponse,user_type);
    if(savedUser !== undefined){
        
    
    // Saving its Token 
    const token:string = postDataResponse.token; 
    saveTokenToLocalStorage(token);
    saveUserToLocalStorage(savedUser);
    console.log("In signupUserOnServer");
    console.log(savedUser);
    return savedUser;
    }
    else
    {
        throw new Error("User is undefined");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
    throw error; // Re-throw the error
  }
}
