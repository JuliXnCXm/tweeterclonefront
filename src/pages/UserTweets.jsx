import React from 'react'
import Transitions from '../components/Transitions'
import Tweet from '../components/Tweets/Tweet';

const UserTweets = () => {

  return (
    <Transitions>
      <div className="userTweets">
        <Tweet route="user_tweets" />
      </div>
    </Transitions>
  );
}

export default UserTweets