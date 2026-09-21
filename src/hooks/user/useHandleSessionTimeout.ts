import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginUserState } from '../../store/atoms/userAtom';
import { getUserLogin } from '../../urls';
import { User } from '../../types/user';
import { ApiError } from '../../types/api';
import { messageState } from '../../store/atoms/errorAtom';

export const useSessionTimeout = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useRecoilState<User | undefined>(
    loginUserState
  );
  const setMessage = useSetRecoilState(messageState);

  useEffect(() => {
    if (!loginUser) {
      return;
    }

    const handleInvalidSession = (errorMessage: string | string[]) => {
      setLoginUser(undefined);

      const message = Array.isArray(errorMessage)
        ? errorMessage.join('\n')
        : errorMessage;

      setMessage({
        message,
        type: 'error'
      });
      router.push('/');
    };

    const interval = setInterval(() => {
      getUserLogin()
        .then((response) => {
          if (response.data.loggedIn === false) {
            clearInterval(interval);
            handleInvalidSession(response.data.message);
          }
        })
        .catch((error: ApiError) => {
          if (error.response?.status === 401) {
            clearInterval(interval);
            handleInvalidSession(error.errorMessage);
          }
        });
    }, 1800000); // 30分

    return () => clearInterval(interval);
  }, [loginUser, setLoginUser, setMessage, router]);
};
