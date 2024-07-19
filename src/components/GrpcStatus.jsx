import React, { useState, useEffect } from 'react';
import './Grpcstatus.css'
import axios from 'axios';
import Header1 from "./Header";

const GrpcStatus = () => {
  const [latencyData, setLatencyData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  useEffect(() => {
    const fetchLatencyData = async () => {
      const response = await axios.get('https://Avail-tools.brightlystake.com/api/Avail/grpcstatus');
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
      <h3 className='header1' > gRPC Stats for Avail (Mainnet)
        <p></p>
        <a target="_blank" rel="noopener noreferrer" href='https://medium.com/@staking7pc/grpc-status-for-Avail-endpoints-190a16f7d741'>Approach</a></h3>
      <h4 className='header1'>Method used: We ran "grpcurl -plaintext endpoints list" to see if we get a response</h4>
      <table id='validators1'>
        <thead>
          <tr className='header'>
            <th onClick={() => handleSort('grpc_url')}>
              gRPC URL {sortField === 'grpc_url' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('status')}>
              Working URL {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('time')}>
              Last Checked {sortField === 'time' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {
            sortedData.map((row) => (
              <tr className={(row.status == 'FAIL') ? 'error' : "NO"} key={row.grpc_url}>
                <td>{row.grpc_url}</td>
                <td className="tooltip" onClick={() => handleCopyClick(row.status)}>
                  {row.status}
                  <span className={`tooltiptext ${copiedUrl === row.status ? 'copied' : ''}`}>
                    {copiedUrl === row.status ? 'Copied!' : 'Click to copy'}
                  </span>
                </td>
                <td>{row.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrpcStatus;
