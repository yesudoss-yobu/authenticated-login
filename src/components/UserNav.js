import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
    color: #616fe5d9;;
    padding-right: 6px;
    cursor:pointer;

    &:hover{
color:blue;
    }
  }
`

const UserNav = (props) => {
const navigate = useNavigate()
  const userId = props.userId;

  const userHandler = () => {
    navigate('/home/users',{replace:true})
    
    }
  return (
    <Div >
      <div className="navbar">
      <h1 className="linkColor" onClick={userHandler}>Users</h1>
      <h1> / {userId}</h1>
      </div>
    </Div>
  );
};

export default UserNav;
