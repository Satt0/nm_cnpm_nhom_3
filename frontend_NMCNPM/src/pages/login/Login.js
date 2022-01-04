import React, { useEffect, useState } from "react";
import { toast,ToastContainer  } from "react-toastify";
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
//import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo

import admin from "./admin.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { useLazyQuery, useMutation } from "@apollo/client";
import { DANG_NHAP, DANG_KY } from "../../api/graphql/query/dang_nhap";
function Login(props) {
  var classes = useStyles();
  const [
    callLogin,
    { error: errorLogin, loading: loadingLogin, data: dataLogin,called },
  ] = useLazyQuery(DANG_NHAP, { fetchPolicy: "no-cache" });
  const [
    callSignUp,
    { error: errorSignUp, loading: loadingSignUp, data: dataSignUp },
  ] = useMutation(DANG_KY, { fetchPolicy: "no-cache" });
  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [rePassword, setRepassword] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  useEffect(()=>{
    setError(false)
    setIsLoading(false)
  },[rePassword,loginValue,passwordValue,activeTabId])
  useEffect(() => {
    if(called===false) return;
    if (loadingLogin) return setIsLoading(true);
    
     
    
    if (dataLogin){
      const { logIn } = dataLogin;
      loginUser(userDispatch, logIn, props.history, setIsLoading, setError)
    }else{
      setIsLoading(false);
      toast("không thể đăng nhập")
      return 
    }

  }, [dataLogin, errorLogin,called, loadingLogin, userDispatch, props.history]);

  useEffect(() => {
    
    if (loadingSignUp) return setIsLoading(true);
    if (errorSignUp) {
      setIsLoading(false);
      toast(errorSignUp.message)
      return 
    }
    if (!dataSignUp) return;
    const { signUp } = dataSignUp;
    loginUser(userDispatch, signUp, props.history, setIsLoading, setError);
  }, [loadingSignUp, dataSignUp, errorSignUp, userDispatch, props.history]);

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
                      }).catch((e) => {
                        console.log(e.message);
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
                    onClick={() => {
                      if (passwordValue !== rePassword)
                        return alert("password not match!");

                      callSignUp({
                        variables: {
                          input: {
                            username: loginValue,
                            password: passwordValue,
                            role: 3,
                          },
                        },
                      }).catch((e) => {
                        setError(true);
                      });
                    }}
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
       
      </div>
    </Grid>
  );
}

export default withRouter(Login);
