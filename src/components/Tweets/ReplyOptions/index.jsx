import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { apiTweets } from '../../../context/Api';
import './index.css'
const ReplyOptions = ({favorited_count, isFavoriteByMe, replyId}) => {

    const [favoriteReply, setFavoriteReply] = useState(isFavoriteByMe);
    const [favorite_counter, setFavoriteCounter] = useState(favorited_count);
    const cookie = new Cookies();

    const postLikeReply = update_process => {
        let token = cookie.get("token");
        let username = cookie.get("username");

        fetch(`${apiTweets}/updateoptions?` + new URLSearchParams({
            tweet_id: replyId,
            update_type: "like",
            update_process: update_process === true ? "undo" : "add",
            isReply: true
        }), {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
        })
        .then((res) => {
            if (res.status === 204) {
                if (update_process === true) {
                    setFavoriteCounter(favorite_counter - 1)
                } else {
                    setFavoriteCounter(favorite_counter + 1)
                }

                setFavoriteReply(!favoriteReply)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className='replyOptions--container'>
            <div onClick={() => postLikeReply(favoriteReply)}>
                <span className="material-icons material-icons-outlined"
                id={favoriteReply === true && "favoriteReply"}>
                    favorite_border
                </span>
                <span id={favoriteReply === true && "favoriteReply"}>{favoriteReply ? "Liked": "Like"}</span>
            </div>
            <span>·</span>
            <span>{favorite_counter} Likes</span>
        </div>
    )
}

export default ReplyOptions