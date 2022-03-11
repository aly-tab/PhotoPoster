import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DeleteAccount = props => {
    const { id } = props;
    const history = useHistory();
    const { REACT_URI } = process.env;

    const onClickHandler = e => {
        axios.delete(process.env.REACT_URI + '/api/user/' + id)
            .then(response => {
                console.log(response);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <button className="delete" onClick={onClickHandler}>Delete Account</button>
    )
}

export default DeleteAccount;