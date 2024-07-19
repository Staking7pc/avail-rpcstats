import "./Individual.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, Tooltip, XAxis, YAxis } from "recharts";
import { useParams } from "react-router-dom";

export default function Individual() {

  const [consts, setConsts] = useState([]);
  const url = useParams();

  function setGeneralConsts() {
    axios.get("https://collatorstats.brightlystake.com/query/axelar/getIndividualValidator/" + url.valoper)
      .then((res) => {
        setConsts(res.data.data)
        console.log(res.data.data)
      });
  }

  useEffect(() => {
    setGeneralConsts();
  }, [])

  return (
    <div className="Individual">
    <h3 className="chart-header"> Daily APY Historical Data</h3>
    <BarChart width={600} height={400} data={consts}>
      <Tooltip />
      <XAxis dataKey='time' />
      <YAxis domain={[0,50]}/>
      <Bar dataKey="one_day" fill="#76D7C4" />
    </BarChart>
    </div>
  );
}
