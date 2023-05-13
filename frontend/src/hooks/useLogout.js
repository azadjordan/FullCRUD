import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()


// we have 2 things in our react app saying that we're logged in:
// 1- the Global State (we can easily change that by dispatching a logout action)
// 2- the JWT in local storage
// if we deleted both things then we're technically logged out 
// WE DON'T NEED TO SEND A REQUEST TO THE SERVER IN ORDER TO LOGOUT
    const logout = () => {

        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}

export default useLogout