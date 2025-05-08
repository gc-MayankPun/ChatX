import React from "react";
import { NavLink } from "react-router-dom";

const Input = ({ inputType, labelRow, placeholder = "" }) => {
  const capitalizeFirstLetter = (word) => {
    if (word === "confirmPassword") return "Confirm Password";

    const firstLetter = word.charAt(0).toUpperCase();
    return firstLetter + word.slice(1);
  };

  return (
    <div className="form-group">
      {inputType !== "identifier" && (
        <div className="label-row">
          <label htmlFor={inputType}>
            <span>{capitalizeFirstLetter(inputType)}</span>
          </label>
          {labelRow?.isPresent && (
            <NavLink to={labelRow?.navLink}>{labelRow?.title}</NavLink>
          )}
        </div>
      )}
      <input
        type={
          inputType === "confirmPassword"
            ? "password"
            : inputType === "identifier" || !inputType
            ? "text"
            : inputType
        }
        name={inputType}
        id={inputType}
        placeholder={placeholder}
        autoComplete={inputType}
      />
      {/* <span>error: </span> */}
    </div>
  );
};

export default Input;
