import React, { useState, useEffect } from 'react'
import './index.css'
import Cookies from "universal-cookie";
import { apiTweets } from '../../../context/Api';


const TweetOptions = ({tweet, disableComment}) => {

    const [isFavorite, setIsFavorite] = useState(tweet.isFavoriteByMe);
    const [isSaved, setIsSaved] = useState(tweet.isSavedByMe);
    const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweetedByMe)
    const [bookmarksCount, setBookmarksCount] = useState(tweet.bookmarks_count);
    const [retweetedCount, setRetweetedCount] = useState(tweet.retweet_count);
    const [loadingOptionLike, setLoadingOptionLike] = useState(false)
    const [loadingOptionRetweet, setLoadingOptionRetweet] = useState(false)
    const [loadingOptionSave, setLoadingOptionSave] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 480;
    const cookie = new Cookies();

    const handleOptions = (update_type,update_process ) => {
        switch (update_type) {
            case 'like':
                setLoadingOptionLike(true);
                break
            case 'retweet' :
                setLoadingOptionRetweet(true);
                break
            case 'bookmarks':
                setLoadingOptionSave(true);
                break
            default :
        }
        let token = cookie.get("token");
        let username = cookie.get("username");

        fetch(`${apiTweets}/updateoptions?` + new URLSearchParams({
            tweet_id: tweet._id,
            update_type: update_type,
            update_process: update_process === true ? "undo" : "add"
        }), {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
        })
        .then((res) => {
            if (res.status === 204) {
                switch (update_type) {
                    case 'like':
                        setIsFavorite(!isFavorite)
                        setLoadingOptionLike(false)
                        break
                    case 'retweet' :
                        if (update_process === true) {
                            setRetweetedCount(retweetedCount - 1)
                        } else {
                            setRetweetedCount(retweetedCount + 1)
                        }
                        setIsRetweeted(!isRetweeted)
                        setLoadingOptionRetweet(false)
                        break
                    case 'bookmarks':
                        if (update_process === true) {
                            setBookmarksCount(bookmarksCount - 1)
                        } else {
                            setBookmarksCount(bookmarksCount + 1)
                        }
                        setIsSaved(!isSaved)
                        setLoadingOptionSave(false)
                        break
                    default :
                }
            }
        })
        .catch((err) => {
            switch (update_type) {
                case 'like':
                    setLoadingOptionLike(false)
                    break
                case 'retweet' :
                    setLoadingOptionRetweet(false)
                    break
                case 'bookmarks':
                    setLoadingOptionSave(false)
                    break
                default :
            }
            console.log(err)
        })
    }

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);


    return (
        <>
        <div className='tweet__count'>
            <ul className='tweet__count--list'>
                <li><span>{tweet?.comments_count} Comments</span></li>
                <li><span>{retweetedCount} Retweets</span></li>
                <li><span>{bookmarksCount} Saved</span></li>
            </ul>
        </div>
        <div className="tweetOptions--container">
            <ul className="tweetOptions--container__list">
                <button type='submit' id={!disableComment ? "allowreply--button" : "notallowreply--button"}
                disabled={disableComment}
                >
                    <span className="material-icons material-icons-outlined">
                    mode_comment
                    </span>
                    {width > breakpoint &&
                        <span>Comment</span>
                    }
                </button>
                <li onClick={() => handleOptions("retweet",isRetweeted )} id={loadingOptionRetweet && "item--loding"}>
                        {loadingOptionRetweet
                        ?
                        <div id="loaderOption">
                                <span className="material-icons material-icons-outlined"
                                style={{ color: "#fff" }}>
                                autorenew
                                </span>
                        </div>
                        :
                        <>
                            {isRetweeted ?
                            <>
                                <span className="material-icons material-icons-outlined"
                                style={{ color: "#27AE60" }}>
                                autorenew
                                </span>
                                {width > breakpoint &&
                                    <span style={{ color: "#27AE60" }}>Retweeted</span>
                                }
                            </>
                            :
                            <>
                                <span className="material-icons material-icons-outlined" style={{ color: "#4F4F4F" }}>
                                autorenew
                                </span>
                                {width > breakpoint &&
                                    <span style={{ color: "#4F4F4F" }}>Retweeted</span>
                                }
                            </>
                            }
                        </>
                        }
                </li>
                <li onClick={() => handleOptions("like", isFavorite )} id={loadingOptionLike && "item--loding"}>
                        {loadingOptionLike ?
                        <div id="loaderOption">
                                <span className="material-icons material-icons-outlined"
                                style={{ color: "#fff" }}>
                                autorenew
                                </span>
                        </div>
                        :
                        <>
                            {isFavorite ?
                            <>
                                <span className="material-icons material-symbols-outlined"
                                style={{ color: "#EB5757" }} >
                                favorite
                                </span>
                                {width > breakpoint &&
                                    <span style={{ color: "#EB5757" }}>Liked</span>
                                }
                            </>
                            :
                            <>
                                <span className="material-icons material-symbols-outlined"
                                style={{ color: "#4F4F4F" }}
                                >
                                favorite
                                </span>
                                {width > breakpoint &&
                                <span style={{ color: "#4F4F4F" }}>Liked</span>
                                }
                            </>
                            }
                        </>
                        }
                </li>
                <li onClick={() => handleOptions("bookmarks",isSaved)} id={loadingOptionSave && "item--loding"}>
                    {loadingOptionSave ?
                        <div id="loaderOption">
                                <span className="material-icons material-icons-outlined"
                                style={{ color: "#fff" }}>
                                autorenew
                                </span>
                        </div>
                        :
                        <>
                        {isSaved ? (
                            <>
                                <span style={{ color: "#2F80ED" }} className="material-icons material-symbols-outlined">
                                bookmark
                                </span>
                                {width > breakpoint &&
                                <span style={{ color: "#2F80ED" }}>Saved</span>
                                }
                            </>
                        ) : (
                            <>
                                <span style={{ color: "#4F4F4F" }} className="material-icons material-symbols-outlined">
                                bookmark
                                </span>
                                {width > breakpoint &&
                                <span style={{ color: "#4F4F4F" }}>Save</span>
                                }
                            </>
                        )}
                        </>
                    }
                </li>
            </ul>
        </div>
        </>
    );
}

export default TweetOptions