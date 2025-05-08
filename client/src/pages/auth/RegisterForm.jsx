import React from "react";
import { NavLink } from "react-router-dom";
import SocialAuthButtons from "../../components/ui/SocialAuthButtons";
import useSocialAuth from "../../hooks/useSocialAuth";
import Input from "../../components/ui/Input";
import useAuthForm from "../../hooks/useAuthForm";

const RegisterForm = () => {
  const { register, handleSubmit, onSubmit, errors, isPending } =
    useAuthForm("/register");
  const { onGithubClick, onGoogleClick } = useSocialAuth();

  return (
    <>
      <div className="form-container">
        <h2>Create your account</h2>
        <p>Sign up with your Github or Google account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SocialAuthButtons
            onGithubClick={onGithubClick}
            onGoogleClick={onGoogleClick}
            type="Signup"
          />
          <div className="separator">Or continue with</div>
          <div className="credentials-container">
            <Input
              inputType={"text"}
              inputField={"username"}
              placeholder="re_zero"
              register={register}
              errors={errors}
            />
            <Input
              inputType={"email"}
              inputField={"email"}
              placeholder="m@example.com"
              register={register}
              errors={errors}
            />
            <Input
              inputType={"password"}
              inputField={"password"}
              register={register}
              errors={errors}
            />
            <Input
              inputType={"password"}
              inputField={"confirmPassword"}
              register={register}
              errors={errors}
            />

            <button disabled={isPending} type="submit">
              Sign Up
            </button>
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
