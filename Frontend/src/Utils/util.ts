import { User } from "../Constants/Constants";



export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem("token");
  const token = result ? JSON.parse(result) : null;
  return token;
};

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem("LoggedInUser", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("LoggedInUser");
};

export const getLoggedInUserFromLocalStorage = () => {
  const result = localStorage.getItem("LoggedInUser");
  const user = result ? JSON.parse(result) : null;
  return user;
};

// Function to COnvert Data Types 
export const getUserObj = (
  postDataResponse: any,
  user_type: string
): User | undefined => {
  let savedUser: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
  };
  if (user_type === "manager") {
    savedUser = {
      id: postDataResponse.manager._id,
      firstName: postDataResponse.manager.firstName,
      lastName: postDataResponse.manager.lastName,
      email: postDataResponse.manager.email,
      password: postDataResponse.manager.password,
      userType: postDataResponse.manager.userType,
    };
  } else if (user_type === "developer") {
    console.log("Here2!")
    savedUser = {
      id: postDataResponse.developer._id,
      firstName: postDataResponse.developer.firstName,
      lastName: postDataResponse.developer.lastName,
      email: postDataResponse.developer.email,
      password: postDataResponse.developer.password,
      userType: postDataResponse.developer.userType,
    };
  } else if (user_type === "qa") {
    savedUser = {
      id: postDataResponse.qa._id,
      firstName: postDataResponse.qa.firstName,
      lastName: postDataResponse.qa.lastName,
      email: postDataResponse.qa.email,
      password: postDataResponse.qa.password,
      userType: postDataResponse.qa.userType,
    };

  }
  return savedUser;
};