import React from 'react'
import Authentication from '../components/Authentication/Authentication'
import BackgroundAuth from '../assets/social.jpg'
import Signature from '../components/Layout/Signature'
import { useEffect } from 'react'

const Auth = () => {

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 480;

  useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <>
        <div className='AuthContainer'>
            {width > breakpoint &&
              <img src={BackgroundAuth} alt="" />
            }
            <Authentication />
            <Signature />
        </div>
    </>

  )
}

export default Auth