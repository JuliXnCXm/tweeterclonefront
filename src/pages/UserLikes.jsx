import React from 'react'
import Transitions from '../components/Transitions'
import Tweet from '../components/Tweets/Tweet'

const UserLikes = () => {

    return (
        <Transitions>
            <div className='userLikes'>
                <Tweet route="user_likes"/>
            </div>
        </Transitions>
    )
}

export default UserLikes