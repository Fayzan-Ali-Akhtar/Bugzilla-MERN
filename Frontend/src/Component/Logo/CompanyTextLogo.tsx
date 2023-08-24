import React from 'react';
import LogoScalable from './LogoScalable';
import {CompanyName,PrimaryColor} from '../../Constants/Constants'
interface props{
    logo_size : number;
    custom_color?: string|null;
}

const CompanyTextLogo = ({logo_size , custom_color = null} : props) => {
    return(
        <>
    <span className= {custom_color? custom_color:'primary-color-text'} style={{ fontSize: `${logo_size}rem`, color: `${PrimaryColor}`}}>{CompanyName} </span> <LogoScalable logo_size={logo_size*1.1}/>
        </>
      );
  };

export default CompanyTextLogo;
