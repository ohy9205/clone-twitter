import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { dbService } from "../firebase";
import Nweet from "../components/Nweet";

function Home({ userInfo }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const nweetsCollection = collection(dbService, "nweets");

  console.log(nweets);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await addDoc(nweetsCollection, {
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

    // nweets를 최신순으로 정렬하는 쿼리
    const orderQuery = query(nweetsCollection, orderBy("createdAt", "desc"));
    // 리얼타임 db 구독
    onSnapshot(orderQuery, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(newArray);
    });
  }, []);

  return (
    <section>
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
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.authorId === userInfo.uid}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
