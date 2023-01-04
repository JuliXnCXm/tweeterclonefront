import React from 'react'
import NavList from '../Header/NavList'
import './index.css'


const Signature = ({width, breakpoint}) => {
    return (
        <div className='signature'>
            {width < breakpoint ?
                <NavList/>
                :
                <>

                <div>
                    <span>
                        Created by
                    </span>
                    <span style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>
                        JuliXnCXm
                    </span>
                </div>
                <span>devChallenges.io</span>
                </>
            }
        </div>
    )
}

export default Signature