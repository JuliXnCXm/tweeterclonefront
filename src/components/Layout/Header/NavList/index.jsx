import * as React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import './index.css'

const NavList = () => {

    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 480;

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    let activeStyle = {
        color: "#2F80ED",
    };

    let activeClassName = "navlist--container__link";

    return (
        <nav className="navlist--container">
            <ul>
                <li>
                    <NavLink
                        to="home"
                        className={({ isActive }) =>
                            isActive ? activeClassName : undefined
                        }
                        style={({ isActive }) => isActive ? activeStyle : undefined }>
                        <div>
                            {width > breakpoint ?
                            <span>Home</span>
                            :
                            <span className="material-icons material-icons-outlined">
                            home
                            </span>
                            }
                            <div className="Line-nav"></div>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="explore"
                        className={({ isActive }) =>
                        isActive ? activeClassName : undefined
                        }
                        style={({ isActive }) => isActive ? activeStyle : undefined }
                    >
                        <div>
                            {width > breakpoint ?
                                <span>Explore</span>
                                :
                                <span className="material-icons material-icons-outlined">
                                explore
                                </span>
                            }
                            <div className="Line-nav"></div>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="bookmarks"
                        className={({ isActive }) =>
                        isActive ? activeClassName : undefined
                        }
                        style={({ isActive }) => isActive ? activeStyle : undefined }
                        >
                        <div>
                            {width > breakpoint ?
                                <span>Bookmarks</span>
                                :
                                <span className="material-icons material-icons-outlined">
                                explore
                                </span>
                            }
                            <div className="Line-nav"></div>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}


export default NavList;