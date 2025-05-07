import React from "react";
import { NavLink } from "react-router-dom";
import { showToast } from "../../utils/showToast";

const ForgotPasswordForm = () => {
  return (
    <>
      <div className="form-container">
        <svg
          aria-label="Trouble logging in?"
          class="x1lliihq x1n2onr6 x5n08af"
          fill="currentColor"
          height="96"
          role="img"
          viewBox="0 0 96 96"
          width="96"
        >
          <title>Trouble logging in?</title>
          <circle
            cx="48"
            cy="48"
            fill="none"
            r="47"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></circle>
          <path
            d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
        </svg>
        <h3>Having trouble logging in?</h3>
        <p>
          Enter your email, phone number, or username and we'll send you a login
          link to regain access to your account.
        </p>
        <form>
          <div className="credentials-container">
            <div className="form-group">
              <input
                type="text"
                name="identifier"
                id="identifier"
                placeholder="Email, phone number, or username"
              />
            </div>
            <button type="submit" className="reset-button">
              Send login link
            </button>
          </div>
          <div className="account-recovery-anchor">
            {/* to="/auth/recovery" */}
            <span>
              <NavLink
                onClick={() => showToast("info", "Password recovery support is coming soon.")}
              >
                Can't reset your password?
              </NavLink>
            </span>
          </div>
          <div className="separator">Or</div>
          <div className="account-auth-anchor">
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
