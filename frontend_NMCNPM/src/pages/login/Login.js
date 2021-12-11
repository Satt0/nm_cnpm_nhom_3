import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo

import admin from "./admin.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { useLazyQuery } from "@apollo/client";
import { DANG_NHAP } from "../../api/graphql/query/dang_nhap";
function Login(props) {
  var classes = useStyles();
  const [callLogin, loginData] = useLazyQuery(DANG_NHAP);

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [rePassword, setRepassword] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    const { loading, error, data } = loginData;

    if (loading) return setIsLoading(true);;
    if (error) return setError(true);
    const {logIn}=data;
    const {token,username,ID,role}=logIn;
    loginUser(
      userDispatch,
      props.history,
      setIsLoading,
      setError,
    );
    
  }, [loginData.data, loginData.error, loginData.loading,userDispatch,loginUser]);
  

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={admin} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>
          {" "}
          Quản lý Dân Cư
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Đăng nhập" classes={{ root: classes.tab }} />
            <Tab label="Đăng kí" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Chào mừng bạn
              </Typography>

              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() => {
                      callLogin({
                        variables: {
                          input: {
                            username: loginValue,
                            password: passwordValue,
                          },
                        },
                      });
                    }}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Đăng nhập
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Chào mừng!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Tạo tài khoản
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>

              <TextField
                id="email"
                error={loginValue === ""}
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="User's name"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                error={passwordValue.length === 0}
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <TextField
                id="re-pass"
                error={rePassword !== passwordValue}
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={rePassword}
                onChange={(e) => setRepassword(e.target.value)}
                margin="normal"
                placeholder="Re-enter password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      rePassword.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Tạo tài khoản
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        {/* <Typography color="primary" className={classes.copyright}>
        © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic</a>, LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>
  );
}

export default withRouter(Login);
