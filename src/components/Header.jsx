import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div>
      <ul>
        <li className='li'>
          <a class="" href="https://brightlystake.com">Brightlystake</a>
        </li>
        <li className='li-r'><a class="active" href="/rpc-status">RPC</a></li>
        <li className='li-r'><a class="active" href="/wss-status">WSS</a></li>
        {/* <li className='li-r'><a class="active" href="/staking">Staking</a></li> */}

      </ul>
    </div>
  )
}
