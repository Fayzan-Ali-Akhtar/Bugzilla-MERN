import React, { useState } from "react";
import { PostObj, UserObj } from "../../../Constants/Constants";
import Button from "react-bootstrap/Button";
import { saveNewPostIdLocalStorage } from "../../../Utils/util";

interface Props {
  posts: PostObj[];
  updatePost: (posts: PostObj[]) => void;
  user: UserObj;
  newPostIdAvailable: number;
  setnewPostIdAvailable: (newPostIdAvailable: number) => void;
}

const CreateUserPost: React.FC<Props> = ({
  posts,
  updatePost,
  user,
  newPostIdAvailable,
  setnewPostIdAvailable,
}) => {
  const [post, setPost] = useState<PostObj>({
    userId: user.userId,
    id: newPostIdAvailable,
    title: "",
    body: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      userId: user.userId,
      id: newPostIdAvailable,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform any actions needed when the form is submitted, e.g., send the post data to the server

    // Update the parent component's posts state by adding the new post to the current posts array
    updatePost([post, ...posts]);
    setnewPostIdAvailable(newPostIdAvailable + 1);
    saveNewPostIdLocalStorage(newPostIdAvailable + 1);
    // Clear the input fields after submission
    setPost({
      userId: user.userId,
      id: newPostIdAvailable,
      title: "",
      body: "",
    });
  };

  return (
    <>
      {/* <Card border="success" className='p-3'> */}
      <div className="border rounded border-success p-3">
      <h1>{user.firstName} what's on your mind!</h1>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Message
          </label>
          <textarea
            className="form-control"
            id="body"
            name="body"
            value={post.body}
            onChange={handleChange}
            required
          />
        </div>
        <Button variant="success" type="submit">
          Post
        </Button>
      </form>
      </div>
      {/* </Card> */}
    </>
  );
};

export default CreateUserPost;
