import React, { useContext, useReducer, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import * as jose from 'jose';
import { B2B_USER_FAILED, B2B_USER_SUCCESS } from '../../Helpers/Constant';
import b2bReducer from '../../Reducers/AuthReducer/B2bReducers';

const initialState: any = {
  b2bUser: {},
};

const B2BContext = React.createContext(initialState);
const B2BAuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(b2bReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { criclive_cric } = parseCookies();

      console.log(criclive_cric);

      if (criclive_cric) {
        setIsLoading(true);
        try {
          const { payload } = await jose.jwtVerify(
            criclive_cric,
            new TextEncoder().encode('FaTO5b$eCzw!Ukw8^d*UUf*JABbeIrR')
          );

          console.log(payload);

          const { data } = await fetcher.get(
            `/api/auth/b2b/profile/${payload.b2b_id}`
          );

          dispatch({ type: B2B_USER_SUCCESS, payload: data });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          dispatch({ type: B2B_USER_FAILED });
        }
      } else {
        setIsLoading(false);
        dispatch({ type: B2B_USER_FAILED });
      }
    })();
  }, []);

  return (
    <B2BContext.Provider
      value={{ ...state, dispatch, isLoading, setIsLoading }}
    >
      {children}
    </B2BContext.Provider>
  );
};

const B2BAuthContext = () => {
  return useContext(B2BContext);
};

export { B2BAuthContextProvider, B2BAuthContext };
