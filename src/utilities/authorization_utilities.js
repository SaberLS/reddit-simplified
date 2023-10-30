const Buffer = require('buffer/').Buffer 

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }


export async function redirectToAuthCodeFlow(client_id) {
    const verifier = generateRandomString(16);
    localStorage.setItem("verifier", verifier);
  
    const params = new URLSearchParams();
      params.append("client_id", client_id);
      params.append("response_type", "code");
      params.append("state", verifier)
      params.append("redirect_uri", "http://127.0.0.1:3000/authorize_callback");
      params.append("duration", "permanent");
      params.append("scope", "identity");
  
      document.location = `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
  }
  

export async function getAccessToken(client_id, code ,client_secret) {
    const verifier = localStorage.getItem("verifier");
  
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    console.log(code);
    params.append("code", code);
    params.append("redirect_uri", "http://127.0.0.1:3000/authorize_callback");
  
    const credentials = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  
    const result = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`
        },
        body: params
    });
  
    const { access_token } = await result.json();
    console.log(access_token);
    return access_token;
  }