import React from 'react';
import { Route, Navigate } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, defroute }) => (
    (auth === true)
        ? <Component />
        : <Navigate to={defroute} />

)

export default GuardedRoute;