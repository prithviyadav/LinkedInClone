import Home from "./Home";
import Header from "./Header";
import { useState, useEffect, useMemo } from "react";
import { onAuthStateChangedListener, getCurrentUser } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./loader/loader.jsx";

function Page({ currentUser}) {
  
  // console.log(currentUser);
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
        <Home currentUser={currentUser} />
      </div>
    );
  }
}
export default Page;
