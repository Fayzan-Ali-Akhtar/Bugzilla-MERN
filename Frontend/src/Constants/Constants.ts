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

export const imageTime = 5000;

  // URL to get Posts 
export const PostURL: string = "https://jsonplaceholder.typicode.com/posts";

export const CompanyName: string = "Bugzilla";


// export const ThirdColor: string = "#E9F8F9";

// export const PrimaryColor: string = "#181823";
// export const SecondaryColor: string = "#537FE7";


export enum AccountType {
    Google = "Google",
    Github = "Github",
  }

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
  userId:number;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export const CommentURL : string[]= ["https://jsonplaceholder.typicode.com/posts/","/comments"]

export const Svg = [
  {
      src: "Svg/1.svg"
  },
  {
      src: 'Svg/2.svg'
  },
  {
      src: 'Svg/3.svg'
  },
  {
      src: 'Svg/4.svg'
  },
  {
      src: 'Svg/5.svg'
  },
  {
      src: 'Svg/6.svg'
  },
  {
      src: 'Svg/7.svg'
  },
  {
      src: 'Svg/8.svg'
  },
  {
      src: 'Svg/9.svg'
  },
  {
      src: 'Svg/10.svg'
  },
  {
      src: 'Svg/11.svg'
  },
  {
      src: 'Svg/12.svg'
  },
  {
      src: 'Svg/13.svg'
  },
  {
      src: 'Svg/14.svg'
  },
  {
      src: 'Svg/15.svg'
  },
  {
      src: 'Svg/16.svg'
  },
  {
      src: 'Svg/17.svg'
  },
  {
      src: 'Svg/18.svg'
  },
  {
      src: 'Svg/19.svg'
  },
  {
      src: 'Svg/20.svg'
  }
]