import { useNavigate } from "react-router-dom";
import { userLogin } from "../urls";
import { useUsers } from "./useUsers";
import { LoginAuthAction } from "../types/user";

export const useLoginAuthAction = () => {
  const { handleSuccessfulAuthentication } = useUsers();

  const navigate = useNavigate();

  const handleLoginAction = ({
    email,
    password,
    setErrors,
  }: LoginAuthAction) => {
    userLogin({ session: { email: email, password: password } })
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
