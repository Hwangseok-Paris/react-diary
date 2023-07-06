import React, { useState, useContext, useEffect } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";

// COMPONENT
import DiaryList from "../components/DiaryList";

function Home() {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `;

  useEffect(() => {
    // const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
    setData(
      diaryList.filter(
        (it) =>
          new Date(it.date).getFullYear() === new Date(curDate).getFullYear() &&
          new Date(it.date).getMonth() === new Date(curDate).getMonth()
      )
    );
  }, [curDate, diaryList]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  };
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}></MyHeader>
      <DiaryList diaryList={data} />
    </div>
  );
}

export default Home;
