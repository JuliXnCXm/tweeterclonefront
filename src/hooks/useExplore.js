import { useState } from 'react'
import Cookies from "universal-cookie";

const useExplore = () => {

    const [skip , setSkip] = useState(0)
    const [users, setUsers] = useState([])

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop === scrollHeight) {
            setSkip(users.length);
        }
    };

    return {
        handleScroll,
        users,
    };
}

export default useExplore