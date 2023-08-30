import React, { useState, useEffect } from "react";
import ConnectTextLogo from "../../../Component/Logo/CompanyTextLogo";
import {
  imageTime,
  Svg,
  ThirdColor
} from "../../../Constants/Constants";

interface SvgObject {
  src: string;
}

interface Props {
  type?: string;
  DarkMode?: boolean;
}

const LogHero: React.FC<Props> = ({ type, DarkMode = true }) => {
  const [svg, setSvg] = useState<SvgObject>(Svg[0]);

  // Updating Picture of People after 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * Svg.length);
      setSvg(Svg[randomIndex]);
    }, imageTime);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="LogHero">
      {/* For LOG Pages  */}
      {type === "feed" ? (
        <h2
          className="text-center"
          style={{ color: `${DarkMode ? ThirdColor : "black"}` }}
        >
          Resolve Bugs with <ConnectTextLogo logo_size={1.8} />
        </h2>
      ) : (
        // For FEED Page!
        <h2
          className="text-center"
          style={{ color: `${DarkMode ? ThirdColor : "black"}` }}
        >
          {/* Join <ConnectTextLogo logo_size={1.8} /> */}
          Streamline your workflow!
        </h2>
      )}
      <div className="d-flex justify-content-center align-items-center">
        <img src={svg.src} alt="People" />
      </div>
    </div>
  );
};

// Default for log pages
LogHero.defaultProps = {
  type: "log",
};

export default LogHero;
