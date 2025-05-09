import { showToast } from "../utils/showToast";
import { useAuth0 } from "@auth0/auth0-react";

const useSocialAuth = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  // console.log(user);

  const onGithubClick = () => {
    // loginWithRedirect()
    // logout()
    showToast("info", "This feature is coming soon");
  };

  const onGoogleClick = () => {
    // loginWithRedirect()
    showToast("info", "This feature is coming soon");
  };

  return { onGithubClick, onGoogleClick };
};

export default useSocialAuth;
