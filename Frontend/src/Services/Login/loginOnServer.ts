import { base_URL, User } from "../../Constants/Constants";
import { postData } from "../PostData/PostData";
import {
  saveUserToLocalStorage,
  saveTokenToLocalStorage,
  getUserObj,
} from "../../Utils/util";

// Function to fetch comments from the server
export async function loginUserOnServer(newUser: User): Promise<User> {
  try {
    const user_type: string = newUser.userType;
    let login_url = base_URL + `/${newUser.userType}` + "/login";
    const postDataResponse: any = await postData<User>(login_url, newUser);
    
    let savedUser: User | undefined = getUserObj(postDataResponse, user_type);
    if (savedUser !== undefined) {
      // Saving its Token
      const token: string = postDataResponse.token;
      saveTokenToLocalStorage(token);
      saveUserToLocalStorage(savedUser);
      return savedUser;
      
    } else {
      throw new Error("User is undefined");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
    } else {
      // console.error("Unknown error occurred:", error);
    }
    throw error;
  }
}
