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

} from '../../services/users'

function UserProvider(props) {

    let [userInfo, setUserInfo] = useState();
    let [loginStatus, setLoginStatus] = useState(false);

    const context = {
        userLogin: async (email, password) => {
            let loginStatus = await userLogin(email, password)
            if (loginStatus === true) {
                setLoginStatus(true)
            } else {
                // console.log(loginStatus)
                return loginStatus
            }
        },

        getUserInfo: () => {
            return userInfo
        },

        userLogout: async () => {
            let logoutStatus = await userLogout()
            if (logoutStatus === true) {
                setLoginStatus(false)
            }
            setUserInfo(null)
            localStorage.removeItem(`loggedInCart`)
        },

        getLoginStatus: () => {
            return loginStatus
        }
    }

    useEffect(() => {

        const fetchUserData = async () => {
            // let userTokenInfo = getUserTokenInfo();

            let authHeaders = getHttpHeaders();

            let userInfoResult = await getUserInfo(authHeaders)

            setUserInfo(userInfoResult)
        }

        if (loginStatus) {
            fetchUserData();
        }


    }, [loginStatus])

    useEffect(() => {
        let userInfo = getUserInfoFromLocalStorage();
        userInfo ? setLoginStatus(true) : setLoginStatus(false)
        setUserInfo(userInfo)
    }, [])

    setInterval(async () => {
        // i.e. only get new access token if user is still logged in
        if (localStorage.getItem('userInfo')) {

            let accessToken = await refreshAccessToken()
            // console.log('accessToken testing', accessToken)

            if (accessToken) {
                let userTokenInfo = JSON.parse(localStorage.getItem('userTokenInfo'))

                userTokenInfo.accessToken = accessToken

                console.log('++++++')

                // console.log('testing refresh token')

                // localStorage.removeItem('userTokenInfo')
                localStorage.setItem('userTokenInfo', JSON.stringify(userTokenInfo))
            } else {
                setLoginStatus(false)
            }
        }
    }, 1000 * 60 * 55)

    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}


export default UserProvider