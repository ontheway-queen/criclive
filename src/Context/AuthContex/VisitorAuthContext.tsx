import React, { useContext, useReducer, useEffect, useState } from 'react';
import visitorReducer from '../../Reducers/AuthReducer/VisitorReducer';
import { parseCookies } from 'nookies';
import fetcher from '../../Helpers/Fetcher/fetchApi';
import * as jose from 'jose';
import {
  AUTH_VISITOR_USER_FAILED,
  AUTH_VISITOR_USER_SUCCESS,
} from '../../Helpers/Constant';
import { IVisitorAuthContext } from '../../Types/VisitorAuthTypes';

const initialState: IVisitorAuthContext = {
  visitorUser: {},
};

const VisitorContext = React.createContext(initialState);
const VisitorAuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(visitorReducer, initialState);
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
            `/api/fair/visitor/get/single/visitor/${payload.visitor_id}`
          );

          dispatch({ type: AUTH_VISITOR_USER_SUCCESS, payload: data });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          dispatch({ type: AUTH_VISITOR_USER_FAILED });
        }
      } else {
        setIsLoading(false);
        dispatch({ type: AUTH_VISITOR_USER_FAILED });
      }
    })();
  }, []);

  return (
    <VisitorContext.Provider
      value={{ ...state, dispatch, isLoading, setIsLoading }}
    >
      {children}
    </VisitorContext.Provider>
  );
};

const VisitorAuthContext = () => {
  return useContext(VisitorContext);
};

export { VisitorAuthContextProvider, VisitorAuthContext };
