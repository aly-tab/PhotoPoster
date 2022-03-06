import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

const RedirectDeleteButton = props => {
    const { id } = props;
    const history = useHistory();

    const onClickHandler = e => {
        axios.delete('https://photoposter.herokuapp.com/api/photos/' + id)
            .then(response => {
                console.log(response);
                history.push("/dashboard");
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <button className="delete" onClick={onClickHandler}>Delete</button>
    )
}

export default RedirectDeleteButton;