import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from '../logo.png'

const Root = ()=>{
    const[token, setToken] = useState(localStorage.getItem('Token'))
    const currentPath = useLocation()
    const navigate = useNavigate()

    function Home(){
        return(
            <div id="home">
                <h1>Welcome to Amzon</h1>
                <img className="spinMe" src={logo}/>
            </div>
        )
    }
    
    function removeToken(){
        localStorage.removeItem('Token')
        setToken('')
        navigate('/')
    }

    return(
        <div>
            <header>
                <section>
                    <div className="header">
                        <img className="Logo" src={logo}/>
                        <nav>
                            {!token && <Link to="register">Register</Link>}
                            {!token && <Link to="login">Login</Link>}
                            <Link to="/">Home</Link>
                            <Link to="posts">Posts</Link>
                            {token && <Link to="profile">Profile</Link>}
                            {token && <button onClick={()=>removeToken()}>Logout</button>}
                        </nav>
                    </div>
                </section>
            </header>
            <main>
                {currentPath.pathname === '/' && <Home />}
                <Outlet context={{token, setToken}}/>
            </main>
        </div>
    )
}

export default Root