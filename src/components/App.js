import { useEffect, useState } from "react";
import { authService } from "../firebase";
import AppRouter from "./Router";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  // isLoggedIn 초기값으로 auth.currentUser정보 전달
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 초기화 상태를 저장하는 state. 이 상태로 UI를 구분함
  const [init, setInit] = useState(false);

  // isLoggedIn = useState(authService.currentUser) 코드만 있으면
  //로그인 된 상태일때 firebase에서 유저를 찾아오는 시간을 기다리지 못해 언제나 null값이 들어가기때문에
  //onAuthStateChanged로 db로부터 user정보를 가져왔을때만 isLoggedIn상태가 변화되게 한다
  //useEffect를 사용하는 이유는 이벤트리스너를 컴포넌트 마운트시에 등록하고 싶기 때문이다
  useEffect(() => {
    //user가 변화됐는지 인식한다
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()} nwitter</footer>
    </div>
  );
}

export default App;
