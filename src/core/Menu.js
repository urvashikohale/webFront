// import { styled, alpha } from "@emotion/styled";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Badge,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Stack,
  Paper,
  List,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar";
import { findPeople, read } from "../user/helper/userapi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/helper";
import { API } from "../backend";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  padding: "3px 13px",
  borderRadius: "4px",
  //   width: "14rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));
const Left = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

const Middle = styled(Box)(({ theme }) => ({
  display: "flex",

  alignItems: "center",
}));
const Menuu = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openn = Boolean(anchorEl);
  const [user, setUsers] = useState([]);

  const [filteredData, setFilterData] = useState([]);
  const navigate = useNavigate();

  // const [values, setValues] = useState({
  //   user: { photo: "" },
  // });
  const { userId } = useParams();

  const [values, setValues] = useState({
    name: "",
    text: "",
    photo: "",
    error: "",
    user: {},
  });
  // useEffect(() => {
  //   setValues({ ...values, user: isAuthenticated().user });
  // }, []);
  // const [user, setUsers] = useState([]);

  // const [filteredData, setFilterData] = useState([]);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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

  const photoUrl = values.user.photo
    ? `${API}/users/photo/${values.user._id}`
    : ` `;

  // const photoUrl = isAuthenticated().user._id
  //   ? `${API}/users/photo/` + isAuthenticated().user._id
  //   : null;

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundImage: "linear-gradient(to right , #5908A1 0%, #AB4DFC 100%)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Left>
          <Typography
            variant="h5"
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              mr: 2,
              fontFamily: "proxima-nova",
              fontSize: "31px",
              fontWeight: "800",
            }}
          >
            SocialBook
          </Typography>
          <Typography
            variant="h7"
            sx={{
              display: {
                xs: "flex",
                sm: "none",
              },
              mr: 1,
              fontFamily: "proxima-nova",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            SocialBook
          </Typography>
          <Search>
            <SearchIcon sx={{ paddingRight: "7px" }} />
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleFilter}
              sx={{ color: "inherit", fontWeight: "bold" }}
            />
            <Stack spacing={2}>
              {filteredData.length != 0 && (
                <List
                  // className="searchList"
                  sx={{
                    width: 350,
                    margin: 0,
                    padding: 0,
                    zIndex: 1,
                    position: "absolute",
                    listStyle: "none",
                    backgroundColor: "#f1f1f1",
                    overflow: "auto",
                    maxHeight: 200,
                    borderRadius: "0 0 10px 10px",
                    border: "none",
                    border: "1px solid rgba(0,0,0,.25)",
                  }}
                >
                  {filteredData.map((value, key) => {
                    return (
                      <Paper key={value._id}>
                        <Link
                          to={`${API}/users/` + value._id}
                          className="searchPaper"
                        >
                          <Typography
                            className="searchText"
                            sx={{
                              paddingLeft: "6px",
                              paddingTop: "9px",
                              paddingBottom: "9px",
                              color: "Black",
                            }}
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
        </Left>
        <Middle>
          <Icons
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              gap: "20px",
              marginRight: "16rem",
            }}
          >
            <Link to="/newsfeed">
              <HomeIcon sx={{ fontSize: "29px", color: "#FFFFFF" }} />
            </Link>
            {/* <PeopleIcon sx={{ fontSize: "29px" }} /> */}
          </Icons>
          {/* <Icons
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "flex",
                  lg: "none",
                },
                gap: "0px",
  
              }}
            >
              <PeopleIcon />
            </Icons> */}
        </Middle>
        <Icons
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              md: "flex",
            },
          }}
        >
          <Link to={"/users/findpeople/" + isAuthenticated().user._id}>
            <PeopleIcon
              sx={{
                display: { xs: "none", sm: "flex" },
                fontSize: "31px",
                color: "#FFFFFF",
              }}
            />
          </Link>
          {/* <Badge badgeContent={4} color="error">
            <NotificationsIcon sx={{ fontSize: "28px" }} />
          </Badge> */}
          {isAuthenticated() && (
            <Button
              onClick={() => {
                logout(() => {
                  navigate("/");
                });
              }}
              sx={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "none",
                // border: "2px solid #FFFFFF",
                borderRadius: "5px",
                //   padding: "8px 9px",
                fontWeight: "bold",
                ":hover": {
                  bgcolor: "#812ACD",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.10)",
                },
              }}
            >
              logout
            </Button>
          )}

          <Link
            to={"/user/" + isAuthenticated().user._id}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              sx={{ width: 35, height: 35 }}
              alt={isAuthenticated().user.name}
              src={photoUrl}
              onClick={(e) => setOpen(true)}
            />
          </Link>
        </Icons>
        <Icons
          sx={{
            display: {
              xs: "flex",
              sm: "none",
              md: "none",
            },
            paddingLeft: "7px",
          }}
        >
          <MenuIcon
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openn}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
            <MenuItem onClick={handleClose}>Notifications</MenuItem>
            <MenuItem onClick={handleClose}>Find People</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Icons>
      </Toolbar>
    </AppBar>
  );
};

export default Menuu;
