import { uploadImageToServer } from "../../../../api/uploadImageToServer";
import PickImage from "../../../../components/ui/PickImage";
import { useUser } from "../../../../context/userContext";
import { deleteUser } from "../../../../api/deleteUser";
import { setItem } from "../../../../utils/storage";
import { memo, useState, useEffect } from "react";
import useToast from "../../../../hooks/useToast";
import { FaCamera } from "react-icons/fa6";

export const ModalUserContent = memo(({ activeTab, closeToast, navigate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [imageSet, setImageSet] = useState(null);
  const { showToast, confirmToast } = useToast();
  const { user, setUser } = useUser();

  useEffect(() => {
    showToast({ type: "info", payload: fileError });
  }, [fileError]);

  const uploadImage = async () => {
    setIsUploading(false);
    setIsDeleting(true);
    try {
      const formData = new FormData();
      formData.append("avatar", imageSet);
      formData.append("username", user.username);

      const data = await uploadImageToServer(formData);
      setUser((prev) => ({ ...prev, avatar: data.avatar }));
      setItem("user", { ...user, avatar: data.avatar });
      showToast({ type: "success", payload: data.message });
    } catch (error) {
      showToast({ type: "error", payload: error.message });
    } finally {
      closeToast();
    }
  };

  const handleDeleteUser = async () => {
    closeToast();
    try {
      const deleteUserConfirm = await confirmToast({
        payload:
          "Are you sure you want to delete your account? This action is irreversible.",
      });
      if (!deleteUserConfirm) return;
      const data = await deleteUser(user.id, user.username);
      if (data) {
        localStorage.clear();

        showToast({
          type: "success",
          payload: data.message,
        });
        navigate("/auth/login");
      } else {
        showToast({
          type: "error",
          payload: "Failed to delete your account. Please try again.",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        payload: "Something went wrong while deleting your account.",
      });
    }
  };

  return (
    activeTab === "user" && (
      <div className="user-settings">
        <h1 className="user-settings__title">User Settings</h1>
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
        <div className="user-settings__btn-container">
          <button
            disabled={isDeleting}
            onClick={handleDeleteUser}
            className={`user-settings__button user-delete__button ${
              isDeleting ? "disabled" : ""
            }`}
          >
            Delete User
          </button>
          <button
            disabled={!imageSet || !isUploading}
            onClick={uploadImage}
            className={`user-settings__button user-save__button ${
              !imageSet || !isUploading ? "disabled" : ""
            }`}
          >
            Save
          </button>
        </div>
      </div>
    )
  );
});
