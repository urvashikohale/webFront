import React from "react";
import { Avatar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
import { Link } from "react-router-dom";
const FollowGrid = (props) => {
  return (
    <div>
      <ImageList rowHeight={160} cols={4}>
        {props.people.map((person, i) => {
          return (
            <ImageListItem style={{ height: 120 }} key={i}>
              <Link to={"/user/" + person._id}>
                <Avatar src={"/api/users/photo/" + person._id} />
                <Typography>{person.name}</Typography>
              </Link>
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
};
FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
};

export default FollowGrid;
