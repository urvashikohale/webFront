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
} from "@mui/material";
import ViewIcon from "@mui/icons-material/Visibility";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase-messaging-sw";
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
      console.log("userIdfindd", isAuthenticated().user._id);

      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, users: data });
        console.log("FUSERRR", values.users);
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
      <Paper elevation={4}>
        <Typography type="title">Who to follow</Typography>
        <List>
          {values.users.map((item, i) => {
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={`${API}/users/photo/` + item._id} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <Link to={`${API}/user/` + item._id}>
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
  );
};

export default FindPeople;
