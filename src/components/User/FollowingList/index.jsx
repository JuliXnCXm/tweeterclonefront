import React from 'react'
import  './index.css'
import useFollowing from '../../../hooks/useFollowing';
import SkeletonFollows from '../SkeletonFollows';
import { useEffect } from 'react';
import UserFollows from '../UserFollows';
import NoContent from '../NoContent';


const FollowingList = ({
    screenname,
    username,
    handleClose,
    isFollowing,
    handleScroll,
    }) => {
    const { loading, follows, setLoading, handleRetrieveFollows, error } =
        useFollowing();

    useEffect(() => {
        setLoading(true);
        handleRetrieveFollows(screenname, isFollowing);
    }, [isFollowing, username]);

    return (
        <div className="FollowingList" onScroll={handleScroll}>
            <div className="FollowingList__header">
                {isFollowing ? (
                <div>{username} is Following</div>
                ) : (
                <div>{username}'s Followers</div>
                )}
                <span
                className="material-icons material-symbols-outlined"
                onClick={handleClose}
                >
                close
                </span>
            </div>
            <section className="FollowingList__container">
                {loading ? (
                <SkeletonFollows />
                ) : error ? (
                <NoContent message={"No Users were found."} />
                ) : (
                follows?.users?.map((follow, idx) => {
                    return <UserFollows follow={follow} idx={idx} />;
                })
                )}
            </section>
        </div>
    );
};

export default FollowingList