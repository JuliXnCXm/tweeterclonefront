import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'universal-cookie'
import Transitions from '../components/Transitions'
import PeopleShouldFollow from '../components/TrendingSection/PeopleShouldFollow'
import TrendingHashtags from '../components/TrendingSection/TrendingHashtags'
import Tweet from '../components/Tweets/Tweet'
import { server } from '../context/Api'
import '../styles/Home.css'

const Home = () => {

    const cookie = new Cookies();
    const [trendingHashtags, setTrendingHashtags] = useState({});
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 480;

    const hashtags = () => {
        let token = cookie.get("token");
        let username = cookie.get("username");
        fetch(server + "api/tweets/retrievetrending ", {
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
                setTrendingHashtags(responseJson.trending);
                setLoading(false);
            }
            })
            .catch((err) => {
            setLoading(false);
            console.log(err);
            });
        };


    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
        hashtags();
    }, []);

    return (
        <Transitions>
            <div className="Home">
                <section className="mainSection">
                    <Tweet route="home" updateHastags={hashtags} width={width} breakpoint={breakpoint} trendingHashtags={trendingHashtags}/>
                </section>
                {width > breakpoint &&
                <section className="sideSection">
                    <TrendingHashtags loading={loading} trendingHashtags={trendingHashtags}/>
                    <PeopleShouldFollow />
                </section>
                }
            </div>
        </Transitions>
    );
}

export default Home