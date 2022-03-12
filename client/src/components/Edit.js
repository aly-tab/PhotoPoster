import React, { useState, useEffect }from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import RedirectDeleteButton from './RedirectDeleteButton';

const DetailView = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const { username } = useParams();
    const { id } = useParams();
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
        axios.get("/api/users/loggedIn", {withCredentials:true})
            .then(res => {
                console.log(res);
                setLoggedInUser(res.data);
                setLoaded(true);
                if (res.data.username !== username) {
                    history.push('/dashboard');
                }
            })
            .catch(err => {
                console.log(err);
                history.push("/");
            })
    }, [history, username])

    const logout = (e) => {
        axios.get("/api/users/logout", {withCredentials:true})
            .then(res => {
                console.log(res);
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    useEffect(() => {
        axios.get('/api/photos/' + id)
            .then(response => {
                console.log(response);
                if (response.data.name === "CastError") {
                    history.push("/dashboard");
                }
                setImage(response.data);
                setPhoto(response.data.photo);
                setText(response.data.text);
                setHearts(response.data.hearts);
            })
            .catch(err => {
                console.log(err);
            })
    }, [state.change, history, id])

    const onSubmitHandler = (e, data) => {
        e.preventDefault();
        axios.put('/api/photos/' + id, data)
            .then(response => {
                console.log(response);
            })
            .catch((err) => {
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
            <img src={`/${image.photo}`} alt=""/>
                <div id="form">
                    <form onSubmit={e => onSubmitHandler(e, {photo, text, hearts})}>
                        <input type="hidden" name="photo" value={photo}/>
                        <input type="hidden" name="hearts" value={hearts} />
                            <p>Edit Text</p>
                            <textarea className="text" value={text} type="text" name="text" onChange={(e)=>{setText(e.target.value)}}/>
                            <div className="submit">
                                <input className="submit-btn-edit" type="submit" />
                            </div>
                    </form>
                    <div id="edit-delete"><RedirectDeleteButton id={image._id}/> </div>
                </div>
            </div>
    </div>
    )
}

export default DetailView;