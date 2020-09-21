import React, { memo } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../utils";

const GuardRoute = memo(({ path, component }) => {
  const { isAuth } = useAuth();
  if (!isAuth) return <Redirect to="/login" />;

  return <Route exact path={path} component={component} />;
});

export default GuardRoute;
