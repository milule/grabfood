import React, { Fragment, memo } from "react";
import UserMenu from "../UserMenu";

const Layout = memo(({ children }) => {
  return (
    <Fragment>
      <UserMenu />
      {children}
    </Fragment>
  );
});

export default Layout;
