import React from 'react'
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import UserInfoFollowButton from '../UserInfoFollowButton';

const UserFollows = ({follow}) => {

  const {user} = useContext(AuthContext)

  return (
    <div className="follow">
      <div className="follow_container">
        <div className="follow_container--info">
          <img src={follow?.user_info?.picture} alt={follow?.user_info?.name} />
          <div>
            <h3>
            <a href={`/${follow?.user_info?.screenname}`}>
              {follow?.user_info?.name + " " + follow?.user_info?.lastname}
            </a>
            </h3>
            <span>{follow?.user_info?.followers_count + " Followers"}</span>
          </div>
        </div>
        {user._id !== follow._id &&
        <UserInfoFollowButton
          userId={follow?._id}
          followByUser={follow?.isFollowByMe}
        />
        }
      </div>
      <p>{follow?.user_info.description}</p>
    </div>
  );
}

export default UserFollows