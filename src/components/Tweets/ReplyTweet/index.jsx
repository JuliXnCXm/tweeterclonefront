import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import useMedia from '../../../hooks/useMedia';
import useTweets from '../../../hooks/useTweets';
import Modal from '../../Modal';
import HandleMedia from '../HandleMedia';
import Metadatamediaurl from '../Metadatamediaurl';
import SpinnerLoaderTweet from '../SpinnerLoaderTweet';
import TweetInput from '../TweetInput';
import TweetOptions from '../TweetOptions';
import WriteTweetMedia from "../WriteTweetMedia";
import  './index.css'

const ReplyTweet = ({ user , tweet , updateReplies }) => {

    const [preview, setPreview] = useState()
    const [showReplyModal, setShowReplyModal] = useState(false)
    const [disableComment, setDisableComment] = useState(true)

    const {
        loadingCreatingTweet,
        handleChangeTweet,
        handleSubmit,
        placeholder,
        inputRef,
    } = useTweets();


    const {
        handleChangeMediaURL,
        setMediaUrlAllowed,
        handleChangeMedia,
        handleRemoveMedia,
        setMetadataMedia,
        handleMediaURL,
        classnameFunc,
        metadataError,
        metadataMedia,
        setMediaURL,
        mediaFile,
        mediaURL
    } = useMedia();

    const handleCloseReply = (state) => {
        setShowReplyModal(state)
    }

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

    const replyText = inputRef?.current?.textContent;

    useEffect(() => {
        if (
            (!preview || preview?.length === 0) &&
            !metadataMedia && (replyText === "" || replyText === "Tweet Your reply")
        ) {
            setDisableComment(true);
        } else {
            setDisableComment(false);
        }
    }, [preview, metadataMedia, replyText]);

    return (
        <>
        <div>
        {
            loadingCreatingTweet ?
            <div id="listTweetsLoader">
                <SpinnerLoaderTweet />
            </div>
        :
        <form
            encType="multipart/form-data"
            method="POST"
            onSubmit={(e) => {
                handleSubmit(e, mediaFile, mediaURL, tweet._id, updateReplies);
                handleChangeMedia()
            }}
            >
            <div className='tweet--container__actions'>
                <TweetOptions tweet={tweet} disableComment={disableComment}/>
            </div>
            <div className='replyTweet--container'>
                <img
                className="userPicture_none"
                src={user?.user_info?.picture}
                id="picture_reply"
                alt=""
                />
                <div className='reply__input--container'>
                    <TweetInput
                    inputRef={inputRef}
                    handleChangeTweet={handleChangeTweet}
                    placeholder={placeholder}
                    placeholderAttr="Tweet Your reply"
                    />
                    <label
                    htmlFor="file"
                    className='file-upload'
                    id="upload-file-reply"
                    >
                        <span className="material-icons material-symbols-outlined" onClick={() => setShowReplyModal(true)}>image
                        </span>
                    </label>
                </div>
            </div>
            <div id="reply--media">
                <WriteTweetMedia
                mediaFile={mediaFile}
                preview={preview}
                classnameFunc={classnameFunc}
                handleRemoveMedia={handleRemoveMedia}
                />
            </div>
            <div id="reply--metadata">
                <Metadatamediaurl metadataMedia={metadataMedia} setMetadataMedia={setMetadataMedia} writtingContext={true}/>
            </div>
        </form>
        }
        </div>
            {showReplyModal && (
            <Modal>
                {metadataError ? (
                    <div className='metadataError'>
                        <span className="material-icons material-icons-outlined">
                            error
                        </span>
                        <h1>Something went wrong</h1>
                    </div>
                ) :
                    <HandleMedia
                    setShowModal={handleCloseReply}
                    handleChangeMediaURL={handleChangeMediaURL}
                    handleMediaURL={handleMediaURL}
                    handleChangeMedia={handleChangeMedia}
                    setMediaURL={setMediaURL}
                    setMediaUrlAllowed={setMediaUrlAllowed}
                    />
                }
            </Modal>
            )}
        </>
    );
}

export default ReplyTweet