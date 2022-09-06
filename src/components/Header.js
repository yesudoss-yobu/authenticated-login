import React from "react";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { counterActions } from "../store/MyStore";
import { useNavigate } from "react-router-dom";


const HeaderStyle = styled.header`
    .logo {
      font-size: 29px;
    
    }
    .tab {
      font-size: 20px;
      cursor:pointer;
    }
    .background {
      background-color: #2e2d2d;
    color: #c7c7c7;
    }
    .seperation {
       margin-left:1%;
       margin-right:10%;
      display:flex;
      justify-content:space-between;
      align-items:center;
    
    }
    .seperation__child1 {
      width:20%;
      display:flex;
      justify-content:space-between;
      align-items:center;
      
    }
    

  `;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userLogin = useSelector((state)=>state.user.userLogin);

const userHandler = () => {
navigate('/home/users',{replace:true})

}
const networkHandler = () =>{
  navigate('/home/networks',{replace:true})

}

  const logoutHandler =() =>{
dispatch(counterActions.showToggle(true))
  }

  return (
    <HeaderStyle>
      <div className="background">

      <div className="seperation">

      <div className="seperation__child1">
        <h1 className="logo">Aequalis</h1>
        
        {userLogin && <h1 onClick={userHandler} className="tab">Users</h1>}
        {userLogin && <h1 onClick={networkHandler} className="tab">Networks</h1>}
      </div>
      
      <div>{userLogin && <h1 onClick ={logoutHandler}className="tab">Logout</h1>}</div>
      </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
