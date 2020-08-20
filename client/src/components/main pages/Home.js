import React from 'react';
import { FaCode } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Home = (props) => {

    const {userData} = useSelector(state => state.userAuth)
    if(userData && !userData.isAuth) return <div></div>
    
return ( 
    <>
        <div className="app">
            <FaCode style={{ fontSize: '4rem' }} /><br />
            <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
        </div>
    
    </>
);
}

export default Home;