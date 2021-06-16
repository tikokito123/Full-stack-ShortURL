import React, { Component } from "react";

class Signup extends Component {
  state = {};

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) =>
        res.json().then((json) => {
          if (json.token) {
            this.props.history.replace(json.redirect);
          }
        })
      )
      .catch((err) => console.log(err));
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
                required={true}
                type="text"
                name="username"
                placeholder="username"
              />
            </div>
          </label>{" "}
          <br />
          <label htmlFor="email">
            <div className="textbox">
              <i class="fa-solid fa-square-envelope"></i>
              <input
                onChange={this.handleChange}
                required={true}
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
            </div>
          </label>
          <br />
          <label htmlFor="password">
            <div className="textbox">
              <i className="fas fa-lock"></i>
              <input
                onChange={this.handleChange}
                required={true}
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
          </label>
          <br />
          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Signup;
