import React from 'react'
import './index.css'

const ReplyOptionDropdopwn = ({handleTogglePublicTweet, setShow}) => {

    return (
        <div id='replyOption--container' onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <h4>Who can reply?</h4>
        <span>Choose who can reply to this Tweet.</span>
        <ul>
            <li onClick={() => handleTogglePublicTweet(true)}>
                <span className="material-icons material-symbols-outlined">public</span>
                <span>Everyone</span>
            </li>
            <li onClick={() =>  handleTogglePublicTweet(false)}>
                <span className="material-icons material-symbols-outlined">people</span>
                <span>People you follow</span>
            </li>
        </ul>
        </div>
    );
}

export default ReplyOptionDropdopwn