import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
   
    const loginFunc=async(e)=>{
        e.preventDefault();
       const res = axios.post('http://localhost:8000/api/login',{
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            email,
            password
        }),
       })
       console.log(res.data)
    }

  return (
    <form onSubmit={loginFunc}>
        <input type="text" onChange={(e)=>setEmail(e.target.value)} className='border-2'/>
        <input type="password" required onChange={(e)=>setPassword(e.target.value)} className='border-2'/>
        <input type="submit" className='border-2' />
    </form>
  )
}

export default Login;