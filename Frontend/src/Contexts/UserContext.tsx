import React  from "react";
// import React, { createContext, useState,useEffect } from "react";
// import { PostObj, UserObj } from '../Constants/Constants'

// export interface UserContextInterface {
//   loggedInUserInfo: UserObj | null; // Change to UserObj
//   setLoggedInUserInfo: React.Dispatch<React.SetStateAction<UserObj | null>>; // Change to UserObj
//   isLoggedIn: boolean;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   postArray: PostObj[];
//   setPostArray: React.Dispatch<React.SetStateAction<PostObj[]>>;
//   needToUpdatePostArray: boolean;
//   setNeedToUpdatePostArray: React.Dispatch<React.SetStateAction<boolean>>;
//   arrayOfUsers: UserObj[]; // New state for an array of UserObj
//   setArrayOfUsers: React.Dispatch<React.SetStateAction<UserObj[]>>; // New setter for arrayOfUsers
// }

// export const UserContext = createContext<UserContextInterface | null>(null);

// interface UserContextProviderProps {
//   children: React.ReactNode;
// }

// export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
export const UserContextProvider: React.FC = () => {
  // const [loggedInUserInfo, setLoggedInUserInfo] = useState<UserObj | null>(null); // Change to UserObj
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [postArray, setPostArray] = useState<PostObj[]>([]);
  // const [needToUpdatePostArray, setNeedToUpdatePostArray] = useState<boolean>(false);
  // const [arrayOfUsers, setArrayOfUsers] = useState<UserObj[]>([]); // New state for an array of UserObj

  // const login = () => {
  //   setIsLoggedIn(true);
  //   // setLoggedInUserInfo(data.user);
  // };

  // const logout = () => {
  //   setIsLoggedIn(false);
  //   setLoggedInUserInfo(null);
  // };

  // const value: UserContextInterface = {
  //   loggedInUserInfo,
  //   setLoggedInUserInfo,
  //   isLoggedIn,
  //   setIsLoggedIn,
  //   postArray,
  //   setPostArray,
  //   needToUpdatePostArray,
  //   setNeedToUpdatePostArray,
  //   arrayOfUsers, // Include the arrayOfUsers in the context value
  //   setArrayOfUsers, // Include the setArrayOfUsers in the context value
  // };

  // useEffect(() => {
  //   const isNewUser = arrayOfUsers.some(
  //     (user) => user.email === loggedInUserInfo?.email
  //   );
  
  //   if (isNewUser) {
  //     // User with the same email already exists
  //     alert("User with the same email already exists!");
  //   } else {
  //     // Make sure loggedInUserInfo is not null before updating the arrayOfUsers
  //     if (loggedInUserInfo) {
  //       console.log("in efeec")
  //       setArrayOfUsers((prevUsers) => [...prevUsers, loggedInUserInfo]);
  //     }
  //     // Set isLoggedIn to true
  //     setIsLoggedIn(true);
  //     console.log("loggedInUserInfo =", loggedInUserInfo);
  //     console.log("isLoggedIn =", isLoggedIn);
  //     console.log("arrayOfUsers =", arrayOfUsers);
  //   }
  //   alert("in useEffect");
  // }, [loggedInUserInfo]);
  
  return (
    // <UserContext.Provider value={value}>{children}</UserContext.Provider>
    <></>
  );
};

// export default UserContext;
