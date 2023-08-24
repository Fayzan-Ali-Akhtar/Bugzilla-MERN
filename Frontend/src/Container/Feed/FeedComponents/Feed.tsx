import React, { useEffect, useState } from "react";
import { PostObj,UserObj } from '../../../Constants/Constants';
import FeedGeneral from './FeedGeneral'
import FeedPosts from "./FeedPosts";
import { fetchPostsFromServer } from "../../../Services/Posts/post";
import {savePostsLocalStorage,saveNewPostIdLocalStorage,getAllPostsLocalStorage,getCurrentUserLocalStorage,getNewPostIdLocalStorage} from "../../../Utils/util";


const HomeForm: React.FC = () => {
  const [posts, setPosts] = useState<PostObj[]>([]);
  const [newPostIdAvailable, setnewPostIdAvailable] = useState(100);

  // Current user 
  const [user, setUser] = useState<UserObj>({
    firstName :"",
    lastName :"",
    email :"",
    password :"",
    userId:0,
  });

  function setLoadFromAPI()
  {
    async function fetchPosts() {
      try {
        const postData = await fetchPostsFromServer();
        setPosts(postData);
      } catch (error) {
        // Handle error
      }
    }
    fetchPosts();
  }

  // 1st
  // Initial load of data of AllPostArray from local storage to posts if AllPostArray exists in local storage
  useEffect(() => {
    let newPostIdAvailable_local: number = getNewPostIdLocalStorage() ? parseInt(getNewPostIdLocalStorage()!, 10) : 101;
    setnewPostIdAvailable(newPostIdAvailable_local);
    // Store the updated AllCommentArray in localStorage
    saveNewPostIdLocalStorage(newPostIdAvailable_local); 
    
      const allPostsJSON: string|null = getAllPostsLocalStorage();
      const currentUserJSON: string|null = getCurrentUserLocalStorage();
      if (!allPostsJSON) {
        setLoadFromAPI();
        setnewPostIdAvailable(101);
      } else {
        setPosts(JSON.parse(allPostsJSON));
      }
      if (currentUserJSON) {
        setUser(JSON.parse(currentUserJSON));
      }
    
  }, []);

  
  // Update Local Storage
  useEffect(() => {
    if (posts.length > 0) {
      // If AllPostArray does not exist then store it in the local storage as JSON String
      savePostsLocalStorage(posts);
      // Used when there is a change in posts and it needs to be saved in local storage
    }
  }, [posts]);

  return (
    <>
      <FeedGeneral userName = {user.firstName} childComponet={<FeedPosts posts={posts} updatePost = {setPosts} user = {user} newPostIdAvailable ={newPostIdAvailable} setnewPostIdAvailable = {setnewPostIdAvailable}/>} />
    </>
  );
};

export default HomeForm;
