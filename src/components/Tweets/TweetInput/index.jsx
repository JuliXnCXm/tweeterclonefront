import React from 'react'
import useTweets from '../../../hooks/useTweets';
import './index.css'

const TweetInput = ({inputRef , handleChangeTweet , placeholder, placeholderAttr}) => {
    const {
        classNameChangeColor,
    } = useTweets();

    return (
        <div className='tweet--container'>
            <div
            ref={inputRef}
            contentEditable
            role="textbox"
            id="tweet"
            spellcheck="false"
            placeholder={placeholderAttr}
            suppressContentEditableWarning={true}
            onKeyDown={() => {
                if (
                inputRef.current.innerHTML === placeholder ||
                inputRef.current.innerHTML === ""
                ) {
                inputRef.current.style.color = "gray";
                } else {
                inputRef.current.style.color = "transparent";
                }
                console.log(placeholder.split("<br>"))
                console.log(inputRef.current.innerHTML)

                if (
                inputRef.current.textContent === placeholder ||
                inputRef.current.textContent === ""
                ) {
                inputRef.current.style.color = "gray";
                } else {
                inputRef.current.style.color = "transparent";
                }
            }}
            onFocus={() => {
                if (
                    inputRef.current.innerHTML.length &&
                    !inputRef.current.textContent.trim().length
                ) {
                    inputRef.current.innerHTML = "";
                    inputRef.current.textContent = "";
                }

                inputRef.current.innerHTML === placeholder &&
                    (inputRef.current.innerHTML = "");
            }}
            onBlur={() => {
                if (
                inputRef.current.innerHTML.length &&
                !inputRef.current.textContent.trim().length
                ) {
                inputRef.current.innerHTML = "";
                inputRef.current.textContent = "";
                }

                if (inputRef.current.innerHTML === "") {
                inputRef.current.innerHTML = placeholder;
                inputRef.current.style.color = "gray";
                }
            }}
            onInput={handleChangeTweet}
            ></div>
            {inputRef.current !== null && (
            <div className="tweet--container__body" contentEditable="false">
                {(inputRef.current.innerHTML !== placeholder ||
                inputRef.current.textContent !== placeholder) &&
                inputRef.current.textContent.split(" ").map((word, idx) => {
                    return (
                    <span key={idx} className={classNameChangeColor(word)}>
                        {word}{" "}
                    </span>
                    );
                })}
            </div>
            )}
        </div>
    );
};

export default TweetInput