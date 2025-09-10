import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import "./OrdersPage.css";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };

    fetchOrderData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="../public/images/orders-favicon.png"
      />

      <Header cart={cart} />

      <OrdersGrid orders={orders} />
    </>
  );
}
