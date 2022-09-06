import React from "react";
import styled from "styled-components";

const AlertBox = styled.div`
.alertDiv{
    box-sizing: border-box;
    background-color: #fff70052;
    display: flex;
    align-items: center;
    gap: 4%;
    width: 40%;
    color: #b5b529;
    font-family: sans-serif;
    text-align: center;
    margin: 0% auto;
    position:absolute;
    z-index:1;
    left: 50%;
    transform: translate(-50%);
}
.btn{
    border: none;
    background-color: transparent;
    font-size: 16px;
    color: #878726;
    cursor:pointer;
}

`


const Alert = (props) => {
  return (
    <AlertBox>
    <div className="alertDiv">
      <div style={{width:"87%"}}>
        <h3>Invalid Username or password !</h3>
      </div>
      <div style={{width:"13%"}}>
        <button className="btn" onClick={props.onClose}>x</button>
      </div>
    </div>
    </AlertBox>
  );
};

export default Alert;
