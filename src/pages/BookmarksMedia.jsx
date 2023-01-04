import React from 'react'
import Transitions from '../components/Transitions';
import Tweet from '../components/Tweets/Tweet'

const BookmarksMedia = () => {
  return (
    <Transitions>
      <Tweet route="bookmarks_media" />
    </Transitions>
  );
}

export default BookmarksMedia