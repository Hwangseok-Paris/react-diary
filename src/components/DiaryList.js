import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// component
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const filterOptionList = [
  { value: "all", name: "전체" },
  { value: "good", name: "좋음" },
  { value: "normal", name: "보통" },
  { value: "bad", name: "나쁨" },
];

// SORT
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const emotionFilter = (item) => {
    if (filter === "good") {
      return parseInt(item.emotion) < 3;
    } else if (filter === "normal") {
      return parseInt(item.emotion) === 3;
    } else if (filter === "bad") {
      return parseInt(item.emotion) > 3;
    } else return item;
  };

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date - a.date);
      } else {
        return parseInt(a.date - b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList = copyList.filter((it) => emotionFilter(it));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyButton text={"새 일기 쓰기"} type={"positive"} onClick={() => navigate("/new")} />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
