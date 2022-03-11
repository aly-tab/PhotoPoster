import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const PhotoList = (props) => {
    const { userId } = props;
    const { loggedInUser } = props;
    const { state } = props;
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        axios.get(REACT_URI + '/api/photos/user/' + userId)
            .then((response) => {
                console.log(response);
                console.log(userId);
                setPhotos(response.data.reverse());
            })
            .catch(err => {
                console.log(err);
            })
    }, [state.change, userId])

    const removeFromDom = photoId => {
        setPhotos(photos.filter(photo => photo._id !== photoId))
    }

    return ( 
        <div id="photo-list">
            {photos.map((photo, index) => {
                return (
                    <div key={index} className="photo">
                        <img src={`http://localhost:4000/${photo.photo}`} alt=""/>
                        <p>{photo.text}</p>
                        <p>Hearts {photo.hearts}</p>
                        <Link className="btm-link" to={"/" + loggedInUser+ "/" + photo._id}>View</Link> <Link className="btm-link" to={"/" + loggedInUser + "/" + photo._id + "/edit"}>Edit</Link> <DeleteButton id={photo._id} removeFromDom={removeFromDom}/>
                    </div>
                )
            })}
        </div>
    )
}

export default PhotoList;