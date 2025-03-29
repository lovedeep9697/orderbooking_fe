import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { useNavigate } from "react-router-dom";

const HomePage = ({ accessToken }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const placeOrders = async () => {
    navigate("/placeorder");
  };

  const showTradeHistory = async () => {
    navigate("/tradehistory");
  };

  const placeOrder = (evt) => {
    placeOrders();
  };

  const onClickSeeHistory = (evt) => {
    showTradeHistory();
  };

  const fetchOrders = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/orderbook/orders/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseBody = await response.json();
    setOrders(Object.values(responseBody));
  };

  // Check if the user is logged in else navigate back to login page.
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
    fetchOrders();
  }, []);

  return (
    <div>
      <OrderTable orderData={orders}></OrderTable>
      <button onClick={placeOrder}>Place Order</button>
      <button onClick={onClickSeeHistory}>Check History</button>
    </div>
  );
};

export default HomePage;
