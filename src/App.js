import React from 'react';
import './App.css';
import { 
  redirectToAuthCodeFlow,
  getAccessToken  } from './utilities/authorization_utilities';

const client_secret = 'DC27Sq9YdQ6cm09gnB5VK3_urt2Wgw'
const client_id = '0JYuNuggtD1BLKWlL2W65g';
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  redirectToAuthCodeFlow(client_id);
} else {
  const accessToken = await getAccessToken(client_id, code, client_secret);
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <></>
      </header>
    </div>
  );
}

export default App;
