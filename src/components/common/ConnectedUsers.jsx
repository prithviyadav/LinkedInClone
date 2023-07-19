import React, { useEffect, useState } from "react";
import { getConnections } from "../../firebase";

export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    getConnections(currentUser.userID, user.userID, setIsConnected);
  }, [currentUser.userIDid, user.userID]);
  return isConnected ? (
    <></>
  ) : (
    <div className="grid-child">
      <img src={user.imageLink ? user.imageLink : "./images/user.svg"} />
      <p className="name">{user.name}</p>
      <p className="headline">{user.headline}</p>

      <button onClick={() => getCurrentUser(user.userID)}>
        <img src="/images/widget-icon.svg" alt="" />
        Connect
      </button>
    </div>
  );
}
