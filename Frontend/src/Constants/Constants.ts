import mongoose, { Schema, Document } from 'mongoose'; // Import mongoose

export const base_URL = "http://localhost:5000/api";
export const manager_URL = `${base_URL}/manager`;
export const allProjectURL = `${base_URL}/project/allinfo`;
export const getAllDevelopersURL = `${base_URL}/developer/all`;
export const getAllQAsURL = `${base_URL}/qa/all`;
export const addOnePersonToProjectURL = `${base_URL}/project/add`;
export const removeOnePersonFromProjectURL = `${base_URL}/project/remove`;
export const delteProjectURL = `${base_URL}/project/delete`;
export const createProjectURL = `${base_URL}/project/create`;
export const getSingleBugURL = `${base_URL}/bug/info`;
export const addDeveloperToBugURL = `${base_URL}/bug/add/developer`;
export const removeDeveloperFromBugURL = `${base_URL}/bug/remove`;
export const updateStatusOfBugURL = `${base_URL}/bug/update/status`;
export const createBugURL = `${base_URL}/bug/create`;
export const deleteBugURL = `${base_URL}/bug/delete`;
// export const getOneManagerURL = `${base_URL}/manager`;
export const getOneManagerURL = `http://localhost:5000/api/manager/`;
export const getOneProjectURL = `http://localhost:5000/api/project/info`;
// "http://localhost:5000/api/project/allinfo";

export const PrimaryColor: string = "#537FE7";
export const SecondaryColor: string = "#181823";
export const ThirdColor: string = "#E9F8F9";
export const FourthColor: string = "#C0EEF2";

// TypeLog tells on which section is present currently
export enum TypeLog {
  Sign = "Sign Up",
  Log = "Log In",
  Continue = "Continue",
}

// UserType tells on whi  ch section is present currently
export enum UserType {
  Developer = "developer",
  Manager = "manager",
  QA = "qa",
}

export enum BugType {
    feature = "feature",
    bug = "bug",
  }

  export enum BugStatus {
    new = "new",
    started = "started",
    completed = "completed",
  }

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
}

export interface DisplayName {
  name :string|undefined,
  userType: string|undefined,
}

// export interface Developer {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }
// export interface QA {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

export interface Bug{
  id: string;
  title: string;
  deadline: string;
  status: string; 
    type: string;
    projectID: string;
    developers: string[];
    // Optinal fields
    description?: string;
    screenshot?: string;
    
  }

// export interface FormBug{
//   title: string,
//     deadline: string,
//     type: string,
//     description: string,
//     screenshot: undefined,
//   }
  export interface Project {
    id: string;
    title: string;
    manager: string;
    developers: string[];
    qas: string[];
    bugs: string[];
  }
  
export const imageTime = 5000;

export const CompanyName: string = "Bugzilla";

// Used in Sign up and Log in Pages 
export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: UserType;
}

// Used in Sign up and Log in Pages 
export enum AccountType {
  Google = "Google",
  Github = "Github",
}

// Used in Sign up and Log in Pages 
export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: UserType; // Add userType field here
  terms: boolean;
}

export const Svg = [
  {
    src: "Svg/1.svg",
  },
  {
    src: "Svg/2.svg",
  },
  {
    src: "Svg/3.svg",
  },
  {
    src: "Svg/4.svg",
  },
  {
    src: "Svg/5.svg",
  },
  {
    src: "Svg/6.svg",
  },
  {
    src: "Svg/7.svg",
  },
  {
    src: "Svg/8.svg",
  },
  {
    src: "Svg/9.svg",
  },
  {
    src: "Svg/10.svg",
  },
  {
    src: "Svg/11.svg",
  },
  {
    src: "Svg/12.svg",
  },
  {
    src: "Svg/13.svg",
  },
  {
    src: "Svg/14.svg",
  },
  {
    src: "Svg/15.svg",
  },
  {
    src: "Svg/16.svg",
  },
  {
    src: "Svg/17.svg",
  },
  {
    src: "Svg/18.svg",
  },
  {
    src: "Svg/19.svg",
  },
  {
    src: "Svg/20.svg",
  },
];

// OLD Stuff

// URL to get Posts
export const PostURL: string = "https://jsonplaceholder.typicode.com/posts";
export const CommentURL: string[] = [
    "https://jsonplaceholder.typicode.com/posts/",
    "/comments",
  ];
  
export interface PostObj {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentObj {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface UserObj {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userId: number;
}
