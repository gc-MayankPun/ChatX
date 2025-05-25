import { DEFAULT_AVATAR_URL } from "../../utils/constants";
import PickImage from "../../components/ui/PickImage";
import LegalInfo from "../../components/ui/LegalInfo";
import useAuthForm from "../../hooks/useAuthForm";
import Input from "../../components/ui/Input";
import { ImSpinner2 } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const RegisterForm = () => {
  const [imageSet, setImageSet] = useState("default");
  const [isUploaded, setIsUploaded] = useState(true);
  const [fileError, setFileError] = useState(null);
  const { register, handleSubmit, onSubmit, errors, isPending } = useAuthForm({
    endpoint: "/register",
    imageSet,
  });

  return (
    <>
      <div className="form-container">
        <h2>Create your account</h2>
        <p>Sign up with a username, password, and profile image</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="credentials-container">
            <div className="user-avatar__container">
              <div title="Upload an avatar" id="user-avatar__container">
                <PickImage
                  previewImg={DEFAULT_AVATAR_URL}
                  setImageSet={setImageSet}
                  setIsUploaded={setIsUploaded}
                  setFileError={setFileError}
                  styles={{ height: "6.5rem", width: "6.5rem" }}
                >
                  {!isUploaded && (
                    <span className="spiner">
                      <ImSpinner2 className="spin" />
                    </span>
                  )}
                </PickImage>
              </div>
              <div className="user-avatar__subhead">
                <span>Upload an image</span>
                {fileError && (
                  <p className="input-error">
                    <span>
                      <RiErrorWarningLine />
                    </span>{" "}
                    {fileError}
                  </p>
                )}
              </div>
            </div>
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
              register={register}
              errors={errors}
              placeholder="Enter password"
            />

            <button disabled={isPending || !isUploaded} type="submit">
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
      <LegalInfo />
    </>
  );
};

export default RegisterForm;
