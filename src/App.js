import "./App.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GuardRoute, Layout } from "./components";
import { useInit } from "./utils";
import UserMain from "./screens/UserMain";
import Login from "./screens/Login";

function App() {
  useInit();

  return (
    <main className="App">
      <Layout>
        <Switch>
          <Route path="/Login" component={Login} />
          <GuardRoute path="/" component={UserMain} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </main>
  );
}

export default App;
