import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import classes from "./ModalPage.module.css";
import { counterActions } from "../store/MyStore";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { StyledCancelbtn } from "./ModalPage";
import { Styledsavebtn } from "./ModalPage";
const Network = styled.div`
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
  .networklabel {
    display: block;
    padding-bottom: 11px;
    padding-top: 5px;
    font-size: 20px;

  }
  .networkInput {
    width: 98%;
    font-size: 18px;
    height: 33px;
    outline:none;
  }
  .networkInputError{
    width: 98%;
    font-size: 18px;
    height: 33px;
    outline:none;
    border:1px solid red;
  }

  .textarea {
    padding-top: 14px;
    margin-top: 10px;
    width: 98%;
    outline:none;
    height:70px;
  }
  .textareaError{
    padding-top: 14px;
    margin-top: 10px;
    width: 98%;
    outline:none;
    border:1px solid red;
    height:70px;
  }
  
  
`;

const NetworkModal = () => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const dispatch = useDispatch();

  const networkData = useSelector((state) => state.user.networks);
  const networkId = useSelector((state) => state.user.networkId);

  const newNetworkModal = useSelector((state) => state.user.newNetworkModal);
  const editNetworkModal = useSelector((state) => state.user.editNetworkModal);

  const filteredData = networkData.filter((val) => val.id === networkId);
  const indexVal = networkData.map((val) => val.id).indexOf(networkId);

  const initialId = editNetworkModal ? filteredData[0].id : small_id;
  const initialNetwork = editNetworkModal ? filteredData[0].network : "";
  const initialDescription = editNetworkModal
    ? filteredData[0].description
    : "";

  const [network, setNetwork] = useState(initialNetwork);
  const [description, setDescription] = useState(initialDescription);

  //validation states---------------
const[networkError,setNetworkError] = useState(false)
const[desError,setDesError] = useState(false)


  //validation states --------------

  const submitHandler = (e) => {
    e.preventDefault();

if(network.trim()===''){
  setNetworkError(true)
}
if(description.trim()===''){
  setDesError(true)
}



if(network==="" || description===""){
  return
}

    if (editNetworkModal === true) {
      dispatch(
        counterActions.editNetworkPush({
          indexval: indexVal,
          id: initialId,
          network: network,
          description: description,
        })
      );
      dispatch(counterActions.editNetworkToggle());
    }
    if (newNetworkModal === true) {
      dispatch(
        counterActions.addnetwork({
          id: small_id,
          network: network,
          description: description,
        })
      );
      dispatch(counterActions.newNetworkToggle());
    }
  };

  const closeHandler = () => {
    if (newNetworkModal === true) {
      dispatch(counterActions.newNetworkToggle());
      dispatch(counterActions.networkId(""));
    }
    if (editNetworkModal === true) {
      dispatch(counterActions.editNetworkToggle());
    }
  };


  const networkHandler = (e) => {
    setNetwork(e.target.value);
    if(e.target.value !== ''){
      setNetworkError(false)
    }
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
    if(e.target.value !== ''){
      setDesError(false)
    }
  };

  return (
    <Network>
      <div className="modal">
        <form className="modalForm" onSubmit={submitHandler}>
          <div className="closebtn">
            <button onClick={closeHandler}>x</button>
          </div>
          <div>
            {editNetworkModal ? (
              <h1 className="title">Edit Network</h1>
            ) : (
              <h1 className="title">Create New Network</h1>
            )}
          </div>
          <hr />
          <div>
            <label className="networklabel" htmlFor="network">
              {" "}
              Network
            </label>
            <input
              className={networkError ? 'networkInputError' : 'networkInput'}
              onChange={networkHandler}
              type="text"
              value={network}
              id="network"
            />
            {networkError && <p style={{color:'red'}}>Enter network!</p>}
          </div>

          <div style={{ paddingTop: "12px" }}>
            <label htmlFor="description">Description</label>
            <textarea
              className = {desError ? "textareaError" : "textarea" }
              onChange={descriptionHandler}
              id="description"
              value={description}
              rows="3"
              cols="40"
            ></textarea>
            {desError && <p style={{color:'red'}}>Enter data!</p>}
          </div>
          <hr />
          <div style={{ textAlign: "right" }}>
            <StyledCancelbtn className="cancelBtn" onClick={closeHandler}>
              cancel
            </StyledCancelbtn>
            <Styledsavebtn className="saveBtn" type="submit">
              save
            </Styledsavebtn>
          </div>
        </form>
      </div>
    </Network>
  );
};

export default NetworkModal;
