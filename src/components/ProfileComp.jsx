import Home from "./Home";
import Header from "./Header";
import { useState, useEffect, useMemo } from "react";
import { onAuthStateChangedListener, getCurrentUser } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./loader/loader.jsx";
import ProfilePage from "./Profile/ProfilePage";
import ProfileEdit from "./ProfileEdit/ProfileEdit.jsx";
function ProfileComp({ currentUser }) {
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

  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <Header currentUser={currentUser} />
        {isEdit ? (
          <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
        ) : (
          <ProfilePage onEdit={onEdit} currentUser={currentUser} />
        )}
      </div>
    );
  }
}
export default ProfileComp;
