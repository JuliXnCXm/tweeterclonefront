import React from 'react'
import Tweet from '../components/Tweets/Tweet'
import Transitions from "../components/Transitions";

const ExploreMedia = () => {
  return (
    <Transitions>
      <Tweet route="media"/>
    </Transitions>
  )
}

export default ExploreMedia