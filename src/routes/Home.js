import React, { useEffect, useRef, useState } from "react";
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
  const [attachment, setAttachment] = useState();
  const fileInput = useRef();

  const nweetsCollection = collection(dbService, "nweets");

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

  //첨부파일 처리
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    // 파일 정보를 가져온다
    const theFile = files[0]; //한개의 파일만 첨부하므로 항상 files[0]

    // 파일 정보를 읽는다
    const reader = new FileReader();
    // 파일이 읽기가 끝났을 때 실행
    reader.onload = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
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

  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = "";
  };

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
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <br />
        <button type="submit">Nweet</button>
        {attachment && (
          <div>
            <img src={attachment} width="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
