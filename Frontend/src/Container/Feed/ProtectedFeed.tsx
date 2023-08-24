import React, { useState, useEffect } from "react";
import Feed from "./FeedComponents/Feed";
import { getCurrentUserLocalStorage } from "../../Utils/util";
import { useNavigate } from "react-router-dom";

interface PostTabsProps {}

const ProtectedFeed: React.FC<PostTabsProps> = () => {
  const [validUser, setValidUser] = useState(false);
  const [check, setCheck] = useState(true);
  const navigate = useNavigate(); // Get the navigate function
  useEffect(() => {
    const currentUserJSON: string | null = getCurrentUserLocalStorage();
    // There is no User Signed IN!!
    if (currentUserJSON === "{}") {
      setValidUser(false); 
      navigate("/home"); 
    } else if (currentUserJSON) {
      setValidUser(true);
    } else {
      setValidUser(false); 
      navigate("/home"); 
    }
  }, []);
  return <>{validUser ? <Feed /> : null}</>;
};

export default ProtectedFeed;
