import React, { useState, useEffect } from "react";
import Feed from "./FeedComponents/Feed";
import {
  getLoggedInUserFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../Utils/util";
import { useNavigate } from "react-router-dom";

interface PostTabsProps {}

const ProtectedFeed: React.FC<PostTabsProps> = () => {
  const [validUser, setValidUser] = useState(false);
  const navigate = useNavigate(); // Get the navigate function
  useEffect(() => {
    const currentUserJSON: string | null = getLoggedInUserFromLocalStorage();
    const currentUserTokenJSON: string | null = getTokenFromLocalStorage();
    // There is no User Signed IN!!
    if (currentUserJSON === "{}" || currentUserTokenJSON === "{}") {
      setValidUser(false);
      navigate("/home");
    } else if (currentUserJSON && currentUserTokenJSON) {
      setValidUser(true);
    } else {
      setValidUser(false);
      navigate("/home");
    }
  }, []);
  return <>{validUser ? <Feed /> : null}</>;
};

export default ProtectedFeed;
