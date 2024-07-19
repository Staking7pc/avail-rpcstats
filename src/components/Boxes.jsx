import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Boxes.css'
export default function Boxes() {

    const [consts, setConsts] = useState([]);
    const [getInflation, setgetInflation] = useState([]);


    async function setGeneralConsts() {
        axios.get("https://collatorstats.brightlystake.com/query/axelar/getConsts")
            .then((res) => {
                setConsts(res.data.data[0])
                console.log(res.data.data[0])
            });
    }
    async function setGeneralConsts1() {

        axios.get("https://collatorstats.brightlystake.com/query/axelar/getInflation")
            .then((res) => {
                setgetInflation(res.data.data[0])
                console.log(res.data.data[0])
            });
    }

    useEffect(() => {
        setGeneralConsts();
        setGeneralConsts1();
    }, [])

    return (
        <body>
            <div class="container">
                <div class="heading">
                    <h4>AXELAR VALIDATOR STATS</h4>
                </div>
                <div class="row">
                    <div class="box">
                        <div class="box-header">
                            <h3>Total Issuance</h3>
                        </div>
                        <div class="box-body">
                            <h3>{parseFloat(consts.totalIssuance).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AXL</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>External chains</h3>
                        </div>
                        <div class="box-body">
                            <h3>{consts.external_chain}</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Validators</h3>
                        </div>
                        <div class="box-body">
                            <h3>{consts.max_validators}</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Unstake duration</h3>
                        </div>
                        <div class="box-body">
                            <h3>{consts.unstake_duration} days</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Max APY</h3>
                        </div>
                        <div class="box-body">
                            <h3>{consts.max_apy}%</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Total Staked</h3>
                        </div>
                        <div class="box-body">
                            <h3>{parseFloat(consts.total_staked).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AXL</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Min Commission</h3>
                        </div>
                        <div class="box-body">
                            <h3>5%</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Slashing</h3>
                        </div>
                        <div class="box-body">
                            <h3>Yes</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Rewards distribution</h3>
                        </div>
                        <div class="box-body">
                            <h3>Every block</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Inflation</h3>
                        </div>
                        <div class="box-body">
                            <h3>{getInflation.inflation}%</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Every day Emission</h3>
                        </div>
                        <div class="box-body">
                            <h3>~ {parseFloat(((parseFloat(consts.totalIssuance)) * (getInflation.inflation / 100)) / 365).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} AXL</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>External chain Inflation</h3>
                        </div>
                        <div class="box-body">
                            <h3>{getInflation.External}%</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Base Inflation</h3>
                        </div>
                        <div class="box-body">
                            <h3>{getInflation.Base}%</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Multi party Inflation</h3>
                        </div>
                        <div class="box-body">
                            <h3>{getInflation.multisign}% of Base</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="box-header">
                            <h3>Last updated (UTC)</h3>
                        </div>
                        <div class="box-body">
                            <h3>{String(getInflation.time).slice(0, 4)}-{String(getInflation.time).slice(4, 6)}-{String(getInflation.time).slice(6, 8)} {String(getInflation.time).slice(8, 10)}:{String(getInflation.time).slice(10, 12)}:{String(getInflation.time).slice(12, 14)}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
