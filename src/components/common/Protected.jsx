import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {userToken, user, anonymous_reviews, connect_reviews } from "../../store/Reducers/profileReducer";

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch()
    let authStatus = false;
    let token = localStorage.getItem('token');
    dispatch(userToken(token))

    if(token)   authStatus = true;

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? null: <>{children}</>
}

