import React from "react";
import { Link } from "react-router-dom";

function Navigation({ userInfo }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userInfo.displayName} 프로필</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
