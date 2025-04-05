import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  //console.log(orders);
  const apiurl = import.meta.env.VITE_API_URLKEY;

  useEffect(() => {
    fetchallOrders();
  }, []);

  const fetchallOrders = async () => {
    const response = await axios.get(`${apiurl}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async(event,orderId) =>{
    const response = await axios.post(`${apiurl}/api/order/status`,{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchallOrders();
    } else {
      toast.error("Error");
    }

   
  }
  return (
    <div>
      <h3></h3>
      <div>
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] grid-cols-[1fr_2fr_1fr] items-start gap-6 border border-amber-700 p-5 mt-7 mb-7 text-gray-500"
            >
              <img src={assets.parcel_icon} />
              <div>
                <p className="font-semibold">
                  {order.items.map((item, index) => {
                    if (index == order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + " , ";
                    }
                  })}
                </p>

                <p className="font-semibold mt-5 mb-2">
                  {order.address.firstname + " " + order.address.lastname}
                </p>
                <div className="mb-2">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.contactnumber}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="border-1 border-amber-700 bg-amber-100 p-1 outline-0">
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
