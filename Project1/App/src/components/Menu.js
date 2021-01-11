import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div className="menu">
            <div className="header">
                <h1>E-CLASS</h1>
            </div>
            <div>
                <Link to={`/`} className="link">Home</Link>
            </div>
            <div>
                <Link to={`/students`} className="link" >Students</Link>
            </div>
            <div>
                <Link to={`/subjects`} className="link">Subjects</Link>
            </div>
        </div>
    );
}

export default Menu