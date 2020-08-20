import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../actions/userActions';

const authWrapper = (Component, option, adminRoute) => {

    const Wrapper = (props) => {

        const {userData} = useSelector(state => state.userAuth)
        const dispatch = useDispatch()
        
        useEffect(() => {
            
            const check = async() => {
                
                try{
                    const response = await dispatch(authUser())
                    
                    // IF NOT AUTHENTICATED
                    if(!response.payload.isAuth){
    
                        if(option){
                            props.history.push('/login')
                        }
                        
                    } 
                    //IF AUTHENTICATED
                    else {
                        // TRYING ADMIN ROUTE BUT NOT ADMIN
                        if(!response.payload.isAdmin && adminRoute){
                            props.history.push('/')
                        }
                        // TRYING LOGIN OR REGISTER BUT LOGGED IN
                        if(!option){
                            props.history.push('/')
                        }
                    }
                }
                catch(e){}
            }
            check()
            
            
        }, [dispatch, props.history])

        if(!userData) return <div></div>

        return ( 
            <Component {...props} user = {userData.user}/>
         );
    }
    return Wrapper
}

export default authWrapper