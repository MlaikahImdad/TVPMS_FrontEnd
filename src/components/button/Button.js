import React from "react";
import classNames from "classnames";
import { Spinner } from "reactstrap";

const Button = ({ color, size, className,loading, outline, disabled, ...props }) => {
  const buttonClass = classNames({
    btn: true,
    [`btn-${color}`]: !outline,
    [`btn-outline-${color}`]: outline,
    [`btn-${size}`]: size,
    disabled: disabled,
    [`${className}`]: className,
  });
  return (
    <button className={buttonClass} disabled={loading}{...props}>
      {loading &&
        <Spinner size="sm" />
      }
      {props.children}
    </button>
  );
};
export default Button;
