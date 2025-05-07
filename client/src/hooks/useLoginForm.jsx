import React from "react";
import {showToast} from "../utils/showToast";

const useLoginForm = () => {
  const onGithubClick = () => {
    showToast("info", "Login GitHub");
  };

  const onGoogleClick = () => {
    showToast("info", "Login Google");
  };

  return { onGithubClick, onGoogleClick };
};

export default useLoginForm;
