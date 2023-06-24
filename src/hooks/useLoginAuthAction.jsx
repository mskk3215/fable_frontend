import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUrl } from "../urls";
import { UserContext } from "../providers/UserProvider";

export const useLoginAuthAction = () => {
  const { handleSuccessfulAuthentication } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLoginAction = ({ email, password }) => {
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
