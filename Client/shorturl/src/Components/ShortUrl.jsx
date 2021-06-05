import React, { Component } from "react";

class ShortURL extends Component {
  state = {};

  getShortUrls = () => {
    fetch("/short-url", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((json) => {
        if (json.redirect) {
          setTimeout(() => this.props.history.replace(json.redirect), 3000);
          res.status(400);
        }
        const urlObj = json.urls.map((url) => {
          return (
            <div>
              <p>
                <label htmlFor="short" key={url.full}>
                  ShortID: <a href={url.short}>{url.short}</a>
                </label>
                <label htmlFor="full" key={url.full} >
                  Full-URL: <a href={url.full}>{url.full}</a>
                </label>
                <label htmlFor="Counter" key={url.clicks}>
                  Counter: {url.clicks}
                </label>
              </p>
            </div>
          );
        });
        this.setState({ urlObj, message: json.message });
      })
    );
  };

  componentDidMount() {
    this.getShortUrls();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("/short-url/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((res) =>
      res.json().then((json) => {
        console.log(json.message);
        window.location.reload();
      })
    );
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>{!this.state.message ? "loading..." : this.state.message}</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="url">
            URL:{" "}
            <input onChange={this.handleChange} type="url" name="url" id="" />
          </label>
          <input type="submit" value="short it!" />
        </form>
        {this.state.urlObj}
      </div>
    );
  }
}

export default ShortURL;