import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

function AppRouter({ isLoggedIn, userInfo, refreshUser }) {
  const showHome = (
    <Route path="/" exact element={<Home userInfo={userInfo} />} />
  );
  const loginPage = <Route path="/" exact element={<Auth />} />;

  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userInfo={userInfo} />}
      <Routes>
        {isLoggedIn ? showHome : loginPage}
        <Route
          path="/profile"
          element={<Profile userInfo={userInfo} refreshUser={refreshUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
