import React, { useState } from "react";
// import { LoginAPI } from "../api/AuthAPI";
import { signInAuthUserWithEmailAndPassword  , signInWithGooglePopup} from "../../firebase";
import LinkedinLogo from "../../../public/images/login-logo.svg";
import { useNavigate } from "react-router-dom";
import "./sign-in-form.styles.scss";
import { toast } from "react-toastify";
import styled from "styled-components";
const formfields = {
  email: "",
  password: "",
};

function SignInForm() {
  
  // let navigate = useNavigate();
  const signInWithGoogle = async () => {    
    let res = await signInWithGooglePopup();
    console.log(res);
    localStorage.setItem("userEmail", res.user.email);
    navigate("/home");
  };
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState(formfields);

  const resetFormFields = () => {
    setCredentials(formfields);
  };

  const { email, password } = credentials;

  const login = async () => {
    try {
      let res = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(res);
      localStorage.setItem("userEmail", res.user.email);
      toast.success("Signed In to Linkedin!");
      resetFormFields();
      navigate("/home");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Incorrect password for email");
          break;
        case "auth/user-not-found":
          toast.error("No user associated with this email");
          break;
        case "auth/invalid-email":
          toast.error("Email is invalid");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="login-wrapper" >
      <a href="/">
        <img src={LinkedinLogo} className="linkedinLogo" />
      </a>

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <Google onClick={signInWithGoogle}>
          <img src="/images/google.svg" alt="" />
          Sign in with Google
        </Google>
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/signup")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
  
}
const Google = styled.button`
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height: 50px;
    width: 300px;
    margin-bottom: 20px;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
      inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
    vertical-align: middle;
    // z-index: 0;
    transition-duration: 167ms;
    font-size: 17px;
    color: rgba(0, 0, 0, 0.6);
    &:hover {
      background-color: rgba(207, 207, 207, 0.25);
      color: rgba(0, 0, 0, 0.75);
    }
    img {
      margin-right: 10px;
    }
  `;
export default SignInForm;