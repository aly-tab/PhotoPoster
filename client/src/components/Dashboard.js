import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PhotoForm from './PhotoForm';
import PhotoList from './PhotoList';

const Dashboard = () => {
    let state = {};
    const [loggedInUser, setLoggedInUser] = useState(null);
    const history = useHistory();
    const [change, setChange] = useState(false);
    state.change = change;
    state.setChange = setChange;

    useEffect(() => {
        axios.get(process.env.REACT_URI + "api/users/loggedIn", {withCredentials:true})
            .then(res => {
                console.log(res);
                setLoggedInUser(res.data);
            })
            .catch(err => {
                console.log(err);
                history.push("/");
            })
    }, [history])

    const logout = (e) => {
        axios.get(process.env.REACT_URI + "api/users/logout", {withCredentials:true})
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
            {loggedInUser? 
                <div>
                    <div id="header">
                        <h1>Logged in as {loggedInUser.username}</h1>
                        <div id="link-btns">
                            <Link className="link" to={"/search"}>Search</Link>
                            <Link className="link" to={"/" + loggedInUser.username}>Profile</Link>
                            <Link className="link" to={"/account"}>Account</Link>
                            <button className="logout" onClick={logout}>Log Out</button> 
                        </div>
                    </div>
                    <div id="block">
                        <PhotoForm userId={loggedInUser._id} state={state}/>
                    </div>
                    <PhotoList userId={loggedInUser._id} loggedInUser={loggedInUser.username} state={state}/>
                </div>: 
            <p>error</p>}
        </div>
    )
}

export default Dashboard;