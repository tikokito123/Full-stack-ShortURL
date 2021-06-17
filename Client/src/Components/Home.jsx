import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import "../css/Home.css";

class Home extends Component {
  state = {};
  handleSuccess = (googleData) => {
    fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googleData.profileObj),
    }).then((res) =>
      res.json().then((json) => {
        console.log(json.message);
        this.props.history.replace(json.redirect);
      })
    );
  };

  handleFailure = (googleData) => {
    console.log("loggin Failed!: ", googleData);
  };

  render() {
    return (
      <header>
        <h1 className="title">Tinurl</h1>
        <div className="welcome-text">
          <ul className="nav">
            <li className="nav">
              <Link to="/Signup">Signup</Link>
            </li>
            <li className="nav">
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <br />
          <br />
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            onSuccess={this.handleSuccess}
            onFailure={this.handleFailure}
            buttonText="Sign in with Google"
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </header>
    );
  }
}

export default Home;
