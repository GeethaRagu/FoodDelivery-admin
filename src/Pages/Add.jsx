import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const OnChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    await axios
      .post(`${apiurl}/api/food/add`, formData)
      .then((res) => {
        //console.log(res.data);
        toast.success("Food Item added successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col p-5 w-lvh">
      <form onSubmit={handleSubmit}>
        <div className="md:grid md:grid-cols-2 pb-2">
          <p>Product Image</p>
          <label for="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="border-2 border-gray-300 w-25 h-25"
            />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            hidden
            required
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
        </div>

        <div className="md:grid md:grid-cols-2 pb-2">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            required
            className="w-full border-2 border-gray-300 rounded-md h-10  text-black"
            onChange={OnChangeHandler}
            value={data.name}
          />
        </div>
        <div className="md:grid md:grid-cols-2 pb-2">
          <p>Product Description</p>
          <textarea
            rows="10"
            name="description"
            placeholder="Write content here"
            required
            className="w-full border-2 h-30 border-gray-300 rounded-md text-black"
            onChange={OnChangeHandler}
            value={data.description}
          />
        </div>

        <div className="md:grid md:grid-cols-2 pb-2 pr-2">
          <p className="pt-3">Product Category</p>
          <select
            id="category"
            name="category"
            onChange={OnChangeHandler}
            className="border-2 border-gray-300 p-2 mt-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="md:grid md:grid-cols-2 pb-2">
          <p className="pt-3">Product Price</p>
          <input
            type="number"
            name="price"
            placeholder="Type here"
            className="w-full border-2 border-gray-300 h-10 rounded-md text-black mt-1"
            onChange={OnChangeHandler}
            value={data.price}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
