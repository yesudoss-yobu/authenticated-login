import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { counterActions } from "../store/MyStore";
import AlertDrop from "./AlertDrop";
import Alert from "./Alert";


const Form = styled.form`
  .align {
    justify-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 27%;
    margin: 5% auto;
    gap: 12px;
  }
  .align__input {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .align__input__child {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .input {
    height: 30px;
    background-color: #4155ff0f;
    border-radius: 5px;
     border: none; 
    // border-color: #e0e0e099;
  }
  .input:focus {
    background-color: white;
    border-radius: 5px; 
    outline-color: blue;
  }
  .button {
    background-color:#0000ffbf;;
    color:white;
    height:32px;
    width:60px;
    border-radius:4px;
  }
    .button:hover{
      background-color:blue;
      
    }
  
`;

const FirstPage = () => {

  
const userData = useSelector((state)=>state.user.users)


  const dispatch = useDispatch();
  const Naviagte = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  

  //validation states-----------
  const [loginError,setLoginError]= useState(false)
  const [passwordError,setPasswordError] =useState(false)
  const [alert,setAlert] = useState(false)
  //validation states-----------

  const userName = userData.some(val =>val.login === login)
const userPassword = userData.some(val =>val.password === password)


  const loginHandler = (e) => {
    setLogin(e.target.value);
    if(e.target.value !== ''){
      setLoginError(false)
    }
  };
  const passwordhandler = (e) => {
    setPassword(e.target.value);
    if(e.target.value !== ''){
      setPasswordError(false)
    }
  };


  const submitHandler = (e) => {
    e.preventDefault();

    if(login.trim()=== ''){
      setLoginError(true)
    }
    if(password.trim()=== ''){
      setPasswordError(true)
    }

    if (login.trim() === "" || password.trim() === "") {
      return;
    }


    if(userName ===false ||userPassword === false){
      setAlert(true)
      return
          }

    if(userName === true && userPassword === true){
dispatch(counterActions.showToggle())
    Naviagte("/home/users",{replace:true});
    }
  };
const closeAlert = () =>{
  setAlert(false)
}

  return (
    <>
    {alert && <AlertDrop/>}
    {alert && <Alert onClose={closeAlert}/>}
    <Form onSubmit={submitHandler}>
      <div className="align">
        <div className="align__input">
          <div className="align__input__child">
            <label htmlFor="login">Login</label>
            <input className="input" type="text" id="login" onChange={loginHandler} />
            {loginError && <p style={{color:'red',marginTop:'0px'}}>Enter user Id!</p>}
          </div>
          <div className="align__input__child">
            <label htmlFor="password">Password</label>
            <input className="input" type="password" id="password" onChange={passwordhandler} />
            {passwordError && <p style={{color:'red',marginTop:'0px'}}>Enter password!</p>}
          </div>
        </div>
        <div>
          <button className="button" type="submit">Log in</button>
        </div>
      </div>
    </Form>
  
    
    </>
  );
};

export default FirstPage;
