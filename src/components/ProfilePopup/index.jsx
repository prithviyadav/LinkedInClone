import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser, getCurrentUser } from "../../firebase";
import Button from "../common/button/button";
import "./index.scss";

export default function ProfilePopup({ currentUser }) {
  let navigate = useNavigate();
  return (
    <div className="popup-card">
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>
      <Button
        title="View Profile"
        onClick={() => {
          if (document.location.pathname == "/profile") {
            window.location.reload() || navigate("/profile", {
              state: {
                id: currentUser?.userID,
                email: currentUser?.email,
              },
            })
          }
          else {
            navigate("/profile", {
              state: {
                id: currentUser?.userID,
                email: currentUser?.email,
              }
            })
          }
        }
          
        }
      />
      <Button title="Log out" onClick={signOutUser} />
    </div>
  );
}
