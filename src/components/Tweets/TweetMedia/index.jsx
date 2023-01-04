import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { apiMedia } from '../../../context/Api';
import Metadatamediaurl from '../Metadatamediaurl';

const TweetMedia = ({ tweetMediaSource, classnameFunc, handleModalMedia,tweetMediaType }) => {

    const cookie = new Cookies();
    const [metadataMedia, setMetadataMedia] = useState({})
    const [metadataError, setMetadataError] = useState(false)

    useEffect(() => {
        const fetchMediaURL = async () => {
            let token = cookie.get("token");
            let username = cookie.get("username");
            axios
            .post(
                `${apiMedia}/external/metadata`,
                { mediaURL: tweetMediaSource },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                    "Content-Type": "application/json",
                },
                }
            )
            .then(async (res) => {
                if (res.status === 200) {
                    setMetadataMedia(await res.data);
                } else {
                    setMetadataError(true);
                }
            })
            .catch((err) => console.log(err));
        };
        if (tweetMediaType === "embedded") fetchMediaURL();
    }, [])

    return (
        <>
        {tweetMediaType !== "No media" &&
            (tweetMediaType === "upload" ? (
            <div className={classnameFunc(tweetMediaSource)}>
                {tweetMediaSource?.map((source, idx) => {
                return (
                    <div
                    id="tweet__media"
                    key={idx}
                    style={{ backgroundImage: `url(${source.photourl})` }}
                    onClick={() => {
                        handleModalMedia(source.photourl);
                    }}
                    ></div>
                );
                })}
            </div>
            ) : (
                <div id="metadata--media__tweet">
                    <Metadatamediaurl  metadataMedia={metadataMedia} writtingContext={false}/>
                </div>
            ))}
        </>
    );
};

export default TweetMedia;