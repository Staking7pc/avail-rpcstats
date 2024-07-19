import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RpcStatus.css';
import Header1 from './Header';
import Cards from './Cards';

function RpcStatus(props) {

  const headers = [
    { key: "rpc_endpoint", label: "END POINT" },
    { key: "issynching", label: "IN SYNC?" },
    { key: "peers", label: "PEERS" },
    { key: "startingblock", label: "EARLIEST_BLOCK" },
    { key: "currentblock", label: "LATEST_BLOCK" },
    { key: "network", label: "NETWORK" },
    { key: "role", label: "NODE_TYPE" },
  ];

  const [rpcDetails, setRpcDetails] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [time1, setTime] = useState(); // CamelCased
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('Avail Turing Network');
  let networks = [...new Set(rpcDetails.map(detail => detail.network))];

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };


  useEffect(() => {
    axios.get('https://avail-tools.brightlystake.com/api/avail/rpc-status')
      .then(res => {
        setRpcDetails(res.data);
        setTime(res.data[2].timestamp); // Renamed to setTime
      })
      .catch(err => {
        console.error("Error fetching RPC details:", err);
        // Optionally, you can set some error state to show an error to the user
      });
  }, []);

  return (
    <div className="table-container">

      <div key={selectedNetwork}>
        <Header1 />
        <Cards />
        <h4 className='header1'> Last checked on {time1} UTC</h4>
        <div className="network-buttons">
          {networks.map(network => (
            <button
              key={network}
              onClick={() => setSelectedNetwork(String(network))}
              className={selectedNetwork === String(network) ? 'active' : ''}
            >
              {network == 'None' ? 'Not-reachable Endpoints' : network == 'Avail Turing Network' ? 'Testnet':network == 'Avail Mainnet' ? 'Mainnet':network}
            </button>

          ))}
          <button onClick={() => setSelectedNetwork(null)}>Show All</button>
         
        </div>
        <table id='validators' key={`${selectedNetwork}-${sortedColumn}-${order}`}>

          <thead>
            <tr className='header'>
              {headers.map((row) => {
                return <td>{row.label}</td>
              })}
            </tr>
          </thead>
          <tbody>
            {
              rpcDetails
                .filter(detail => !selectedNetwork || String(detail.network) === String(selectedNetwork))
                .map(val => {
                  return (
                    <tr className={(val.issynching != "") ? "error" : val.currentblock == 'None' ? 'error' : 'NO'} key={val.moniker}>
                      <td className="tooltip" onClick={() => handleCopyClick(val.rpc_endpoint)}>
                        {val.rpc_endpoint}
                        <span className={`tooltiptext ${copiedUrl === val.rpc_endpoint ? 'copied' : ''}`}>
                          {copiedUrl === val.rpc_endpoint ? 'Copied!' : 'Click to copy'}
                        </span>
                      </td>
                      <td className={(val.issynching === "" && val.network!= "")? "Active" : "InActive"}>{(val.issynching ==="" && val.network== "") ? "--" : "Yes"}</td>
                      <td className={val.peers < 10 ? 'green' : 'NO'}>{val.peers}</td>
                      <td>{val.startingblock}</td>
                      <td className={val.currentblock == 'None' ? 'InActive' : 'NO'}>{val.currentblock}</td>
                      <td className={val.network === "blockspacerace-0" ? "Active" : "InActive"}>{val.network}</td>
                      <td className={val.role}>{val.role}</td>
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

export default RpcStatus

