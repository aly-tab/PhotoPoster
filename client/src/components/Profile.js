import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const history = useHistory();
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState({});
    const [loaded, setLoaded] = useState(false);
    let state = {};
    const [change, setChange] = useState(false);
    state.change = change;
    state.setChange = setChange;
    const [images, setImages] = useState([]);

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

    useEffect(() => {
        axios.get(process.env.REACT_URI + "api/user/" + username)
            .then(res => {
                console.log(res);
                setProfileUser(res.data);
                state.setChange(!state.change);
            })
            .catch(err => {
                console.log(err);
            })
    })

    useEffect(() => {
        axios.get(process.env.REACT_URI + 'api/photos/user/' + profileUser._id)
            .then((response) => {
                console.log(response);
                setImages(response.data.reverse());
                setLoaded(true);
                console.log(response.data._id)
            })
            .catch(err => {
                console.log(err);
            })
    }, [state.change, profileUser._id])


    const removeFromDom = imgId => {
        setImages(images.filter(image => image._id !== imgId))
    }


    return ( 
        <div>
            {loaded && loggedInUser? 
                <div>
                    <div id="header">
                        <h1>Logged in as {loggedInUser.username}</h1>
                        <div id="link-btns">
                            <Link className="link" to={"/search"}>Search</Link>
                            {profileUser._id !== loggedInUser._id?
                            <Link className="link" to={"/" + loggedInUser.username}>Profile</Link>:
                            ""
                            }
                            <Link className="link" to={"/dashboard"}>Dashboard</Link>
                            <Link className="link" to={"/account"}>Account</Link>
                            <button className="logout" onClick={logout}>Log Out</button> 
                        </div>
                    </div>
                    <div id="block">
                        <h1>{profileUser.username}</h1>
                    </div>
                    <div id="photo-list">
                        {images.map((img, index) => {
                            return (
                                <div key={index} className="photo">
                                    <img src={`http://localhost:8000/${img.photo}`} alt=""/>
                                    <p>{img.text}</p>
                                    <p>Hearts {img.hearts}</p>
                                    <Link className="btm-link" to={"/" + profileUser.username + "/" + img._id}>View</Link> 
                                    <span> </span>
                                    { profileUser.username === loggedInUser.username?
                                    <Link className="btm-link" to={"/" + profileUser.username + "/" + img._id + "/edit"}>Edit</Link> :
                                    ""
                                    } 
                                    <span> </span>
                                    { profileUser.username === loggedInUser.username?
                                    <DeleteButton id={img._id} removeFromDom={removeFromDom}/> :
                                    ""
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>: 
            <p>error</p>}
        </div>
    )
}

export default Dashboard;