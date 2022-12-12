import { useNavigate } from "react-router-dom";
import { authService } from "../firebase";

function Profile() {
  const navigate = useNavigate();

  // 로그아웃 처리
  const onLogoutHandler = () => {
    authService.signOut();

    //로그아웃되면 Home으로 돌아가야한다.
    navigate("/");
  };

  return (
    <div>
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
}

export default Profile;
