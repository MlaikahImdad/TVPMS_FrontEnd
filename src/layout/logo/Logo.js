import React from "react";
import LogoLight2x from "../../images/logo2x.png";
import LogoDark2x from "../../images/logo-dark2x.png";
import LogoSmall from "../../images/logo-small.png";
import {Link} from "react-router-dom";

const Logo = (props) => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
      {(!props.isCompact || props.hovered) &&
        <div>
          <img className="logo-light logo-img" src={LogoLight2x} alt="logo" />
          <img className="logo-dark logo-img" src={LogoDark2x} alt="logo" />  
        </div>
      }

      {(props.isCompact && !props.hovered) &&
        <img className="logo-small logo-img logo-img-small" src={LogoSmall} alt="logo" />
      }
    </Link>
  );
};

export default Logo;
