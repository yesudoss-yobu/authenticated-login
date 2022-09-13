import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./network.module.css";
import { counterActions } from "../store/MyStore";
import NetworkModal from "./NetworkModal";
import Backdrop from "./Backdrop";
import { useState } from "react";
import styled from "styled-components";
import { StyledTd } from "./UsersPage";
import { useEffect } from "react";



const StyledDiv = styled.div`
    width: 70%;
    text-align: right;
    height: 42px;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
}
`
const StyledInput =styled.input`

height: 78%;
    width: 35%;
    font-size: 18px;
    color: #726f6f;
    outline: none;
    border: 2px solid #a7a7a7;
    margin-left: 21px
`


const Network = () => {
  const newNetworkModal = useSelector((state) => state.user.newNetworkModal);
  const editNetworkModal = useSelector((state) => state.user.editNetworkModal);

  const userLogin = useSelector((state) => state.user.userLogin);
  const networkData = useSelector((state) => state.user.networks);
  const dispatch = useDispatch();

  const[search,setSearch]= useState('')
  const[empty,setEmpty] = useState(false)



  const filteredData = networkData.filter((user) => user.network.toLowerCase().includes(search))

  useEffect(()=>{
    if(filteredData.length === 0){
      setEmpty(true)
    }else{
      setEmpty(false)
    }
  },[filteredData])


  if (userLogin === false) {
    return <Navigate to="/" replace={true} />;
  }
  const editHandler = (id) => {
    dispatch(counterActions.editNetworkToggle());
    dispatch(counterActions.networkId(id))
  };
  const handleDelete = (idval) => {
    const indexVal = networkData.map(val => val.id).indexOf(idval)
    dispatch(counterActions.deleteNetwork({indexval:indexVal,position:1}))
  };



  const newNetworkHandler = () => {
    dispatch(counterActions.newNetworkToggle());
  };

  const searchhandler = (e) => {
setSearch(e.target.value)
  }

  return (
    <div>
      <StyledDiv>

 <StyledInput placeholder="Search here...." type="text" onChange={searchhandler}/>
      </StyledDiv>
      <table className={classes.customers}>

        <thead>
          <tr>
            <th>Network</th>
            <th>Description</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {networkData.filter((user) => user.network.toLowerCase().includes(search)).map((val) => (
            <tr key={val.id}>
              <td>{val.network}</td>
              <td>{val.description}</td>
              <td>
                <button
                  onClick={() => editHandler(val.id)}
                  className={classes.saveButton}
                >
                  Edit
                </button>
                <button
                  className={classes.deleteButton}
                  onClick={() => handleDelete(val.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
          <tr style={{textAlign:'center'}}>
                {empty && <StyledTd colSpan="6">No data found!</StyledTd>}
              </tr>
        </tbody>
      </table>

      <button onClick={newNetworkHandler} className={classes.adduserButton}>
        add new Network
      </button>
      {(newNetworkModal || editNetworkModal) && <NetworkModal/>}
      {(newNetworkModal || editNetworkModal) && <Backdrop/>}
    </div>
  );
};

export default Network;
