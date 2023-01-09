import React, { useContext } from "react";
import Layout from "../components/Layout";
import AuthContext from "../context/AuthContext";
import AuthRouter from "../routes/AuthRouter"
import UnAuthRouter from "../routes/UnAuthRouter"

const Index = () => {

    const { auth } = useContext(AuthContext);
    return (
        <div>
        {auth ?
            <Layout>
                <AuthRouter />
            </Layout>
            :
            <UnAuthRouter />
        }
        </div>
    );
};

export default Index;
