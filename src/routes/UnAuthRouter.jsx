import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";

const IndexRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<>Not Found</>} />
        </Routes>
    );
};

export default IndexRouter;
