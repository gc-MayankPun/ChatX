import React from "react";
import { showToast } from "../utils/showToast";

const useSocialAuth = () => {
  const onGithubClick = () => {
    showToast("info", "Using GitHub Auth");
  };

  const onGoogleClick = () => {
    showToast("info", "Using Google Auth");
  };

  return { onGithubClick, onGoogleClick };
};

export default useSocialAuth;
