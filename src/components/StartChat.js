import React from 'react'
import {Button} from "react-bootstrap"
import {Link} from 'react-router-dom'

const StartChat = ({data ,user}) => {
  console.log(data)
  const filteredUser=data.filter((item)=> (item.username!==user.username))
  console.log(filteredUser)

  const handleClick=(e)=>{
   console.log(e.target.id)
  }

  return (
    <div>
    <h1 >Hello , {user.username} Users are:</h1>
      
      {(filteredUser)?
      (
        filteredUser.map(item=>
        <div id={item._id}>
        {item.username}

        <Link to="/Chat" id={item._id}>
         <Button id={item._id}
         variant="success mb-2" 
         size='sm'
         onClick={handleClick}>
         Start Chat
         </Button>
          </Link>
          
         </div>
        ))
      :<h3 >No User !!</h3>}
      
    </div>
  )
}
export default StartChat


