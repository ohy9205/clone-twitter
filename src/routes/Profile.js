import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { authService } from "../firebase";

function Profile({ userInfo, refreshUser }) {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userInfo.displayName);

  const onChangeDisplayNameHandler = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (userInfo.displayName === newDisplayName) return;
    await updateProfile(authService.currentUser, {
      displayName: newDisplayName,
    });
    refreshUser();
  };

  // 로그아웃 처리
  const onLogoutHandler = () => {
    authService.signOut();

    //로그아웃되면 Home으로 돌아가야한다.
    navigate("/");
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            onChange={onChangeDisplayNameHandler}
          />
          <button type="submit" onClick={onSubmitHandler}>
            Update Profile
          </button>
        </form>
      </div>
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
}

export default Profile;
