import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import ExampleData from "./ExampleData";
import axios from "axios";
import { storeNameArr } from "./data";

const POST_URL = "http://13.125.199.45:8000/record";
const GET_URL = "http://13.125.199.45:8000/user";

const App = () => {
  const [option, setOption] = useState({ id: "", option: "" });
  const [fetchStore, setFetchStore] = useState(null);
  const [fetchIdArr, setFetchIdArr] = useState([]);
  const [multyResult, setMultyResult] = useState([]);
  const [result, setResult] = useState(null);
  const [Count, setCount] = useState(1);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await axios.get(GET_URL);

        setFetchStore(users.data.users[0]);
        let IdList = users.data.users[0]
          .map((ele, idx) => ele[idx + 1])
          .flat(2);

        setFetchIdArr(IdList);
      } catch (error) {
        alert(error);
      }
    };
    fetchUser();
  }, []);

  const handlePostUserClicked = async (id, option, count = 1) => {
    console.log("@@", id);
    const randomPizza = Math.floor(Math.random() * 13) + 1;
    if (
      id === "" ||
      option === "" ||
      id === "id 선택" ||
      option === "점수 선택"
    ) {
      return alert("user id 와 점수를 선택해주세요.");
    }

    const randomOrderNum = 10000 + Math.floor(Math.random() * 1000);

    let selectOption =
      option === "high"
        ? {
            pizza_id: randomPizza,
            time: Number((Math.random() * (210 - 180) + 180).toFixed(2)),
            quality: Math.floor(Math.random() * (99 - 80) + 80),
            sauce: Math.floor(Math.random() * (99 - 80) + 80),
            cheese: Math.floor(Math.random() * (99 - 80) + 80),
            topping: Math.floor(Math.random() * (99 - 80) + 80),
          }
        : {
            pizza_id: randomPizza,
            time: Number((Math.random() * (300 - 270) + 270).toFixed(2)),
            quality: Math.floor(Math.random() * (75 - 55) + 55),
            sauce: Math.floor(Math.random() * (75 - 55) + 55),
            cheese: Math.floor(Math.random() * (75 - 55) + 55),
            topping: Math.floor(Math.random() * (75 - 55) + 55),
          };

    let storeName;
    fetchStore.filter((ele) => {
      if (Object.values(ele)[0].includes(Number(id))) {
        storeName = storeNameArr[Object.keys(ele)[0] - 1];
      }
    });

    const sampleData = {
      user_id: id,
      store: storeName,
      order_number: randomOrderNum,
      score: selectOption,
    };
    console.log(sampleData);
    for (let i = 0; i < count; i++) {
      await axios.post(POST_URL, sampleData);
    }
  };

  const handlePostDataClicked = async () => {
    let total = multyResult.slice(0);
    total.unshift(result);

    for (let i = 0; i < total.length; i++) {
      await axios.post(POST_URL, total[i]);
    }
  };

  const handleSelectDataClicked = async (num, arr) => {
    await setResult(null);
    const sampleUserId =
      fetchIdArr[Math.floor(Math.random() * fetchIdArr.length - 1)];
    console.log(sampleUserId);
    let randomStore = fetchStore.filter((ele, idx) =>
      ele[idx + 1].includes(sampleUserId)
    );
    console.log(randomStore);
    const sampleStore = storeNameArr[Object.keys(randomStore[0])[0] - 1];
    console.log(sampleStore);
    // const randomNum = Math.floor(Math.random() * storeNameArr.length);
    // const sampleUserId =
    //   fetchStore[randomNum][randomNum + 1][
    //     Math.floor(Math.random() * fetchStore[randomNum][randomNum + 1].length)
    //   ];

    // const sampleStore = storeNameArr[randomNum];
    const randomOrderNum = 10000 + Math.floor(Math.random() * 1000);
    const randomPizza = Math.floor(Math.random() * 13) + 1;
    const randomTime =
      sampleStore === "대치본점" || sampleStore === "일산후곡점"
        ? Number((Math.random() * (250 - 180) + 180).toFixed(2))
        : sampleStore === "홍대상수점" || sampleStore === "수원성대"
        ? Number((Math.random() * (300 - 270) + 270).toFixed(2))
        : Number((Math.random() * (300 - 200) + 200).toFixed(2));

    const randomQualityScore =
      sampleStore === "대치본점" || sampleStore === "일산후곡점"
        ? Math.floor(Math.random() * (99 - 80) + 80)
        : sampleStore === "홍대상수점" || sampleStore === "수원성대"
        ? Math.floor(Math.random() * (75 - 55) + 55)
        : Math.floor(Math.random() * (90 - 60) + 60);

    const randomSauceScore =
      sampleStore === "대치본점" || sampleStore === "일산후곡점"
        ? Math.floor(Math.random() * (99 - 80) + 80)
        : sampleStore === "홍대상수점" || sampleStore === "수원성대"
        ? Math.floor(Math.random() * (75 - 55) + 55)
        : Math.floor(Math.random() * (90 - 60) + 60);

    const randomCheeseScore =
      sampleStore === "대치본점" || sampleStore === "일산후곡점"
        ? Math.floor(Math.random() * (99 - 80) + 80)
        : sampleStore === "홍대상수점" || sampleStore === "수원성대"
        ? Math.floor(Math.random() * (75 - 55) + 55)
        : Math.floor(Math.random() * (90 - 60) + 60);

    const randomToppingScore =
      sampleStore === "대치본점" || sampleStore === "일산후곡점"
        ? Math.floor(Math.random() * (99 - 80) + 80)
        : sampleStore === "홍대상수점" || sampleStore === "수원성대"
        ? Math.floor(Math.random() * (75 - 55) + 55)
        : Math.floor(Math.random() * (90 - 60) + 60);

    // let names = Object.values(fetchStore[randomNum])[0];

    const sampleScore = {
      pizza_id: randomPizza,
      time: randomTime,
      quality: randomQualityScore,
      sauce: randomSauceScore,
      cheese: randomCheeseScore,
      topping: randomToppingScore,
    };

    const sampleData = {
      user_id: sampleUserId,
      store: sampleStore,
      order_number: randomOrderNum,
      score: sampleScore,
    };

    if (num === 0) {
      setMultyResult(arr);
      setResult(sampleData);
      return;
    } else if (num === 1) {
      handleSelectDataClicked(num - 1, arr);
    } else {
      arr.push(sampleData);
      handleSelectDataClicked(num - 1, arr);
    }
  };

  return (
    <div className="top">
      <img className="App-logo" src={logo} alt="logo" />
      <br />

      <div>
        <h1 style={{ color: "white" }}>개인 데이터</h1>
        <select
          name="score"
          style={{ height: 50, width: 130, fontSize: 15, margin: "1%" }}
          onChange={(e) => {
            let a = { id: e.target.value, option: option.option };

            setOption(a);
          }}
        >
          <option>id 선택</option>
          {fetchIdArr.map((ele, idx) => (
            <option value={ele} key={idx}>
              {ele}
            </option>
          ))}
        </select>

        <select
          name="score"
          style={{ height: 50, width: 130, fontSize: 15, margin: "1%" }}
          onChange={(e) => {
            let a = { id: option.id, option: e.target.value };
            setOption(a);
          }}
        >
          <option>점수 선택</option>
          <option value="high">high score</option>
          <option value="low">low score</option>
        </select>
        <input
          style={{
            height: 44,
            width: 124,
            fontSize: 15,
            margin: "1%",
            borderRadius: 5,
          }}
          onChange={(e) => setCount(e.target.value)}
          type="number"
          value={Count}
        ></input>
        <button
          className="selectBtn"
          onClick={() => handlePostUserClicked(option.id, option.option, Count)}
        >
          전송
        </button>
      </div>
      <div>
        <h1 style={{ color: "white" }}>랜덤 데이터</h1>
        <button
          className="selectBtn"
          onClick={() => handleSelectDataClicked(1, [])}
        >
          1개 선택
        </button>

        <button
          className="selectBtn"
          onClick={() => handleSelectDataClicked(5, [])}
        >
          5개 선택
        </button>

        <button
          className="selectBtn"
          onClick={() => handleSelectDataClicked(10, [])}
        >
          10개 선택
        </button>
      </div>
      <button className="btn" onClick={handlePostDataClicked}>
        전송
      </button>
      <br />

      <ExampleData result={result} multyResult={multyResult} />
    </div>
  );
};

export default App;
