import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RpcStatus.css';
import Header1 from './Header';
import Cards from './Cards';
import identity from './identity.json'; // Import the JSON file

function RpcStatus(props) {

  const headers = [
    { key: "rpc_endpoint", label: "END POINT" },
    { key: "role", label: "VERSION" },    
    { key: "moniker", label: "MONIKER" }, // New header for Moniker
    { key: "issynching", label: "IN SYNC?" },
    { key: "peers", label: "PEERS" },
    { key: "currentblock", label: "LATEST_BLOCK" },
    { key: "state_pruning", label: "STATE PRUNED?" },
    { key: "block_pruning", label: "BLOCK PRUNED?" },
    { key: "network", label: "NETWORK" },
  ];

  const [rpcDetails, setRpcDetails] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [time1, setTime] = useState(); // CamelCased
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('Avail DA Mainnet');
  
  // Check if there are any records with no network ("" or "Unknown" or other missing data)
  const hasNoResponse = rpcDetails.some(detail => !detail.network || detail.network === "Unknown");

  // Define the expected networks explicitly and conditionally include "NoResponse"
  const expectedNetworks = ['Avail DA Mainnet', 'Avail Turing Network'];
  if (hasNoResponse) {
    expectedNetworks.push('NoResponse'); // Only add "NoResponse" if relevant
  }

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  useEffect(() => {
    axios.get('https://avail-tools.brightlystake.com/api/avail/rpc-status')
      .then(res => {
        setRpcDetails(res.data);
        setTime(res.data[2].updated_at); // Renamed to setTime
      })
      .catch(err => {
        console.error("Error fetching RPC details:", err);
      });
  }, []);

  return (
    <div className="table-container">
      <div key={selectedNetwork}>
        <Header1 />
        <Cards />
        <h4 className='header1'> Last checked on {time1} UTC</h4>
        <div className="network-buttons">
          {expectedNetworks.map(network => (
            <button
              key={network} // Updated the key to avoid duplication
              onClick={() => setSelectedNetwork(network)}
              className={selectedNetwork === network ? 'active' : ''}
            >
              {network === 'Avail DA Mainnet' ? 'Mainnet' : 
                network === 'Avail Turing Network' ? 'Testnet' : 'NoResponse'}
            </button>
          ))}
        </div>
        
        <table id='validators' key={`${selectedNetwork}-${sortedColumn}-${order}`}>
          <thead>
            <tr className='header'>
              {headers.map((row) => (
                <td key={row.key}>{row.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rpcDetails
              .filter(detail => {
                // "NoResponse" filter: Check for missing or incomplete details
                if (selectedNetwork === 'NoResponse') {
                  return !detail.network || detail.network === "Unknown"; 
                }
                return detail.network === selectedNetwork; // Filter for selected network
              })
              .map(val => {
                const moniker = identity[val.rpc_endpoint] || 'Unknown'; // Get moniker from identity.json
                return (
                  <tr className={(val.network === "") ? "error" : 'NO'} key={val.rpc_endpoint}>
                    <td className="tooltip" onClick={() => handleCopyClick(val.rpc_endpoint)}>
                      {val.rpc_endpoint}
                      <span className={`tooltiptext ${copiedUrl === val.rpc_endpoint ? 'copied' : ''}`}>
                        {copiedUrl === val.rpc_endpoint ? 'Copied!' : 'Click to copy'}
                      </span>
                    </td>
                    <td>{val.role}</td> 
                    <td>{moniker}</td> 
                    <td className={(val.issynching === "" && val.network !== "") ? "InActive" : (val.issynching === "true") ? "InActive" : "Active"}>
                      {(val.issynching === "" && val.network === "") ? "--" : (val.issynching === "true") ? "Not in Sync" : "Yes"}
                    </td>
                    <td className={val.peers < 5 ? 'InActive' : 'NO'}>{val.peers}</td>
                    <td className={val.currentblock === 'None' ? 'InActive' : 'NO'}>{val.currentblock}</td>
                    <td className={val.state_pruning === 'YES' ? 'InActive' : 'Active'}>{val.peers !== "" ? val.state_pruning : ""}</td>
                    <td className={val.block_pruning === 'YES' ? 'InActive' : 'Active'}>{val.peers !== "" ? val.block_pruning : ""}</td>
                    <td>{val.network}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RpcStatus;
