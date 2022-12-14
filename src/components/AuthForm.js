import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "../firebase";

function AuthForm() {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onChangeHandler = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (newAccount) {
        //create account - API가 promise를 반환하므로 await필요
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        //login
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChangeHandler}
          placeholder="Emial"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
          placeholder="Password"
          required
        />
        <button type="submit">
          {newAccount ? "Create Accoount" : "Sign In"}
        </button>
        <p>{error}</p>
      </form>

      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </>
  );
}

export default AuthForm;
