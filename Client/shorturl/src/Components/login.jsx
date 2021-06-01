import React, { Component } from 'react';

class Login extends Component {
    state = {  }
    handleSubmit = e => {
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json().then(json => console.log(json)));
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    render() { 
        return (
            <div>
                <header>
                    <h1>TinUrl</h1>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username"><input onChange={this.handleChange} type="text" placeholder="username" name="username"/></label><br />
                    <label htmlFor="password"><input onChange={this.handleChange} type="password" placeholder="password" name="password" /></label> <br />
                    <button type="submit">Login!</button>
                </form>
            </div>
          );
    }
}
 
export default Login
;