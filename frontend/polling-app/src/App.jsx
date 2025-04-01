import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { Root } from 'postcss'
import React from 'react'
import LoginForm from "./pages/Auth/LoginForm";
import SignUpFrom from "./pages/Auth/SignUpFrom";
import Home from "./pages/Dashboard/Home";
import CreatePoll from "./pages/Dashboard/CreatePoll";
import Mypolls from "./pages/Dashboard/MyPolls";
import Bookmarks from "./pages/Dashboard/Bookmarks";
import VotedPoll from "./pages/Dashboard/VotedPolls";
import UserProvider from "./context/UserContext";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<LoginForm />} />
            <Route path="/signup" exact element={<SignUpFrom />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/create-poll" exact element={<CreatePoll />} />
            <Route path="/my-poll" exact element={<Mypolls />} />
            <Route path="/voted-polls" exact element={<VotedPoll />} />
            <Route path="/bookmarked-polls" exact element={<Bookmarks />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App;

// Define the Root components the handel the inintial rediact

const Root = () => {
  //cheack if the tokens exits in localstorage
  const isAuthenticated = !!localStorage.getItem("token");
  //Readrect the Dashboead if Authenticated otherwise to login
  return isAuthenticated ? (
    <Navigate to="/Dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}