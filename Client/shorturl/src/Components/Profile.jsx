import React, { Component } from "react";
import {GoogleLogout} from 'react-google-login';

class Profile extends Component {
  state = {};

  getUserProfile = () => {
    fetch("/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((json) => this.setState({ ...json.user }))
    );
  }

  componentDidMount() {
    this.getUserProfile();  
  }

  onSuccess = () => {
    console.log('you out!');
  }
  render() {
    if (!this.state) return "Loading...";
    return (
      <div>
        <p>
          <label htmlFor="username">Username: {this.state.username}</label>{" "}
          <br />
          <label htmlFor="email">email: {this.state.email}</label>
        </p>
        <div>
          <GoogleLogout 
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.onSuccess}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
