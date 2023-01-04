import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'


export default function Modal ( { children, change}){
    React.useEffect(() => {
        if (change === true) {
            let modal = document.getElementsByClassName('modalBackground');
            modal[0].style.background = "rgba(32, 35, 41, .8)";
        }
    }, [])

    return ReactDOM.createPortal(
        <div className="modalBackground">
            {children}
        </div>,
        document.getElementById('modal')
    )
}