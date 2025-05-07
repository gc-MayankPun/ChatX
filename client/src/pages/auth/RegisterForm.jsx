import React from "react";
import { NavLink } from "react-router-dom";
import SocialAuthButtons from "../../components/ui/SocialAuthButtons";
import useSocialAuth from "../../hooks/useSocialAuth";

const RegisterForm = () => {
  const { onGithubClick, onGoogleClick } = useSocialAuth();

  return (
    <>
      <div className="form-container">
        <h2>Create your account</h2>
        <p>Sign up with your Github or Google account</p>
        <form>
          <SocialAuthButtons
            onGithubClick={onGithubClick}
            onGoogleClick={onGoogleClick}
            type="Signup"
          />
          <div className="separator">Or continue with</div>
          <div className="credentials-container">
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                placeholder="Joe Mama"
              />
              {/* <span>error: </span> */}
            </div>
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
              <label htmlFor="password">
                <span>Password</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
              />
              {/* <span>error: </span> */}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <span>Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="off"
              />
              {/* <span>error: </span> */}
            </div>
            <button type="submit">Sign Up</button>
          </div>
          <div className="form-type">
            <span>
              Already have an account?{" "}
              <NavLink to="/auth/login">Log in</NavLink>
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

export default RegisterForm;
