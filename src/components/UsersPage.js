import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
// import { useEffect } from "react";
import { counterActions } from "../store/MyStore";
import styled from "styled-components";
import classes from "./Header.module.css";
import ModalPage from "./ModalPage";
import Backdrop from "./Backdrop";
import { useEffect } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const StyledTable = styled.div`
  .table {
    border: 1px solid;
    max-height: 500px;
  }
`;
const StyledDiv = styled.div`
  width: 70%;
  text-align: right;
  height: 42px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
`;
const StyledSearch = styled.input`
  height: 78%;
  width: 35%;
  font-size: 18px;
  color: #726f6f;
  outline: none;
  border: 2px solid #a7a7a7;
  margin-left: 21px;
`;
const StyledSelect = styled.select`
  height: 88%;
  width: 12%;
  font-size: 18px;
  color: #726f6f;
  outline: none;
  border: 2px solid #a7a7a7;
  margin-left: 21px;
`;
export const StyledTd = styled.td`
  padding-top: 21px;
  font-size: 18px;
  color: blue;
`;

const UsersPage = () => {
  const newModal = useSelector((state) => state.user.newModal);
  const userLogin = useSelector((state) => state.user.userLogin);
  const userData = useSelector((state) => state.user.users);
  // const navigate = useNavigate();
  const [fillter, setFillter] = useState(userData);
  const [direction, setDirection] = useState("asc");

  const [search, setSearch] = useState("");
  const [val, setval] = useState("login");
  const [empty, setEmpty] = useState(false);
  const filteredData = userData.filter((user) =>
    user[val].toLowerCase().includes(search)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setFillter(userData);
  }, [userData]);

  useEffect(() => {
    if (filteredData.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [filteredData]);

  if (userLogin === false) {
    return <Navigate to="/" replace={true} />;
  }

  const handleDelete = (Id) => {
    const indexValue = userData.map((val) => val.id).indexOf(Id);
    // userData.splice(index,1)
    dispatch(counterActions.deleteUser({ indexval: indexValue, position: 1 }));
  };

  const newUserHandler = () => {
    dispatch(counterActions.modalToggle());
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const filterHandler = (e) => {
    setval(e.target.value);
  };

  const sortHandler = () => {
    if (direction === "asc") {
      const sorted = [...userData].sort((a, b) =>
        a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1
      );
      setFillter(sorted);
      setDirection("dsc");
    }
    if (direction === "dsc") {
      const sorted = [...userData].sort((a, b) =>
        a.login.toLowerCase() < b.login.toLowerCase() ? 1 : -1
      );
      setFillter(sorted);
      setDirection("asc");
    }
  };

  return (
    <>
      <StyledDiv>
        <StyledSelect onChange={filterHandler} value={val} id="status">
          <option value="login">Login</option>
          <option value="role">Role</option>
          <option value="status">Status</option>
        </StyledSelect>
        <StyledSearch
          placeholder="Search here ... "
          type="text"
          onChange={searchHandler}
        />
      </StyledDiv>
      <StyledTable>
        <div>
          <table className={classes.customers}>
            <thead>
              <tr>
                <th>Profile</th>
                <th style={{display:'flex'}} onClick={sortHandler}>
                  Login <SwapVertIcon />
                </th>
                <th>Role</th>
                <th>Status</th>
                <th>Data</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {fillter
                .filter((user) => user[val].toLowerCase().includes(search))
                .map((val) => (
                  <tr key={val.id}>
                    <td>
                      <img
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "60px",
                        }}
                        src={val.profile}
                        alt="my profile"
                      />
                    </td>
                    <td>{val.login}</td>
                    <td>{val.role}</td>
                    <td>{val.status}</td>
                    <td>{val.data}</td>
                    <td>
                      <Link to={`/home/user/${val.id}`}>
                        <button className={classes.saveButton}>details</button>
                      </Link>
                      <button
                        className={classes.deleteButton}
                        onClick={() => handleDelete(val.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              <tr style={{ textAlign: "center" }}>
                {empty && <StyledTd colSpan="6">No data found!</StyledTd>}
              </tr>
            </tbody>
          </table>
        </div>

        <button onClick={newUserHandler} className={classes.adduserButton}>
          add new user
        </button>
      </StyledTable>
      {newModal && <ModalPage newModal={newModal} />}
      {newModal && <Backdrop />}
    </>
  );
};

export default UsersPage;
