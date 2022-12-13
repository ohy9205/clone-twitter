import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { authService, dbService } from "../firebase";

function Profile({ userInfo }) {
  const navigate = useNavigate();

  // 로그아웃 처리
  const onLogoutHandler = () => {
    authService.signOut();

    //로그아웃되면 Home으로 돌아가야한다.
    navigate("/");
  };

  // 프로파일 페이지에 접근한 유저 정보를 불러온다
  useEffect(() => {
    const getMyNweets = () => {
      //db 컬렉션 생성
      const nweetsCollection = collection(dbService, "nweets");
      //사용자 정보 뽑아내는 필터링 쿼리 작성
      const q = query(
        nweetsCollection,
        where("authorId", "==", userInfo.uid),
        orderBy("createdAt", "asc")
      );
      //쿼리문으로 정보 불러옴
      const nweets = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docs.map((doc) => console.log(doc.data()));
      });
    };
    getMyNweets();
  }, []);

  return (
    <div>
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
}

export default Profile;
