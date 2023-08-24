import React from 'react';
import ConnectTextLogo from './CompanyTextLogo';
import {ThirdColor} from '../../Constants/Constants'

const HeadingLogo = () => {
    return(
        <div style={{backgroundColor : `${ThirdColor}`}}>
          <div className="container d-flex justify-content-center align-items-center fs-1"> <ConnectTextLogo logo_size={3.5}/></div>
        </div>
      );
  };

export default HeadingLogo;
