import { PhotoCamera } from "@mui/icons-material";
import PropTypes from "prop-types";
import "./Newsfeed.css";
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
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import { create } from "./postapi";
import { Link, useParams, useNavigate } from "react-router-dom";

import { flexbox } from "@mui/system";
import profileImage from "../assets/images/profileImage.jpg";
import { read } from "../user/helper/userapi";

const NewPost = (props) => {
  const [values, setValues] = useState({
    name: "",
    text: "",
    photo: "",
    error: "",
    user: {},
  });
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read(
      {
        userId: isAuthenticated().user._id,
      },
      { token: isAuthenticated().token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, redirectToSignin: true });
      } else {
        setValues({ ...values, user: data });
      }
    });
  }, []);
  // useEffect(() => {
  //   setValues({ ...values, user: isAuthenticated().user });
  //   console.log("NEWUSER", isAuthenticated().user);
  // }, []);
  const clickPost = () => {
    let postData = new FormData();
    postData.append("text", values.text);
    postData.append("photo", values.photo);
    create(
      {
        userId: isAuthenticated().user._id,
      },
      {
        token: isAuthenticated().token,
      },
      postData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, text: "", photo: "" });
        props.addUpdate(data);
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  const photoURL = values.user.photo
    ? `${API}/users/photo/${values.user._id}`
    : ``;

  // const photoURL = values.user._id
  //   ? `${API}/users/photo/${values.user._id}?${new Date().getTime()}`
  //   : null;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "0px 0px 0px",
        borderRadius: "10px",
        height: "190px",
        marginBottom: 10,
      }}
    >
      <Card
        sx={{
          width: "100vw",
          maxWidth: 900,
          margin: "auto",
          marginBottom: "3px",
          backgroundColor: "rgba(65 ,150 ,136 ,0.09)",
          boxShadow: "none",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              alt={isAuthenticated().user.name}
              src={photoURL}
              sx={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            />
          }
          titleTypographyProps={{
            fontSize: "16px",
            fontWeight: "bold",

            fontFamily: "Arial",
          }}
          title={values.user.name}
          sx={{
            paddingTop: 2,
            paddingBottom: 1,
            paddingLeft: 2,
            backgroundColor: "white  ",
            fontWeight: "bold",
          }}
        />
        <CardContent
          sx={{
            backgroundColor: "white",
            paddingTop: 0,
            padddingBottom: 0,
          }}
        >
          <TextField
            placeholder="Write Something here"
            // multiline
            // rows="1"
            multiline={false}
            values={values.text}
            onChange={handleChange("text")}
            sx={{
              "& input": {
                marginTop: "1px",
                paddingTop: "12px",
              },
              border: "none",
              "& fieldset": { border: "none" },
              marginTop: 0,
              marginLeft: 7,
              marginRight: 2,
              width: "70%",
              height: "50px",
              color: "#888a8b",
              backgroundColor: "#eef0f1",
              border: "none",
              borderRadius: "50px",
              borderColor: "#eef0f1",
              ":hover": {
                bgcolor: "#FFFFFF",
                boxShadow:
                  " 0 4px 4px 2px rgba(0,0,0,0.2), 0 4px 4px 2px rgba(0,0,0,0.10)",
              },
            }}
          />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            values={values.photo}
            id="icon-button-file"
            type="file"
            sx={{ display: "none" }}
            hidden
          />
          <label htmlFor="icon-button-file">
            <Button
              startIcon={<PhotoCamera />}
              component="span"
              sx={{
                height: 30,
                marginBottom: 0,
                marginTop: "9px",
                marginLeft: 1,
                paddingTop: 2,
                paddingLeft: 2,
                paddingRight: 2,
                paddingBottom: 2,
                ":hover": {
                  bgcolor: "white",
                  boxShadow:
                    " 0 4px 4px 0 rgba(0,0,0,0.2), 0 4px 4px 0 rgba(0,0,0,0.10)",
                },
              }}
            >
              PHOTO
            </Button>
          </label>
          <span sx={{ verticalAlign: "super" }}>
            {values.photo ? values.photo.name : ""}
          </span>
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error">ERROR</Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ backgroundColor: "#FFFFFF" }}>
          <Button
            color="primary"
            variant="contained"
            disabled={values.text === ""}
            onClick={clickPost}
            sx={{
              marginLeft: 9,
              marginTop: 0,
            }}
          >
            POST
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired,
};

export default NewPost;
