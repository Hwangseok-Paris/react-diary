import React, { useContext } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

function Edit(props) {
  const { targetId } = useParams();
  console.log(targetId);
  const navigate = useNavigate();
  const [searchParms, setSearchParams] = useSearchParams();

  const data = useContext(DiaryStateContext);
  const targetData = data.filter((it) => it.id === targetId);
  console.log("변경할 데이터: ", targetData);
  console.log("변경할 데이터 ID: ", targetId);

  // const id = searchParms.get("id");
  const mode = searchParms.get("mode");

  // console.log(id, mode);

  return (
    <div>
      <DiaryEditor data={targetData} />
      {/* <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지입니다.</p>
      <button onClick={() => setSearchParams({ who: "paris" })}>QS 변경</button>
      <button
        onClick={() => {
          navigate("/");
        }}>
        Home
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}>
        뒤로 가기
      </button> */}
    </div>
  );
}

export default Edit;
