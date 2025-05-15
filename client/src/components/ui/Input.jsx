import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Input = ({
  inputType,
  inputField,
  labelRow = {},
  placeholder = "",
  register,
  errors,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const capitalizeFirstLetter = (word) => {
    if (word === "confirmPassword") return "Confirm Password";

    const firstLetter = word.charAt(0).toUpperCase();
    return firstLetter + word.slice(1);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="form-group">
      <div className="label-row">
        <label htmlFor={inputField}>
          <span>{capitalizeFirstLetter(inputField)}</span>
        </label>
        {labelRow.isPresent && (
          <NavLink to={labelRow.navLink}>{labelRow.title}</NavLink>
        )}
      </div>
      <div className="input-container">
        <input
          type={
            inputType !== "password"
              ? inputType
              : isPasswordVisible
              ? "text"
              : "password"
          }
          {...register(inputField)}
          name={inputField}
          id={inputField}
          placeholder={placeholder}
          autoComplete="on"
        />
        {inputType === "password" && (
          <span className="password-show-toggle">
            {isPasswordVisible ? (
              <IoMdEyeOff onClick={togglePasswordVisibility} />
            ) : (
              <IoMdEye onClick={togglePasswordVisibility} />
            )}
          </span>
        )}
      </div>
      {errors?.[inputField] && (
        <p className="input-error">
          <span>
            <RiErrorWarningLine />
          </span>{" "}
          {errors[inputField].message}
        </p>
      )}
    </div>
  );
};

export default Input;
