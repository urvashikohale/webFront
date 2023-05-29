import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Navbar from "../core/Navbar";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@mui/material";

import { update } from "./helper/userapi";
// import "./usercss/profile.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../auth/helper";
import { read } from "./helper/userapi";
import Profile from "./Profile";
import Menuu from "../core/Menu";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [values, setValues] = useState({
    name: "",
    about: "",
    password: "",
    email: "",
    createdUser: "",
    redirectToProfile: false,
    loading: false,
    error: "",
    formData: "",
  });

  const {
    name,
    about,
    password,
    email,
    createdUser,
    redirectToProfile,
    error,
    loading,
    formData,
  } = values;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: userId,
      },
      { token: isAuthenticated().token },
      signal
    ).then((data) => {
      if (data & data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const handleSubmit = (event) => {
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.password && userData.append("password", values.password);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);
    update(
      {
        userId: userId,
      },
      {
        token: isAuthenticated().token,
      },
      userData
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirectToProfile: true });
      }
    });
    navigate(<Profile />);
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    // formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  //handling photo
  const [state, setState] = useState({
    file: "",
    imagePreviewUrl:
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
    active: "edit",
  });

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  // console.log(state);
  const { imagePreviewUrl } = state;
  const photoUrl = values.photo
    ? `${API}/users/photo/${values.id}?${new Date().getTime()}`
    : ``;

  // const photoUrl = values.user._id
  // ? `${API}/users/photo/${values.user._id}?${new Date().getTime()}`
  // : null;

  if (values.redirectToProfile) {
    return <Navigate to={"/user/" + values.id} />;
  }
  const handleClickShowPassword = () => setValues(handleChange("password"));

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Menuu />
      <div
        style={{ width: "100%", height: "100vh", backgroundColor: "#F0F2F5" }}
      >
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            top: "13%",
            // marginTop: "1%",
            position: "absolute",
            left: "33%",
            width: "100vw",
            maxWidth: "500px",
            height: "80%",
            borderRadius: "10px",
            maxHeight: "auto",
            padding: "10px",
          }}
        >
          {/* <form onSubmit={handleSubmit} style={{ backgroundColor: "green" }}> */}
          {/* <div
              style={{
                width: "100vw",
                maxWidth: 900,
                // margin: "auto",
                // marginBottom: "3px",
                marginLeft: "83%",
                // left: "60%",
                borderRadius: "10px",
                boxShadow: "none",
                backgroundColor: "red",
              }}
            > */}
          <Typography
            variant="h6"
            sx={{
              // textAlign: "center",
              paddingBottom: "2px",
              marginBottom: "15px",
            }}
          >
            Edit profile
          </Typography>
          <div style={{ marginBottom: "40px" }}>
            <label htmlFor="photo-upload">
              <Avatar
                sx={{
                  height: 150,
                  width: 150,
                  border: "4px solid white",
                  cursor: "pointer",
                  left: "35%",
                  // textAlign: "center",
                }}
                htmlFor="photo-upload"
                src={photoUrl}
              />
              <input
                accept="image/*"
                id="photo-upload"
                type="file"
                hidden
                onChange={handleChange("photo")}
              />
            </label>
          </div>

          <div
            style={{
              padding: 2,
              margin: 2,
              marginBottom: "10px",
            }}
          >
            <TextField
              id="standard-read-only-input"
              label="Name"
              value={name}
              onChange={handleChange("name")}
              // defaultValue="Hello World"
              InputProps={{
                readOnly: false,
              }}
              variant="standard"
              sx={{ width: "80%" }}
            />
          </div>
          <div
            style={{
              padding: 2,
              margin: 2,
              marginTop: "17px",
              marginBottom: "3px",
            }}
          >
            <TextField
              id="standard-basic"
              value={email}
              variant="standard"
              disabled
              sx={{ width: "80%" }}
            />
          </div>
          <div
            style={{
              padding: 2,
              margin: 2,
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: "80%" }}
              id="standard-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={handleChange("password")}
              autoComplete="current-password"
              variant="standard"
            />
          </div>

          {/* <div>
            <TextField
              id="password"
              label="password"
              value={values.password}
              onChange={handleChange("password")}
            />
          </div> */}

          {/* <div
            style={{
              padding: 2,
              margin: 2,
              marginBottom: "10px",
            }}
          >
            <FormControl sx={{ width: "80%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div> */}
          <div
            style={{
              padding: 2,
              margin: 2,
              marginBottom: "10px",
            }}
          >
            <TextField
              label="ABOUT"
              id="multiline-flexible"
              multiline
              rows="2"
              value={about}
              onChange={handleChange("about")}
              margin="normal"
              sx={{ width: "80%" }}
            />
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#812ACD",
              width: "22%",
              paddingTop: "8px",
              paddingBottom: "8px",
              ":hover": {
                bgcolor: "#731EBE",
              },
            }}
            // color="secondary"
            onClick={handleSubmit}
            type="submit"
          >
            Save
          </Button>
          {/* <button type="submit" onClick={handleSubmit}>
            Save
          </button> */}
          {/* <span>{state.file ? state.file.name : ""}</span> */}
          {/* </div> */}
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
