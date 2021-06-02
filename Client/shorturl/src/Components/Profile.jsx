import React, { Component } from "react";

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

  render() {
    if (!this.state) return "Loading...";
    return (
      <div>
        <p>
          <label htmlFor="username">Username: {this.state.username}</label>{" "}
          <br />
          <label htmlFor="email">email: {this.state.email}</label>
        </p>
      </div>
    );
  }
}

export default Profile;
