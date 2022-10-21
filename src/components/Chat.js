import React, { useEffect, useState } from 'react'
import {Button} from "react-bootstrap"
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import './default.css'
import { userToUser } from './features/userSlice'
import Nav from './Nav'

let socket;
const Chat = () => {
    
    const [input,setInput]=useState('');
    const [messages,setMessages]=useState([])
    const [prevMsg,setPrevMsg]=useState([])

    useEffect(()=>{
        socket=io('http://localhost:8000');
        console.log(socket)
        const userId=socket.id; 
        console.log(userId)
      	console.log("Rooms in frontend",socket.rooms)
        
        
        socket.on('message',(data)=>{
        console.log('FROM SOCKET',data)  
        setMessages(messages=>[...messages,<li key={Date.now()}>{data}</li>])
    })
    },[])
    console.log(prevMsg,messages)

    useEffect(()=>{
      fetch("http://localhost:8000/getMessages",{
        method:"POST",
        body:JSON.stringify(data.payload.user.userToUser),
        headers:{
          "Content-Type":"application/json",
       }
      })
      .then(res=>res.json())
      .then(response=>{setPrevMsg(response) 
      console.log(response)
      })
    },[])

    const data=useSelector(userToUser)
    useEffect(()=>{
      console.log(data.payload.user.userToUser)
        fetch("http://localhost:8000/userToUser",{
          method:"POST",
          body:JSON.stringify(data.payload.user.userToUser),
          headers:{
            "Content-Type":"application/json",
         }
        })
    },[data])


    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (input) {
         socket.emit('chat message', input);
         
         console.log("Chat message is send")
         const u2u=data.payload.user.userToUser
      
         let obj={
          user2user:u2u,
          msg:input
          
        }
        // setMessages(messages=>[...messages,<li key={Date.now()}>{input}</li>])
         try {
           console.log(input) 
           fetch("http://localhost:8000/message",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
              "Content-Type":"application/json",
            }
          })
         } catch (error) {
          console.log(error)
         }

          }
        setInput("")
    }

  return (
    <>
    <Nav data={ <Link to="/StartChat">
         <Button
         variant="success" 
         >
         Back To Chat
         </Button>
          </Link>}/>

     <h2> Welcome , to chat portal! </h2>

     <ul id="messages">
          {(prevMsg.map((el,index)=>{return <li key={index}>{el}</li>}))}
          {messages}
        </ul>
    <form id="form" onSubmit={handleSubmit}>
      <input id="input" onChange={e=>setInput(e.target.value)} value={input} autoComplete="off" /><button>Send</button>
    </form>

   

    </>
  )
}

export default Chat
