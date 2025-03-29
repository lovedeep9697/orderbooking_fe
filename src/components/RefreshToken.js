import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RefershToken = ({ refreshToken, onRefresh }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!refreshToken) {
        return;
      }
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (response.status != 200) {
        navigate("/login");
        return;
      }
      const responseBody = await response.json();
      onRefresh({
        access_token: responseBody["access"],
      });
    }, 3 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshToken]);

  return <></>;
};

export default RefershToken;
