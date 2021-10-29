import axios from 'axios';
import React, { useRef, useState } from 'react';



const PhotoForm = (props) => {
    const { userId } = props;
    const { state } = props;
    const [photo, setPhoto] = useState("");
    const [text, setText] = useState("");
    const [user_id, setUser_Id] = useState(userId);
    const inputEl = useRef(null);
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('text', text);
        formData.append('user_id', user_id); 
        console.log(formData);

        axios.post('http://localhost:8000/api/photos', formData)
            .then(res=> {
                console.log(res);
                setPhoto("");
                setText("");
                inputEl.current.value = '';
                state.setChange(!state.change);
            })
            .catch((err) => {
                 console.log(err); 
            })
    }

    return ( 
        <div id="form">
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
                <p className="center">Add an Image</p>
                <div className="upload">
                    <input ref={inputEl} type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={(e)=>{setPhoto(e.target.files[0])}}/>
                </div>
                <div className="center">
                    <p>Add Text</p>
                    <textarea className="text" value={text} type="text" name="text" onChange={(e)=>{setText(e.target.value)}}/>
                </div>
                <div className="submit">
                    <input className="submit-btn" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default PhotoForm;