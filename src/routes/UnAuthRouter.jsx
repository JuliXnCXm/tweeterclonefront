import React from "react";
import { Routes, Route } from "react-router-dom";
import Token from "../pages/Token";
import Auth from "../pages/Auth";

const IndexRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/oauth/login/user" element={<Token />} />
            <Route path="/oauth/register/user" element={<Token />} />
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
};

export default IndexRouter;
