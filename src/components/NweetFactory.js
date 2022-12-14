import React, { useRef, useState } from "react";
import { dbService, storageService } from "../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";

function NweetFactory({ userInfo }) {
  const [nweetText, setNweetText] = useState("");
  const [attachment, setAttachment] = useState(""); // data:image/형식의 file string
  const fileInput = useRef();
  const nweetsCollection = collection(dbService, "nweets");

  const onChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    setNweetText(value);
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let attachmentUrl;
    if (attachment) {
      // 파일에 접근하는 레퍼런스 생성
      // 업로드 유저를 구분하기 위해 userInfo.uid 이름의 폴더를 생성한다
      const attachmentRef = ref(storageService, `${userInfo.uid}/${uuidv4()}`);
      // 파일 업로드
      await uploadString(attachmentRef, attachment, "data_url");
      // 다운로드 위한 파일 URL 생성
      attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
    }

    //저장할 nweet객체 생성
    const nweet = {
      text: nweetText,
      createdAt: Date.now(),
      authorId: userInfo.uid,
      attachmentUrl: attachment ? attachmentUrl : "",
    };

    await addDoc(nweetsCollection, nweet);
    setNweetText("");
    setAttachment("");
    onClearAttachment();
  };

  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = "";
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="What's on your mind?"
        maxLength={100}
        value={nweetText}
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
  );
}

export default NweetFactory;
