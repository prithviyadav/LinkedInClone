import React, { useState } from "react";
import LinkedinLogo from "../../../public/images/login-logo.svg";
import { postUserData , createAuthUserWithEmailAndPassword } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../../helpers/getUniqueId";
import { toast } from "react-toastify";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
};

export default function SignUpForm() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const resetFormFields = () => {
    setCredentials(defaultFormFields);
  };
  const register = async () => {
    try {
      let res = await createAuthUserWithEmailAndPassword(
        credentails.email,
        credentails.password
      );
      toast.success("Account Created!");
      console.log(res);
      localStorage.setItem("userEmail", res.user.email);
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        // imageLink:
        //   "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      });
      resetFormFields();
      navigate("/home");
      
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Cannot create user, email already in use");
      } else {
        toast.error("Cannot create user, please try again");
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <a href="/">
        <img src={LinkedinLogo} className="linkedinLogo" />
      </a>

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr class="hr-text" data-content="or" />
      <div className="google-btn-container">

        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/signin")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
  
}
