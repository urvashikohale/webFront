import {
  CardContent,
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { API } from "../backend";
import React, { useEffect, useState } from "react";
import { authenticate, isAuthenticated } from "../auth/helper/index";
// import Navbar from "../core/Navbar";
import "./usercss/profile.css";
import { read } from "./helper/userapi";
import FollowProfileButton from "./FollowProfileButton";
import { listByUser } from "../post/postapi";
import { Link, Navigate, useParams } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import ProfileTabs from "./ProfileTabs";
import Menuu from "../core/Menu";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

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
      if (data && data.error) {
        setValues({ ...values, redirectToSignin: true });
      } else {
        let following = checkFollow(data);
        setValues({ ...values, user: data, following: following });
        loadPosts(data._id);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id == isAuthenticated().user._id;
    });
    return match;
  };
  const clickFollowButton = (callApi) => {
    callApi(
      {
        userId: isAuthenticated().user._id,
      },
      {
        token: isAuthenticated().token,
      },
      values.user._id
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };
  const loadPosts = (user) => {
    listByUser(
      {
        userId: user,
      },
      {
        token: isAuthenticated().token,
      }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
        // console.log("setposts", data);
      }
    });
  };
  // const removePost = (post) => {
  //   const updatedPosts = posts;
  //   const index = updatedPosts.indexOf(post);
  //   updatedPosts.splice(index, 1);
  //   setPosts(updatedPosts);
  // };

  const photoUrl = values.user.photo
    ? `${API}/users/photo/${values.user._id}?${new Date().getTime()}`
    : ``;

  // const photoUrl = values.user._id
  //   ? `${API}/users/photo/${values.user._id}?${new Date().getTime()}`
  //   : null;

  if (values.redirectToSignin) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {/* <Navbar /> */}
      <Menuu />
      <div
        style={{ width: "100%", height: "100vh", backgroundColor: "#F0F2F5" }}
      >
        <div
          style={{
            // backgroundColor: "#FFFFFF",
            top: "13%",
            // marginTop: "1%",
            position: "absolute",
            left: "20%",
            width: "100vw",
            maxWidth: "900px",
            // backgroundColor: "red",
            // top: "13%",
            // marginTop: "1%",
            // position: "absolute",
            // left: "20%",
            // width: "100vw",
            // maxWidth: "900px",
            // borderRadius: "5px",
            // backgroundColor: " #F0F2F5",
          }}
        >
          <div
            style={{
              // backgroundColor: "#FFFFFF",
              // padding: "0px 0px 0px",
              borderRadius: "10px",
              // height: "190px",
              padding: 1,
              backgroundColor: "#FFFFFF",
              // borderRadius: "5px",
            }}
          >
            <List
              dense
              sx={{
                // marginBottom: "3px",
                // boxShadow: "none",
                boxShadow:
                  " rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                // boxShadow:
                //   " 0 4px 4px 0 rgba(0,0,0,0.2), 0 4px 4px 0 rgba(0,0,0,0.10)",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={photoUrl}
                    sx={{
                      width: 150,
                      height: 150,
                      marginLeft: 3,
                      marginRight: 4,
                      marginTop: 2,
                      marginBottom: 2,
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={values.user.name}
                  secondary={`${values.user.about}`}
                  primaryTypographyProps={{
                    fontSize: "32px",
                    fontWeight: "Bolder",
                    // fontStyle: "San serif",
                    fontFamily: "Roboto",
                    color: "#111111",
                  }}
                  secondaryTypographyProps={{
                    fontSize: "17px",
                    marginTop: "3px",
                    // fontStyle: "San serif",
                    // fontFamily: "Roboto",
                  }}
                  style={{ width: "40%" }}
                />
                {
                  isAuthenticated().user &&
                  isAuthenticated().user._id == values.user._id ? (
                    <ListItemSecondaryAction
                      style={{
                        marginRight: "5%",
                        marginTop: "5.5%",
                      }}
                    >
                      <Link
                        to={"/user/edit/" + values.user._id}
                        style={{ textDecoration: "none" }}
                      >
                        {/* <IconButton aria-label="Edit" color="primary">
                        <Edit />
                      </IconButton> */}
                        <Button
                          startIcon={
                            <Edit
                              sx={{
                                marginRight: 0,
                                marginBottom: "3px",
                                padding: 0,
                              }}
                            />
                          }
                          sx={{
                            height: 30,
                            marginBottom: 0,
                            // marginTop: "9px",
                            marginLeft: 0,
                            paddingTop: 2,
                            paddingLeft: 2,
                            paddingRight: 2,
                            paddingBottom: 2,
                            textTransform: "none",
                            textDecoration: "none",
                            color: "#1A6ED8",
                            bgcolor: "white",
                            // bgcolor: "#F0F2F5",
                            // color: "black",

                            boxShadow:
                              " 0 4px 4px 0 rgba(0,0,0,0.2), 0 4px 4px 0 rgba(0,0,0,0.10)",

                            ":hover": {
                              bgcolor: "#FAF9F6",
                              boxShadow:
                                " 0 4px 4px 0 rgba(0,0,0,0.2), 0 4px 4px 0 rgba(0,0,0,0.10)",
                            },
                          }}
                        >
                          Edit profile
                        </Button>
                      </Link>
                    </ListItemSecondaryAction>
                  ) : (
                    <FollowProfileButton
                      following={values.following}
                      onButtonClick={clickFollowButton}
                    />
                  )
                  /* <button>Friend</button> */
                }
                {/* <Button
                    startIcon={
                      <PersonAddAlt1Icon
                        color="inherit"
                        sx={{
                          marginRight: 0,
                          marginBottom: "3px",
                          padding: 0,
                        }}
                      />
                    }
                    sx={{
                      height: 30,
                      marginBottom: 0,
                      // marginTop: "9px",
                      marginLeft: 0,
                      paddingTop: 2,
                      paddingLeft: 2,
                      paddingRight: 2,
                      paddingBottom: 2,
                      textTransform: "none",
                      textDecoration: "none",
                      // color: "black",
                      // bgcolor: "white",
                      // bgcolor: "#F0F2F5",
                      // color: "black",
                      bgcolor: "#1A6ED8",
                      color: "#FFFFFF",

                      boxShadow:
                        " 0 4px 4px 0 rgba(0,0,0,0.2), 0 4px 4px 0 rgba(0,0,0,0.10)",

                      ":hover": {
                        bgcolor: "#1763c2",
                        boxShadow:
                          " 0 4px 4px 0 rgba(0,0,0,0.2), 0 4px 4px 0 rgba(0,0,0,0.10)",
                      },
                    }}
                  >
                    Add friend
                  </Button> */}
              </ListItem>
            </List>
          </div>
          <Divider />
          <ProfileTabs user={values.user} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
