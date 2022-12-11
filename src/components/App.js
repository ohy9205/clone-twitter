import { useState } from "react";
import { authService } from "../firebase";
import AppRouter from "./Router";

function App() {
  // isLoggedIn 초기값으로 auth.currentUser정보 전달
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} nwitter</footer>
    </div>
  );
}

export default App;
