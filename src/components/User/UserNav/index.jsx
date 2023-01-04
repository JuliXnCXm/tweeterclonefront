import React from "react";
import "./index.css";
import { NavLink, useLocation } from "react-router-dom";


const UserNav = ({screenname}) => {

  let activeStyle = {
        color: "#2F80ED",
      };
  let activeClassName = "userNavlist--container__link";
      const { pathname } = useLocation();

  return (
    <nav className="userNavlist--container">
      <ul className="userNav--container__list">
        <li>
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            isActive={() => [screenname].includes(pathname)}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            end
          >
            <div>
              <div className="user_Line-nav"></div>
              <span>Tweets</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${screenname}/with_replies`}
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div>
              <div className="user_Line-nav"></div>
              <span>Tweets & replies</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${screenname}/media`}
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div>
              <div className="user_Line-nav"></div>
              <span>Media</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${screenname}/likes`}
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div>
              <div className="user_Line-nav"></div>
              <span>Likes</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
