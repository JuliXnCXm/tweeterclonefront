import { useState } from 'react'
import { serverUser } from "../context/Api";
import Cookies from "universal-cookie";

const useUsers = () => {

    const cookie = new Cookies();
    const [userSearched , setUserSearched] = useState({})
    const [usersData, setUsersData] = useState([])
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(true)


    const getUsers = async () => {
        let token = cookie.get("token");
        let username = cookie.get("username");

        const res = await fetch(`${serverUser}?` + new URLSearchParams({skip:skip}), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
        })
        return res.json()
    };

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop === scrollHeight) {
            setSkip(usersData.length);
        }
    };

    const getSingleUser = (screenname) => {

        let token = cookie.get("token");
        let username = cookie.get("username");

        fetch(`${serverUser}/show?screenname=${encodeURIComponent(screenname)}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
        })
        .then(async (res) => {
            if (res.status === 200) {
                let json = await res.json();
                setUserSearched(json.user);
                if (usersData !== undefined) {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 4000);
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return {
        getUsers,
        handleScroll,
        userSearched,
        getSingleUser,
        usersData,
    };
}

export default useUsers