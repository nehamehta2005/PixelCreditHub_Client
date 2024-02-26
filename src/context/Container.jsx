import React, { useReducer, useEffect } from 'react';
import { MyContext } from './MyContext';
import { reducer, initialState } from "./Reducer";
import baseURL from '../config/api';

export default function Container({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // CODE FOR USER VERIFICATION (Checks and saves token to local storage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(baseURL + "/users/verifytoken", {
        method: "GET",
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((result) => {
          //console.log(result);
          if (result.success) {
            dispatch({ type: "SET_USER", payload: result.data });
          } else {
            console.log(result.message);
            dispatch({ type: "SET_TOKEN", payload: localStorage.getItem("token") });
          }
        });
    }
  }, []);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}
