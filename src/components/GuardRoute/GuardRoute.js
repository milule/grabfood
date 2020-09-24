import React, { memo } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_ROLE } from "../../constanst";
import { useAuth } from "../../utils";

const GuardRoute = memo(({ path, component, componentSub }) => {
  const { isAuth, user } = useAuth();
  if (!isAuth) return <Redirect to="/login" />;

  const isCustomer = user.role === USER_ROLE.CUSTOMER;

  return (
    <Route
      exact
      path={path}
      component={isCustomer ? component : componentSub}
    />
  );
});

export default GuardRoute;
