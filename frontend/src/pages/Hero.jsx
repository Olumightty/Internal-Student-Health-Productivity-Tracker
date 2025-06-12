import React from 'react'
import { useAuthContext } from '../components/AuthenticationContext'
import { Link } from 'react-router-dom'
import NotSignedIn from '../components/NotSignedIn'
import SignedIn from '../components/SignedIn'

const Hero = () => {
  const {isAuthenticated} = useAuthContext()
  return (
    <div>
      {isAuthenticated ? 
        <>
          <SignedIn/>
        </>
         
        : <>
          <NotSignedIn/>
        </>
        }
    </div>
    
  )
}

export default Hero