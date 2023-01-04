import React from 'react'
import Transitions from '../components/Transitions'
import Tweet from '../components/Tweets/Tweet'
const UserMedia = () => {

  return (
    <Transitions>
      <div className='userMedia'>
        <Tweet route="user_media"/>
      </div>
    </Transitions>
  )
}

export default UserMedia