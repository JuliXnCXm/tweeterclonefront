import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { apiDelete, server } from "../context/Api";
import axios from "axios";
import Cookies from "universal-cookie";
import { validEmail, validPassword } from "../utils/Regex.jsx";

const useAuth = () => {
  const [formUpdate, setFormUpdate] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    description: "",
  });
  const cookie = new Cookies();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    phone: ""
  });
  const [isLogin, setIsLogin] = useState(false);
  const { handleLogin, auth, handleRegister } = useContext(AuthContext);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e, state) => {
    e.preventDefault();
    if (
      validEmail.test(form.email) === true ||
      validPassword.test(form.password) === true
    ) {
      state ? handleLogin(form) : handleRegister(form);
      if (auth === true) {
        setForm({
          email: "",
          password: "",
        });
      }
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleFormUpdate = (e) => {
    setFormUpdate({
      ...formUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUpdate = (e, photo) => {
    setShow(true);
    for (let key in formUpdate) {
      if (formUpdate[key] === "") {
        delete formUpdate[`${key}`];
      }
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    if (photo) {
      axios
        .post(`${server}api/photo`, formData, {
          mode: "no-cors",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            setShow(false);
          }
        })
        .finally();
    }
    if (Object.keys(formUpdate).length > 0) {
      setShow(true);
      axios
        .put(
          `${server}api/user/${e.target.baseURI.split("/").at(-1)}`,
          formUpdate,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${cookie.get("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setFormUpdate({
              name: "",
              email: "",
              password: "",
              phone: "",
              description: "",
            });
          }
        })
        .finally();
    }
    setTimeout(() => {
      setShow(false);
      window.location.href = "/user";
    }, 3000);
  };

  const toggleState = () => {
    setIsLogin(!isLogin);
  };

  const handleOauth = (e, state) => {
    window.location.href = `${server}Oauth/${e.target.dataset.provider}/${
      state ? "login" : "register"
    }`;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${apiDelete}/${e.target.baseURI.split("/").at(-1)}`)
      .then((res) => {
        if (res.status === 200) {
          cookie.remove("token", { path: "/" });
          window.location.href = "/";
        }
      })
      .finally();
  };

  return {
    form,
    formUpdate,
    setForm,
    handleFormUpdate,
    handleSubmitUpdate,
    handleForm,
    handleSubmit,
    isLogin,
    setIsLogin,
    handleDelete,
    toggleState,
    handleOauth,
    error,
    show,
  };
};

export default useAuth;
