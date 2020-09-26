import React, { memo } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_ROLE } from "../../constanst";
import { useAuth } from "../../utils";

const GuardRoute = ({ component: { UserMain, DriverMain }, ...rest }) => {
  const { isAuth, user } = useAuth();
  const isCustomer = isAuth && user.role === USER_ROLE.CUSTOMER;

  return (
    <Route {...rest}>
      {!isAuth ? (
        <Redirect to="/login" />
      ) : isCustomer ? (
        <UserMain />
      ) : (
        <DriverMain />
      )}
    </Route>
  );
};

export default GuardRoute;
