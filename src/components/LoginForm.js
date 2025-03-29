import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin, accessToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
      return;
    }
  }, [accessToken]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.status != 200) {
      // Handle error
      return;
    }
    const responseBody = await response.json();
    onLogin({
      access_token: responseBody["access"],
      refresh_token: responseBody["refresh"],
    });
  };

  return (
    <div>
      <form id="loginform" onSubmit={onSubmitHandler}>
        <div>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: 300, height: 20 }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: 300, height: 20 }}
          />
        </div>
        <div>
          <button type={"submit"} style={{ backgroundColor: "grey" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
