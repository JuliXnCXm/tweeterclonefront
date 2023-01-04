import React from 'react'
import Transitions from '../components/Transitions';
import Tweet from '../components/Tweets/Tweet'

const BookmarksLikes = () => {
  return (
    <Transitions>
      <Tweet route="bookmarks_likes" />
    </Transitions>
  );
}

export default BookmarksLikes