import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { server } from '../../../context/Api';
import SpinnerLoaderTweet from '../../Tweets/SpinnerLoaderTweet';
import UserInfoFollowButton from '../../User/UserInfoFollowButton';
import './index.css'
const PeopleShouldFollow = () => {
    const cookie = new Cookies();
    const [peopleShouldFollow, setPeopleShouldFollow] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate =  useNavigate()

    useEffect(() => {
        let token = cookie.get("token");
        let username = cookie.get("username");
        fetch(server + "api/follows/peoplerecomendation ", {
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            username: username,
            },
        })
            .then(async (res) => {
            if (res.status === 200) {
                let responseJson = await res.json();
                setPeopleShouldFollow(responseJson.peopleShouldFollow);
                setLoading(false);
            }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
        }, []);

        return (
        <div className="peopleShouldFollow">
            {loading ? (
            <SpinnerLoaderTweet />
            ) : (
            <div className="trendingHashtags--container">
                <h3>Who to Follow</h3>
                <div className="Line-tweet"></div>
                <ul>
                {peopleShouldFollow?.map((user, idx) => {
                    return (
                        <li key={idx} className="user--item">
                            <div className='user--item__container'>
                                <img
                                src={user?.user_info?.picture}
                                alt={user?.user_info?.name}
                                />
                                <div className='user--item__container-info' onClick={() => {navigate(`/${user?.user_info?.screenname}`)}}>
                                    <h3 className="">{`${user?.user_info?.name} ${user?.user_info?.lastname}`}</h3>
                                    <span>
                                    <strong>{user?.user_info?.followers_count}</strong> Followers
                                    </span>
                                </div>
                                <UserInfoFollowButton userId={user._id} followByUser={user.isFollowByMe}/>
                            </div>
                            <p>{user?.user_info?.description}</p>
                            <img className="user--item__background" src="" alt="" />
                            <div className="Line-tweet"></div>
                        </li>
                    );
                })}
                </ul>
            </div>
            )}
        </div>
    );
}

export default PeopleShouldFollow