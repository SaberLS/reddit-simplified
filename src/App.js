import { useEffect, useRef } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { redirectToAuthCodeFlow } from './utilities/authorization_utilities';
import { selectAccessToken, requestToken } from './features/authorization/authorizationSlice';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';



function App() {


  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const shouldUseEffect = useRef(true); //In the strict mode of React 18 an effect with useEffect seems to be called twice. 
  //To get around this, I used useRef to keep track of a boolean

  useEffect(() => {
    if(shouldUseEffect.current) { //If it’s true, we’ve already been here, and we can return.     
      shouldUseEffect.current = false;  //If it is false, we can perform our fetch and then update the ref.
      if (!code) {
        //console.log("redirect");
        redirectToAuthCodeFlow();
      } else {
        //console.log("dispatch");
        dispatch(requestToken(code));
      }
    }
  }, [])
  
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);



  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
