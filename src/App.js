import "./App.css";
import React, { useContext, useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

// COMPONENTS
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1688032431005,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1688032431015,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1688032431025,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1688032431035,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1688032431045,
  },
];

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      // const newItem = {
      //   ...action.data,
      // };
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE":
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    case "EDIT":
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
      break;
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  // const [data, dispatch] = useReducer(reducer, []);
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current++;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (date, targetId, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        content,
        emotion,
        data: new Date(date).getTime(),
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader
          headText={"App"}
          leftChild={
            <MyButton
              text={"왼쪽 버튼"}
              onClick={() => {
                alert("왼쪽 클릭");
              }}
            />
          }
          rightChild={
            <MyButton
              text={"오른쪽 버튼"}
              onClick={() => {
                alert("오른쪽 클릭");
              }}
            />
          }
        />

        <h2>App.js</h2>
        <MyButton text="버튼" onClick={() => alert("버튼 클릭")} type={"positive"} />
        <MyButton text="버튼" onClick={() => alert("버튼 클릭")} type={"negative"} />
        <MyButton text="버튼" onClick={() => alert("버튼 클릭")} type={"asfasdf"} /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
