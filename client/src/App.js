import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard'

import { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { getData } from './request';

export const UserContext = createContext();

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const authUser = async () => {
    try {
      const { data, response } = await getData('/userAuthentication');
      if (data) {
        dispatch({ type: 'USER', payload: data.username })
      }
      else if (response.status !== 200) {
        console.log('unable to get user')
      }
    } catch (error) {
      console.log('user not verified')
    }
  }

  useEffect(() => {
    authUser()
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Switch>
          <Route component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
