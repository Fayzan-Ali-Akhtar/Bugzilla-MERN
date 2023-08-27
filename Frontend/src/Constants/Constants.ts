import mongoose, { Schema, Document } from 'mongoose'; // Import mongoose

export const base_URL = "http://localhost:5000/api";
export const manager_URL = `${base_URL}/manager`;

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
  title: string;
  deadline: string;
  status: string; 
    type: string;
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developers' }];
    // Optinal fields
    description?: string;
    screenshot?: string;
    
  }
  export interface Project {
    title: string;
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manager' }];
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' }];
    qas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QA' }];
    bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }];
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
