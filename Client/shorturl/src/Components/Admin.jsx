import React, { Component } from "react";
class Admin extends Component {
  state = {};
  
  getAdminData = () => {
    fetch("/admin-only", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((json) => {
        if (json.redirect) {
          json.message = "you are not an admin and will redirect in 5 seconds";
          setTimeout(() => {
            this.props.history.replace(json.redirect);
          }, 5000);
        }
        this.setState({ message: json.message });
      })
    );
  } 
  
  componentDidMount() {
    this.getAdminData();
  }

  render() {
    return <h1> {!this.state.message ? "loading..." : this.state.message} </h1>;
  }
}

export default Admin;
