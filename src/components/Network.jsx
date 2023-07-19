import Header from "./Header";
import { useState, useEffect, useMemo } from "react";
import { onAuthStateChangedListener, getCurrentUser } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./loader/loader.jsx";
import Connections from "./Connection";
function Network({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChangedListener((user) => {
      if (!user?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <Header currentUser={currentUser} />
        <Connections currentUser={currentUser} />
      </div>
    );
  }
}
export default Network;
