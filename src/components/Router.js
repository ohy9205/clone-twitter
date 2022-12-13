import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

function AppRouter({ isLoggedIn, userInfo }) {
  const showHome = (
    <Route path="/" exact element={<Home userInfo={userInfo} />} />
  );
  const loginPage = <Route path="/" exact element={<Auth />} />;

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navigation />}
        <Routes>
          {isLoggedIn ? showHome : loginPage}
          <Route path="/profile" element={<Profile userInfo={userInfo} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
