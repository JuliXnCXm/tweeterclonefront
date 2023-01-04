import React from 'react'
import Tweet from '../components/Tweets/Tweet';
import Transitions from "../components/Transitions";

const ExploreTop = () => {
  return (
    <Transitions>
      <Tweet route="top" />
    </Transitions>
  );
}

export default ExploreTop