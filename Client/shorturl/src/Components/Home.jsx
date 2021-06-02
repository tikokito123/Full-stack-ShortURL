import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Home extends Component {
    render() { 
        return (
            <div>
                <h1>TinUrl</h1>
                <Link to="/Signup">Signup</Link>
                
                <h3>Already have one?? </h3>

                <span>So: </span> <Link to="/login">Login</Link>
            </div>
        );
    }
}
 
export default Home;