import React, { useEffect, useState } from "react";
import { getAllUsers, addConnection } from "../firebase";
import ConnectedUsers from "./common/ConnectedUsers";
import "./index.scss";

export default function Connections({ currentUser }) {
  const [users, setUsers] = useState([]);
  const getCurrentUser = (id) => {
    addConnection(currentUser.userID, id);
  };
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return users.length > 1 ? (
    <div className="connections-main">
      {users.map((user) => {
        return user.userID === currentUser.userID ? (
          <></>
        ) : (
          <ConnectedUsers
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
          />
        );
      })}
    </div>
  ) : (
    <div className="connections-main">No Connections to Add!</div>
  );
}