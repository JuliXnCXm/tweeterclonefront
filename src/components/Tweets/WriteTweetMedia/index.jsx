import React from 'react'
import "./index.css";

const WriteTweetMedia = ({
    mediaFile,
    preview,
    classnameFunc,
    handleRemoveMedia,
}) => {

    return (
        <>
            {mediaFile &&
            <div className={classnameFunc(mediaFile)}>
                {preview?.map((filePreview, idx) => {
                return (
                    <div key={idx} style={{ backgroundImage: `url(${filePreview})` }}>
                    <span
                        className="material-icons material-icons-outlined"
                        id="image-closer"
                        onClick={() => handleRemoveMedia(idx)}
                    >
                        close
                    </span>
                    </div>
                );
                })}
            </div>
            }
        </>
    );
};

export default WriteTweetMedia;