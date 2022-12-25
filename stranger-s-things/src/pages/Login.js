import { useNavigate, useOutletContext } from "react-router";
import { useState } from 'react'
import { loginUser, uploadPost } from '../api/api'
const Login = ()=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('Please enter a username and password')
    const {setToken} = useOutletContext()
    const navigate = useNavigate()

    function submitLogin(e){
        e.preventDefault();
        if(username && password){
            setMessage('Loading.....')
            loginUser({username, password})
            .then(response => {
                if(response.success){
                    localStorage.setItem('Token', response.data.token)
                    setToken(localStorage.getItem('Token'))
                    let countDown = 5
                    setMessage(`${response.data.message} redirecting in ${countDown}...`)
                    const countID = setInterval(()=>{
                        countDown -= 1
                        setMessage(`${response.data.message} redirecting in ${countDown}...`)
                    },1000)
                    const invervalID = setInterval(()=>{
                        navigate('/posts')
                        clearInterval(countID)
                        clearInterval(invervalID)
                    },5000)
                } else {
                    setMessage(response.error.message)
                }
            })
        } else {
            setMessage('Please make sure you have entered a username and password')
        }
    }

    return(
        <section className='register'>
            <h2 className="title">Amzon Login</h2>
            <p className="registerMessage">{message}</p>
            <form id="registerForm" onSubmit={submitLogin}>
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
            </form>
            <button type="submit" form="registerForm" value="Submit">Login</button>
        </section>
    )
}

export default Login;