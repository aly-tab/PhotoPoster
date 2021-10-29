import React from 'react';
import Register from './Register';
import Login from './Login';
const SignIn = () => {
    return (
        <div className="row">
            <div className="col">
                <Register/>
            </div>
            <div className="col">
                <Login/>
            </div>            
        </div>
    )
}

export default SignIn;