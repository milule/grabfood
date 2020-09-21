import React, { memo, useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Conatiner from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";
import { useStyles } from "./Login.styled";
import { login } from "../../api/user.api";
import { setTokenStore, setUserStore, useAuth } from "../../utils";

const Login = memo(() => {
  const classes = useStyles();
  const { login: userLogin, isAuth } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const params = form;
      const { data, error, isCancel } = await login(params);

      if (error || isCancel) return;

      const { user, token } = data;

      userLogin(user);
      setUserStore(user);
      setTokenStore(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Conatiner
      fluid="true"
      component={Box}
      height="100vh"
      display="flex!important"
      alignItems="center"
      position="relative"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography className={classes.logo} variant="h2" gutterBottom>
        Fast Food
      </Typography>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Welcome Back
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          label="Username"
          name="username"
          autoComplete="username"
          value={form.username}
          onChange={handleFormChange}
        />
        <TextField
          variant="outlined"
          label="Password"
          name="password"
          autoComplete="new-password"
          type="password"
          value={form.password}
          onChange={handleFormChange}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login to Fast Food
        </Button>
      </form>
      <section>
        {/* <Typography
          gutterBottom
          variant="body1"
          color="textSecondary"
          className={classes.login}
        >
          or login with
        </Typography>
        <Button size="large" variant="outlined" color="secondary">
          Login with Google
        </Button>
        <Button size="large" variant="outlined" color="secondary">
          Login with Facebook
        </Button> */}
      </section>
    </Conatiner>
  );
});

export default Login;
