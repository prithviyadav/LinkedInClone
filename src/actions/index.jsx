import { signInWithGooglePopup } from "../firebase";
import { SET_USER } from "./actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

function SignInAPI() {
  return (dispatch) => {
    signInWithGooglePopup()
      .then((payload) => {
        // console.log(payload)
        dispatch(setUser(payload.user));
      })

      .catch((error) => alert(error.message));
  };
}

export default SignInAPI;
