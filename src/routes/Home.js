import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "../firebase";

function Home() {
  const [nweet, setNweet] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const collectionRef = await addDoc(collection(dbService, "nweets"), {
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
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
