import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Navigate
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
      <Outlet />
    </div>
  );
};

export default PrivateRoute;
