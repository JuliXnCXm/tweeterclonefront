import { useState , useRef } from 'react'
import { apiTweets } from '../context/Api'
import Cookies from "universal-cookie";
import axios from 'axios';

const useTweets = () => {

  const cookie = new Cookies();
  const [publicTweet, setPublicTweet] = useState(true)
  const [loadingCreatingTweet, setLoadingCreatingTweet] = useState(false)
  const [disableTweet, setDisableTweet] = useState(true);
  const [formTweet, setFormTweet] = useState({
    description: "",
    publicTweet: true,
  });
  const inputRef = useRef(null);
  const placeholder = inputRef?.current?.getAttribute("placeholder");
  inputRef?.current?.innerHTML === "" && (inputRef.current.innerHTML = placeholder);

  const handleTogglePublicTweet = (state) => {
    setPublicTweet(state)
    setFormTweet({
      ...formTweet, "publicTweet" : state
    })
  }

  const classNameChangeColor = (el) => {
    if (el[0] === "#" && el.length > 1) {
      return "hashtag";
    } else {
      return "noHashtag";
    }
  };

  const handleChangeTweet = () => {
    if (inputRef.current.textContent === "") {
      setDisableTweet(true)
    } else {
      setDisableTweet(false)
    }
    setFormTweet({
      ...formTweet,
      "description": inputRef.current.textContent,
    });
  }

  const handleSubmit = (e, mediaFile, mediaURL, tweetId, refreshTweets) => {

    e.preventDefault();
    setLoadingCreatingTweet(true)
    let token = cookie.get("token");
    let username = cookie.get("username");
    let hashtags = inputRef.current.textContent
    .split(" ")
    .filter((word) => word[0] === "#" && word.length > 1);

    const formData = new FormData()
    formData.append("tweetData", JSON.stringify(formTweet));
    formData.append("hashtags", JSON.stringify(hashtags));
    formData.append("mediaEmbeddedURL", mediaURL)
    if (mediaFile !== undefined) {
      for (let i = 0; i < Array.from(mediaFile).length; i++) {
          formData.append("media", Array.from(mediaFile)[i]);
      }
    }
    let endpoint = tweetId ? `${apiTweets}/create/tweet?`+ new URLSearchParams({
      tweetId: tweetId
    }) : `${apiTweets}/create/tweet?`

    axios.post(endpoint, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'username': username,
      },
    })
    .then( res => {
      if (res.status === 201) {
        refreshTweets()
        setLoadingCreatingTweet(false)
        setTimeout(() => {
          setFormTweet({
            description: "",
            publicTweet: true,
          });
        }, 4000);
      }
    })
    .catch((err) => {
      setLoadingCreatingTweet(false)
      console.log(err)
    });
  }

  return {
    handleTogglePublicTweet,
    loadingCreatingTweet,
    classNameChangeColor,
    handleChangeTweet,
    setPublicTweet,
    setFormTweet,
    disableTweet,
    handleSubmit,
    placeholder,
    publicTweet,
    formTweet,
    inputRef,
  };
}

export default useTweets