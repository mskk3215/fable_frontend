import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUrl } from "../urls";
// @ts-expect-error TS(6142): Module '../providers/UserProvider' was resolved to... Remove this comment to see the full error message
import { UserContext } from "../providers/UserProvider";

export const useLoginAuthAction = () => {
  // @ts-expect-error TS(2339): Property 'handleSuccessfulAuthentication' does not... Remove this comment to see the full error message
  const { handleSuccessfulAuthentication } = useContext(UserContext);

  const navigate = useNavigate();

<<<<<<< HEAD
  const handleLoginAction = ({ email, password }) => {
=======
  const handleLoginAction = ({
    email,
    password,
    setErrors
  }: any) => {
>>>>>>> e985f6b (error output by ts-migrate)
    axios
      .post(
        loginUrl,
        {
          email: email,
          password: password,
        },
        //cookieを含める
        { withCredentials: true }
      )
      .then((response) => {
        console.log("login condition", response);
        if (response.data.logged_in) {
          handleSuccessfulAuthentication(response.data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  return { handleLoginAction };
};
