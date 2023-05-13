import {createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => { // this component renders when we first load the app
    const [state, dispatch] = useReducer(authReducer,{
        user: null
    })

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user')) 

        if(user) { // if the user exists in localstorage then I want the global state to be that user. ( NOW it doesn't change it to null when we refresh )
            dispatch({type: 'LOGIN', payload: user})
        }
    }, []) 

//     I have a GOOD question:
// Why using useEffect to assign user value from localstorage? can't we just assign it immediately in the Provider like this:
// const [state, dispatch] = useReducer(authReducer,{
//         user: JSON.parse(localStorage.getItem('user'))
//     })
// So now the app sets the user value to whatever the user value is. Or this might cause conflict with other websites that they also use 'user' in our browser's localstorage?

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}