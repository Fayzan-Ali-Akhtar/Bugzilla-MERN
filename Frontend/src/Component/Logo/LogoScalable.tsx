import React from 'react';
import { FaBug } from 'react-icons/fa';
import {PrimaryColor} from '../../Constants/Constants'

interface props{
    logo_size : number;
}

const LogoScalable = ({logo_size}: props) => {
  return <FaBug style={{ fontSize: `${logo_size}rem`, margin: `0 ${logo_size/18}em`, color: `${PrimaryColor}`}} />;
};

export default LogoScalable;
