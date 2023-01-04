import React from 'react'
import Transitions from '../components/Transitions'
import Tweet from '../components/Tweets/Tweet';

const UserTweetsReplies = () => {

  return (
    <Transitions>
      <div className="userTweetsReplies">
        <Tweet route="user_replies" />
      </div>
    </Transitions>
  );
}

export default UserTweetsReplies