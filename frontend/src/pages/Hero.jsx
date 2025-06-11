import React from 'react'
import { useAuthContext } from '../components/AuthenticationContext'
import { Link } from 'react-router-dom'
import NotSignedIn from '../components/NotSignedIn'

const Hero = () => {
  const {isAuthenticated} = useAuthContext()
  return (
    <div>
      {isAuthenticated ? 
        <>
          <h2>Authenticated</h2>
          <Link to={'/dashboard'} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Dashboard</Link>
        </>
         
        : <>
          <NotSignedIn/>
        </>
        }
    </div>
    
  )
}

export default Hero