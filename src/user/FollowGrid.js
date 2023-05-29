import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Paper } from "@mui/material";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
import { Link } from "react-router-dom";
import { API } from "../backend";
import { read } from "./helper/userapi";
import { isAuthenticated } from "../auth/helper";
const FollowGrid = (props) => {
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

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const photoUrl = values.user.photo
    ? `${API}/users/photo/${values.user._id}}`
    : ``;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Paper elevation={4} style={{ width: 1000 }}>
        <List>
          {console.log("FLLOWGRID", props.people)}
          {/* <ImageList rowHeight={160} cols={1}> */}
          {props.people.map((person, i) => {
            console.log("PERSOM", person);
            return (
              <span key={i}>
                <ListItem
                  style={{
                    height: 95,
                  }}
                  key={i}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={`${API}/users/photo/` + person._id}
                      // src={photoUrl}
                      style={{ width: 50, height: 50 }}
                    />
                  </ListItemAvatar>
                  <Link
                    to={"/user/" + person._id}
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary={person.name}
                      disableTypography
                      sx={{
                        textDecoration: "none",
                        padding: 2,
                        fontSize: "118%",
                        fontWeight: "bold",
                        color: "#171717",
                        fontFamily: "Roboto",
                        ":hover": {
                          color: "#5908A1",
                        },
                      }}
                    />

                    {/* <Typography
                        style={{ textAlign: "center", marginTop: 10 }}
                      >
                        {person.name}
                      </Typography> */}
                  </Link>
                </ListItem>
                {/* <Divider /> */}
              </span>
            );
          })}
          {/* </ImageList> */}
        </List>
      </Paper>
    </div>
  );
};
FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
};

export default FollowGrid;
