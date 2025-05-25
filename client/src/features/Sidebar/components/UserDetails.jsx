import { useUser } from "../../../context/userContext";

export const UserDetails = () => {
  const { user } = useUser();

  return (
    <div className="user">
      <div className="user_avatar">
        {user?.avatar ? (
          <img src={user.avatar} alt="User avatar" />
        ) : (
          <img src={"/images/blank-user.webp"} alt="user avatar img" />
        )}
      </div>
      <p className="user-username" title={user.username}>
        {user.username}
      </p>
    </div>
  );
};
