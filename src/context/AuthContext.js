import { React, createContext, useState, useEffect } from "react";
import { apiRegister, apiLogin, serverUser } from "./Api";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const cookie = new Cookies();
    const [isLoading, setIsLoading] = useState(true);
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
            setAuth(true);
            navigate("/home")
            } else {
            console.log("Error");
            navigate("/")
            }
        })
        .catch((err) => {
            console.log(err);
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
            } else {
                setAuth(false);
                console.log("Error");
            }
            navigate("/home");
        })
        .finally();
    };

    const handleLogout = () => {
        cookie.remove("token", { path: "/" });
        cookie.remove("username");
        setUser(undefined)
        setAuth(false);
        window.location.href = "/"
    };

    const dataAuth = {
        handleLogin,
        handleRegister,
        handleLogout,
        auth,
        isLoading,
        user
    };

    return (
        <AuthContext.Provider value={dataAuth}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
