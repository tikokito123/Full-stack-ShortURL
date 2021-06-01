import React, { Component } from 'react';
import '../index.css';
import '../App.css';

class Signup extends Component {
    state = {  }

    handleSubmit = e => {
        e.preventDefault();

        fetch('/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json().then(json => console.log(json))).catch(err => console.log(err));
        
    }    
    handleChange = e => {
        e.preventDefault();

        this.setState({[e.target.name]: e.target.value})
    }
    render() { 
        return (
            <div className="App">
                <header>
                    <h1>TinUrl</h1>
                </header>
                
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username"><input onChange={this.handleChange} required={true} type="text" name="username" placeholder="username"/></label> <br />
                    <label htmlFor="email"><input onChange={this.handleChange} required={true} type="email" name="email" placeholder="example@gmail.com"/></label> <br />
                    <label htmlFor="password"><input onChange={this.handleChange} required={true} type="password" name="password" placeholder="password"/></label> <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
 
export default Signup;