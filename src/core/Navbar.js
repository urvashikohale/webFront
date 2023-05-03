import * as React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Stack } from "@mui/system";
import { Dialog, DialogContent, List, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { API } from "../backend";
// import AppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
// import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
// import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import "./Navbar.css";
// import Paper from "@mui/material/Paper";
import {
  Badge,
  Paper,
  Avatar,
  Button,
  Toolbar,
  InputBase,
  AppBar,
} from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  NavLink,
  useParams,
  Navigate,
  useHistory,
  redirect,
} from "react-router-dom";
import { isAuthenticated, logout } from "../auth/helper/index";
import { read } from "../user/helper/userapi";
import { findPeople } from "../user/helper/userapi";
import { NoEncryption } from "@mui/icons-material";
import Home from "./Home";
import { blue } from "@mui/material/colors";
import PeopleIcon from "@mui/icons-material/People";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const location = useLocation();
  const [values, setValues] = useState({
    user: { photo: "" },
  });
  const { userId } = useParams();
  const [user, setUsers] = useState([]);

  const [filteredData, setFilterData] = useState([]);

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
        setValues({ ...values, user: data });
      }
    });

    findPeople(
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
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);
  const photoUrl = values.user._id
    ? `${API}/users/photo/${values.user._id}` || `${API}/newsfeed/photo`
    : `${API}/users/defaultphoto`;

  // const photoUrl = () => {
  //   location.pathname === `${API}/newsfeed` ||
  //   location.pathname === `${API}/users/photo/${values.user._id}`
  //     ? `${API}/users/photo${values.user._id}`
  //     : `${API}/users/defaultphoto`;
  // };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = user.filter((data) => {
      return Object.values(data)
        .join("")
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  return (
    <AppBar className="appbar">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mr: 2,
            fontFamily: "proxima-nova",
            fontSize: "31px",
            fontWeight: "800",
          }}
        >
          SocialBook
        </Typography>
        <Search sx={{ mr: "280px" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleFilter}
          />

          <Stack spacing={2}>
            {filteredData.length != 0 && (
              <List
                className="searchList"
                // sx={{
                //   width: "100%",
                //   margin: 0,
                //   padding: 0,
                //   zIndex: 1,
                //   position: "absolute",
                //   listStyle: "none",
                //   backgroundColor: "#f1f1f1",
                //   overflow: "auto",
                //   maxHeight: 200,
                //   borderRadius: "0 0 10px 10px",
                //   border: "none",
                // border: "1px solid rgba(0,0,0,.25)",
                // }}
              >
                {filteredData.map((value, key) => {
                  return (
                    <Paper>
                      <Link to={"/user/" + value._id} className="searchPaper">
                        <Typography
                          className="searchText"
                          // sx={{
                          //   paddingLeft: "6px",
                          //   paddingTop: "9px",
                          //   paddingBottom: "9px",
                          //   color: "Black",
                          // }}
                        >
                          <strong>{value.name}</strong>
                        </Typography>
                      </Link>
                    </Paper>
                  );
                })}
              </List>
            )}
          </Stack>
        </Search>
        <Link to="/newsfeed">
          <HomeIcon
            className="homeIcon"
            // style={{ fontSize: "35", color: "#FFFFFF" }}
          />
        </Link>
        <Link to="/findpeople">
          <PeopleIcon />
        </Link>
        <Button
          onClick={logout}
          sx={{
            backgroundColor: "transparent",
            color: "#FFFFFF",
            border: "none",
            // border: "2px solid #FFFFFF",
            borderRadius: "5px",
            padding: "8px 9px",
            marginLeft: "37%",
            mr: "15px",
            ":hover": {
              bgcolor: "#812ACD",
              boxShadow:
                " 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.10)",
            },
          }}
        >
          logout
        </Button>
        {/* <IconButton> */}
        <Badge
          badgeContent={4}
          color="primary"
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#E41E3F",
              color: "#FFFFFF",
            },
          }}
        >
          <CircleNotificationsIcon sx={{ fontSize: "35px" }} />
        </Badge>
        {/* </IconButton> */}
        {/* <IconButton> */}
        {/* <NotificationsIcon sx={{ fontSize: "30px", marginRight: "6px" }} /> */}
        {/* </IconButton> */}
        <Link
          to={"/user/" + isAuthenticated().user._id}
          // className={({ isActive }) =>
          //   isActive &&
          //   (location.pathname === `${API}/newsfeed` ||
          //     location.pathname === `${API}/users/photo/${values.user._id}`)
          //     ? `${API}/users/photo`
          //     : `${API}/users/defaultphoto`
          // }
          // `${styles.profile_active} ${styles.profile}`
          // : `${styles.profile} hover1`}
          style={{
            textDecoration: "none",
          }}
        >
          <Avatar
            alt={isAuthenticated().user.name}
            src={photoUrl}
            sx={{
              marginLeft: "17px",
              marginRight: "2px",
              boxShadow:
                "  0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.10)",
            }}
          />
        </Link>
        {/* <Paper>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Paper> */}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
