import "./App.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GuardRoute, UserRoute, Dialog, Layout } from "./components";
import { useInit } from "./utils";

import Login from "./screens/Login";
import UserMain from "./screens/UserMain";
import OrderList from "./screens/OrderList";
import DriverMain from "./screens/DriverMain";
import OrderDetail from "./screens/OrderDetail";

function App() {
  const { isInit } = useInit();
  if (!isInit) return null;

  return (
    <main className="App">
      <Layout>
        <Switch>
          <Route exact path="/Login" component={Login} />
          <GuardRoute exact path="/" component={{ UserMain, DriverMain }} />
          <UserRoute exact path="/order" component={OrderList} />
          <UserRoute exact path="/order/:uuid" component={OrderDetail} />
          <Redirect to="/" />
        </Switch>
      </Layout>
      <Dialog />
    </main>
  );
}

export default App;
