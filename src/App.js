import React from "react";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Newsfeed from "./post/Newsfeed";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import { Route, Routes } from "react-router-dom";
import FindPeople from "./user/FindPeople";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/user/edit/:userId" element={<EditProfile />} />
        <Route path="/users/findpeople/:userId" element={<FindPeople />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
