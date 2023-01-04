import React from 'react'
import Transitions from '../components/Transitions'
import Tweet from '../components/Tweets/Tweet'

const BookmarksTweetsAndReplies = () => {
  return (
    <Transitions>
      <div>
        <Tweet route={"bookmarks_replies"}/>
      </div>
    </Transitions>
  )
}

export default BookmarksTweetsAndReplies