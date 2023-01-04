import React, { useState } from 'react'
import './index.css'
import { validURL } from "../../../utils/Regex";

const HandleMedia = ({
    setShowModal,
    handleChangeMediaURL,
    handleChangeMedia,
    handleMediaURL,
}) => {


    const [showInput, setShowInput] = useState(false)

    return (
        <div className="HandleMedia--container">
            <div>
                <h1>Choose the way to share your media</h1>
                <span className="material-icons material-icons-outlined" onClick={() => {
                    setShowModal(false)
                    }}>
                    close
                </span>
            </div>
            <form action="" method="POST" className='HandleMedia--container__form'>
                <div className="HandleMedia--container__upload">
                    <h3>Upload media</h3>
                    <div>
                        <label htmlFor="media">
                            <span className="material-icons material-icons-outlined" id="icontweet">
                            upload_file
                            </span>
                        </label>
                        <input
                            id="media"
                            name="media"
                            type="file"
                            multiple="true"
                            onChange={(e) => {
                                handleChangeMedia(e.target.files)
                            }}
                        />
                    </div>
                </div>
                <div className="HandleMedia--container__embeded" onClick={() =>(setShowInput(!showInput))}>
                    <h3>Embedded link</h3>
                    <div>
                        <label htmlFor="">
                            <span className="material-icons material-icons-outlined" id="icontweet">
                            link
                            </span>
                        </label>
                    </div>
                </div>
            </form>
            {showInput && (
                <div className='link-input'>
                    <label htmlFor="mediaUrl">
                        <span className="material-icons material-icons-outlined">
                            link
                        </span>
                    </label>
                    <input type="text" name="mediaUrl" placeholder='Place a valid url' onChange={handleChangeMediaURL}
                        pattern={validURL}
                        required
                    />
                    <button onClick={() => {
                            handleMediaURL()
                            handleChangeMedia(undefined)
                            setTimeout(() => {
                                setShowModal(false)
                            }, 1000)
                        }}>
                        <span className="material-icons material-icons-outlined">
                        send
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default HandleMedia