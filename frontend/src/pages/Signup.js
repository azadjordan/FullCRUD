import { useState } from "react"
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    const [matchingError, setMatchingError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password === confirmedPassword){
            setMatchingError(null)
            await signup(email, password)

        } else {
            setMatchingError('Passwords are not matching!')
        }
    }


  return (
    <form action="" className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label>Email:</label>
        <input type="email"
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
         />
        <label>Password:</label>
        <input type="password"
        onChange={(e)=> setPassword(e.target.value)}
        value={password}
         />
         <label>Confirm Password:</label>
        <input type="password"
        onChange={(e)=> setConfirmedPassword(e.target.value)}
        value={confirmedPassword}
         />
         
         <button disabled={isLoading}>Sign up</button>
         {error && <div className="error">{error}</div>}
         {matchingError && <div className="error">{matchingError}</div>}
    </form>
    )
}

export default Signup