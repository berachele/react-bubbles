import React from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth"

class Login extends React.Component{
  // make a post request to retrieve a token from the api✅
  // when you have handled the token, navigate to the BubblePage route✅
  state = {
    logInfo: {
      username: "",
      password: ""
    }
  }

  handleChange = e => {
    this.setState({
      logInfo: {
        ...this.state.logInfo,
        [e.target.name]: e.target.value
      }
    })
  }

  login = e => {
    e.preventDefault()
    axiosWithAuth()
      .post("/api/login", this.state.logInfo)
      .then(res => {
        console.log({res})
        //res/data/payload
        localStorage.setItem('token', JSON.stringify(res.data.payload))
        this.props.history.push("/bubbles")
      })
      .catch(err => {
        console.log({err})
      })
  }

render(){
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <p>Build a login page here</p>
        <div className="login-form">
          <form onSubmit={this.login}>
            <input 
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.logInfo.username}
            onChange={this.handleChange}
            />
            <input 
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.logInfo.password}
            onChange={this.handleChange}
            />
            <button>Log in</button>
          </form>
        </div>
      </>
    );
  };
}

export default Login;
