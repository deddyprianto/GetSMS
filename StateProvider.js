/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, {useContext, createContext, useReducer} from 'react';

const BuatContext = createContext();

export const StateProvider = ({reduce, initialState, children}) => (
  <BuatContext.Provider value={useReducer(reduce, initialState)}>
    {children}
  </BuatContext.Provider>
);
export const stateValueProvider = () => useContext(BuatContext);
