import React, { useState } from "react";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

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
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        console.log(data);
      } else {
        //login
        const data = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div>
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
      <div>
        <button>continue with Google</button>
        <button>continue with GitHub</button>
      </div>
    </div>
  );
}

export default Auth;
