import React, { useState, useEffect } from 'react';
import './Latency.css'
import axios from 'axios';
import Header1 from "./Header";

const LatencyTable = () => {
  const [latencyData, setLatencyData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); 
  };

  useEffect(() => {
    const fetchLatencyData = async () => {
      const response = await axios.get('https://Avail-tools.brightlystake.com/api/Avail/rpclatency');
      setLatencyData(response.data);
    };
    fetchLatencyData();
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = sortField ? [...latencyData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  }) : latencyData;

  function convertTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    console.log(formattedDate);
    return formattedDate;

  }

  return (
    <div>
      <Header1 />
      <h3 className='header1' > Latency for RPC endpoints 
      <p></p>
        <a target="_blank" rel="noopener noreferrer" href='https://medium.com/@staking7pc/approach-to-mesure-latency-for-Avail-rpc-endpoints-d15e16a8679d'>Approach</a></h3>
      <h4 className='header1'>Mocha Query used: endpoint/block_results?height=261988</h4>
      <table id='validators1'>
        <thead>
          <tr className='header'>
            <th onClick={() => handleSort('rpcUrl')}>
              RPC URL {sortField === 'rpcUrl' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('chicago_latency')}>
              Chicago Latency {sortField === 'chicago_latency' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('singapore_latency')}>
              Singapore Latency {sortField === 'singapore_latency' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('germany_latency')}>
              Germany Latency {sortField === 'germany_latency' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('time')}>
              Last checked {sortField === 'time' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            sortedData.map((row) => (
              <tr className={(row.chicago_latency < 1 && row.singapore_latency < 1 && row.germany_latency < 1 && row.chicago_latency != null && row.singapore_latency != null && row.germany_latency != null) ? 'decorate' : "NO"} key={row.rpcUrl}>
                <td class="tooltip" onClick={() => handleCopyClick(row.rpcUrl)}>{row.rpcUrl}
                  <span class="tooltiptext">Click to copy</span>
                </td>
                <td>{row.chicago_latency == null? 'Null': row.chicago_latency.toFixed(2)}</td>
                <td>{row.singapore_latency == null? 'Null': row.singapore_latency.toFixed(2)}</td>
                <td>{row.germany_latency == null? 'Null':row.germany_latency.toFixed(2)}</td>
                <td>{convertTime(row.time)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatencyTable;
