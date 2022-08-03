import axios from 'axios';
import { useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom'

function Singin() {

    const [error,setError] = useState(undefined);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [rePass,setRePass] = useState("");
    const [link,setlink] = useState(false);
    const [registered,setRegistered] = useState(false);

    async function AuthUser(e,fP,sP){
        e.preventDefault()
        if(fP===sP){
            try{
                let DOJ = new Date()
                let res = await axios.post("http://localhost:3001/login",{email,password,DOJ})
                console.log(res);
                if(res.status === 200) setRegistered(true)

            }catch(err){
                console.log(err);
                if(err.response.status==409){
                    setError(`${email} account already exists so plz login`)
                    setlink(true)
                }
            }
        }else{
            setError(" Re-enter password correctely ")
            return 
        }
    }



    useEffect((()=>{
        setError(undefined)
    }),[rePass])

    return ( 
           <>
                {
                    registered === true ? <h1>Registered Successfully <NavLink className="linker" to="/">LogIn</NavLink></h1>
                    : 
                    <form onSubmit={e=>AuthUser(e,password,rePass)} className="medium flex-row singin">
                        <h1 className="title">SignIn</h1>
                    {
                        error && <h1 className='error'>{error}</h1>
                    }
                    <input 
                        autoFocus
                        type="email"  
                        placeholder="Enter E-mail Id"
                        onChange={e=>setEmail(e.target.value)}
                        required
                        
                    />
                    <input 
                        type="password"   
                        placeholder="Enter Password"
                        onChange={e=>setPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        onChange={e=>setRePass(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                    {
                        link === true &&
                            <h1>Already having an account   <NavLink replace className="linker" to="/">Login!</NavLink></h1>
                    }
                    </form>
                }
           </>
     );
}

export default Singin;


// if(res.response.status==409){
//     setError(`${email} account already exists so plz login`)
//     setlink(true)
// }




