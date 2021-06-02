import React, { Component } from "react";

class ShortURL extends Component {
  state = {};
  
  getShortUrls = () => {
    fetch("/short-url", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json().then(json => {
        this.setState({message: json.message});
    }));
  }
  
  componentDidMount() {
    this.getShortUrls();    
  }

  
  render() {
    return <h1>{!this.state.message ? 'loading...' : this.state.message}</h1>;
  }
}

export default ShortURL;
