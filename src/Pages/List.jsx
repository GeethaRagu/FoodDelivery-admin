import axios from "axios";
import React, { useEffect, useState } from "react";

const List = () => {
  const [list, setList] = useState([]);
  //console.log("res", list);
  const apiurl = import.meta.env.VITE_API_URLKEY;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios
      .get(`${apiurl}/api/food/list`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = async (itemid) => {
    //console.log(itemid);
    await axios
      .post(`${apiurl}/api/food/remove`, { id: itemid });
      await fetchData();
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold pb-5">All Food Items</h2>
      <div className="grid grid-cols-6 justify-between items-center font-semibold w-screen border-2 border-b-amber-600 border-t-0 border-r-0 border-l-0">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>

      <div>
        {list.map((element, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-6 justify-between pb-2 pt-2 items-center border-2 border-b-amber-600 border-t-0 border-r-0 border-l-0"
            >
              <img
                src={`${apiurl}/images/${element.image}`}
                className="w-10 h-10"
              />
              <p>{element.name}</p>
              <p>{element.category}</p>
              <p>₹{element.price}</p>

              <p
                className="text-red-600 text-2xl font-bold cursor-pointer"
                onClick={() => handleDelete(element._id)}
              >
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
