import React,{useState, useEffect} from "react";
import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth";


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({username:"",password:""})
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('credentials', credentials);
    setIsFetching(true);
    axiosWithAuth()
        .post('/login', credentials)
        .then(res => {
          localStorage.setItem("token", res.data.payload);
          props.history.push("/BubblePage")
        })
        .catch(err => console.log(err));
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                />
          <input 
                type="text"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
