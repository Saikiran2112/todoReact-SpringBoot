import {useParams, Link} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../security/AuthContext';
import { useContext } from 'react';
function WelcomeComponent() {
    const {tok}=useContext(AuthContext)
    function handleClick(){
        axios.get('http://localhost:8080/hello-world',{
            headers:{
                Authorization:tok
            }
        }).then((response)=>{
            console.log(response.data)
        }).catch(()=>{
            console.log("error")
        })
    }
    const {username } = useParams()
    
    console.log(username)

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div className="btn btn-dark" onClick={handleClick}>
                Call Hello World

            </div>
        </div>
    )
}

export default WelcomeComponent