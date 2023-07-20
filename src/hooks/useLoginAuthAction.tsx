import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUrl } from "../urls";
import { UserContext } from "../providers/UserProvider";
import { LoginAuthAction } from "../types/user";

export const useLoginAuthAction = () => {
  const { handleSuccessfulAuthentication } = useContext(UserContext);
  const navigate = useNavigate();
<<<<<<< HEAD

<<<<<<< HEAD
  const handleLoginAction = ({ email, password }) => {
=======
  const handleLoginAction = ({
    email,
    password,
    setErrors
  }: any) => {
>>>>>>> e985f6b (error output by ts-migrate)
=======
  const handleLoginAction = ({
    email,
    password,
    setErrors,
  }: LoginAuthAction) => {
>>>>>>> 5b01e68 (hooks&provider type to user add)
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
<<<<<<< HEAD
        console.log("login error", error);
=======
        setErrors && setErrors(error.response.data.errors);
>>>>>>> 5b01e68 (hooks&provider type to user add)
      });
  };

  return { handleLoginAction };
};
