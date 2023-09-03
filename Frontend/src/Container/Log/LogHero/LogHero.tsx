import React from "react";
import { ThirdColor } from "../../../Constants/Constants";
import { IoIosBuild } from "react-icons/io";
import { BsFillGearFill } from "react-icons/bs";
import { BsDatabaseFillGear } from "react-icons/bs";
import "./LogHero.scss";

interface SvgObject {
  src: string;
}

interface Props {
  type?: string;
  DarkMode?: boolean;
}

const LogHero: React.FC<Props> = ({ type, DarkMode = true }) => {
  return (
    <div className="LogHero">
      {/* For LOG Pages  */}
      {type === "feed" ? (
        <h2
          className="text-center"
          style={{ color: `${DarkMode ? ThirdColor : "black"}` }}
        >
          Code. Collaborate. Triumph.
        </h2>
      ) : (
        // For FEED Page!
        <h2
          className="text-center"
          style={{ color: `${DarkMode ? ThirdColor : "black"}` }}
        >
          Streamline your workflow!
        </h2>
      )}
      <div className="d-flex flex-column justify-content-center align-items-center">
        <IoIosBuild className="icon key-icon" />
        <BsFillGearFill className="icon gear-icon text-primary" />
        <BsDatabaseFillGear className="icon db-icon text-success" />
        {/* Demo Accounts  */}
        <h4 className="white-text mt-4">Demo Account for Developer</h4>
        <h5 className="white-text mt-1">Email: demo@gmail.com</h5>
        <h5 className="white-text mt-1">Password: devdemo</h5>
      </div>
    </div>
  );
};

// Default for log pages
LogHero.defaultProps = {
  type: "log",
};

export default LogHero;
