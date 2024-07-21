import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Individual from "./components/Individual";
import RpcStatus from "./components/RpcStatus";
import WssStatus from "./components/WssStatus";
import APIStatus from "./components/APIStatus";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Latency from "./components/Latency";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <Router>
    <React.Fragment>
      <Routes>
        <Route path="/" element={<RpcStatus/>} />
        <Route path="/validator/:valoper" element={<Individual/>} />
        <Route path="/rpc-status" element={<RpcStatus/>} />
        <Route path="/wss-status" element={<WssStatus/>} />
        <Route path="/latency" element={<Latency/>} />
      </Routes>
    </React.Fragment>
  </Router>

);
