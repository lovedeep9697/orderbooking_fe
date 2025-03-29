import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TradeHistory = ({ accessToken }) => {
  const navigate = useNavigate();
  const fetchTradeHistory = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/orderbook/trades/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseBody = await response.json();
    console.log(responseBody);
  };
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchTradeHistory();
  }, []);
  return <div>Trade History</div>;
};

export default TradeHistory;
