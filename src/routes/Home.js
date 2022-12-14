import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { dbService } from "../firebase";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

function Home({ userInfo }) {
  const [nweets, setNweets] = useState([]);
  const nweetsCollection = collection(dbService, "nweets");

  //컴포넌트가 마운트되면 db에 저장된 nweets들을 불러온다
  useEffect(() => {
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
      <div>
        <NweetFactory userInfo={userInfo} />
      </div>
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
