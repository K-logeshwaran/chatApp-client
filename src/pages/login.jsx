import {NavLink} from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [error,setError] = useState(undefined);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();
    const state = useContext(AuthContext)

    async function submitHandler(e){
        e.preventDefault()
        try{
            let res = await axios.post("http://localhost:3001/login/generateToken",{email,password})
            console.log(res);
            if(res.status == 200){
                sessionStorage.setItem("token",res.data)
                state.setToken(res.data)
                state.setLogged(true)
                navigate('/account',{ replace: true })
            }
        }catch(err){
            console.log(err);
            if(err.response.status===401){
               setError(err.response.data)
            }else if(err.response.status===404){
                setError(err.response.data)
            }
        }
    }

    useEffect((()=>{
        console.log("mounted"); 
        setError(undefined)
    }),[password])
    return ( 
            <form onSubmit={e=>submitHandler(e)} className="medium flex-row singin">
                <h1 className="title" >LogIn</h1>
                {
                    error && <h1 className='error'>{error}</h1>
                }
                <input 
                    autoFocus
                    required
                    type="email"  
                    placeholder="Enter E-mail Id"
                    onChange={e=>setEmail(e.target.value)}
                />
                <input 
                    required
                    type="password"   
                    placeholder="Enter Password"
                    onChange={e=>setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
                <h1>Not having an account   <NavLink style={{"color":"#fff","textDecoration":"none"}} replace to="/singup">SignUp!</NavLink></h1>
            </form>
     );
}

export default Login;