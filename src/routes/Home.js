import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { dbService } from "../firebase";

function Home({ userInfo }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  console.log(nweets);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      authorId: userInfo.uid,
    });
    setNweet("");
  };

  const onChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  //컴포넌트가 마운트되면 db에 저장된 nweets들을 불러온다
  useEffect(() => {
    //기존에 getDocs로 구현한건 새로고침을 해야 다시 DB에 있는 정보를 가져와서 업데이트하는 방식
    //하지만 FireStore Database는 Realtime Database이기 때문에
    //해당 이점을 살리기 위해 리얼 타임을 구현
    onSnapshot(query(collection(dbService, "nweets")), (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(newArray);
    });
  }, []);

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
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
