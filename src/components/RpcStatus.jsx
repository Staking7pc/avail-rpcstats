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
    { key: "currentblock", label: "LATEST_BLOCK" },
    { key: "state_pruning", label: "STATE PRUNED?" },
    { key: "block_pruning", label: "BLOCK PRUNED?" },
    { key: "network", label: "NETWORK" },
    { key: "role", label: "NODE_TYPE" },
  ];

  const [rpcDetails, setRpcDetails] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [time1, setTime] = useState(); // CamelCased
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('Avail DA Mainnet');
  let networks = [...new Set(rpcDetails.map(detail => detail.network))];
  console.log(networks)
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
              key={'network'}
              onClick={() => setSelectedNetwork(String(network))}
              className={selectedNetwork === String(network) ? 'active' : ''}
            >
              {(network === 'Avail Turing Network') ? 'Testnet' : (network === 'Avail DA Mainnet') ? 'Mainnet' : "All"}
            </button>
            
          ))}
          {/* <button onClick={() => setSelectedNetwork()}>Show All</button> */}
        </div>
        <table id='validators' key={`${selectedNetwork}-${sortedColumn}-${order}`}>

          <thead>
            <tr className='header'>
              {headers.map((row) => {
                return <td key={row.key}>{row.label}</td>
              })}
            </tr>
          </thead>
          <tbody>
            {
              rpcDetails
                .filter(detail => selectedNetwork === "" || (selectedNetwork === 'Not-reachable Endpoints' && detail.network === "") || (selectedNetwork !== 'Not-reachable Endpoints' && String(detail.network) === String(selectedNetwork)))
                .map(val => {
                  return (
                    <tr className={(val.network == "") ? "error": 'NO'} key={val.rpc_endpoint}>
                      <td className="tooltip" onClick={() => handleCopyClick(val.rpc_endpoint)}>
                        {val.rpc_endpoint}
                        <span className={`tooltiptext ${copiedUrl === val.rpc_endpoint ? 'copied' : ''}`}>
                          {copiedUrl === val.rpc_endpoint ? 'Copied!' : 'Click to copy'}
                        </span>
                      </td>
                      <td className={(val.issynching === "" && val.network !== "") ? "InActive" : (val.issynching === "true")? "InActive":"Active"}>{(val.issynching === "" && val.network === "") ? "--" : (val.issynching === "true")? "Not in Sync":"Yes"}</td>
                      <td className={val.peers < 5 ? 'InActive' : 'NO'}>{val.peers}</td>
                      <td className={val.currentblock === 'None' ? 'InActive' : 'NO'}>{val.currentblock}</td>
                      <td className={val.state_pruning === 'YES' ? 'InActive' : 'Active'}>{val.peers !== "" ? val.state_pruning : ""}</td>
                      <td className={val.block_pruning === 'YES' ? 'InActive' : 'Active'}>{val.peers !== "" ? val.block_pruning : ""}</td>
                      <td>{val.network}</td>
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

export default RpcStatus;
