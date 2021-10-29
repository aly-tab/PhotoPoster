import React from 'react';
import { Link } from 'react-router-dom';

const Search = (props) => {
    const { users } = props;
    const { searchTerm } = props;

    return (
        <div>
            {users.filter((user, i) => {
                return user.username.toLowerCase().includes(searchTerm);
            }).map((user, index) => {
            return (
                <div key={index} className="user">
                    <div>
                        <Link to={"/" + user.username}><p>{user.username}</p></Link>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default Search;