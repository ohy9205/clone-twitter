import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const showHome = <Route path="/" exact element={<Home />} />;
  const loginPage = <Route path="/" exact element={<Auth />} />;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? showHome : loginPage}
          <Route path="" element={""} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
