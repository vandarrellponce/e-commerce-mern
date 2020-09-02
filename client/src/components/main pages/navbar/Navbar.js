import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {Badge} from 'antd'
import {ShoppingCartOutlined } from '@ant-design/icons';

const Navbar = (props) => {
    
    const { userData } = useSelector(state => state.userAuth)
    const { cart } = useSelector( state => state.userCart)
    const [itemCount, setItemCount] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if(cart) setItemCount(cart.length)
        
    }, [cart, dispatch])

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
                <div>
                    <li>
                        <Link to='/user/cart' className='black-text' style={{paddingTop:4}}>
                            <Badge count={itemCount}>
                            <ShoppingCartOutlined style={{fontSize: 25}}/> 
                            </Badge> 
                        </Link>
                    </li>
                    <li><Link to='#' onClick={handleLogout} className='black-text'>Log out</Link></li>
                    <li><Link to='/products/upload' className='black-text'>Upload</Link></li>
                </div>
                
            }
            

          </ul>
        </div>
      </nav>
     );
}
 
export default Navbar;