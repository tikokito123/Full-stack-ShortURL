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
        const urlObj = json.urls.map((url) => {
          return (
            <div>
              <p>
                <label htmlFor="short" key={url.short}>
                  ShortID: {url.short}
                </label>
                <label htmlFor="Counter" key={url.clicks}>
                  Counter: {url.clicks}
                </label>
              </p>
            </div>
          );
        });
        this.setState({ message: json.message, urlObj });
      })
    );
  };

  componentDidMount() {
    this.getAdminData();
  }

  render() {
    return (
      <div>
        <h1> {!this.state.message ? "loading..." : this.state.message} </h1>
        {this.state.urlObj}
      </div>
    );
  }
}

export default Admin;
