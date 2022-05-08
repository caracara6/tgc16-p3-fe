import React, { useEffect, useState } from "react";

import UserContext from './UserContext';

import {
    userLogin,
    getUserTokenInfo,
    getUserInfo,
    getUserInfoFromLocalStorage,
    refreshAccessToken,
    getHttpHeaders,
    userLogout
} from '../../services/users'

function UserProvider(props) {

    const [userInfo, setUserInfo] = useState();
    const [loginStatus, setLoginStatus] = useState(false);

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

    setInterval(refreshAccessToken(), 1000 * 60 * 55)
    
    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}


export default UserProvider