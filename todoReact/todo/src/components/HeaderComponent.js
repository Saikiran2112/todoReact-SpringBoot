import {Link} from 'react-router-dom'
import { useContext,useState } from 'react'
import { AuthContext } from '../security/AuthContext'

function HeaderComponent() {
    const {isAuthenticated,setIsAuthenticated,logout,user}=useContext(AuthContext);
    function handleLogout(){
        logout()
    }
    return (
        
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                {isAuthenticated && <li className="nav-item"><Link className="nav-link" to={`/welcome/${user}`}>Home</Link></li>}
                                {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/todos">Todos</Link></li>}
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            {isAuthenticated ===false?<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>:null}
                            {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/logout" onClick={handleLogout}>Logout</Link></li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}

export default HeaderComponent