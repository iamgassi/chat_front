import React from 'react'
import {Button} from "react-bootstrap"
import {Link} from 'react-router-dom'
import {  selectAllUser, selectUser, userToUser } from './features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav'

const StartChat = () => {
  const allUsers=useSelector(selectAllUser)
  const user=useSelector(selectUser)
  const dispatch=useDispatch()
  const filteredUser=allUsers.filter((item)=> (item.username!==user.username))
  const handleClick=(e)=>{
   let user1=(e.target.id)
   dispatch(userToUser({
    user1:(user1),
    user2:(user._id)
   }))
  }

  return (
    <>
    <Nav/>
    <h1 >All Users are:</h1>
      {(filteredUser)?
      (
        filteredUser.map(item=>
        <div id={item._id} key={item._id}>

        <Link to="/Chat" id={item._id}>
         <Button id={item._id}
         variant="outline-success mb-2" 
         size='sm'
         onClick={handleClick}>
         Start Chat
         </Button>
          </Link>
            {` With `}
            <b>{item.username}</b>
          
         </div>
        ))
      :<h3 >No User !!</h3>}
      
    </>
  )
}
export default StartChat


