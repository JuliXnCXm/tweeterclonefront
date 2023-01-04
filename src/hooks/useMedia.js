import { useState } from 'react';
import axios from 'axios';
import { apiMedia } from '../context/Api';
import { validURL } from "../utils/Regex";

const useMedia = () => {

    const [mediaUrlAllowed, setMediaUrlAllowed] = useState(false);
    const [mediaURL, setMediaURL] = useState("");
    const [metadataMedia, setMetadataMedia] = useState();
    const [mediaFile, setMediaFile] = useState();
    const [metadataError, setMetadataError] = useState(false);

    const classnameFunc = (files) => {
        if (files) {
            if (Array.from(files).length === 1) {
            return "writeTweet--container__images-oneImage";
            } else if (Array.from(files).length === 2) {
            return "writeTweet--container__images-twoImage";
            } else if (Array.from(files).length === 3) {
            return "writeTweet--container__images-threeImages";
            } else {
            return "writeTweet--container__images-fourImages";
            }
        }
    };

    const handleChangeMediaURL = (e) => {
        setMediaURL(e.target.value);

        validURL.test(e.target.value) === true
            ? setMediaUrlAllowed(true)
            : setMediaUrlAllowed(false);
    };

    const handleRemoveMedia = (idx) => {
        setMediaFile(Array.from(mediaFile).filter((file, i) => i !== idx));
    };

    const handleMediaURL = async () => {

        axios
        .post(

        `${apiMedia}/external/metadata`,
        { mediaURL: mediaURL },
        {
            headers: {
            "Content-Type": "application/json",
            },
        }
        )
        .then(async (res) => {
            if (res.status === 200) {
                setMetadataMedia(await res.data);
            } else {
                setMetadataError(true)
            }
        })
            .catch((err) => console.log(err));
    };

    const handleChangeMedia = (files) => {
        setMetadataMedia()
        setMediaUrlAllowed(false)
        setMediaFile(files)
    }

    return {
        handleChangeMediaURL,
        handleChangeMedia,
        handleRemoveMedia,
        setMetadataMedia,
        handleMediaURL,
        metadataMedia,
        classnameFunc,
        metadataError,
        setMediaURL,
        mediaURL,
        mediaFile
    };
}

export default useMedia