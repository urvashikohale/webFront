import React from "react";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { findPeople, read } from "./helper/userapi";
import { follow } from "./helper/userapi";
import { API } from "../backend";
import {
  Avatar,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Link,
  Button,
  Snackbar,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import ViewIcon from "@mui/icons-material/Visibility";
import Menuu from "../core/Menu";

const FindPeople = () => {
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findPeople(
      {
        userId: isAuthenticated().user._id,
      },
      {
        token: isAuthenticated().token,
      },

      signal
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, users: data });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const clickFollow = (user, index) => {
    console.log(user._id);
    follow(
      {
        userId: isAuthenticated().user._id,
      },
      {
        t: isAuthenticated().token,
      },
      user._id
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        // onMessage(messaging, (payload) => {
        //   console.log("Message received. ", payload);
        //   // ...
        // });
        let toFollow = values.users;
        toFollow.splice(index, 1);
        setValues({
          ...values,
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}!`,
        });
      }
    });
  };
  const handleRequestClose = (event, reason) => {
    setValues({ ...values, open: false });
  };
  return (
    <div>
      <Menuu />
      <div
        style={{
          // position: "absolute",
          marginTop: "6%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper elevation={4} style={{ width: "100vw", maxWidth: 900 }}>
          <Typography
            type="title"
            style={{
              height: 50,
              display: "flex",
              alignItems: "center",
            }}
          >
            People You May Follow
          </Typography>
          <Divider />
          <List>
            {values.users.map((item, i) => {
              return (
                <span key={i}>
                  <ListItem style={{ height: 70 }}>
                    <ListItemAvatar>
                      <Avatar src={`${API}/users/photo/` + item._id} />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                      <Link to={"/user/" + item._id}>
                        <IconButton variant="contained" color="secondary">
                          <ViewIcon />
                        </IconButton>
                      </Link>
                      <Button
                        aria-label="Follow"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          clickFollow(item, i);
                        }}
                      >
                        Follow
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </span>
              );
            })}
          </List>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={values.open}
          onClose={handleRequestClose}
          autoHideDuration={6000}
          message={<span>{values.followMessage}</span>}
        />
      </div>
    </div>
  );
};

export default FindPeople;
