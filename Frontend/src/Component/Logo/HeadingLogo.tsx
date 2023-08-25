import React from 'react';
import CompanyTextLogo from './CompanyTextLogo';
import {SecondaryColor,ThirdColor} from '../../Constants/Constants'

interface props{
  DarkMode?:boolean;
}

const HeadingLogo = ({DarkMode: backgroundBlack}:props) => {
    return(
        <div style={{backgroundColor : `${backgroundBlack?SecondaryColor:ThirdColor}`}}>
          <div className="container d-flex justify-content-center align-items-center fs-1"> <CompanyTextLogo custom_color={backgroundBlack?"white":null} logo_size={3.5}/></div>
        </div>
      );
  };

export default HeadingLogo;
