import React from 'react';


const ToggleAuth = ({setLogin, loginState}) => {


    return (
        <>
            {loginState ?
                <div className='toggle'>
                    <span>Don’t have an account yet ?</span >
                    <span className='toggleLink' onClick={() =>
                    {
                        setLogin()
                    }} >Register</span>
                </div>
                :
                <div className="toggle">
                    <span>Adready a member?</span>
                    <span className='toggleLink' onClick={() =>
                    {
                        setLogin()
                    }}>Login</span>
                </div>
            }
        </>
    )
};

export default ToggleAuth;
