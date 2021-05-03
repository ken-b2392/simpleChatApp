import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import {Route, Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useAuth();
    return(
        <Route {...rest} render={props => (
            currentUser !== null ? 
            <Redirect to="/"/> 
            : 
            <Component {...props}/>)} />
    )
}

export default PublicRoute;
