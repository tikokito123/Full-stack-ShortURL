import React, { Component } from "react";
class Admin extends Component {
  state = {};
  componentDidMount() {
    fetch("/admin-only", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((json) => this.setState({ message: json.message }))
    );
  }

  render() {
    return <h1> {!this.state.message ? "loading..." : this.state.message} </h1>;
  }
}

export default Admin;
