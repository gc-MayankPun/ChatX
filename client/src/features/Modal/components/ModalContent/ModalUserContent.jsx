import { uploadImageToServer } from "../../../../api/uploadImageToServer";
import PickImage from "../../../../components/ui/PickImage";
import { useUser } from "../../../../context/userContext";
import { setItem } from "../../../../utils/storage";
import useToast from "../../../../hooks/useToast";
import { memo, useState,useEffect } from "react";
import { FaCamera } from "react-icons/fa6";

export const ModalUserContent = memo(({ activeTab, closeToast }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [imageSet, setImageSet] = useState(null);
  const { user, setUser } = useUser();
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ type: "info", payload: fileError });
  }, [fileError]);

  const uploadImage = async () => {
    setIsUploading(false);
    try {
      const formData = new FormData();
      formData.append("avatar", imageSet);
      formData.append("username", user.username);

      const data = await uploadImageToServer(formData);
      setUser((prev) => ({ ...prev, avatar: data.avatar }));
      setItem("user", { ...user, avatar: data.avatar });
      showToast({ type: "success", payload: data.message });
    } catch (error) {
      console.log(error);
      showToast({ type: "error", payload: error.message });
    } finally {
      closeToast();
    }
  };

  return (
    activeTab === "user" && (
      <div className="user-settings">
        <div title="Upload an avatar" id="user-avatar__container">
          <PickImage
            previewImg={user.avatar}
            setIsUploaded={setIsUploading}
            setImageSet={setImageSet}
            setFileError={setFileError}
            styles={{ height: "5rem", width: "5rem", opacity: ".6" }}
          >
            <span className="center-icon avatar-upload__icon">
              <FaCamera />
            </span>
          </PickImage>
        </div>
        <div className="user-settings__footer">
          <p>Upload your avatar</p>
        </div>
        <button
          disabled={!imageSet || !isUploading}
          onClick={uploadImage}
          className={`user-save__button ${
            !imageSet || !isUploading ? "disabled" : ""
          }`}
        >
          Save
        </button>
      </div>
    )
  );
});
