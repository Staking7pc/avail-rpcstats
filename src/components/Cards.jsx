    import React from 'react'
    import './Cards.css'
    export default function Cards() {
        return (

            <body>
                <div class="container">
                    <div class="heading">
                        <h4>RPC Stats for Avail</h4>
                    </div>
                    <div class="row">
                        <div class="card">
                            <div class="card-header">
                                <h3>Add your endpoint</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    Please reachout to us on the link below
                                </p>
                                <a target="_blank" rel="noopener noreferrer" href="https://t.me/+tPE_9kOuDAJiOTk1" class="btn">Contact us</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3>Report problems</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    If you see a discrepancy please report to us.
                                </p>
                                <a target="_blank" rel="noopener noreferrer" href="https://t.me/+viPCrANM-mgwZjA0" class="btn">Report</a>
                            </div>
                        </div>                        
                        <div class="card">
                            <div class="card-header">
                                <h3>Update Frequency</h3>
                            </div>
                            <div class="card-body">
                                <p>
                                    We run every 5 minute health, syncState and nodeRoles and publish the results.
                                </p>
                                <a target="_blank" rel="noopener noreferrer" href="" class="btn">Every 5 mins</a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        )
    }
