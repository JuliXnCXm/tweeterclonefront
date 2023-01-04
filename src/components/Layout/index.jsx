import React from 'react'
import { useEffect } from 'react';
import Header from './Header/Header'
import Signature from './Signature'

const Layout = ({children}) => {

    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 480;


    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    return (
        <>
            <Header width={width} breakpoint={breakpoint} />
                <main>{children}</main>
            <Signature width={width} breakpoint={breakpoint} />
        </>
    );
}

export default Layout