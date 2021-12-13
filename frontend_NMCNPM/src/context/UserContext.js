import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
const defaultState = {
  username: null,
  role: null,
  token: null,
};
function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, ...defaultState, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, logIn, history, setIsLoading, setError) {
  setError(false);
<<<<<<< HEAD
  
=======
>>>>>>> c82aadc244f07950e0cc455784cc570e6b60dd21

  const { username, role, token } = logIn;

  localStorage.setItem("token", token);
  setError(null);
  setIsLoading(false);
  dispatch({ type: "LOGIN_SUCCESS", payload: { username, role, token } });
  history.push("/app/dashboard");
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
