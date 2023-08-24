import React, { useContext } from 'react';
// import { UserContext, UserContextInterface } from './Contexts/UserContext';

const Debug: React.FC = () => {
  // const userContext = useContext<UserContextInterface | null>(UserContext);

  // const displayContextValues = () => {
  //   if (!userContext) {
  //     console.log('UserContext not available.');
  //     return;
  //   }
  //   console.log("--------------");
  //   console.log('loggedInUserInfo =', userContext.loggedInUserInfo);
  //   console.log('isLoggedIn =', userContext.isLoggedIn);
  //   console.log('postArray =', userContext.postArray);
  //   console.log('needToUpdatePostArray =', userContext.needToUpdatePostArray);
  //   console.log('arrayOfUsers =', userContext.arrayOfUsers);
  //   console.log("--------------");
  // };

  return (
    <div>
      <h3>Debug UserContext</h3>
      {/* <button onClick={displayContextValues}>Display Context Values</button> */}
    </div>
  );
};

export default Debug;
