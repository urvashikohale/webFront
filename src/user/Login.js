import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./usercss/login.css";
import { Navigate } from "react-router-dom";
import { isAuthenticated, authenticate, login } from "../auth/helper/index";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import logo from "./images/p.png";
import bg from "./images/bg.png";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const performRedirect = () => {
    if (didRedirect && isAuthenticated()) {
      return <Navigate to="/newsfeed" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div>
          <CircularProgress />
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? "" : "none" }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  };

  const loginForm = () => {
    return (
      <div className="fullpage">
        <div className="container">
          {/* <div>
          <img src={bg} />
        </div> */}
          <div className="left">
            <h1 className="text-primary">SocialBook</h1>
            <p>Connect with the people on SocialBook.</p>
            {/* <img src={logo} /> */}
          </div>
          <div className="right">
            <div className="error">
              {loadingMessage()}
              {errorMessage()}
            </div>
            <form>
              <input
                type="text"
                value={email}
                onChange={handleChange("email")}
                placeholder="Email email address"
              />

              <input
                type="password"
                value={password}
                onChange={handleChange("password")}
                placeholder="Password"
              />
              {/* <div className="">
            <input
              type="submit"
              name=""
              className="loginBtn"
              value="Log In"
              onClick={loginUser}
            />
          </div> */}
              <button className="loginBtn" onClick={handleSubmit}>
                {/* <Link to="/feed"></Link> */}
                LOGIN
              </button>
              <a href="" className="forget">
                Forgotten password?
              </a>
              <hr className="line" />
              <div className="signup">
                <Link to="/signup" className="signupBtn">
                  Create New Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {/* {loadingMessage()} */}
      {performRedirect()}
      {loginForm()}
    </div>
  );
};

export default Login;
