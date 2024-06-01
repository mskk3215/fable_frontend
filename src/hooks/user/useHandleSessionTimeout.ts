import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginUserState } from "../../store/atoms/userAtom";
import { getUserLogin } from "../../urls";
import { User } from "../../types/user";
import { messageState } from "../../store/atoms/errorAtom";

export const useSessionTimeout = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useRecoilState<User | undefined>(
    loginUserState
  );
  const setMessage = useSetRecoilState(messageState);

  useEffect(() => {
    if (!loginUser) return;
    const interval = setInterval(async () => {
      getUserLogin()
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Session invalid");
          }
        })
        .catch((error) => {
          clearInterval(interval);
          setLoginUser(undefined);
          const errorMessage = Array.isArray(error.errorMessage)
            ? error.errorMessage.join("\n")
            : error.errorMessage;
          setMessage({
            message: errorMessage,
            type: "error",
          });
          router.push("/");
        });
    }, 1800000); // 30分
    return () => clearInterval(interval);
  }, [loginUser, setLoginUser, setMessage, router]);

  return null;
};
