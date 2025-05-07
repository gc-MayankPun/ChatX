import React from "react";
import { NavLink } from "react-router-dom";
import SocialAuthButtons from "../../components/ui/SocialAuthButtons";
import useSocialAuth from "../../hooks/useSocialAuth";

const LoginForm = () => {
  const { onGithubClick, onGoogleClick } = useSocialAuth();
  
  return (
    <>
      <div className="form-container">
        <h2>Welcome back</h2>
        <p>Login with your Github or Google account</p>
        <form>
          <SocialAuthButtons
            onGithubClick={onGithubClick}
            onGoogleClick={onGoogleClick}
          />
          <div className="separator">Or continue with</div>
          <div className="credentials-container">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="m@example.com"
              />
              {/* <span>error: </span> */}
            </div>
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">
                  <span>Password</span>
                </label>
                <NavLink to={"/auth/password/reset"}>
                  Forgot your password?
                </NavLink>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
              />
              {/* <span>error: </span> */}
            </div>
            <button type="submit">Login</button>
          </div>
          <div className="form-type">
            <span>
              Don't have an account?{" "}
              <NavLink to={"/auth/register"}>Sign up</NavLink>
            </span>
          </div>
        </form>
      </div>
      <div className="terms-container">
        <p>
          By clicking continue, you agree to our
          <NavLink>Terms of Service</NavLink> and
          <NavLink>Privacy Policy</NavLink>.
        </p>
      </div>
    </>
  );
};

export default LoginForm;
