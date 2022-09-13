import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/MyStore";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StyledUser = styled.h1`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.myactive ? "white" : "#ffffff73")};
  &:hover {
    color: white;
  }
`;

const StyledNet = styled.h1`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.myactive ? "white" : "#ffffff73")};
  &:hover {
    color: white;
  }
`;

const HeaderStyle = styled.header`
  .logo {
    font-size: 29px;
  }
  .tab {
    font-size: 20px;
    cursor: pointer;
    color: #ffffff73;
    &:hover {
      color: white;
    }
  }
  .background {
    background-color: #2e2d2d;
    color: #c7c7c7;
  }
  .seperation {
    margin-left: 1%;
    margin-right: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .seperation__child1 {
    width: 20%;
    gap:25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Header = () => {
  const location = useLocation();
  const mylocation = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.userLogin);

  const userHandler = () => {
    navigate("/home/users", { replace: true });
  };
  const networkHandler = () => {
    navigate("/home/networks", { replace: true });
  };

  const logoutHandler = () => {
    dispatch(counterActions.showToggle(true));
  };

  const active = mylocation === "users" ? 1 : 0;
  const activeNet = mylocation === "networks" ? 1 : 0;

  return (
    <HeaderStyle>
      <div className="background">
        <div className="seperation">
          <div className="seperation__child1">
            <h1 className="logo">Aequalis</h1>

            {userLogin && (
              <StyledUser onClick={userHandler} myactive={active}>
                Users
              </StyledUser>
            )}
            {userLogin && (
              <StyledNet onClick={networkHandler} myactive={activeNet}>
                Networks
              </StyledNet>
            )}
          </div>

          <div>
            {userLogin && (
              <h1 onClick={logoutHandler} className="tab">
                Logout
              </h1>
            )}
          </div>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
