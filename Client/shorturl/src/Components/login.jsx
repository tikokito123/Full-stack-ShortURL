import React, { Component } from 'react';

class Login extends Component {
    state = {  }
    handleSubmit = e => {
        e.preventDefault();

        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json().then(json => {
            this.setState({message: json.message});
        }));
    }
    handleChange = e => {
        e.preventDefault();

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
                    <input type="submit" value="login!" />
                </form>
                <div>{!this.state.message ? 'Welcome back :)' : this.state.message}</div>
            </div>
          );
    }
}
 
export default Login
;