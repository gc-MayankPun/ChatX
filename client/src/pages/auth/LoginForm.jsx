import { NavLink } from "react-router-dom";
import Input from "../../components/ui/Input";
import useAuthForm from "../../hooks/useAuthForm";

const LoginForm = () => {
  const { register, handleSubmit, onSubmit, errors, isPending } = useAuthForm({
    endpoint: "/login",
  });

  return (
    <>
      <div className="form-container">
        <h2>Welcome back</h2>
        <p>Log in with your username and password</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="credentials-container">
            <Input
              inputType={"text"}
              inputField={"username"}
              placeholder="Enter username"
              register={register}
              errors={errors}
            />
            <Input
              inputType={"password"}
              inputField={"password"}
              // labelRow={{
              //   isPresent: true,
              //   title: "Forgot your password?",
              //   navLink: "/auth/password/reset",
              // }}
              placeholder="Enter password"
              register={register}
              errors={errors}
            />
            <button disabled={isPending} type="submit">
              Login
            </button>
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
