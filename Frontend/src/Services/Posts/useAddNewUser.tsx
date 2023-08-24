import { useContext } from "react";
import { UserObj } from "../../Constants/Constants";

function useAddNewUser(newUserProps: UserObj): void {
  // const userContext = useContext(UserContext);

  // if (userContext) {
  //   const isNewUser = userContext.arrayOfUsers.some(
  //     (user) => user.email === newUserProps.email
  //   );

  //   if (isNewUser) {
  //     // User with the same email already exists
  //     alert("User with the same email already exists!");
  //   } else {
  //     // Update the loggedInUserInfo and arrayOfUsers with the new user
  //     userContext.setLoggedInUserInfo(newUserProps);
  //     userContext.setArrayOfUsers((prevUsers) => [...prevUsers, newUserProps]);
  //     // Set isLoggedIn to true
  //     userContext.setIsLoggedIn(true);
  //     console.log("loggedInUserInfo =", userContext?.loggedInUserInfo);
  //     console.log("isLoggedIn =", userContext?.isLoggedIn);
  //     console.log("arrayOfUsers =", userContext?.arrayOfUsers);
  //   }
  // }
}

export default useAddNewUser;
