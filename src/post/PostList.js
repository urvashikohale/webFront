import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";

export default function PostList(props) {
  return (
    <div>
      {props.posts.map((item, i) => {
        return <Post post={item} key={i} />;
      })}
    </div>
  );
}
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};
