import React from 'react'
import Transitions from '../components/Transitions';
import Tweet from '../components/Tweets/Tweet'

const BookmarksTweets = () => {
  return (
    <Transitions>
      <Tweet route="bookmarks" />
    </Transitions>
  );
}

export default BookmarksTweets