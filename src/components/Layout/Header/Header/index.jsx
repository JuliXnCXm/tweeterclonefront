import React from "react";
import DropDown from "../DropDown";
import Logo from "../../../../assets/tweeter.svg";
import LogoSmall from "../../../../assets/tweeter-small.svg";
import "./index.css";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import NavList from "../NavList";

const UserHeader = ({width, breakpoint}) => {

    const {user} = useContext(AuthContext)

    return (
        <div className="userContainer--header">
            <img src={width > breakpoint ? Logo : LogoSmall} alt="Tweeter" onClick={() => window.location.href = "/home" } />
            {width > breakpoint &&
                <NavList />
            }
            <div className="userContainer--header__icon">
                <img className="userPicture_none" id="userPicture_none--header_icon" src={user?.user_info?.picture} alt="userPhoto" />
                <span>{user?.user_info?.name}</span>
                <span class="material-icons material-icons-outlined dropdown-user-menu__button">
                arrow_drop_down
                </span>
                <DropDown />
            </div>
        </div>
    );
};

export default UserHeader;
