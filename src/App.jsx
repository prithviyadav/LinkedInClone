import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.scss";
// import Header from "./components/Header";
// import Home from "./components/Home";
import Login from "./components/Login";
import Page from "./components/Page";
import Header from "./components/Header";
import ProfileComp from "./components/ProfileComp";
import Main from "./components/Main";
import SignInForm from "./components/sign-in-form/sign-in-form.component";
import SignUpForm from "./components/sign-up-form/sign-up-form.component";
import Network from "./components/Network";
import { useState, useEffect, useMemo } from "react";
import { onAuthStateChangedListener, getCurrentUser } from "./firebase";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  getCurrentUser(setCurrentUser);
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/signin" element={<SignInForm />}></Route>
      <Route path="/signup" element={<SignUpForm />}></Route>

      <Route exact path="/home" element={<Page currentUser={currentUser} />} />
        {/* <Route path="home" element={<Main />} /> */}
        <Route exact path="/profile" element={<ProfileComp currentUser={currentUser}/>} />
      {/* </Route> */}
      <Route exact path="/network" element={<Network currentUser={currentUser} />} />
    </Routes>
  );
}

export default App;
