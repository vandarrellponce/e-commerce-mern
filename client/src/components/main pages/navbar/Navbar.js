import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Navbar = (props) => {
    
    const { userData } = useSelector(state => state.userAuth)

    const handleLogout = (e) => {
        e.preventDefault()
        axios
        .get('/api/users/logout')
        .then(res => {
            if (res.status === 200){
                window.location.reload()
            }
        })
        .catch(e => console.log(e))
    }

    return ( 
        <nav className='grey lighten-4'>
        <div className="nav-wrapper myContainer">
    
          <Link to="/" className="brand-logo black-text">Shozada</Link>
    
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            
            { userData && !userData.user ? 
                <div>
                    <li><Link to="/login" className='black-text'>Log in</Link></li>
                    <li><Link to="/register" className='black-text'>Register</Link></li>
                </div>
                :
                <li><Link to='#' onClick={handleLogout} className='black-text'>Log out</Link></li>
            }
            

          </ul>
        </div>
      </nav>
     );
}
 
export default Navbar;