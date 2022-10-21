import React,{useState} from 'react'
import {Link } from 'react-router-dom'
import {Form ,Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import style from './Style.module.css'


const Register = () => {
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const [repeatPass,setRepeatPass]=useState("")

  const[err,SetErr]=useState("");
  const[isLoading,setIsloading]=useState(false)


const handleSubmit=async function(e){
  e.preventDefault();
  setIsloading(true)
  try{
    await saveToServer();
    SetErr("User Registered")
    setIsloading(false)
  }catch(err){
     console.log(err)
    SetErr("Failed to Register")
    setIsloading(false)
  }

  setTimeout(() => {
    SetErr("")
  }, 3000);
  
  setPassword("")
  setName("")
  setRepeatPass("")
  
  } 

  function saveToServer()
  {
    let data={
      username:name,
      password:password,
      repeatPass:repeatPass
     }
     return(
      fetch("http://localhost:8000/user",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type":"application/json",
       }
      }
      )
     )}

    

  return (
    <div className={style.main}>
    <Form onSubmit={(e)=>handleSubmit(e)}>
        <h1>Register here </h1>

        <Form.Control type="text"
        placeholder='Name'
        className='mb-2'
        value={name}
        onChange={(e)=>{
            setName(e.target.value)
        }}
         required={true}  
          />
        <Form.Control type="password" 
        placeholder='Password' 
        className='mb-2'
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
         required={true} 
        />
         <Form.Control type="text"
        placeholder='Confirm Password'
        className='mb-3'
        value={repeatPass}
        onChange={(e)=>{
            setRepeatPass(e.target.value)
        }}
         required={true}  
          />
        
       <div className="d-grid gap-2">
       <Button variant="primary mb-3"
        type='submit'>Register
          </Button>
       </div>
     
     <Link to="/">
     <div className="d-grid gap-2">
     <Button variant="dark">Login</Button>
      </div>
     </Link>

  
      <h4 >
      {isLoading?( 
        <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading</span>
    </Spinner>):(
      <span className={style.error}>{err} </span>
      )}
       </h4>

      </Form>
   
</div>
  )
}

export default Register