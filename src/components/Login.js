import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import style from './Style.module.css'
import StartChat from './StartChat';

import { allUser, login, selectUser } from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux'


const Login = () => {

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [fetchData,setFetchData]=useState({});
    const[err,SetErr]=useState("");
    const[isLoading,setIsloading]=useState(false)


    const dispatch=useDispatch();

    useEffect(function(){
      fetch("http://localhost:8000/user")
         .then(function(response){
          console.log(response)
           return response.json();
        })
         .then(function(data){
           console.log(data);
           setFetchData(data);
           dispatch(
            allUser(data)
            ) 
        })
         .catch(function(err){
        
           console.log(err);
        });
     },[]);

    const handleSubmit=async function(e){
       e.preventDefault();
       setIsloading(true)

       try{
        await verifyFromServer();
        setIsloading(false)
      }catch(err){
         console.log(err)
        SetErr("Failed to Login")
        setIsloading(false)
      }
    
      setTimeout(() => {
        SetErr("")
      }, 3000);

       setUsername("")
       setPassword("")
      } 

       
  
    function verifyFromServer()
    {       
        for(let i=0;i<fetchData.length;i++)
       {
       let serverUsername=fetchData[i].username
        console.log(serverUsername)
        if(username===serverUsername  )
              {
                if(fetchData[i].password===password)
                      {
                        console.log("success")
                        dispatch(login(fetchData[i]))  
                      }
                else
                    {
                     
                      SetErr("Incorrect Password")
                    }

              }
        else{
           continue
        }
       }
      
       SetErr("Something Wrong!")
     
    }
   const user=useSelector(selectUser)

  return (
    <div >
      {!user?(<div className={style.main}>
      <Form onSubmit={(e)=>handleSubmit(e)}>
      <h1>Login here </h1>

      <Form.Control  type="text"
      placeholder='Username'
      className='mb-2'
      value={username}
      onChange={(e)=>{
          setUsername(e.target.value)
      }}  
      required={true}
        />
      <Form.Control type="password" 
      placeholder='password' 
      className='mb-3'
      value={password}
      onChange={(e)=>{
          setPassword(e.target.value)
      }} 
      required={true}
      />
     <div className="d-grid gap-2">
     <Button variant="primary mb-3" type='submit'>Login</Button>
      </div>
     <Link to="/register">
     <div className="d-grid gap-2">
     <Button variant="dark">Register</Button>
      </div>
     </Link>

     <h4 >
      {isLoading?( 
        <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading</span>
    </Spinner>):(
     <span className={style.error}> {err}</span> 
      )}
       </h4>

      </Form>
  </div>):
  (<StartChat/>)}
      
    </div>
  
  )
}

export default Login