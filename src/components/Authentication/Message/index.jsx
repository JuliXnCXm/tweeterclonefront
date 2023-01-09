import React from 'react'
import { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import './index.css'


const Message = () => {

    const {errorAuth} =  useContext(AuthContext)

    return (
        <>
            <div id="message"> {
                errorAuth ?
                <div className='message__error'>
                    <span id="errorIcon" className="material-icons material-icons-two-tone">
                        error
                    </span>
                    <h1>Wrong credentials</h1>
                    <h3>Email or Password invalid</h3>
                </div>
                :
                <div className='message__loader'>
                    <span id="loadingIcon" class="material-icons material-icons-outlined" style={{'fontSize': '15em'}}>
                        autorenew
                    </span>
                    <h1>Validating credentials</h1>
                </div>
                }
            </div>
        </>
    )
}

export default Message