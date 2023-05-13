import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from 'react'

import WorkoutEdit from '../components/WorkoutEdit'


const WorkoutDetails = ({workout}) => {
    const {workouts, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    const [selectedId, setSelectedId] = useState(null)
    const [isButtonsVisible, setIsButtonsVisible] = useState(false)

    const handleDelete = async() => {

        if(!user){
            return
          }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json() // the doc that was just deleted from the db

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    const handleEdit = (workoutId) => {
        setSelectedId((prevSelectedId) => {
            if (prevSelectedId === workoutId) {
              return null; // deselect the current workout if it's already selected
            } else {
              return workoutId; // select a new workout if it's not already selected
            }
          });
    };

    return (
        <div
            className="workout-details"
            onMouseEnter={() => setIsButtonsVisible(true)}
            onMouseLeave={() => setIsButtonsVisible(false)}
        >
            <h4 className='workout-title'>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p> {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            {isButtonsVisible && (
                <div className="button-container">
                    <span 
                        className='material-symbols-outlined' 
                        onClick={handleDelete}
                    >
                        delete
                    </span>
                    <span 
                        className='material-symbols-outlined edit-button' 
                        onClick={() => handleEdit(workout._id)}
                    >
                        edit
                    </span>
                </div>
            )}

            {selectedId && (
                <WorkoutEdit
                    workout={workouts.find((workout) => workout._id === selectedId)}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            )}
        </div>
    )
}

export default WorkoutDetails
