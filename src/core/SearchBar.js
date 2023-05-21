import { useEffect, useState } from "react";
import React from "react";
import { findPeople } from "../user/helper/userapi";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { Divider, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { API } from "../backend";

const SearchBar = () => {
  const [user, setUsers] = useState([]);

  const [filteredData, setFilterData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

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
  }, []);

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
    <div>
      <div style={{ marginTop: "200%" }}>
        <TextField
          sx={{ width: 350, margin: "10px auto" }}
          type="text"
          placeholder="search"
          onChange={handleFilter}
        />
      </div>
      <Stack
        spacing={2}
        sx={{
          overflow: "auto",
          maxHeight: 500,
        }}
      >
        {filteredData.length != 0 && (
          <Paper sx={{ textAlign: "left" }}>
            {filteredData.map((value, key) => {
              return (
                <Link
                  to={`${API}/user/` + value._id}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
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
              );
            })}
          </Paper>
        )}
      </Stack>
    </div>
  );
};

{
  /* <div
          style={{
            marginTop: "2%",
            width: "300px",
            height: "200px",
            backgroundColor: "white",
            overflow: "hidden",
            overflowY: "auto",
            marginBottom: "2%",
          }}
        > */
}
export default SearchBar;
