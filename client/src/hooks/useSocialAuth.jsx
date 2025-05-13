import { useAuth0 } from "@auth0/auth0-react";
import useToast from "./useToast";

const useSocialAuth = () => {
  // const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { showToast } = useToast();
  // console.log(user);

  const onGithubClick = () => {
    // loginWithRedirect()
    // logout()
    showToast({ type: "info", payload: "This feature is coming soon" });
  };

  const onGoogleClick = () => {
    // loginWithRedirect()
    showToast({ type: "info", payload: "This feature is coming soon" });
  };

  return { onGithubClick, onGoogleClick };
};

export default useSocialAuth;
