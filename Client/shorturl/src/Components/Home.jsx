import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

class Home extends Component {
  state = {};
    handleSuccess = (googleData) => {
        fetch('/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(googleData.profileObj)
        }).then(res => res.json().then(json => {
          console.log(json.message);
          this.props.history.replace(json.redirect)}));
    };
    
    handleFailure = (googleData) => {
        console.log("loggin Failed!: ", googleData);
    };
    
    render() {
    return (
      <div>
        <h1>TinUrl</h1>
        <Link to="/Signup">Signup</Link>
        <h3>Already have one?? </h3>
        <span>So: </span> <Link to="/login">Login</Link> <br />
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          onSuccess={this.handleSuccess}
          onFailure={this.handleFailure}
          buttonText="Sign in with Google"
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default Home;
