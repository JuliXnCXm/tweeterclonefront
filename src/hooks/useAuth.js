import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { validEmail, validPassword } from "../utils/Regex.jsx";

const useAuth = () => {

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
      }, 4000);
    }
  };

  const toggleState = () => {
    setIsLogin(!isLogin);
  };

  return {
    handleSubmit,
    toggleState,
    handleForm,
    setIsLogin,
    setForm,
    isLogin,
    error,
    form,
    show,
  };
};

export default useAuth;
