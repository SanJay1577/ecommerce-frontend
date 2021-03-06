import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAccesed } from "./auth.js";

function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAccesed() && isAccesed().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
