import LegalInfo from "../../components/ui/LegalInfo";
import { RiErrorWarningLine } from "react-icons/ri";
import useAuthForm from "../../hooks/useAuthForm";
import Input from "../../components/ui/Input";
import { ImSpinner2 } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import {
  base64ToFile,
  resizeAndCropImage,
} from "../../utils/imageResolutionUtil";

const RegisterForm = () => {
  const [preview, setPreview] = useState(
    "https://res.cloudinary.com/dozdj2yha/image/upload/f_auto,q_auto/v1747328460/blank-profile-picture-973460_1280_ybew2z.png"
  );
  const [fileError, setFileError] = useState(null);
  const [imageSet, setImageSet] = useState("default");
  const [isUploaded, setIsUploaded] = useState(true);
  const avatarRef = useRef(null);
  const { register, handleSubmit, onSubmit, errors, isPending } = useAuthForm({
    endpoint: "/register",
    imageSet,
  });

  const handleImageClick = () => {
    avatarRef.current?.click();
    setFileError(null);
  };

  const handleImageUpload = (event) => {
    setIsUploaded(false);

    try {
      const file = event.target.files[0];
      if (!file) {
        setIsUploaded(true);
        return;
      }

      resizeAndCropImage(file, 500, 500, (base64Image) => {
        setPreview(base64Image);
        const resizedFile = base64ToFile(base64Image, file.name);
        setImageSet(resizedFile);
        setIsUploaded(true);
      });
    } catch (err) {
      setIsUploaded(true);
      setFileError(err.message || "Image processing failed");
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Create your account</h2>
        <p>Sign up with a username, password, and profile image</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="credentials-container">
            <div className="user-avatar__container">
              <input
                ref={avatarRef}
                type="file"
                name="avatar"
                id="avatar-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="avatar__div">
                <img
                  className="user-avatar"
                  src={preview}
                  alt="user-avatar"
                  onClick={handleImageClick}
                />
                {!isUploaded && (
                  <span className="spiner">
                    <ImSpinner2 className="spin" />
                  </span>
                )}
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
