import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm.js";
import RefreshToken from "./components/RefreshToken.js";
import HomePage from "./components/HomePage";
import Orderplacement from "./components/Orderplacement";
import TradeHistory from "./components/TradeHistory";
import SignupForm from "./components/SignupForm";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(window.localStorage.getItem("access_token"));
    setRefreshToken(window.localStorage.getItem("refresh_token"));
  });

  // Action Handlers
  const handleLogin = (evt) => {
    setAccessToken(evt.access_token);
    setRefreshToken(evt.refresh_token);

    // Storing access token in local storage for further use throughout the session.
    window.localStorage.setItem("access_token", evt.access_token);
    window.localStorage.setItem("refresh_token", evt.refresh_token);
    navigate("/");
  };

  const handleRefresh = (evt) => {
    setAccessToken(evt.access_token);
    window.localStorage.setItem("access_token", evt.access_token);
  };

  const handleOrderPlacement = (evt) => {
    navigate("/");
  };

  const handleSignup = (evt) => {
    console.log("navigating");
    navigate("/login");
  };

  return (
    <div className="App">
      <h2>Order booking NK</h2>
      <Routes>
        {/* "/" route serves as home page with list of all active orders in the market */}
        <Route path="/" element={<HomePage accessToken={accessToken} />} />
        {/* "/login" route serves as login page */}
        <Route
          path="/login"
          element={
            <LoginForm onLogin={handleLogin} accessToken={accessToken} />
          }
        />
        <Route
          path="/signup"
          element={<SignupForm onSignup={handleSignup} />}
        />
        {/* "/placeorder" route serves as order placement page */}
        <Route
          path="/placeorder"
          element={
            <Orderplacement
              onOrderPlacement={handleOrderPlacement}
              accessToken={accessToken}
            />
          }
        />
        {/* "/placeorder" route serves as trade history view */}
        <Route
          path="/tradehistory"
          element={<TradeHistory accessToken={accessToken} />}
        />
      </Routes>

      <RefreshToken refreshToken={refreshToken} onRefresh={handleRefresh} />
    </div>
  );
}

export default App;
