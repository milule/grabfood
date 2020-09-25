import React, { memo } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_ROLE } from "../../constanst";
import { useAuth } from "../../utils";

const UserRoute = memo(({ path, component }) => {
  const { isAuth, user } = useAuth();

  if (!isAuth) return <Redirect to="/login" />;

  if (user.role !== USER_ROLE.CUSTOMER) return null;

  return <Route exact path={path} component={component} />;
});

export default UserRoute;
