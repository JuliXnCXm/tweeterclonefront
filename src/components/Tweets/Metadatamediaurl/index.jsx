import React from 'react'
import './index.css'
const Metadatamediaurl = ({ metadataMedia, setMetadataMedia , writtingContext}) => {
  return (
      <>
        {metadataMedia && (
          <div className="summary--card">
                <div>
                {writtingContext &&
                  <span
                    id="close--icon"
                    className="material-icons material-icons-outlined"
                    onClick={() => setMetadataMedia()}
                  >
                    cancel
                  </span>
                }
                  <img
                    onClick={() => {window.open(metadataMedia?.og?.url, "_blank").focus();}}
                    src={metadataMedia?.og?.image}
                    alt={metadataMedia?.meta?.title}
                  />
                  <div onClick={() => {window.open(metadataMedia?.og?.url, "_blank").focus();}}>
                    <span className='summary--card__url'>
                      {metadataMedia?.og?.url
                        .split("/")
                        .filter((el) => el.indexOf(".com") !== -1)}
                    </span>
                    <h2>{metadataMedia?.meta?.title}</h2>
                  </div>
                </div>
          </div>
        )}
      </>
  );
};

export default Metadatamediaurl