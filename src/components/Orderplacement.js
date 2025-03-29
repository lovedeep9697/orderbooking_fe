import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";

const Orderplacement = ({ onOrderPlacement, accessToken }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [token, setToken] = useState("");
  const [orderType, setOrderType] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/orderbook/orders/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          price: price,
          quantity: quantity,
          token: token,
          order_type: orderType,
        }),
      }
    );
    const responseBody = await response.json();

    if (response.status == 201) {
      onOrderPlacement();
      return;
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, [accessToken]);

  return (
    <div>
      <form id="orderplacement" onSubmit={onSubmitHandler}>
        <div>
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: 300, height: 20 }}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: 300, height: 20 }}
          />
        </div>
        <div>
          <select onChange={(e) => setOrderType(e.target.value)}>
            <option value="bid">Bid</option>
            <option value="ask">Ask</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Token"
            onChange={(e) => setToken(e.target.value)}
            style={{ width: 300, height: 20 }}
          />
        </div>
        <div>
          <button type={"submit"} style={{ backgroundColor: "grey" }}>
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Orderplacement;
