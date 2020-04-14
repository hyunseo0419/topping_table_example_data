import React from "react";
import "./App.css";

const ExampleData = (props) => {
  return (
    <>
      <div className="exampleData">
        <div style={{ textAlign: "center" }}>
          <br />
          {"{"}
          <br />
          user_id : {props.result == null ? "0" : props.result.user_id},
          <br />
          {/* name : {props.result == null ? "OOO" : props.result.name},
          <br /> */}
          store : {props.result == null ? "OO점" : props.result.store},
          <br />
          order_number :{" "}
          {props.result == null ? "10000" : props.result.order_number},
          <br />
          score :
          <span style={{ color: "#eded7e" }}>
            {"{"}
            <br />
            pizza_id :{" "}
            {props.result == null ? "12" : props.result.score.pizza_id} ,
            <br />
            time : {props.result == null ? "300" : props.result.score.time} ,
            <br />
            quality :{" "}
            {props.result == null ? "100" : props.result.score.quality}
            ,
            <br />
            sauce : {props.result == null ? "100" : props.result.score.sauce},
            <br />
            cheese : {props.result == null ? "100" : props.result.score.cheese},
            <br />
            topping :{" "}
            {props.result == null ? "100" : props.result.score.topping}
            <br />
            {"}"}
          </span>
          <br />
          {"}"}
          <br />
          <br />
          {props.multyResult.map((ele, idx) => (
            <div className="exampleData" key={idx}>
              <div style={{ textAlign: "center" }}>
                <br />
                {"{"}
                <br />
                user_id : {ele.user_id},
                <br />
                {/* name : {ele.name},
                <br /> */}
                store : {ele.store},
                <br />
                order_number: {ele.order_number},
                <br />
                score:
                <span style={{ color: "#eded7e" }}>
                  {"{"}
                  <br />
                  pizza_id : {ele.score.pizza_id} ,
                  <br />
                  time : {ele.score.time} ,
                  <br />
                  quality :{ele.score.quality}
                  ,
                  <br />
                  sauce :{ele.score.sauce},
                  <br />
                  cheese :{ele.score.cheese},
                  <br />
                  topping :{ele.score.topping}
                  <br />
                  {"}"}
                </span>
                <br />
                {"}"}
                <br />
              </div>
              <br />
            </div>
          ))}
        </div>
        <br />
      </div>
    </>
  );
};

export default ExampleData;
