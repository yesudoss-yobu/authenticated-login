import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./network.module.css";
import { counterActions } from "../store/MyStore";
import NetworkModal from "./NetworkModal";
import Backdrop from "./Backdrop";

const Network = () => {
  const newNetworkModal = useSelector((state) => state.user.newNetworkModal);
  const editNetworkModal = useSelector((state) => state.user.editNetworkModal);

  const userLogin = useSelector((state) => state.user.userLogin);
  const networkData = useSelector((state) => state.user.networks);
  const dispatch = useDispatch();


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

  return (
    <div>
      <table className={classes.customers}>
        <thead>
          <tr>
            <th>Network</th>
            <th>Description</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {networkData.map((val) => (
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
