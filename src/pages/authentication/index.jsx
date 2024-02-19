import React, { useState } from 'react'
import SignIn from './Login/index'
import SingUp from '../sign_up_page/sign_up' 
export default function Auth() {
  const [authStat,setAuthState]=useState(false)
  const StyleL={
    backgroundColor:'#c6f6d5' 
  }
  return (

              <div>
                
                 <SignIn/>
                 
              
              </div> 

  )
}
