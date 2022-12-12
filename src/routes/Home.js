import React, { useState } from "react";

function Home() {
  const [nweet, setNweet] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const onChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={100}
          value={nweet}
          onChange={onChangeHandler}
        />
        <button type="submit">Nweet</button>
      </form>
    </div>
  );
}

export default Home;
