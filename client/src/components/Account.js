import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import DeleteAccount from './DeleteAccount';

const Account = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const { REACT_URI } = process.env;



    useEffect(() => {
        axios.get(REACT_URI + "/api/users/loggedIn", {withCredentials:true})
            .then(res => {
                console.log(res);
                setLoggedInUser(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                history.push("/");
            })
    }, [history])

    const logout = (e) => {
        axios.get(REACT_URI + "/api/users/logout", {withCredentials:true})
            .then(res => {
                console.log(res);
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            {loaded && loggedInUser? 
                <div>
                    <div id="header">
                        <h1>Logged in as {loggedInUser.username}</h1>
                        <div id="link-btns">
                            <Link className="link" to={"/search"}>Search</Link>
                            <Link className="link" to={"/" + loggedInUser.username}>Profile</Link>
                            <Link className="link" to={"/dashboard"}>Dashboard</Link>
                            <button className="logout" onClick={logout}>Log Out</button> 
                        </div>
                    </div>
                    <div id="account">
                        <p>Username: {loggedInUser.username}</p>
                        <p>Email: {loggedInUser.email}</p>
                        <p>Password: hidden</p>
                        <DeleteAccount id={loggedInUser._id}/>
                    </div>
                </div>: 
            <p>error</p>}
        </div>
    )
}

export default Account;