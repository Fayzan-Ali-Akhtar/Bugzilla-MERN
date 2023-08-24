import {PostObj,PostURL } from "../../Constants/Constants";
import {getData} from '../Data/GetData';

// Function to fetch posts from the server
export async function fetchPostsFromServer(): Promise<PostObj[]> {
    try {
      const postData = await getData<PostObj[]>(PostURL);
      return postData.reverse();
    } catch (error) {
      throw error;
    }
  }