import React, { useState } from 'react'
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import useUsers from '../../../hooks/useUsers';
import Signature from '../../Layout/Signature';
import UserInfo from '../UserInfo'
import UserNav from '../UserNav';
import Modal from '../../Modal'
import  '../../../styles/User.css'
import FollowingList from '../FollowingList';

const UserLayout = () => {

  let { screenname } = useParams();
    const { getSingleUser, userSearched } = useUsers();
    const [show, setShow] = useState(false)
    const [isFollowing , setIsFollowing] = useState(false)
    const showModal = () => setShow(true)
    const handleClose = () => setShow(false)

    const toggleFollowContext = (followingContext) => setIsFollowing(followingContext);

    useEffect(() => {
        getSingleUser(screenname);
        !userSearched && (window.location.href = "/");
    }, [screenname]);

    return (
      <div className="userLayout-container">
        <div className='UserDefaultBackgroud' style={{ backgroundImage: `url(${userSearched?.user_info?.background_profile})` }}>
        </div>
        <div className="userContainer">
          <UserInfo
            userData={userSearched}
            showModal={showModal}
            toggleFollowContext={toggleFollowContext}
          />
          <section className="userContainer--body">
            <UserNav screenname={userSearched?.user_info?.screenname} />
            <Outlet />
          </section>
        </div>
        <Signature />
        {show && (
          <Modal>
            <FollowingList
              screenname={screenname}
              username={`${userSearched?.user_info?.name} ${userSearched?.user_info?.lastname}`}
              handleClose={handleClose}
              isFollowing={isFollowing}
            />
          </Modal>
        )}
      </div>
    );

}

export default UserLayout