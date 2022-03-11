import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchList from './SearchList';

const Search = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState({});

    useEffect(() => {
        axios.get(REACT_URI + "/api/users/loggedIn", {withCredentials:true})
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
        axios.get(REACT_URI + "/api/users/logout", {withCredentials:true})
            .then(res => {
                console.log(res);
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get(REACT_URI + '/api/user/')
            .then((response) => {
                console.log(response);
                setUsers(response.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return ( 
        <div>
            {loggedInUser? 
                <div>
                    <div id="header">
                        <h1>Logged in as {loggedInUser.username}</h1>
                        <div id="link-btns">
                            <Link className="link" to={"/" + loggedInUser.username}>Profile</Link>
                            <Link className="link" to={"/dashboard"}>Dashboard</Link>
                            <Link className="link" to={"/account"}>Account</Link>
                            <button className="logout" onClick={logout}>Log Out</button> 
                        </div>
                    </div>
                    <div id="list">
                        <form>
                            <div>
                                <input className="search" onChange={e=>setSearchTerm(e.target.value)} type="text" placeholder="Search for a user's profile"/>
                            </div>
                        </form>
                        {loaded && searchTerm !== "" ? <SearchList users={users} searchTerm={searchTerm}/>: ""}
                    </div>
                </div> : 
            <p>error</p>}
        </div>
    )
}

export default Search;