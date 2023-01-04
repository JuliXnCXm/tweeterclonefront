import React from 'react'
import Tweet from '../components/Tweets/Tweet'
import Transitions from "../components/Transitions";

const ExploreLatest = () => {
  return (
    <Transitions>
      <Tweet route="latest" />
    </Transitions>
  );
}

export default ExploreLatest