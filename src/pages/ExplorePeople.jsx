import React, { useState } from 'react'
import { useEffect } from 'react'
import Cookies from "universal-cookie";
import { serverUser } from '../context/Api';
import UserInfoFollowButton from '../components/User/UserInfoFollowButton';
import '../styles/ExplorePeople.css'
import SpinnerLoaderTweet from '../components/Tweets/SpinnerLoaderTweet';
import Searcher from '../components/Searcher';
import useSearcher from '../hooks/useSearcher';

const ExplorePeople = () => {

  const [skip ,setSkip] = useState(0)
  const [users, setUsers] = useState([])
  const [loadingPeople, setLoadingPeople] = useState(true)
  const [showLoader, setShowLoader] = useState(false)
  const cookie = new Cookies();
  const { query, searching, setQuery, setSearching } = useSearcher();
  let token = cookie.get("token");
  let username = cookie.get("username");

  useEffect(() => {
    const fetchUsers = async () => {

      let params = searching !== true ? { skip: skip } : { skip: skip, queryFilterPeople: query };

      try {
        const request = await fetch(
          `${serverUser}/explore/people?` + new URLSearchParams(params),{
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              username: username,
            },
          }
        );
        const usersJson = await request.json();
        setUsers([...users, ...usersJson.users]);
        setTimeout(() => {
          setLoadingPeople(false);
        }, 1000);
      } catch (e) {
        console.log(e)
        setLoadingPeople(false);
      }
    };
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  const updatePeople = async (isSearching) => {
    setSearching(isSearching)
    setLoadingPeople(true)
    setUsers([])
    setSkip(0)

    let params = isSearching !== true ? { skip: skip } : { skip: skip, queryFilterPeople: query };
    try {
      const request = await fetch(
        `${serverUser}/explore/people?` + new URLSearchParams(params) , {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            username: username,
          },
        }
      );
        const usersJson = await request.json();
        setUsers(usersJson.users);
        setTimeout(() => {
          setLoadingPeople(false);
        }, 1000);
      } catch (e) {
        console.log(e)
        setLoadingPeople(false);
      }
    };

  const handleScroll = (e) => {

    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop === scrollHeight) {
      setShowLoader(true);
      setTimeout(() => {
        setSkip(users.length);
        setShowLoader(false);
      }, 2000)
    }
  };

  return (
    <>
    <Searcher
    updater={updatePeople}
    setQuery={setQuery}
    setSearching={setSearching}
    query={query}
    />
    <div onScroll={handleScroll} className="explorePeople">
      {loadingPeople ? <SpinnerLoaderTweet /> :
        <ul className="explorePeople--list">
          {users?.map((user, idx) => {
            return (
              <div className="explorePeople--container" key={idx}>
                <div className="explorePeople--container__info">
                  <div>
                    <img src={user?.user_info?.picture} alt="" />
                    <h3>
                      <a href={`/${user?.user_info?.screenname}`}>
                        {user?.user_info?.name + " " + user?.user_info?.lastname}
                      </a>
                    </h3>
                  </div>
                  <p>{user?.user_info?.description}</p>
                </div>
                <UserInfoFollowButton userId={user._id} followByUser={false} />
              </div>
            );
          })}
          <div id="loader--bottom">
            {showLoader && <SpinnerLoaderTweet />}
          </div>
        </ul>
      }
    </div>
    </>
  );
}

export default ExplorePeople