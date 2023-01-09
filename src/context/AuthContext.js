import { React, createContext, useState, useEffect } from "react";
import { apiRegister, apiLogin, serverUser } from "./Api";
import Cookies from "universal-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const cookie = new Cookies();
    const [isLoading, setIsLoading] = useState(true);
    const [errorAuth, setErrorAuth] = useState(false);
    const [token, setToken] = useState(cookie.get("token"));
    const [user, setUser] = useState({});
    const [username, setUsername] = useState(cookie.get("username"));

    useEffect(() => {
        if (token !== null && token !== undefined && username !== null && username !== undefined ) {
        setAuth(true);
        setToken(token)
        setUsername(username)
        } else {
            setAuth(false)
        }
    }, [token , username]);

    useEffect(() => {
        let token =  cookie.get('token')
        let username = cookie.get('username')
        if (auth) {
            fetch(`${serverUser}/me`, {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                username: username,
            },
        })
        .then(async (res) => {
            if (res.status === 200) {
                let json = await res.json();
                setUser(json.user);
                if (user !== undefined) {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 4000);
                }
            } else {
                console.log("Error");
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            }
        })
        .catch((err) => {
            console.log(err);
            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        })
    } else {
        return
    }
    }, [token, auth])

    const handleRegister = (userData) => {
        fetch(apiRegister, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(userData),
        })
        .then(async (res) => {
            if (res.status === 201) {
                let json = await res.json();
                cookie.set("token", json.token, { path: "/" });
                cookie.set("username", json.username, { path: "/" });
                setAuth(true);
                setUsername(json.username);
                window.location.href = "/home"
            } else {
                console.log("Error");
                setAuth(false);
                setUsername();
                window.location.href = "/"
            }
        })
        .catch((err) => {
            console.log(err);
            setErrorAuth(true)
            setTimeout(() => {
                setErrorAuth(false)
            }, 3000)
        });
    };

    const handleLogin = async (userData) => {
        fetch(apiLogin, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        })
        .then(async (resp) => {
            if (resp.status === 200) {
                let json = await resp.json();
                cookie.set("token", json.token, { path: "/" });
                cookie.set("username", json.username, { path: "/" });
                setAuth(true);
                setUsername(json.username);
                window.location.href = "/home";
            } else {
                console.log("Error");
                setAuth(false);
                setUsername()
                setErrorAuth(true);
                setTimeout(() => {
                    setErrorAuth(false);
                    window.location.href = "/";
                }, 4000);
            }
        })
        .catch(err => {
            console.log(err)
            setErrorAuth(true);
            setTimeout(() => {
                setErrorAuth(false);
            }, 4000);
        })
    };

    const handleLogout = () => {
        cookie.remove("token", { path: "/" });
        cookie.remove("username");
        setUser(undefined)
        setAuth(false);
        window.location.href = "/"
    };

    const dataAuth = {
        handleRegister,
        handleLogout,
        handleLogin,
        isLoading,
        errorAuth,
        auth,
        user
    };

    return (
        <AuthContext.Provider value={dataAuth}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
