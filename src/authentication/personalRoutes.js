import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAccesed } from "./auth.js";

function PersonalRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAccesed() && isAccesed().user.role === 0 ? (
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

export default PersonalRoute;