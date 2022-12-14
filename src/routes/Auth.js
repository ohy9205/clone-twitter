import React, { useState } from "react";
import { authService } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";

function Auth() {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;

    // 소셜 로그인을 위한 provider를 담을 변수
    let provider;

    if (name === "Google") {
      provider = new GoogleAuthProvider();
    } else if (name === "GitHub") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="Google" onClick={onSocialClick}>
          continue with Google
        </button>
        <button name="GitHub" onClick={onSocialClick}>
          continue with GitHub
        </button>
      </div>
    </div>
  );
}

export default Auth;
