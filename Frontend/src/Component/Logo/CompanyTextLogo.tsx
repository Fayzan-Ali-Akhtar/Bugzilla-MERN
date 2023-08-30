import React from "react";
import LogoScalable from "./LogoScalable";
import { CompanyName, PrimaryColor } from "../../Constants/Constants";
interface props {
  logo_size: number;
  custom_color?: string | null;
}

const CompanyTextLogo = ({ logo_size, custom_color = null }: props) => {
  return (
    <>
      <span
        style={{
          fontSize: `${logo_size}rem`,
          color: `${custom_color ? custom_color : PrimaryColor}`,
        }}
      >
        {CompanyName}{" "}
      </span>{" "}
      <LogoScalable
        custom_color={custom_color ? custom_color : null}
        logo_size={logo_size * 1.1}
      />
    </>
  );
};

export default CompanyTextLogo;
