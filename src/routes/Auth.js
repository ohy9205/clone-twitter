import React, { useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
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
        <button type="submit">Login</button>
      </form>
      <div>
        <button>continue with Google</button>
        <button>continue with GitHub</button>
      </div>
    </div>
  );
}

export default Auth;
