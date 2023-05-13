// import { useState } from "react";
// import { useAuthContext } from './useAuthContext'

// export const useLogin = () => {
//     const [error, setError] = useState(null)
//     const [isLoading, setIsLoading] = useState(null)
//     const { dispatch } = useAuthContext ()

//     const login = async (email, password) => {
//         setIsLoading(true)
//         setError(null)

//         const response = await fetch('/api/user/login', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({email, password})
//         })
//         const json = await response.json() // we get jwt if it was success

//         if (!response.ok) {
//             setIsLoading(false)
//             setError(json.error)
//         }
//         if (response.ok) {
//             // save the user to local storage
//             localStorage.setItem('user', JSON.stringify(json)) // we are storing both: email and token >> from the backend inside userController.js: res.status(200).json({email, token})
            
//             // update the auth context
//             dispatch({type: 'LOGIN', payload: json})

//             setIsLoading(false)
//         }
//     }

//     return {login, isLoading, error}
// }

import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext ()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json() // we get jwt if it was success

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json)) // we are storing both: email and token >> from the backend inside userController.js: res.status(200).json({email, token})
            
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // set a timeout to remove user from localstorage and dispatch a LOGOUT action 5 seconds before the token expires
            const { exp } = JSON.parse(atob(json.token.split('.')[1]))
            const timeToExpire = (exp * 1000) - Date.now() - 5000 // subtract 5000ms (5 seconds) to ensure the action is dispatched before the token expires
            setTimeout(() => {
                dispatch({ type: 'LOGOUT' })
                localStorage.removeItem('user')
            }, timeToExpire)
            



            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}
