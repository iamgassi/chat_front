import React, { useEffect, useState } from 'react'
import {Button} from "react-bootstrap"
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import './default.css'

let socket;
const Chat = () => {
    
    const [input,setInput]=useState('');
    const [messages,setMessages]=useState([])

    useEffect(()=>{
        socket=io('http://localhost:8000');
    //    console.log(socket)
    socket.on('message',(data)=>{
        console.log(data)
        setMessages(messages=>[...messages,<li>{data}</li>])
    })
   
    },[])
    // console.log(socket)

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (input) {
         socket.emit('chat message', input);
         console.log("Chat message is send")
          }
        setInput("")
    }

  return (
    <>
     {/* <Link to="/StartChat"> */}
         <Button
         variant="danger mb-2" 
         size='sm'>
         Back To Chat
         </Button>
          {/* </Link> */}

     <h2> Welcome , to chat portal! </h2>

     <ul id="messages">
          {messages}
        </ul>
    <form id="form" onSubmit={handleSubmit}>
      <input id="input" onChange={e=>setInput(e.target.value)} value={input} autoComplete="off" /><button>Send</button>
    </form>

   

    </>
  )
}

export default Chat
