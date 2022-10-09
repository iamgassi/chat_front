import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import style from './Style.module.css'
import StartChat from './StartChat';

const Login = () => {

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [loggedIn,setLoggedIn]=useState(false)

    const [fetchData,setFetchData]=useState({});
    const[err,SetErr]=useState("");
    const[isLoading,setIsloading]=useState(false)

    const [loggedBy,setLoggedBy]=useState('')

    useEffect(function(){
      fetch("http://localhost:8000/user")
         .then(function(response){
          console.log(response)
           return response.json();
        })
         .then(function(data){
           console.log(data);
           setFetchData(data);
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
       let serverUsernmae=fetchData[i].username
        console.log(serverUsernmae)
        if(username===serverUsernmae  )
              {
                if(fetchData[i].password===password)
                      {
                        console.log("success")
                        setLoggedIn(true)
                        setLoggedBy(fetchData[i])
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

  return (
    <div >
      {!loggedIn?(<div className={style.main}>
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
     <Button variant="primary mb-3" type='submit'>Submit</Button>
      </div>
     <Link to="/">
     <div className="d-grid gap-2">
     <Button variant="dark">Home</Button>
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
  (<StartChat data={fetchData} user={loggedBy}/>)}
      
    </div>
  
  )
}

export default Login