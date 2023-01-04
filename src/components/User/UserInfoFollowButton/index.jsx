import React from 'react'
import { useState } from 'react';
import useFollowing from '../../../hooks/useFollowing';

const UserInfoFollowButton = ({
    userId,
    followByUser,
}) => {

    const { handleFollowButton, handleUnfollowButton } = useFollowing();

    const [isFollow, setIsFollow] = useState(followByUser);

    return (
        <>
        <button className="UserInfo--container__button" onClick={() => {
                setIsFollow(!isFollow)
                !isFollow
                ? handleFollowButton(userId)
                : handleUnfollowButton(userId);
                }}>
                {isFollow ?
                    <span>Following</span>
                    :
                    <>
                        <span id="UserInfo--container__button-Icon" className="material-icons">
                    person_add
                        </span>
                        <span>Follow</span>
                    </>
                }
        </button>
        </>
    );
}

export default UserInfoFollowButton