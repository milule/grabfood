import "./App.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GuardRoute, Dialog, Layout } from "./components";

import { useInit } from "./utils";
import UserMain from "./screens/UserMain";
import Login from "./screens/Login";
import DriverMain from "./screens/DriverMain";

function App() {
  useInit();

  return (
    <main className="App">
      <Layout>
        <Switch>
          <Route path="/Login" component={Login} />
          <GuardRoute path="/" component={UserMain} componentSub={DriverMain} />
          <Redirect to="/" />
        </Switch>
      </Layout>
      <Dialog />
    </main>
  );
}

export default App;
