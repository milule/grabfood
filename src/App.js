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
  useInit();

  return (
    <main className="App">
      <Layout>
        <Switch>
          <Route path="/Login" component={Login} />
          <UserRoute path="/order" component={OrderList} />
          <UserRoute path="/order/:id" component={OrderDetail} />
          <GuardRoute path="/" component={{ UserMain, DriverMain }} />
          <Redirect to="/" />
        </Switch>
      </Layout>
      <Dialog />
    </main>
  );
}

export default App;
