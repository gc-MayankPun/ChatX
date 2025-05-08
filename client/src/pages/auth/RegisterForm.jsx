import React from "react";
import { NavLink } from "react-router-dom";
import SocialAuthButtons from "../../components/ui/SocialAuthButtons";
import useSocialAuth from "../../hooks/useSocialAuth";
import Input from "../../components/ui/Input";

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
            <Input inputType={"username"} placeholder="Joe Mama" />
            <Input inputType={"email"} placeholder="m@example.com" />
            <Input inputType={"password"} />
            <Input inputType={"confirmPassword"} />

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
          By clicking Sign Up, you agree to our{" "}
          <NavLink>Terms of Service</NavLink> and{" "}
          <NavLink>Privacy Policy</NavLink>.
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
