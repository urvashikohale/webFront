import { Card, Divider, Typography, Grid } from "@mui/material";
import { red, teal } from "@mui/material/colors";
import { palette, spacing } from "@mui/system";
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
import { initializeApp } from "firebase/app";
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import { API } from "../backend";
import { sendTokenToServer } from "../user/helper/userapi";
import Menuu from "../core/Menu";
const Newsfeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // const { userId } = useParams();
    const firebaseConfig = {
      apiKey: "AIzaSyDcdI6ka8Jpf5NLMDoL7CJVpJwFnBzTMbI",
      authDomain: "notification-20f5b.firebaseapp.com",
      projectId: "notification-20f5b",
      storageBucket: "notification-20f5b.appspot.com",
      messagingSenderId: "764138157910",
      appId: "1:764138157910:web:1c68ecffc85787c0d888f7",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    // Notification.requestPermission();

    // getToken(messaging, {
    //   vapidKey:
    //     "BGCGuhn-rYLSDIwlhTgDuE5ni_KZoGw1YKZKuo-u56qGYhaAMfwelCNU05xOZtNzih4ImUtetdGn_L5PuPEZOkY",
    // })
    //   .then((token) => {
    //     console.log(token);

    //     const userId = "63d94337b298feed4d32d41d";
    //     const userId = isAuthenticated().user._id;
    //     console.log("token userId", userId);
    //     const sendTokenToServer = (userId, token) => {
    //       fetch(`${API}/fcmtoken/${userId}`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ token }),
    //       })
    //         .then((response) => response.json())
    //         .then((data) => console.log(data))
    //         .catch((err) => console.error(err));
    //     };
    //     sendTokenToServer(userId, token);
    //     send the token to the server
    //   })
    //   .catch((err) => {
    //     console.log("Error getting token:", err);
    //   });

    // Notification.requestPermission();
    // Notification.requestPermission().then((permission) => {
    //   if (permission === "granted") {
    //     console.log("Notification permission granted.");
    //     // TODO(developer): Retrieve a registration token for use with FCM.

    //     getToken(messaging, {
    //       vapidKey:
    //         "BGCGuhn-rYLSDIwlhTgDuE5ni_KZoGw1YKZKuo-u56qGYhaAMfwelCNU05xOZtNzih4ImUtetdGn_L5PuPEZOkY",
    //     })
    //       .then((token) => {
    //         // const userId = "63d94337b298feed4d32d41d";
    //         const userId = isAuthenticated().user._id;
    //         const sendTokenToServer = (userId, token) => {
    //           fetch(`${API}/fcmtoken/${userId}`, {
    //             method: "POST",
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ token }),
    //           })
    //             .then((response) => response.json())
    //             .then((data) => console.log(data))
    //             .catch((err) => console.error(err));
    //         };
    //         sendTokenToServer(userId, token);
    //         // send the token to the server
    //       })
    //       .catch((err) => {
    //         console.log("Error getting token:", err);
    //       });
    //   } else {
    //     // deleteToken(token);
    //     console.log("Unable to get permission to notify.");
    //   }
    // });

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
