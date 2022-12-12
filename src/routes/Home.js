import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { dbService } from "../firebase";

function Home() {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  //db로부터 nweets를 불러오는 메소드
  const getNweets = async () => {
    const querySnapshot = await getDocs(collection(dbService, "nweets"));
    querySnapshot.forEach((doc) => {
      const nweetObj = { id: doc.id, ...doc.data() };
      setNweets((prev) => [nweetObj, ...prev]);
    });
    console.log(nweets);
  };

  //컴포넌트가 마운트되면 db에 저장된 nweets들을 불러온다
  useEffect(() => {
    getNweets();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(dbService, "nweets"), {
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
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
