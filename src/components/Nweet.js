import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { dbService } from "../firebase";

function Nweet({ nweetObj, isOwner }) {
  //글 삭제
  const onDeleteHandler = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweets", nweetObj.id));
    }
  };

  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteHandler}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
}

export default Nweet;
