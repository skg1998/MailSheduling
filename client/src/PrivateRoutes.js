import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './utils/AuthHandler';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    let token = getToken();
    let isAuth = token ? true : false;
    return (
        <Route {...rest} render={props => (
            1 ?
                <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
        )} />
    );
};