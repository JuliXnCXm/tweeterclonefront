import { apiFollows } from "../context/Api";
import Cookies from "universal-cookie";
import { useState } from "react";

const useFollowing = () => {

    const cookie = new Cookies();
    const [skip, setSkip] = useState(0)
    const [loading, setLoading] = useState(false)
    const [follows, setFollows] = useState([])
    const [error, setError] = useState(false)

    const handleRetrieveFollows = (screenname, isFollowing ) => {
        let token = cookie.get("token");
        let username = cookie.get("username");

        fetch(`${apiFollows}/retrievefollows?` + new URLSearchParams({
            screenname : screenname,
            skip: skip,
            isFollowing: isFollowing
        }), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                username: username,
            },
        }).then(async res => {
            if (res.status === 200) {
                let response = await res.json();
                setFollows(response)
                setLoading(false)
            } else {
                console.log("error")
                setError(true)
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    };

    const handleFollowButton = (user_id) => {
        let token = cookie.get("token");
        let username = cookie.get("username");

        fetch(
            `${apiFollows}/follow?` +
            new URLSearchParams({ user_id: user_id }),
            {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
            }
        ).finally()
    };

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop === scrollHeight) {
            setSkip(follows.length);
        }
    };

    const handleUnfollowButton = (user_id) => {
        let token = cookie.get("token");
        let username = cookie.get("username");

        fetch(
            `${apiFollows}/unfollow?` +
            new URLSearchParams({ user_id: user_id }),
            {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
            }
        ).finally()
    }

    return {
        handleRetrieveFollows,
        handleUnfollowButton,
        handleFollowButton,
        handleScroll,
        setLoading,
        loading,
        follows,
        error
    };
}

export default useFollowing