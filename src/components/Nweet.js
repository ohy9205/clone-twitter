import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { ref, deleteObject } from "firebase/storage";

function Nweet({ nweetObj, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  //글 삭제
  const onDeleteHandler = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      const desertRef = ref(storageService, nweetObj.attachmentUrl);
      await deleteDoc(doc(dbService, "nweets", nweetObj.id));
      if (nweetObj.attachmentUrl) {
        await deleteObject(desertRef);
      }
    }
  };

  // 수정모드 토글
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    setNewNweet(nweetObj.text);
  };

  // 수정중인 글 내용 state
  const onChangeHandler = (e) => {
    setNewNweet(e.target.value);
  };

  // 폼 제출 이벤트 핸들러
  const onSubmitHandler = (e) => {
    e.preventDefault();
    updateDoc(doc(dbService, "nweets", nweetObj.id), {
      text: newNweet,
    });
    setIsEditing(false);
  };

  // 수정모드일경우 보여질 화면
  const showEditing = (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={newNweet}
          placeholder="Edit your nweet"
          onChange={onChangeHandler}
          required
        />
        <button>Save</button>
      </form>
      <button onClick={toggleEditing}>Cancle</button>
    </div>
  );

  const showBasic = (
    <div>
      <p>{nweetObj.text}</p>
      {nweetObj.attachmentUrl && (
        <div>
          <img src={nweetObj.attachmentUrl} alt="업로드이미지" width="200px" />
        </div>
      )}
    </div>
  );

  return (
    <>
      {isEditing ? showEditing : showBasic}

      {isOwner && (
        <div>
          <button onClick={onDeleteHandler}>Delete Nweet</button>
          <button onClick={toggleEditing}>Edit Nweet</button>
        </div>
      )}
    </>
  );
}

export default Nweet;
