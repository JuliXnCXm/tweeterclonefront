import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation,  useNavigate,  useParams } from 'react-router-dom';
import Cookies from "universal-cookie";
import { apiTweets } from '../../../context/Api';
import useMedia from '../../../hooks/useMedia';
import SpinnerLoaderTweet from '../SpinnerLoaderTweet';
import './index.css'
import AuthContext from '../../../context/AuthContext'
import Modal from '../../Modal'
import useUsers from '../../../hooks/useUsers';
import useTweets from '../../../hooks/useTweets';
import RepliesTweet from '../RepliesTweet';
import TweetMedia from '../TweetMedia';
import { formattedDate } from '../../../utils/FormattedData';
import WriteTweet from '../WriteTweet';
import NoContent from '../../User/NoContent';
import Searcher from '../../Searcher';
import useSearcher from '../../../hooks/useSearcher';
import PeopleShouldFollow from '../../TrendingSection/PeopleShouldFollow';
import TrendingHashtags from '../../TrendingSection/TrendingHashtags';

const Tweet = ({route, updateHastags, width, breakpoint, trendingHashtags}) => {

    const cookie = new Cookies();
    const {user} = useContext(AuthContext)
    const { classnameFunc } = useMedia();
    const { getSingleUser, userSearched } = useUsers()
    let { screenname } = useParams();
    const { classNameChangeColor } = useTweets();
    const { query, searching, setQuery, setSearching } = useSearcher();
    let pathname = useLocation().pathname.split("/").at(-1)
    let token = cookie.get("token");
    let username = cookie.get("username");
    const [skip, setSkip] = useState(0);
    const [tweets, setTweets] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [preview, setPreview] = useState()
    const [showTrending, setShowTrending] = useState(false)
    const [showPeople, setShowPeople] = useState(false)
    const [showCreateTweet, setShowCreateTweet] = useState(false)
    const navigate = useNavigate()
    let params = undefined

    useEffect(() => {
        getSingleUser(screenname);
        !userSearched && (window.location.href = "/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenname]);

    const handleScrollTweets = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;
        if (offsetHeight + scrollTop === scrollHeight) {
            setSkip(tweets.length);
        }
    };

    useEffect(() => {
        let params = undefined
        setLoading(true);
        const fetchTweets = async () => {
            if (screenname !== undefined) {
                params = { skip: skip, userSearched: screenname };
            } else if (searching === true) {
                params = { skip: skip, queryFilter: query };
            } else {
                params = { skip: skip };
            }

            try {
                const request = await fetch(
                    `${apiTweets}/retrieve/${route}?` +
                    new URLSearchParams(params),{
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            username: username,
                        },
                    }
                );
                const tweetsJson = await request.json();
                setTweets([...tweets, ...tweetsJson.tweets]);
                setTimeout(()=> {
                    setLoading(false)
                } , 4000)
            } catch (e) {
                setLoading(false)
            }
        };
        fetchTweets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [skip]);


    const handleModalMedia = (sourceUrl) => {
        setShowModal(true);
        setPreview(sourceUrl);
    }

    const updateTweets = (isSearching) => {
        window.location.pathname.includes("home") && updateHastags()
        setSearching(isSearching)
        setLoading(true);
        setTweets([])
        setSkip(0)
        if (screenname !== undefined) {
            params = { skip: skip,  userSearched: screenname }
        } else if (isSearching === true) {
            params = { skip: skip, queryFilter: query };
        } else {
            params = { skip: skip}
        }

        fetch(
            `${apiTweets}/retrieve/${route}?` + new URLSearchParams(params),{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            }
        )
        .then(async res => {
            if (res.status === 200) {
                const tweetsJson = await res.json();
                setTweets(tweetsJson.tweets);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        })
    }

    return (
        <>
        {window.location.pathname.includes("explore") &&
            <Searcher
                updater={updateTweets}
                setQuery={setQuery}
                setSearching={setSearching}
                query={query}
            />
        }
        {pathname === "home" &&
            <>
                {width > breakpoint ?
                    <WriteTweet user={user} updateTweets={updateTweets}/>
                :
                    <span className="material-icons material-icons-outlined" id="icon--createTweet" onClick={() => setShowCreateTweet(true)}>
                    add
                    </span>
            }
        </>
        }
        <div onScroll={handleScrollTweets} className="allTweets" id={pathname !== "home" && "tweetsNotInHome"} >
            {tweets.length > 0 ?
                <ul className='tweets--list'>
                        <>
                        {tweets?.map((tweet, idx) => {
                            return (
                                <>
                                    {userSearched?.retweeted?.includes(tweet._id) && (
                                        <div style={{ color: "#828282" }} id="tweet--retweeted" >
                                            <span className="material-icons material-icons-outlined"
                                            >
                                            autorenew
                                            </span>
                                            <span>{user._id !== userSearched._id ? `${userSearched?.user_info?.name} ${userSearched?.user_info?.lastname}` : "You"} Retweeted</span>
                                        </div>
                                    )}
                                    <div className="tweet" key={idx}>
                                        <div className='tweet--container__author'>
                                            <img
                                            id="userPicture_none--header_icon"
                                            src={tweet?.author_data?.picture}
                                            alt={tweet?.author_data?.name}
                                            onClick={() => {navigate(`/${tweet?.author_data?.screenname}`)}}
                                            />
                                            <div onClick={() => {navigate(`/${tweet?.author_data?.screenname}`)}}>
                                                <h2>{tweet?.author_data?.name} {tweet?.author_data?.lastname} </h2>
                                                <h3 className='tweet--container__author-date'>{formattedDate(tweet?.created_at)}</h3>
                                            </div>
                                        </div>
                                        <p>{tweet?.description.split(" ").map((word, idx) => {
                                            return (
                                            <span key={idx} className={classNameChangeColor(word)}>
                                                {word}{" "}
                                            </span>
                                            );
                                        })}</p>
                                        <TweetMedia
                                        tweetMediaType={tweet?.mediaType}
                                        tweetMediaSource={tweet?.mediaType === "embedded" ? tweet?.mediaEmbeddedURL : tweet?.mediaSource}
                                        classnameFunc={classnameFunc}
                                        handleModalMedia={handleModalMedia}/>
                                        <RepliesTweet
                                        tweet={tweet}
                                        classnameFunc={classnameFunc}
                                        handleModalMedia={handleModalMedia}/>
                                    </div>
                                </>
                            );
                        })}
                        {loading &&
                            <div id="listTweetsLoader" style={{'display': ' flex'}}>
                                <SpinnerLoaderTweet />
                            </div>
                        }
                        </>
                </ul>
                :
                <>
                    {loading ?
                        <div id="listTweetsLoader" style={{'display': ' flex'}}>
                            <SpinnerLoaderTweet />
                        </div>

                        :
                        <NoContent message={"No Tweets were found"} />
                    }
                </>
            }
        </div>
        {showModal && (
            <Modal change={true}>
                <span className="material-icons material-icons-outlined" id="icon--modal__media" onClick={() => {
                    setShowModal(false)
                    }}>
                    close
                </span>
                <img src={preview} alt="media--closer" id="modal--media"/>
            </Modal>
        )}
        {(showPeople || showTrending) &&
        <>
            {showPeople ?
                <Modal>
                    <div id="modal__people--container">
                        <span className="material-icons material-icons-outlined" onClick={() => setShowPeople(false)}>
                        cancel
                        </span>
                        <PeopleShouldFollow />
                    </div>
                </Modal>
                :
                <Modal>
                    <div id='modal__trending--container'>
                        <span className="material-icons material-icons-outlined" onClick={() => setShowTrending(false)}>
                        cancel
                        </span>
                        <TrendingHashtags trendingHashtags={trendingHashtags}/>
                    </div>
                </Modal>
            }
        </>
        }
        {showCreateTweet &&
            <Modal>
                <div id="modal__createTweet--container">
                    <span className="material-icons material-icons-outlined" onClick={() => setShowCreateTweet(false)}>
                    cancel
                    </span>
                    <WriteTweet user={user} updateTweets={updateTweets}/>
                    <div id="sideSection__menu">
                        <span onClick={() => setShowTrending(true)}>
                            <span className="material-icons material-icons-outlined">
                            trending_up
                        </span>Trending</span>
                        <span onClick={() => setShowPeople(true)}>
                            <span className="material-icons material-icons-outlined">
                                groups
                            </span>Who to Follow</span>
                    </div>
                </div>
            </Modal>
        }
        </>
    )
}

export default Tweet