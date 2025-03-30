import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(email);
    console.log(username);
    console.log(password);
    const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.status != 201) {
      // Handle error
      return;
    }
    const responseBody = await response.json();
    console.log("navigating");
    onSignup();
  };

  return (
    <div>
      <form id="signupform" onSubmit={onSubmitHandler}>
        <div>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: 300, height: 20 }}
          />
        </div>
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
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
