import { useEffect} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    
    useEffect(()=>{
        const fetchWorkouts = async() => {
            const response = await fetch('/api/workouts', { // we added proxy to json file
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }) 
            const json = await response.json() // now we have array of objects here
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if(user){
            fetchWorkouts() 
        }
        
    }, [dispatch, user])

  return (
    <div className='home'>
        <div className="workouts">
            {workouts && workouts.map((w)=>(
                <WorkoutDetails key={w._id} workout={w} />
            ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home