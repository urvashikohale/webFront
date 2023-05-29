import { Card, Divider, Typography, Grid } from "@mui/material";
import React from "react";
import NewPost from "./NewPost";
// import Navbar from "../core/Navbar";
import Menu from "../core/Menu";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { listNewsFeed } from "./postapi";
import PostList from "./PostList";
import SearchBar from "../core/SearchBar";
import "./Newsfeed.css";
import FindPeople from "../user/FindPeople";
import { API } from "../backend";
import { sendTokenToServer } from "../user/helper/userapi";
import Menuu from "../core/Menu";
const Newsfeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNewsFeed(
      {
        userId: isAuthenticated().user._id,
      },
      {
        token: isAuthenticated().token,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
    // .catch((error) => {
    //   console.log("NEWsFEED ERROR", error);
    // });
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);

    setPosts(updatedPosts);
  };
  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <div>
      {/* <Navbar /> */}
      <Menuu />
      <div className="fullpagee">
        <div
          style={{
            // backgroundColor: "#FFFFFF",
            top: "13%",
            // marginTop: "1%",
            position: "absolute",
            left: "20%",
            width: "100vw",
            maxWidth: "900px",
          }}
        >
          {/* <Card
            sx={{
              // margin: "auto",
              // position: "sticky",
              // marginTop: 4,
              // marginLeft: 10,
              paddingTop: 10,
              paddingBottom: 3,
              // width: "60%",
              backgroundColor: "#FFFFFF",
            }}
          > */}
          {/* <Typography
              sx={{
                // marginTop: 10,
                padding: "10px 2.5px 2px",
                color: teal["700"],
                fontSize: "1em",
              }}
            >
              Newsfeed
            </Typography> */}

          {/* <Divider /> */}
          <NewPost addUpdate={addPost} />
          <Divider />
          <PostList posts={posts} />
          {/* </Card> */}

          {/* <FindPeople /> */}
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
