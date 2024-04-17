import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import  DogDetails  from "./DogDetails";
import AddADog from "./AddADog";
import Walkers from "./Walkers";
import Cities from "./Cities";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="dogs/:dogId" element={<DogDetails/>}></Route>
        <Route path="newDog" element={<AddADog/>}></Route>
        <Route path="walkers" element={<Walkers/>}></Route>
        <Route path="cities" element={<Cities/>}></Route>
      </Route>
      
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
