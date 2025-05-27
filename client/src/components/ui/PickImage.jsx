import { useRef, useState } from "react";
import {
  base64ToFile,
  resizeAndCropImage,
} from "../../utils/imageResolutionUtil";
import "../../stylesheets/pick-image.css";

const PickImage = ({
  previewImg,
  setIsUploaded,
  setImageSet,
  setFileError,
  styles ,
  children
}) => {
  const [preview, setPreview] = useState(previewImg);
  const avatarRef = useRef(null);

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
      <input
        ref={avatarRef}
        type="file"
        name="avatar"
        id="avatar-input"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div className="avatar__div" onClick={handleImageClick} style={styles}>
        <img
          className="user-avatar"
          src={preview}
          alt="user-avatar"
        //   onClick={handleImageClick}
        />
        {children}
        {/* {!isUploaded && (
          <span className="spiner">
            <ImSpinner2 className="spin" />
          </span>
        )} */}
      </div>
    </>
  );
};

export default PickImage;
