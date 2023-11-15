const Buffer = require("buffer/").Buffer;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const client_id = process.env.REACT_APP_CLIENT_ID;

export const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export function redirectToAuthCodeFlow() {
  const verifier = generateRandomString(16);
  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("response_type", "code");
  params.append("state", verifier);
  params.append("redirect_uri", "http://127.0.0.1:3000/authorize_callback");
  params.append("duration", "permanent");
  params.append("scope", "identity vote");

  window.location.assign(`https://www.reddit.com/api/v1/authorize?${params.toString()}`);
}

const checkVerifier = () => {
  const verifier = localStorage.getItem("verifier");
  const params = new URLSearchParams(window.location.search);
  const state = params.get("state");
  //console.log("state: ", state);
  //console.log("verifier: ", verifier);

  if (state === verifier) {
    //console.log("checkVerifier:", true);
    return true;
  }
  return false;
};

export async function getAccessToken(code) {
  if (checkVerifier()) {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://127.0.0.1:3000/authorize_callback");

    const credentials = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );

    const result = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      body: params,
    });
    const result_json = await result.json();

    //console.log("result_json return :", result_json);
    return result_json;
  }
  return console.error("checkVerifier: ", checkVerifier());
}
