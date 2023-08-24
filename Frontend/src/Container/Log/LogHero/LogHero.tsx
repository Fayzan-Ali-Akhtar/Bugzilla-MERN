import React, { useState, useEffect } from "react";
import ConnectTextLogo from "../../../Component/Logo/CompanyTextLogo";
import { Svg } from "../../../Constants/Constants";

interface SvgObject {
  src: string;
}

interface Props {
  type?: string;
}

const LogHero: React.FC<Props> = (props) => {
  const [svg, setSvg] = useState<SvgObject>(Svg[0]);

  // Updating Picture of People after 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * Svg.length);
      setSvg(Svg[randomIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="LogHero">
      {/* For LOG Pages  */}
      {props.type === "feed" ? (
        <h2 className="text-center">
          <ConnectTextLogo logo_size={1.8} />
          with new people!
        </h2>
      ) : (
        // For FEED Page!
        <h2 className="text-center">
          Join now to <ConnectTextLogo logo_size={1.8} />
          with your friends!
        </h2>
      )}
      <img src={svg.src} alt="People" />
    </div>
  );
};

// Default for log pages
LogHero.defaultProps = {
  type: "log",
};

export default LogHero;
