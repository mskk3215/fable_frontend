import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUrl } from "../urls";
import { UserContext } from "../providers/UserProvider";
import { LoginAuthAction } from "../types/user";

export const useLoginAuthAction = () => {
  const { handleSuccessfulAuthentication } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLoginAction = ({
    email,
    password,
    setErrors,
  }: LoginAuthAction) => {
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
        setErrors && setErrors(error.response.data.errors);
      });
  };
  return { handleLoginAction };
};