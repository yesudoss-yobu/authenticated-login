import React from "react";
import styled from "styled-components";

export const Div = styled.div`
  .navbar{
    display:flex;
    background-color: #d1d1d1;
    height: 50px;
    text-align: center;
    font-size: 9px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .linkColor{
    color: #4155ffd9;
    padding-right: 6px;
  }
`

const UserNav = (props) => {
  const userId = props.userId;
  return (
    <Div >
      <div className="navbar">
      <h1 className="linkColor">Users</h1>
      <h1> / {userId}</h1>
      </div>
    </Div>
  );
};

export default UserNav;
