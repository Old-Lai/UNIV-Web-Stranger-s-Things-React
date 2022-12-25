import { useState } from 'react'
import { useNavigate } from 'react-router'
import { registerUser } from '../api/api'


const Register = ()=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('Please enter a username and password to register')
    const navigate = useNavigate()

    function submitRegistration(e){
        e.preventDefault();
        setMessage('Loading....')
        if(password === confirmPassword){
            registerUser({username, password})
            .then(result => {
                !result.success? setMessage(result.error.message) : setMessage('Success!')
                let countDown = 5
                setMessage(`Success! redirecting to Login in ${countDown}...`)
                const countID = setInterval(()=>{
                    countDown -= 1
                    setMessage(`Sucess! redirecting to Login in ${countDown}...`)
                },1000)
                const invervalID = setInterval(()=>{
                    navigate('/login')
                    clearInterval(countID)
                    clearInterval(invervalID)
                },5000)
            })
        } else {
            setPassword('')
            setConfirmPassword('')
            setMessage('Confirm password does not match password')
        }
    }
    return(
        <section className='register'>
            <h2 className="title">Stranger's things</h2>
            <p className="registerMessage">{message}</p>
            <form id="registerForm" onSubmit={submitRegistration}>
                <p>Username:</p>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e=>setUsername(e.target.value)}
                />
                <p>Password:</p>
                <input 
                    type="password" 
                    value = {password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <p>Confirm Password:</p>
                <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={e=>setConfirmPassword(e.target.value)}
                />
            </form>
            <button type="submit" form="registerForm" value="submit">Register</button>
        </section>
    )
}

export default Register;