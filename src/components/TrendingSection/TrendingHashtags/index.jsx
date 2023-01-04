import React from 'react'
import SpinnerLoaderTweet from  '../../Tweets/SpinnerLoaderTweet'
import './index.css'
const TrendingHashtags = ({loading, trendingHashtags}) => {


    return (
        <div className='trendingHashtags'>
            {loading ? <SpinnerLoaderTweet /> :
            <div className='trendingHashtags--container' >
                <h3>Trends For you</h3>
                <div className="Line-tweet"></div>
                <ul>
                    {trendingHashtags?.map((hashtag , idx ) => {
                        return (
                            <li key={idx} className="hashtag--item">
                                <h2>{hashtag._id.hashtag}</h2>
                                <span>{hashtag.count} Tweets</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            }
        </div>
    )
}

export default TrendingHashtags