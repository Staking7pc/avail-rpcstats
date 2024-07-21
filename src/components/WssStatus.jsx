import React, { useState, useEffect } from "react";
import "./WssStatus.css";
import { ApiPromise, WsProvider } from "@polkadot/api";

const WssStatus = () => {
  const [endpointsStatus, setEndpointsStatus] = useState([]);

  const endpoints = [
    "wss://turing-testnet.avail-rpc.com",
    "wss://avail-turing.public.blastapi.io",
    "wss://avail-turing-rpc.publicnode.com",
    "wss://turing.public.curie.radiumblock.co",
    "wss://avail-turing-rpc.openbitlab.com",
    "wss://avail-turing.bountyblok.io",
    "wss://rpc-t.avail.nodestake.org"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const results = [];
      for (const endpoint of endpoints) {
        let success = false;
        let errorMessages = [];
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const wsProvider = new WsProvider(endpoint);
            const api = await ApiPromise.create({ provider: wsProvider });

            // If we succeed, disconnect and exit the retry loop
            await api.disconnect();
            success = true;
            results.push({ endpoint, status: "Active" });
            break;
          } catch (error) {
            errorMessages.push(`Attempt ${attempt + 1}: ${error.message}`);
            if (attempt === 2) { // Last attempt
              results.push({ endpoint, status: "Inactive", error: errorMessages.join("; ") });
            }
          }
        }
      }
      setEndpointsStatus(results);
    };

    fetchData();
  }, []);

  return (
    <div className="wssStatus">
      <h1>WebSocket Endpoint Status</h1>
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Error Messages</th>
          </tr>
        </thead>
        <tbody>
          {endpointsStatus.length > 0 ? (
            endpointsStatus.map((endpoint, index) => (
              <tr key={index}>
                <td>{endpoint.endpoint}</td>
                <td>{endpoint.status}</td>
                <td>{endpoint.error || "None"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Checking endpoints...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WssStatus;
