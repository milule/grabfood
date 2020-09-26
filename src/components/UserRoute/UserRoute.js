import React, { memo } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_ROLE } from "../../constanst";
import { useAuth } from "../../utils";

const UserRoute = memo(({ component: Component, ...rest }) => {
  const { isAuth, user } = useAuth();
  const isCustomer = isAuth && user.role === USER_ROLE.CUSTOMER;

  return (
    <Route {...rest}>
      {isAuth && isCustomer ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
});

export default UserRoute;
