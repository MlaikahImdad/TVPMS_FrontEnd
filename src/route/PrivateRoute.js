import React from "react";
import { Route, Redirect } from "react-router-dom";

const auth = sessionStorage.getItem("access_token");

const PrivateRoute = ({ exact, component: Component, ...rest }) => (
  <Route
    exact={exact ? true : false}
    rest
    render={(props) =>
      auth ? (
        <Component {...props} {...rest}></Component>
      ) : (
        <Redirect to={`/auth-login`}></Redirect>
      )
    }
  ></Route>
);

export default PrivateRoute;
