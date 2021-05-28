import React, { Component } from 'react';
import '../index.css';
import '../App.css';

class Signup extends Component {
    state = {  }

    handleSubmit = e => {
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json().then(json => console.log(json)));
    }    
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() { 
        return (
            <div className="App">
                <header>
                    <h1>TinUrl</h1>
                </header>
                
                <form  onSubmit={this.handleSubmit}>
                    <label htmlFor="username"><input onChange={this.handleChange} type="text" name="username" placeholder="username"/></label> <br />
                    <label htmlFor="email"><input onChange={this.handleChange} type="email" name="email" placeholder="example@gmail.com"/></label> <br />
                    <label htmlFor="password"><input onChange={this.handleChange} type="password" name="password" placeholder="password"/></label> <br />
                    <button type="submit">SignUp!</button>
                </form>
            </div>
        );
    }
}
 
export default Signup;