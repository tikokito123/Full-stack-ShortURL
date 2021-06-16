import React, { Component } from "react";

class Login extends Component {
  state = {};
  handleSubmit = (e) => {
    e.preventDefault();

    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((res) =>
      res.json().then((json) => {
        console.log(json);
        if (json.token) {
          this.props.history.replace(json.redirect);
        } else {
          this.setState({ message: json.message });
        }
      })
    );
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  
  render() {
    return (
      <div className="login-box">
        <h1>TinUrl</h1>
        <form className="textbox" onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            <div className="textbox">
              <i className="fas fa-user"></i>
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="username"
                name="username"
              />
            </div>
          </label>
          <br />
          <label htmlFor="password">
            <div className="textbox">
              <i className="fas fa-lock"></i>
              <input
                onChange={this.handleChange}
                type="password"
                placeholder="password"
                name="password"
              />
            </div>
          </label>{" "}
          <br />
          <input className="btn" type="submit" value="Login!" />
        </form>
        <div id="note">
          {!this.state.message ? `Welcome back ` : this.state.message}
        </div>
      </div>
    );
  }
}

export default Login;
