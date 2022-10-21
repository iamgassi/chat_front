import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { logout, selectUser } from './features/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
const Nav = ({data}) => {
    const user=useSelector(selectUser)
    const dispatch=useDispatch();

    const handleLogout=(e)=>{
         dispatch(logout())
    }
  return (
    <div>
         <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand> Hello ,{user.username} </Navbar.Brand>  
            <div>
          {data}
          <Link to="/">
         <Button variant="danger  ms-2" onClick={(e)=>handleLogout(e)}>Logout</Button>
         </Link>
            </div>
        
        </Container>
        </Navbar>
    </div>
  )
}

export default Nav
