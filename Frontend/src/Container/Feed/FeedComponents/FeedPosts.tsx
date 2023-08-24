import React from 'react';
import CreateUserPost from '../Posts/CreateUserPost';
import FeedInSideContainer from './FeedInSideContainer'
import { PostObj,UserObj } from "../../../Constants/Constants";

interface PostTabsProps {
    posts: PostObj[];
    updatePost: (posts: PostObj[]) => void;
    user: UserObj;
    newPostIdAvailable: number;
    setnewPostIdAvailable: (newPostIdAvailable:number) => void;
  }
const FeedPosts : React.FC<PostTabsProps> = ({ posts, updatePost,user,newPostIdAvailable,setnewPostIdAvailable }) => {

  return(
    <>
    <CreateUserPost posts= {posts} updatePost = {updatePost} user = {user} newPostIdAvailable ={newPostIdAvailable} setnewPostIdAvailable = {setnewPostIdAvailable}/>
    <FeedInSideContainer posts={posts} updatePost = {updatePost} user = {user}/>
    </>
  );
};

export default FeedPosts;