import React from 'react'
import './index.css'

const Searcher = ({query , updater , setQuery , setSearching}) => {

    const handleClearQuery = () => {
        setQuery("")
        updater(false)
    }

    return (
        <div className="children__searcher">
            <div className="children__searcher-icon">
                <span className="material-icons material-icons-outlined">search</span>
            </div>
            <input
                className="children__searcher-input"
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div id="button--search__box">
            {query !== "" &&
                <span className="material-icons material-icons-outlined" onClick={handleClearQuery}>
                close
                </span>
            }
            <button className="children__searcher-button" type='reset' onClick={() => updater(true)}>
                Search
            </button>
            </div>
        </div>
    );
}

export default Searcher