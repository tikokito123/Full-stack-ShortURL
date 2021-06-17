import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import cookie from "js-cookie";

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
  };

  componentDidMount() {
    this.getUserProfile();
  }

  onSuccess = () => {
    Object.keys(cookie.get()).forEach((currentCookie) => {
      cookie.remove(currentCookie);
    });
    this.props.history.replace("/");
  };

  render() {
    if (!this.state) return "Loading...";
    return (
      <div className="welcome-text">
        <p>
          <span>Username: {this.state.username}</span>{" "}
          <br />
          <span>email: {this.state.email}</span>
        </p>
        <div>
          <br /> <br />
          <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.onSuccess}
          />

          <div >
            <Link to="/short-url" id="short">Your Urls!</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
