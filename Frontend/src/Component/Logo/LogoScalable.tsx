import React from 'react';
import { FaBug } from 'react-icons/fa';
import {PrimaryColor} from '../../Constants/Constants'


interface props{
    logo_size : number;
    custom_color?: string|null;
}

const LogoScalable = ({logo_size,custom_color}: props) => {
  // return <FaBug style={{ fontSize: `${logo_size}rem`, margin: `0 ${logo_size/18}em`, color: `${custom_color?"#537FE7":PrimaryColor}`}} />;
  return <FaBug style={{ fontSize: `${logo_size}rem`, margin: `0 ${logo_size/18}em`, color: `${PrimaryColor}`}} />;
};

export default LogoScalable;
