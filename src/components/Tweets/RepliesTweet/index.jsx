import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { apiTweets } from '../../../context/Api';
import useTweets from '../../../hooks/useTweets';
import { formattedDate } from '../../../utils/FormattedData';
import SpinnerLoaderTweet from '../SpinnerLoaderTweet';
import TweetMedia from '../TweetMedia';
import ReplyOptions from '../ReplyOptions';
import './index.css'
import ReplyTweet from '../ReplyTweet';
import AuthContext from '../../../context/AuthContext';

const RepliesTweet = ({ tweet, handleModalMedia, classnameFunc }) => {

    const { user } = useContext(AuthContext)
    const [replies , setReplies] = useState([])
    const [skip, setSkip] = useState(0)
    const [loading, setLoading] = useState(true)
    const cookie = new Cookies();
    const {classNameChangeColor} = useTweets()
    let token = cookie.get("token");
    let username = cookie.get("username");

    const handleScrollReplies = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;
        if (offsetHeight + scrollTop === scrollHeight) {
            setSkip(replies.length);
        }
    };

    const updateReplies = () => {
        setLoading(true)
        setReplies([])
        fetch(
            `${apiTweets}/comments?` +
            new URLSearchParams({
                tweetId: tweet._id,
                skip: skip,
            }),
            {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
            }
        ).then( async res => {
            if (res.status === 200) {
                const repliesJson = await res.json();
                setReplies(repliesJson.replies);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch(err => {
            console.log(err)
            setLoading(false);
        })
    }

    useEffect(() => {
        const fetchReplies = async () => {
            setLoading(true)
            try {
                const request = await fetch(
                    `${apiTweets}/comments?` +
                        new URLSearchParams({
                        tweetId: tweet._id,
                        skip: skip,
                        }),
                    {
                        method: "GET",
                        headers: {
                        Authorization: `Bearer ${token}`,
                        username: username,
                        },
                    }
                );
                if (request.status === 200 ) {
                        const repliesJson = await request.json();
                        setReplies([...replies, ...repliesJson.replies]);
                    }
                setTimeout(() => {
                        setLoading(false)
                }, 1000)
            } catch (e) {
                console.log(e)
                setLoading(false)
            }
        };
        fetchReplies();
    }, [skip]);

    return (
        <>
        <ReplyTweet user={user} tweet={tweet} updateReplies={updateReplies}/>
        <section onScroll={handleScrollReplies} id={replies.length > 0 && "replies--section"}>
            {replies.length > 0
            &&
            <ul className='replies' >
                {replies.map((reply,idx) => {
                    return (
                        <>
                            <li className='reply__container' key={idx}>
                                <img id='userPicture_none--header_icon' src={reply?.author_data?.picture} alt={reply?.author_data?.name} />
                                {replies[idx+1]?.author_data?.name === replies[idx]?.author_data?.name && (<div id="user--threat"></div>)}
                                <div id='reply--container__wrapper'>
                                    <div className="reply--container__body">
                                        <div className='replies--container__body-author'>
                                            <h2>
                                            {reply?.author_data?.name}{" "}
                                            {reply?.author_data?.lastname}
                                            </h2>
                                            <h3 className="tweet--container__author-date">
                                            {formattedDate(reply?.created_at)}
                                            </h3>
                                        </div>
                                        <p className='replies--container__body-description'>{reply?.description.split(" ").map((word, idx) => {
                                            return (
                                                <span key={idx} className={classNameChangeColor(word)}>
                                                {word}{" "}
                                                </span>);
                                            })}
                                        </p>
                                        <div className='replies--container__body-media'>
                                            <TweetMedia
                                                tweetMediaType={reply?.mediaType}
                                                tweetMediaSource={reply?.mediaSource}
                                                classnameFunc={classnameFunc}
                                                handleModalMedia={handleModalMedia}/>
                                        </div>
                                    </div>
                                    <ReplyOptions favorited_count={reply?.favorites_count} isFavoriteByMe={reply?.isFavoriteByMe} replyId={reply?._id}/>
                                </div>
                            </li>
                        </>
                    );
                })}
                {loading && (
                <div id="listTweetsLoader">
                    <SpinnerLoaderTweet />
                </div>
                )
                }
            </ul>
            }
        </section>
        </>
    );
};

export default RepliesTweet