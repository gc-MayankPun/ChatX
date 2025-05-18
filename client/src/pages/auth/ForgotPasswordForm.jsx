import React from "react";
import useToast from "../../hooks/useToast";
import { NavLink } from "react-router-dom";

const ForgotPasswordForm = () => {
  const {showToast} = useToast();

  return (
    <>
      <div className="form-container">
        <img src="/images/lock.png" alt="Key Icon" width="80" height="80" />
        <h3>Having trouble logging in?</h3>
        <p>
          Enter your email, phone number, or username and we'll send you a login
          link to regain access to your account.
        </p>
        <form>
          <div className="credentials-container">
            <div className="form-group">
              <input
                type="identifier"
                name="identifier"
                id="identifier"
                placeholder="Email, phone number, or username"
                autoComplete="on"
              />
            </div>
            <button type="submit" className="reset-button">
              Send login link
            </button>
          </div>
          <div className="form-recovery">
            {/* to="/auth/recovery" */}
            <span>
              <NavLink
                onClick={() =>
                  showToast({type: "info", payload: "Password recovery support is coming soon."})
                }
              >
                Can't reset your password?
              </NavLink>
            </span>
          </div>
          <div className="separator">Or</div>
          <div className="form-links">
            <span>
              <NavLink to={"/auth/register"}>Create new account</NavLink>
            </span>
            <span>
              <NavLink to={"/auth/login"}>Back to login</NavLink>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
