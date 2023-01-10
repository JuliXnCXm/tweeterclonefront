import React from "react";
import Logo from "../../../assets/tweeter.svg";
import FormAuth from "../FormAuth";
import useAuth from "../../../hooks/useAuth";
import "./index.css";
import ToggleAuth from "../ToggleAuth";

const Authentication = () => {
    const { isLogin, toggleState } = useAuth();

    return (
        <>
        <div className="authenticationContainer">
            <div className="content-container">
                <img className="content-container__image" src={Logo} alt="" />
                <div className="content-container__text">
                    {isLogin ? (
                    <h3>Login</h3>
                    ) : (
                    <>
                        <h3>Join thousands of developers from around the world</h3>
                        <p>
                        Master web development by connecting real-life projects and devs.
                        </p>
                    </>
                    )}
                </div>
            </div>
            <FormAuth setLogin={isLogin} />
            <ToggleAuth loginState={isLogin} setLogin={toggleState} />
        </div>
        </>
    );
};

export default Authentication;
