import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, Typography } from "@mui/material";
import PostList from "./../post/PostList";
import FollowGrid from "./FollowGrid";

export default function ProfileTabs(props) {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <div>
      <AppBar
        position="static"
        // color="default"
        sx={{
          marginTop: 1.5,
          marginBottom: 0,
          backgroundColor: " #FFFFFF ",
          borderRadius: "5px",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          // TabIndicatorProps={{
          //   style: {
          //     backgroundColor: "#AB4DFC",
          //   },
          // }}
          indicatorColor="none"
          // textColor="white"
          sx={{
            color: "#FFFFFF",
            marginBottom: 0,
          }}
          variant="fullWidth"
        >
          <Tab
            label="Posts"
            style={{
              color: "#AB4DFC",
            }}
          />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>

      {tab === 0 && (
        <TabContainer>
          <PostList posts={props.posts} />
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer>
          <FollowGrid people={props.user.following} />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          <FollowGrid people={props.user.followers} />
        </TabContainer>
      )}
    </div>
  );
}

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
};

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ marginTop: "10px" }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
