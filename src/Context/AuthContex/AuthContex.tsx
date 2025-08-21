import React, { useContext, useReducer, useEffect, useState } from 'react';
import reducer from '../../Reducers/AuthReducer/AuthReducer';
import { AUTH_USER_FAILED, AUTH_USER_SUCCESS } from '../../Helpers/Constant';
import { IAuthContextState } from '../../Types/AuthTypes';
import * as jose from 'jose';
import { parseCookies } from 'nookies';
import fetcher from '../../Helpers/Fetcher/fetchApi';
const initialState: IAuthContextState = {
  user: {},
};

const AuthContext = React.createContext(initialState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { toab_fair } = parseCookies();
      if (toab_fair) {
        setIsLoading(true);
        try {
          const { payload } = await jose.jwtVerify(
            toab_fair,
            new TextEncoder().encode('FaTO5b$eCzw!Ukw8^d*UUf*JABbeIrR')
          );

          const { data } = await fetcher.get(
            `/api/fair/member/get/information/${payload.user_fair_member_id}`
          );

          dispatch({ type: AUTH_USER_SUCCESS, payload: data });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          dispatch({ type: AUTH_USER_FAILED });
        }
      } else {
        setIsLoading(false);
        dispatch({ type: AUTH_USER_FAILED });
      }
    })();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ ...state, dispatch, isLoading, setIsLoading }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuthContext };
