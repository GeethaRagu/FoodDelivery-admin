import React from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Add = React.lazy(() => import("./Pages/Add"));
const List = React.lazy(() => import("./Pages/List"));
const Orders = React.lazy(() => import("./Pages/Orders"));
const App = () => {
  return (
    <div>
      <div>
        <ToastContainer></ToastContainer>
      </div>
      <div>
        <BrowserRouter>
          <Navbar />
          <hr />
          <div className="flex flex-row">
            <div>
              <Sidebar />
            </div>
            <div>
              <Routes>
                <Route
                  path="/add"
                  element={
                    <React.Suspense fallback={<div>Loading..</div>}>
                      <Add />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/list"
                  element={
                    <React.Suspense fallback={<div>Loading..</div>}>
                      <List />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <React.Suspense fallback={<div>Loading..</div>}>
                      <Orders />
                    </React.Suspense>
                  }
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
