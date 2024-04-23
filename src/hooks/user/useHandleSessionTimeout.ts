import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { loginUserState } from "../../store/atoms/userAtom";
import { getUserLogin } from "../../urls";
import { User } from "../../types/user";
import { messageState } from "../../store/atoms/errorAtom";

export const useSessionTimeout = () => {
  const router = useRouter();
  const setLoginUser = useSetRecoilState<User | undefined>(loginUserState);
  const setMessage = useSetRecoilState(messageState);

  useEffect(() => {
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
  }, [setLoginUser, router]);

  return null;
};
