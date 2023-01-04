import React, { useContext, useState } from 'react'
import  './index.css'
import UserInfoFollowButton from '../UserInfoFollowButton'
import AuthContext from '../../../context/AuthContext';
import UpdateUser from '../UpdateUser';
import Modal from '../../Modal';

const UserInfo = ({ userData, showModal, toggleFollowContext }) => {
    const {user} = useContext(AuthContext)

    const [showUpdateUser, setShowUpdateUser] = useState(false)

    return (
        <>
        <div className="UserInfo--container">
            <section>
            <div className="UserInfo--container__picture" style={{ backgroundImage: `url(${userData?.user_info?.picture})` }}>
            </div>
            <div className="UserInfo--container__sectionInfo">
                <div>
                <h3 className="UserInfo--container__sectionInfo-name">{`${userData?.user_info?.name} ${userData?.user_info?.lastname}`}</h3>
                <div className="UserInfo--container__sectionInfo-follows">
                    <span
                    onClick={() => {
                        toggleFollowContext(true);
                        showModal();
                    }}
                    >
                    <strong>{userData?.following?.length}</strong> Following
                    </span>
                    <span
                    onClick={() => {
                        toggleFollowContext(false);
                        showModal();
                    }}
                    >
                    <strong>{userData?.followers?.length}</strong> Followers
                    </span>
                </div>
                </div>
                <div className="UserInfo--container__sectionInfo-description">
                {userData?.user_info?.description}
                </div>
            </div>
            </section>
            <div>
                {user._id === userData._id ?
                    <div id="user--edit__button">
                        <span className="material-icons material-icons-outlined" onClick={() => setShowUpdateUser(true)}>
                            edit
                        </span>
                    </div>
                    :
                    <UserInfoFollowButton userId={userData._id} followByUser={userData.isFollowByMe}/>
                }
            </div>
        </div>
            {showUpdateUser &&
                <Modal>
                    <div id="updateUser_modal">
                        <span className="material-icons material-icons-outlined" id="icon--modal__update-user"
                        onClick={() => {
                            setShowUpdateUser(false)
                        }}>
                        close
                        </span>
                        <UpdateUser user={user}/>
                    </div>
                </Modal>
            }
        </>
    );
};

export default UserInfo