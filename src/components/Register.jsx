import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const registerFunc=async(e)=>{
        e.preventDefault();
       const res = axios.post('http://localhost:8000/api/register',{
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
    <form action="" onSubmit={registerFunc}>
        <input type="text" onChange={(e)=>setEmail(e.target.value)} className='border-2'/>
        <input type="password" required onChange={(e)=>setPassword(e.target.value)} className='border-2'/>
        <input type="submit" className='border-2' />
    </form>
  )
}

export default Register;