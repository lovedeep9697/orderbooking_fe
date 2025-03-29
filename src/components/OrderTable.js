import React from "react";

const OrderTable = ({ orderData }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Order Book</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Order Type</th>
            <th className="border border-gray-300 px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr
              key={order.id}
              className={
                order.order_type === "bid" ? "bg-green-100" : "bg-red-100"
              }
            >
              <td
                className="border border-gray-300 px-4 py-2"
                style={{ height: 10 }}
              >
                {order.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.quantity}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 font-semibold ${
                  order.order_type === "bid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {order.order_type}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
