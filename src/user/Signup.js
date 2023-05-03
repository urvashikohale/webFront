import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Alert from "@mui/material/Alert";
import "../user/usercss/signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",

            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => {
        console.log("ERROR IN SIGNUP", error);
      });
  };

  const successMessage = () => {
    return (
      <div style={{ display: success ? "" : "none" }}>
        <Alert severity="success">
          Account created successfully. Go to <Link to="/">Login</Link>
        </Alert>
        {/* Account created successfully. Go to <Link to="/">Login</Link> */}
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? "" : "none" }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  };

  const signupForm = () => {
    return (
      <div className="formSign">
        <div className="success">{successMessage()}</div>
        <form className="signFormm">
          <input
            className="fullName"
            value={name}
            onChange={handleChange("name")}
            autoComplete="off" //this remove history of typing suggestion when typing
            type="text"
            placeholder="Enter Full Name "
            name="name"
          ></input>

          <input
            className="email"
            value={email}
            onChange={handleChange("email")}
            autoComplete="off"
            type="email"
            placeholder="Enter Email"
            name="email"
          ></input>
          <input
            className="password"
            value={password}
            onChange={handleChange("password")}
            autoComplete="off"
            type="password"
            placeholder="Enter Password"
            name="password"
          ></input>
          {/* <div className="DOB">
                <label>Date of birth</label>
                <input type="number" min="1" max="31" ></input>
                <input type="month"></input>
            </div>
            <div>
                <label>Gender</label>
                <input type="radio" id="female"></input>
                <label for="female">Female</label>
                <input type="radio" id="male"></input>
                <label for="male">Male</label>
            </div> */}
          <div>
            <button onClick={handleSubmit} className="buttonSign">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {/* {successMessage()} */}
      {errorMessage()}
      {signupForm()}
      {/* <p>{JSON.stringify(values)}</p> */}
    </div>
  );
};

export default Signup;
