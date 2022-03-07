import axios from 'axios';
import React from 'react';

const DeleteButton = props => {
    const { id } = props;
    const {removeFromDom } = props;

    const onClickHandler = e => {
        axios.delete('/api/photos/' + id)
            .then(response => {
                console.log(response);
                removeFromDom(id);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <button className="delete" onClick={onClickHandler}>Delete</button>
    )
}

export default DeleteButton;