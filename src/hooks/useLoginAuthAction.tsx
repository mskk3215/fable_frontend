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

  const handleLoginAction = ({
    email,
    password,
    setErrors
  }: any) => {
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
        if (response.data.logged_in) {
          handleSuccessfulAuthentication(response.data);
          navigate("/");
        }
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };
  return { handleLoginAction };
};
