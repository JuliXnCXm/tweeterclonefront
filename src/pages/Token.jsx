import React, { useEffect } from "react";
import SpinnerLoader from "../components/SpinnerLoader";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
const cookie = new Cookies();

const Token = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("access_token");
    useEffect(() => {
        setTimeout(() => {
        cookie.set("token", searchParams.get("access_token"), { path: "/" });
        if (
            cookie.get("token") &&
            cookie.get("token") !== undefined &&
            cookie.get("token") !== null
        ) {
            window.location.href = "/user";
        } else {
            window.location.href = "/";
        }
        }, 2000);
    });
    return <SpinnerLoader />;
};

export default Token;
