import { createContext,useState } from "react";

import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const AuthContext=createContext(null);


export default function AuthProvider({children}){
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [user,setUser]=useState(false);
    const [tok,setTok]=useState(null)
    
    
    async function login(username,password){
        const token='Basic '+window.btoa(username + ":" + password)
        try{
            let response=await fetch('http://localhost:8080/hello-world',{
                headers:{
                    Authorization:token
                }
            })
            if(response.status===200){
                setIsAuthenticated(true);
                setUser('sreeja');
                setTok(token)
                return true;
            }
            else{
        
                setIsAuthenticated(false);
                setUser(null)
                setTok(null)
                return false;
            }
        }
        catch(error){
            console.log(error)
        }
     
        
       
    }
    function logout(){
        setIsAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,login,logout,user,tok}}>
            {children}
        </AuthContext.Provider>
    )
}