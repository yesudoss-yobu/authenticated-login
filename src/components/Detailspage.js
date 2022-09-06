import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import ModalPage from "./ModalPage";
import { counterActions } from "../store/MyStore";
import UserNav from "./UserNav";
import Backdrop from "./Backdrop";
import styled from "styled-components";

const Detail = styled.div`
  .border {
    border: 2px solid #d9d8d8;
    width: 56%;
    box-sizing: border-box;
    font-size: 11px;
    font-family: sans-serif;
    color: #000000b5;
    margin: 4% 15%;
  }
  .heading {
    background-color: #d1d1d14f;
  }
  .heading > h1 {
    margin: 0;
    height: 34px;
    padding-top: 9px;
    padding-left: 8px;
  }
  .pair{
    display: flex;
    justify-content: space-between;
    width:100%;
  }
  .padding{
    padding-left: 8px;
  }
  .flexPadding {
    margin-right:20%;
  }
  .btn{
    background-color: #0000ffa3;
    width: 50px;
    height: 30px;
    color: white;
    border: none;
  }
  .btn:hover{
    background-color: #0000ffde;
  }
  .btndiv{
    text-align: right;
    padding-right: 4%;
    padding-bottom: 3%;
  }
`;


const Detailspage = () => {
  const editModal = useSelector((state) => state.user.editModal);
  const userData = useSelector((state) => state.user.users);
  const userLogin = useSelector((state) => state.user.userLogin);
  const dispatch = useDispatch();
  const { id } = useParams();
  const idT = id;

  const filteredUserData = userData.filter((val) => val.id === idT);
  //const indexValue = userData.map(val => val.id).indexOf(idT)

  if (userLogin === false) {
    return <Navigate to="/" replace={true} />;
  }

  const editHandler = () => {
    dispatch(counterActions.editModal());
  };

  return (
    <Detail>
      <div>
        <UserNav userId={idT} />
        <div className="border">
          <div className="heading">
            <h1>User</h1>
          </div>
          {filteredUserData.map((val) => (
            <div key={val.id}>
              <h1 className="padding">Login: {val.login}</h1>
              <div className="pair">
                <h1 className="padding">Role: {val.role}</h1>
                <h1 className="flexPadding">status: {val.status}</h1>
              </div>
              <h1 className="padding">Data: {val.data}</h1>
            </div>
          ))}
          <div className="btndiv">

          <button className="btn" onClick={editHandler}>edit</button>
          </div>
        </div>
        {editModal && <ModalPage editModal={editModal} idT={idT} />}
        {editModal && <Backdrop />}
      </div>
    </Detail>
  );
};

export default Detailspage;
