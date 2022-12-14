import React from "react";
import { v4 as uuid } from "uuid";
// import classes from "./ModalPage.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/MyStore";
import styled from "styled-components";
import { useEffect } from "react";
import profile from './assets/profile.jpg'

const Modal = styled.div`
  .modal {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 520px;
    height: auto;
    z-index: 1;
    background: #ffffff;
    box-shadow: 0px 2px 24px rgb(0 0 0 / 50%);
    border-radius: 2px;
  }
  .modalForm {
    padding: 17px;
  }
  .closebtn {
    text-align: right;
  }
  .closebtn > button {
    color: #5e5c5c;
    border: none;
    background-color: transparent;
    font-size: 22px;
    cursor: pointer;
  }
  .title {
    font-size: 24px;
    font-family: sans-serif;
    color: #3a3a3a;
    margin-top: -10px;
  }
  .profile{
    margin-left: 44px;
    height: 75px;
    width: 75px;
    margin-top: 29px;
    border-radius: 60px;
    
  }
  .loginlabel {
    display: block;
    padding-bottom: 11px;
    padding-top: 5px;
    font-size: 20px;
  }
  .avatar {
    display: block;
    padding-bottom: 11px;
    padding-top: 5px;
    font-size: 20px;
  }
  .loginInput {
    width: 90%;
    font-size: 18px;
    height: 33px;
    outline: none;
  }
  .loginError {
    outline: none;
    width: 90%;
    font-size: 15px;
    height: 33px;
    border: 1px solid red;
  }
  .divFlex {
    display: flex;
    padding-top: 13px;
    margin-top:20px;
  }
  .divFlex1{
    display: flex;
    padding-top: 13px;
    margin-top: -35px;
  }
  .role {
    display: block;
    padding-bottom: 11px;
    font-size: 20px;
  }
  .status {
    display: block;
    padding-bottom: 11px;
    font-size: 20px;
  }
  .roleInput {
    height: 36px;
    font-size: 18px;
    width: 95%;
  }
  .statusInput {
    height: 36px;
    font-size: 18px;
    width: 100%;
  }
  .passowrd {
  }
  .passwordInput {
    font-size: 18px;
    height: 33px;
    width: 90%;
    outline: none;
  }
  .passwordInputError {
    font-size: 15px;
    height: 33px;
    width: 90%;
    border: 1px solid red;
    outline: none;
  }
  .conpasswordInput {
    font-size: 18px;
    height: 33px;
    width: 96%;
    outline: none;
  }
  .conpasswordInputError {
    font-size: 15px;
    height: 33px;
    width: 96%;
    outline: none;
    border: 1px solid red;
  }
  .textarea {
    padding-top: 14px;
    margin-top: 10px;
    width: 98%;
    outline: none;
    height: 70px;
  }
  .textareaError {
    padding-top: 14px;
    margin-top: 10px;
    width: 98%;
    outline: none;
    border: 1px solid red;
    height: 70px;
  }
`;
export const Styledsavebtn = styled.button`
margin-right: 4%;
    margin-top: 3%;
    background-color: #008000ab;
    border: none;
    color: white;
    width: 70px;
    height: 34px;
    margin-left: 11px;
    &:hover {
      background-color: #008000;
      cursor:pointer;
`;
export const StyledCancelbtn = styled.button`
  margin-top: 3%;
  border: none;
  color: #787878;
  background-color: #e0e0e0;
  width: 75px;
  height: 34px;
  &:hover {
    background-color: #bbb7b7;
    cursor: pointer;
  }
`;
const StyledLabel = styled.label`
  display: block;
  padding-bottom: 0px;
  font-size: 20px;
  margin-top:20px;
`;

const ModalPage = ({ newModal, editModal, idT }) => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.users);
  const singleUser = userData.filter((val) => val.id === idT);
  const userIndex = userData.map((val) => val.id).indexOf(idT);

  // if(singleUser){
  //   console.log("true")
  // }
  // else{
  //   console.log('false')
  // }
  const initialid = idT ? singleUser[0].id : small_id;
  const initiallogin = idT ? singleUser[0].login : "";
  const initialrole = idT ? singleUser[0].role : "Admin";
  const initialstatus = idT ? singleUser[0].status : "Active";
  const initialpassword = idT ? singleUser[0].password : "";
  const initialconpassword = idT ? singleUser[0].conpassword : "";
  const initialdata = idT ? singleUser[0].data : "";
  const initialProfile = idT? singleUser[0].profile:profile;

  const [Login, setLogin] = useState(initiallogin);
  const [Role, setRole] = useState(initialrole);
  const [Status, setStatus] = useState(initialstatus);
  const [Password, setPassword] = useState(initialpassword);
  const [Conpassword, setconPassword] = useState(initialconpassword);
  const [Data, setData] = useState(initialdata);
const [image,setImage] = useState("")
const [preview,setPreview] = useState(initialProfile)
  //validation states---------------

  const [loginError, setLoginError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [conPasswordError, setConPasswordError] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [passMismatch, setPassMismatch] = useState(false);
  const [jsonError, setJsonError] = useState(false);
  const [imageError,setImageError] = useState(false)

  //validation states---------------



useEffect(()=>{
  if(image){
    const reader= new FileReader()
    reader.onloadend=()=>{
setPreview(reader.result)
    }
    reader.readAsDataURL(image)
  }
  if(!idT && !image){
    setPreview(profile)
  }
},[image,idT])


  const imageHandler =(e) =>{
    setImage(e.target.files[0])
if(e.target.files[0] !== ""){
  setImageError(false)
}

  }

  const loginHandler = (e) => {
    setLogin(e.target.value);
    if (e.target.value !== "") {
      setLoginError(false);
    }
  };
  const roleHandler = (e) => {
    setRole(e.target.value);
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== "") {
      setpasswordError(false);
    }
    if (Conpassword === e.target.value) {
      setPassMismatch(false);
    }
  };

  const conPasswordHandler = (e) => {
    setconPassword(e.target.value);
    if (e.target.value !== "") {
      setConPasswordError(false);
    }
    if (Password === e.target.value) {
      setPassMismatch(false);
    }
  };
  const dataHandler = (e) => {
    setData(e.target.value);
    if (e.target.value !== "") {
      setDataError(false);
    }

    if (e.target.value) {
      try {
        JSON.parse(e.target.value);
        setJsonError(false);
      } catch (e) {}
    }
  };

  //-------------------------------
  const submitHandler = (e) => {
    e.preventDefault();

    if (Login.trim() === "") {
      setLoginError(true);
    }
    if (Password.trim() === "") {
      setpasswordError(true);
    }
    if (Conpassword.trim() === "") {
      setConPasswordError(true);
    }
    if (Data.trim() === "") {
      setDataError(true);
    }
    if (Password !== Conpassword && Password && Conpassword) {
      setPassMismatch(true);
    }
    if(preview === profile){
      setImageError(true)
    }
    if (Data) {
      console.log("running");
      try {
        JSON.parse(Data);
        setJsonError(false);
      } catch (e) {
        return setJsonError(true);
      }
    }

    if (
      Login === "" ||
      preview === profile ||
      Password === "" ||
      Conpassword === "" ||
      Data === "" ||
      Password !== Conpassword
    ) {
      return;
    }
    //--------------------------------

    //------------------------------------
    if (editModal === true) {
      dispatch(
        counterActions.editPush({
          ind: userIndex,
          profile:preview,
          id: initialid,
          login: Login,
          password: Password,
          conpassword: Conpassword,
          role: Role,
          status: Status,
          data: Data,
        })
      );
      dispatch(counterActions.editModal());
    }
    if (newModal === true) {
      dispatch(
        counterActions.addUser({
          profile:preview,
          id: small_id,
          login: Login,
          password: Password,
          conpassword: Conpassword,
          role: Role,
          status: Status,
          data: Data,
        })
      );
      dispatch(counterActions.modalToggle());
    }
  };

  //------------------------------------
  const closeHandler = () => {
    if (newModal === true) {
      dispatch(counterActions.modalToggle());
    } else {
      dispatch(counterActions.editModal());
    }
  };

  return (
    <Modal>
      <div className="modal">
        <form className="modalForm" onSubmit={submitHandler}>
          <div className="closebtn">
            <button onClick={closeHandler}>x</button>
          </div>
          <div>
            {newModal && <h1 className="title">Create new user</h1>}
            {editModal && <h1 className="title">Edit user</h1>}
          </div>
          <hr />

          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <label className="loginlabel" htmlFor="login">
                {" "}
                Login
              </label>
              <input
                className={loginError ? "loginError" : "loginInput"}
                onChange={loginHandler}
                value={Login}
                type="text"
                id="login"
              />
              {loginError && <p style={{ color: "red" }}>Login required!</p>}
            </div>

            <div style={{ width: "50%" }}>
              <label className="avatar" htmlFor="avatar">
                Choose your profile
              </label>

              <div style={{display:'flex'}}>

              <div style={{width:'50%'}}>
              <input
              onChange={imageHandler}
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              />
              {imageError && <p style={{color:'red'}}> Choose Profile!</p>}
              </div>
              <div style={{width:'50%'}}>
            <img className="profile" src={preview} alt="oops" />
              </div>
              </div>
            </div>
            
          </div>

          <div className="divFlex1">
            <div style={{ width: "50%" }}>
              <label className="role" htmlFor="role">
                Role
              </label>
              <select
                className="roleInput"
                onChange={roleHandler}
                value={Role}
                id="role"
              >
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
              </select>
            </div>
            <div style={{ width: "50%" }}>
              <label className="status" htmlFor="status">
                Status
              </label>
              <select
                className="statusInput"
                onChange={statusHandler}
                value={Status}
                id="status"
              >
                <option value="Active">Active</option>
                <option value="Logout">Logout</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
          </div>
          <div className="divFlex">
            <div style={{ width: "50%" }}>
              <label className="role" htmlFor="password">
                Password
              </label>
              <input
                className={
                  passwordError || passMismatch
                    ? "passwordInputError"
                    : "passwordInput"
                }
                onChange={passwordHandler}
                value={Password}
                type="password"
                id="password"
              />
              {passwordError && <p style={{ color: "red" }}>Enter password!</p>}
            </div>
            <div style={{ width: "50%" }}>
              <label className="role" htmlFor="conpassword">
                ConfirmPassword
              </label>
              <input
                className={
                  passMismatch || conPasswordError
                    ? "conpasswordInputError"
                    : "conpasswordInput"
                }
                onChange={conPasswordHandler}
                value={Conpassword}
                type="password"
                id="conpassword"
              />
              {conPasswordError && (
                <p style={{ color: "red" }}>Enter password!</p>
              )}
              {passMismatch && (
                <p style={{ color: "red" }}>passowrd mismatch!</p>
              )}
            </div>
          </div>
          <div style={{ paddingTop: "12px" }}>
            <StyledLabel htmlFor="data">Data</StyledLabel>
            <textarea
              className={dataError || jsonError ? "textareaError" : "textarea"}
              onChange={dataHandler}
              value={Data}
              id="data"
              type="text"
              rows="3"
              cols="40"
            ></textarea>
            {dataError && (
              <p style={{ color: dataError ? "red" : "none" }}>
                Enter valid data!
              </p>
            )}
            {jsonError && (
              <p style={{ color: jsonError ? "red" : "none" }}>
                Enter valid JSON data!
              </p>
            )}
          </div>
          <hr />
          <div style={{ textAlign: "right" }}>
            <StyledCancelbtn onClick={closeHandler}>Cancel</StyledCancelbtn>
            <Styledsavebtn type="submit">Save</Styledsavebtn>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalPage;
