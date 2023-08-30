import React from "react";
import ConnectTextLogo from "../Logo/CompanyTextLogo";
import { SecondaryColor, ThirdColor } from "../../Constants/Constants";

interface props {
  DarkMode?: boolean | null;
}

const Footer: React.FC<props> = ({ DarkMode: backgroundBlack }) => {
  return (
    <footer
      className=" text-center py-4"
      style={{
        backgroundColor: `${backgroundBlack ? SecondaryColor : ThirdColor}`,
      }}
    >
      <div className="container">
        <div className="row">
          <div
            className="col-md-12"
            style={{ color: `${backgroundBlack ? "white" : "black"}` }}
          >
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <ConnectTextLogo
                custom_color={backgroundBlack ? "white" : null}
                logo_size={1}
              />
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
