import { createContext, useEffect, useReducer } from "react";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
};
const AUTH_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      // Save user data in localStorage upon successful login
      localStorage.setItem(
        "user",
        JSON.stringify({ isAuthenticated: true, ...action.payload })
      );
      return {
        isAuthenticated: true,
        ...action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      // Clear user data from localStorage upon logout
      localStorage.removeItem("user");
      return {
        isAuthenticated: false,
        isAdmin: false,
      };
    default:
      return state;
  }
};

// auth context

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: { ...user } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AUTH_ACTIONS, AuthProvider, AuthContext, authReducer };
