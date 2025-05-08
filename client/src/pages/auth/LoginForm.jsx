import React from "react";
import { NavLink } from "react-router-dom";
import SocialAuthButtons from "../../components/ui/SocialAuthButtons";
import useSocialAuth from "../../hooks/useSocialAuth";
import Input from "../../components/ui/Input";

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
            <Input inputType={"email"} placeholder="m@example.com" />
            <Input
              inputType={"password"}
              labelRow={{
                isPresent: true,
                title: "Forgot your password?",
                navLink: "/auth/password/reset",
              }}
            />
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
          By clicking Login, you agree to our{" "}
          <NavLink>Terms of Service</NavLink> and{" "}
          <NavLink>Privacy Policy</NavLink>.
        </p>
      </div>
    </>
  );
};

export default LoginForm;
