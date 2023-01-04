import React,  {useEffect, useState } from 'react'
import useTweets from '../../../hooks/useTweets'
import './index.css'
import ReplyOptionDropdopwn from '../ReplyOptionDropdown'
import Modal from '../../Modal'
import HandleMedia from '../HandleMedia'
import TweetInput from '../TweetInput'
import SpinnerLoaderTweet from '../SpinnerLoaderTweet'
import useMedia from '../../../hooks/useMedia'
import Metadatamediaurl from '../Metadatamediaurl'
import WriteTweetMedia from "../WriteTweetMedia";

const WriteTweet = ({user, updateTweets}) => {

    const [show , setShow] =  useState(false)
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState();
    const [disableTweet, setDisableTweet] = useState(true)

    const {
        handleTogglePublicTweet,
        loadingCreatingTweet,
        handleChangeTweet,
        handleSubmit,
        publicTweet,
        placeholder,
        inputRef,
    } = useTweets();

    const {
        handleChangeMediaURL,
        setMediaUrlAllowed,
        handleRemoveMedia,
        handleChangeMedia,
        setMetadataMedia,
        handleMediaURL,
        classnameFunc,
        metadataError,
        metadataMedia,
        setMediaURL,
        mediaFile,
        mediaURL,
    } = useMedia();

    useEffect(() => {
        if (!mediaFile) {
            setPreview(undefined);
            return;
        }

        setPreview(
            Array.from(mediaFile).map((file) => {
                return URL.createObjectURL(file);
            })
        );
    }, [mediaFile]);

    const tweetText = inputRef?.current?.textContent;

    useEffect(()=> {
        if ((!preview || preview?.length === 0) && !metadataMedia && (tweetText === "" || tweetText === "What’s happening?")){
            setDisableTweet(true)
        }
        else {
            setDisableTweet(false)
        }
    }, [preview, metadataMedia, tweetText])

    return (
        <div className="writeTweet--container">
            <span>Tweet something</span>
            <div className="Line-tweet"></div>
            <div className="writeTweet--container__body">
            <img
                id="userPicture_none--header_icon"
                src={user?.user_info?.picture}
                alt={user?.user_info?.name}
            />
            {loadingCreatingTweet ? <SpinnerLoaderTweet /> :
            <div className="writeTweet--container__body-form">
                <form
                encType="multipart/form-data"
                method="POST"
                onSubmit={(e) => {
                    handleSubmit(e, mediaFile, mediaURL,undefined , updateTweets)
                    handleChangeMedia()
                }}
                >
                    <TweetInput
                        inputRef={inputRef}
                        handleChangeTweet={handleChangeTweet}
                        placeholder={placeholder}
                        placeholderAttr={"What’s happening?"}
                    />
                    <WriteTweetMedia
                        mediaFile={mediaFile}
                        preview={preview}
                        classnameFunc={classnameFunc}
                        handleRemoveMedia={handleRemoveMedia}
                    />
                    <Metadatamediaurl metadataMedia={metadataMedia} setMetadataMedia={setMetadataMedia} writtingContext={true}/>
                    <div id="writeTweet-secondRow">
                        <div className="writeTweet--container__icons">
                            <span
                                className="material-icons material-symbols-outlined"
                                id="option_write_tweet"
                                onClick={() => setShowModal(true)}
                            >
                                image
                            </span>
                            <div className='toggle_private'>
                            {publicTweet === true ? (
                                <>
                                    <span
                                        className="material-icons material-symbols-outlined"
                                        id="option_write_tweet"
                                    >
                                        public
                                    </span>
                                    <span
                                        onMouseOver={() => setShow(true)}
                                        onMouseLeave={() => setShow(false)}
                                        className="toggle-private_tweet"
                                        id="option_write_tweet"
                                    >
                                        Everyone can reply
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span
                                        className="material-icons material-symbols-outlined"
                                        id="option_write_tweet"
                                    >
                                        people
                                    </span>
                                    <span
                                        className='toggle-private_tweet'
                                        onMouseOver={() => setShow(true)}
                                        onMouseLeave={() => setShow(false)}
                                        id="option_write_tweet"
                                    >
                                        People you follow can reply
                                    </span>
                                </>
                            )}
                            {show && (
                                <ReplyOptionDropdopwn
                                    handleTogglePublicTweet={handleTogglePublicTweet}
                                    setShow={setShow}
                                />
                            )}
                            </div>
                        </div>
                        <button
                        type="submit"
                        className="writeTweet--container__button"
                        disabled={disableTweet}
                        >
                        Tweet
                        </button>
                    </div>
                </form>
            </div>
            }
            </div>
            {showModal && (
            <Modal>
                {metadataError ? (
                    <div className='metadataError'>
                        <span className="material-icons material-icons-outlined">
                            error
                        </span>
                        <h1>Something went wrong</h1>
                    </div>
                ):
                    <HandleMedia
                    setShowModal={setShowModal}
                    handleChangeMediaURL={handleChangeMediaURL}
                    handleMediaURL={handleMediaURL}
                    handleChangeMedia={handleChangeMedia}
                    setMediaURL={setMediaURL}
                    setMediaUrlAllowed={setMediaUrlAllowed}
                    />
                }
            </Modal>
            )}
        </div>
    );
}

export default WriteTweet