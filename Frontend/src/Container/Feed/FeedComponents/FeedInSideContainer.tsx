import React from "react";
import { PostObj,UserObj } from "../../../Constants/Constants";
import PostTab from "../Posts/PostTab"

interface PostTabsProps {
  posts: PostObj[];
  updatePost: (posts: PostObj[]) => void;
  user: UserObj;
}

const FeedContainer: React.FC<PostTabsProps> = ({ posts,updatePost,user }) => {
  return (
    <div className="post-tabs">
      {posts.map((post) => (
        <PostTab key={post.id} post={post} updatePost = {updatePost} user={user} posts ={posts}/>
      ))}
    </div>
  );
};

export default FeedContainer;
