import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [formInfo, setFormInfo] = useState({
        username:"",
        email:"",
        password:"",
        confirm:"",
    })
    const history = useHistory();

    const [errors, setErrors] = useState({});

    const changehandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault();
        axios.post(REACT_URI + "/api/register", formInfo, {withCredentials:true})
            .then(res => {
                console.log(res);
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    history.push("/dashboard");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1>Register below</h1>
            <form onSubmit={register}>
                <div className="form-group">
                    <p>Username</p>
                    <input type="text" className="form-control" name="username" onChange={changehandler}/>
                    {errors.username? <p className="text-danger">{errors.username.message}</p>:""}
                </div>
                <div className="form-group">
                    <p>Email</p>
                    <input type="email" className="form-control" name="email" onChange={changehandler}/>
                    {errors.email? <p className="text-danger">{errors.email.message}</p>:""}
                </div>
                <div className="form-group">
                    <p>Password</p>
                    <input type="password" className="form-control" name="password" onChange={changehandler}/>
                    {errors.password? <p className="text-danger">{errors.password.message}</p>:""}
                </div>
                <div className="form-group">
                    <p>Confirm Password</p>
                    <input type="password" className="form-control" name="confirmPassword" onChange={changehandler}/>
                    {errors.confirmPassword? <p className="text-danger">{errors.confirmPassword.message}</p>:""}
                </div>
                <input type="submit" value="sign up" className="btn-btn-primary" />
            </form>
        </div>
    )
}

export default Register;