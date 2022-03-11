import React, { useState, useEffect }from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import RedirectDeleteButton from './RedirectDeleteButton';

const DetailView = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const { id } = useParams();
    const { username } = useParams();
    const history = useHistory();
    const [ image, setImage] = useState({});
    const [photo, setPhoto] = useState("");
    const [text, setText] = useState("");
    const [hearts, setHearts] = useState(null);
    let state = {};
    const [change, setChange] = useState(false);
    state.change = change;
    state.setChange = setChange;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedIn", {withCredentials:true})
            .then(res => {
                console.log("RESPONSE" + res);
                setLoggedInUser(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                history.push("/");
            })
    }, [history])

    const logout = (e) => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res => {
                console.log(res);
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/photos/' + id)
            .then(response => {
                console.log(response);
                if (response.data.name === "CastError") {
                    history.push("/dashboard");
                }
                setImage(response.data);
                setPhoto(response.data.photo);
                setText(response.data.text);
                setHearts(response.data.hearts + 1);
            })
            .catch(err => {
                console.log(err);
            })
    }, [state.change, history, id])

    const addHeart = (e, data) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/photos/' + id, data)
        .then((response) => {
            console.log(response);
            state.setChange(!state.change);
        })
        .catch(err => {
            console.log(err);
        })        
    }

    return (
        <div>
            {loaded && 
            <div id="header">
                <h1>Logged in as {loggedInUser.username}</h1>
                <div id="link-btns">
                    <Link className="link" to={"/search"}>Search</Link>
                    <Link className="link" to={"/" + loggedInUser.username}>Profile</Link>
                    <Link className="link" to={"/dashboard"}>Dashboard</Link>
                    <Link className="link" to={"/account"}>Account</Link>
                    <button className="logout" onClick={logout}>Log Out</button> 
                </div>
            </div>
            }
            <div id="detail">
                <img src={`http://localhost:8000/${image.photo}`} alt=""/>
                <p>{image.text}</p>
                <p>Give Hearts {image.hearts}</p>
                <form onSubmit={e => addHeart(e, {photo, text, hearts})}>
                    <input type="hidden" name="photo" value={photo} />
                    <input type="hidden" name="text" value={text} />
                    <input type="hidden" name="hearts" value={hearts} />                
                    <input className="heart" type="image" src={`http://localhost:8000/heart.png`} alt=""/>
                </form>
                <div id="detail-btns">
               {loaded && loggedInUser.username === username?
                    <Link className="btm-link" to={"/" + loggedInUser.username + "/" + image._id + "/edit"}>Edit</Link> :
                    ""
                    } 
                    <span> </span>
                    {loaded &&  loggedInUser.username === username?
                    <RedirectDeleteButton id={image._id}/> :
                    ""
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailView;