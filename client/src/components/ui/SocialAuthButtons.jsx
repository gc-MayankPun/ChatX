import { TbBrandGithubFilled } from "react-icons/tb";
import { FaGoogle } from "react-icons/fa";

const SocialAuthButtons = ({
  onGithubClick,
  onGoogleClick,
  type = "Login",
}) => {
  return (
    <div className="auth-btn-container">
      <button type="button" onClick={onGithubClick}>
        <span>
          <TbBrandGithubFilled />
        </span>
        {type} with Github
      </button>
      <button type="button" onClick={onGoogleClick}>
        <span>
          <FaGoogle />
        </span>
        {type} with Google
      </button>
    </div>
  );
};

export default SocialAuthButtons;
