import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ProductDetails from "./ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/products/:productId',
    element: <ProductDetails/>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
