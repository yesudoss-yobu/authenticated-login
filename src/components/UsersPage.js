import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Navigate, Link } from "react-router-dom";
// import { useEffect } from "react";
import { counterActions } from "../store/MyStore";
import styled from 'styled-components'
import classes from './Header.module.css'
import ModalPage from "./ModalPage";
import Backdrop from "./Backdrop";


const StyledTable = styled.div`
.table  {
border:1px solid;

}

`;

const UsersPage = () => {


const newModal = useSelector((state) =>state.user.newModal)
  const userLogin = useSelector((state) => state.user.userLogin);
  
  const userData = useSelector((state) => state.user.users);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

    if (userLogin === false) {
      return <Navigate to='/' replace={true} />
    }



  const handleDelete = (Id) => {
    const indexValue = userData.map((val) => val.id).indexOf(Id);
    // userData.splice(index,1)
    dispatch(counterActions.deleteUser({indexval:indexValue,position:1}));
    
  };

  const newUserHandler = () => {
    dispatch(counterActions.modalToggle())
  }
  

  return (
  
<>
    <StyledTable>
      <table className={classes.customers}>
        <thead>
          <tr>
            <th>Login</th>
            <th>Role</th>
            <th>Status</th>
            <th>Data</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((val) => (
            <tr key={val.id}>
              <td>{val.login}</td>
              <td>{val.role}</td>
              <td>{val.status}</td>
              <td>{val.data}</td>
              <td>
                <Link to={`/home/user/${val.id}`}>
                  <button className={classes.saveButton}>details</button>
                </Link>
                <button className={classes.deleteButton} onClick={() => handleDelete(val.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={newUserHandler} className={classes.adduserButton}>add new user</button>
      
    </StyledTable>
    {newModal && <ModalPage newModal={newModal}/>}
    {newModal && <Backdrop/>}
          </>
          
    
  );
};

export default UsersPage;
