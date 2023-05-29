import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import { like, unlike } from "./postapi";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

export default function Post(props) {
  // useEffect(() => {
  //   setValues({...values, like:checkLike(props.post.likes), likes: props.post.likes.length, comments: props.post.comments})
  // }, [])
  const checkLike = (likes) => {
    if (likes && Array.isArray(likes)) {
      let match = likes.indexOf(isAuthenticated().user._id) !== -1;
      return match;
    }
    return false;
  };
  const [values, setValues] = useState({
    like: checkLike(props.post.likes),
    likes:
      props.post.likes && props.post.likes.length ? props.post.likes.length : 0,
    // likes: props.post.likes.length,
  });

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     like: checkLike(props.post.likes),
  //     likes: props.post.likes.length,
  //   });
  // }, []);

  const clickLike = () => {
    let callApi = values.like ? unlike : like;
    callApi(
      {
        userId: isAuthenticated().user._id,
      },
      {
        token: isAuthenticated().token,
      },
      props.post._id
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, like: !values.like, likes: data.likes.length });
      }
    });
  };

  // const updateComments = (comments) => {
  //   setValues({...values, comments: comments})
  // }

  // const deletePost = () => {
  //   remove({
  //     postId: props.post._id
  //   }, {
  //     t: jwt.token
  //   }).then((data) => {
  //     if (data.error) {
  //       console.log(data.error)
  //     } else {
  //       props.onRemove(props.post)
  //     }
  //   })
  // }

  return (
    <Card
      sx={{
        maxWidth: 400,
        // margin: "auto",
        marginBottom: "2%",
        // maxHeight: "400px",
        width: "100vw",
        maxWidth: 900,
        height: "100%",
        maxHeight: 700,
        paddingTop: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={`${API}/users/photo/` + props.post.postedBy._id} />
        }
        action={
          props.post.postedBy._id === isAuthenticated().user._id && (
            <IconButton>{/* <DeleteIcon /> */}</IconButton>
          )
        }
        title={
          <Link
            to={"/user/" + props.post.postedBy._id}
            style={{
              textDecoration: "none",
              color: "#000000",
              fontSize: "115%",
              fontWeight: "bold",

              fontFamily: "Arial",
            }}
          >
            {props.post.postedBy.name}
          </Link>
        }
        subheader={new Date(props.post.created).toDateString()}
        sx={{ paddingTop: "1px", paddingBottom: 0, textDecoration: "none" }}
      />
      <CardContent sx={{ padding: "2px 0px" }}>
        <Typography component="p" sx={{ margin: 2 }}>
          {props.post.text}
        </Typography>
        {props.post.photo && (
          <div
            style={{
              textAlign: "center",
              height: "100%",
              maxHeight: 700,
              width: "100vw",
              maxWidth: 900,
              // height: 0,
              // paddingTop: 1, // 16:9,
              // marginTop: "30",
            }}
          >
            <img
              src={`${API}/posts/photo/` + props.post._id}
              style={{
                height: "100%",
                maxHeight: 700,
                width: "100vw",
                maxWidth: 900,
              }}
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        {values.like ? (
          <IconButton onClick={clickLike} aria-label="Like" color="secondary">
            <ThumbUpIcon />
          </IconButton>
        ) : (
          <IconButton onClick={clickLike} aria-label="Unlike" color="secondary">
            <ThumbUpOutlinedIcon />
          </IconButton>
        )}
        <span>{values.likes}</span>
        {/* <IconButton className={classes.button} aria-label="Comment" color="secondary">
                <CommentIcon/>
              </IconButton> <span>{values.comments.length}</span> */}
      </CardActions>
      {/* <Divider/> */}
      {/* <Comments postId={props.post._id} comments={values.comments} updateComments={updateComments}/> */}
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
