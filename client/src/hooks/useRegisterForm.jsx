import React from "react";
import {showToast} from "../utils/showToast";

const useRegisterForm = () => {
  const onGithubClick = () => {
    showToast("info", "Signup GitHub");
  };

  const onGoogleClick = () => {
    showToast("info", "Signup Google");
  };

  return { onGithubClick, onGoogleClick };
};

export default useRegisterForm;
