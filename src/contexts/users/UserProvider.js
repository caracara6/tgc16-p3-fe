import React, { useEffect, useState } from "react";

import UserContext from './UserContext';

import {
    userLogin,
    getUserTokenInfo,
    getUserInfo,
    getUserInfoFromLocalStorage,
    refreshAccessToken,
    getHttpHeaders,
    userLogout,
    getRefreshToken
} from '../../services/users'

function UserProvider(props) {

    let [userInfo, setUserInfo] = useState();
    let [loginStatus, setLoginStatus] = useState(false);

    const context = {
        userLogin: async (email, password) => {
            let loginStatus = await userLogin(email, password)
            if(loginStatus === true) {
                setLoginStatus(true)
            }
        },

        getUserInfo: () => {
            return userInfo
        },

        userLogout: async() => {
            let logoutStatus = await userLogout()
            if(logoutStatus === true){
                setLoginStatus(false)
            }
            setUserInfo(null)
        },

        getLoginStatus: () => {
            return loginStatus
        }
    }

    useEffect(() => {

        const fetchUserData = async () => {
            let userTokenInfo = getUserTokenInfo();
            console.log(userTokenInfo)

            let authHeaders = getHttpHeaders();

            let userInfoResult = await getUserInfo(authHeaders)
            console.log(userInfoResult)
            setUserInfo(userInfoResult)
        }

        if(loginStatus) {
            fetchUserData();
        }
        

    }, [loginStatus])

    useEffect(() => {
        let userInfo = getUserInfoFromLocalStorage();
        userInfo ? setLoginStatus(true) : setLoginStatus(false)
        setUserInfo(userInfo)
    }, [])

    setInterval( () => {
        try {
            let accessToken = refreshAccessToken()
            let userTokenInfo = JSON.parse(localStorage.getItem('userTokenInfo'))

            userTokenInfo.accessToken = accessToken

            localStorage.removeItem('userTokenInfo')
            localStorage.setItem('userTokenInfo', JSON.stringify(userTokenInfo))

        } catch (e) {
            localStorage.removeItem('userTokenInfo')
            localStorage.removeItem('userInfo')
            console.log(e)
        }
    }, 1000 * 60 * 55)
    
    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}


export default UserProvider