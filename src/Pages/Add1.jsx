import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";

const Add = () => {
  const [image, setImage] = useState(false);

  const initialValues = {
   
    name: "",
    description: "",
    category: "",
    price: "",
  };

  const validationschema = Yup.object().shape({
  
    name: Yup.string().required("Field is empty"),
    description: Yup.string().required("Field is empty"),
    category: Yup.string().required("Field is empty"),
    price: Yup.string().required("Field is empty"),
  });
  const apiurl = import.meta.env.VITE_API_URLKEY;
  const handleSubmit = async (values) => {
    // console.log(values.name);
    // console.log(image.name);
  const formData = new FormData();
  formData.append("name",values.name);
  formData.append("description",values.description);
  formData.append("category",values.category);
  formData.append("price",Number(values.category));
  formData.append("image",image.name);

    await axios
    .post(`${apiurl}/api/food/add`,formData)
    .then((res)=>{console.log(res.data)})
    .catch((error)=>console.log(error))
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="flex flex-col p-5">
      <div className="md:grid md:grid-cols-3 pb-2">
        <p>Product Image</p>

        <input
          type="file"
          name="image"
          required
          placeholder=""
          className="w-full border-2 border-gray-300 h-10  text-black"
          onChange={(event) => {
            setImage(event.currentTarget.files[0]);
          }}
        />
      </div>
      <Formik>
        <Form onSubmit={formik.handleSubmit}>
          <div className="md:grid md:grid-cols-2 pb-2">
            <p>Product Name</p>
            <Field
              type="text"
              name="name"
              placeholder="Type here"
              className="w-full border-2 border-gray-300 rounded-md h-10  text-black"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
          </div>
          <div className="md:grid md:grid-cols-2 pb-2">
            <p>Product Description</p>
            <Field
              as="textarea"
              name="description"
              placeholder="Type here"
              className="w-full border-2 h-30 border-gray-300 rounded-md text-black"
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.errors.description}
            />
            {formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="md:grid md:grid-cols-2 ">
            <div className="md:grid md:grid-cols-2 pb-2 pr-2">
              <p className="pt-3">Product Category</p>
              <Field
                as="select"
                id="category"
                name="category"
                className="border-2 border-gray-300 p-2 mt-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
              >
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </Field>
              {formik.errors.category ? (
                <div>{formik.errors.category}</div>
              ) : null}
            </div>
            <div className="md:grid md:grid-cols-2 pb-2">
              <p className="pt-3">Product Price</p>
              <Field
                type="number"
                name="price"
                placeholder="Type here"
                className="w-full border-2 border-gray-300 h-10 rounded-md text-black mt-1"
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.errors.price}
              />
              {formik.errors.price ? <div>{formik.errors.price}</div> : null}
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
          >
            ADD
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Add;
