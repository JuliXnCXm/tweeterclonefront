import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'

const NoContent = ({message}) => {
    return (
        <div className='NoFound--container'>
            <span class="material-icons material-icons-outlined">search_off</span>
            <h1>{message}</h1>
            <Link to="/explore/people">Explore</Link>
        </div>
    );
}

export default NoContent