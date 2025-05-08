import React from "react";
import { NavLink } from "react-router-dom";
import SocialAuthButtons from "../../components/ui/SocialAuthButtons";
import useSocialAuth from "../../hooks/useSocialAuth";
import Input from "../../components/ui/Input";
import useAuthForm from "../../hooks/useAuthForm";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
  } = useAuthForm("/login");
  const { onGithubClick, onGoogleClick } = useSocialAuth();

  return (
    <>
      <div className="form-container">
        <h2>Welcome back</h2>
        <p>Login with your Github or Google account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SocialAuthButtons
            onGithubClick={onGithubClick}
            onGoogleClick={onGoogleClick}
          />
          <div className="separator">Or continue with</div>
          <div className="credentials-container">
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
              labelRow={{
                isPresent: true,
                title: "Forgot your password?",
                navLink: "/auth/password/reset",
              }}
              placeholder="Enter password"
              register={register}
              errors={errors}
            />
            <button disabled={isPending} type="submit">Login</button>
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
