import React from 'react';
import ConnectTextLogo from '../Logo/CompanyTextLogo'
import {ThirdColor} from '../../Constants/Constants'
const Footer: React.FC = () => {
  return (
    <footer className=" text-center py-4" style={{backgroundColor : `${ThirdColor}`}}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>&copy; {new Date().getFullYear()} <ConnectTextLogo logo_size={1}/>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
