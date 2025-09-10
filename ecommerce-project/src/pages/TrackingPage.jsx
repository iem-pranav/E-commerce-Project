import axios from "axios";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}/?expand=products`
      );
      setOrder(response.data);
    };

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  let currentStatus = "";
  if (deliveryPercent < 33) {
    currentStatus = "isPreparing";
  } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    currentStatus = "isShipped";
  } else if (deliveryPercent === 100) {
    currentStatus = "isDelivered";
  }

  return (
    <>
      <title>Tracking</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="../public/images/tracking-favicon.png"
      />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent === 100 ? "Delivered on" : "Arriving on"}{" "}
            {dayjs(orderProduct.estimatedDelivertTimeMs).format("MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">
            Quantity: {orderProduct.product.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={
                currentStatus === "isPreparing"
                  ? `progress-label current-status`
                  : `progress-label`
              }
            >
              Preparing
            </div>
            <div
              className={
                currentStatus === "isShipped"
                  ? `progress-label current-status`
                  : `progress-label`
              }
            >
              Shipped
            </div>
            <div
              className={
                currentStatus === "isDelivered"
                  ? `progress-label current-status`
                  : `progress-label`
              }
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
