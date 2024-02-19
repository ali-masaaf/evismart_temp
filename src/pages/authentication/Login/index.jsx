import React, { useContext, useEffect, useState, useRef } from 'react'
import './style.css'
import AuthContext from '../../../context/authContext'
import { PulseLoader } from 'react-spinners' 
import colors from '../../../utils/colors'  
import { Navigate, useNavigate } from 'react-router-dom'
import background_night_sky_1 from '../../../assets/videos/background_night_sky_1.mp4';
import background_night_sky_1_thubnail from '../../../assets/videos/background_night_sky_1_thubnail.png';
export default function SignIn() {
  const [email,SetEmail]=useState('')
  const [password,SetPassword]=useState('')
  const {login,isLoading, isAuthenticated,user}=useContext(AuthContext)
  const [empty,setEmpty]=useState(false)
  const navigate=useNavigate()
  const videoRef= useRef();
  const [authStat,setAuthState]=useState(false)
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.5;
  };
  const submit=(e)=>{
    if(email=='' || password==''){
      setEmpty(true)
    }else{
       setEmpty(false)

       login({
        email, 
        password
      })
    }
  
}
console.log('is authanticated :',isAuthenticated)

if(isAuthenticated){ 
  console.log('is authanticated is true ')
     //const user=JSON.parse(localStorage.getItem('user')) 
     if(user.role==="Superadmin"){
        return <Navigate to={'/'}/> 
     }else if( user.role==="admin"){
      return <Navigate to={`/groups/${user.groupId}`}/>   
     }
      
   }   
return (
      <div className='body__login'>
          <video className='login__background-video' ref={videoRef}
                  onCanPlay={() => setPlayBack()} autoPlay loop 
                      muted poster={background_night_sky_1_thubnail}>
              <source src={background_night_sky_1} type='video/mp4'/>
          </video>
          <div className='login__content'>
              <div className='content__left'>
                  <div className='left__glass-card'>
                      <div className='glass-card__titel'>
                          <div className='titel__logo'></div>
                          <h2 className='titel__2'>Welcome Back!</h2>
                      </div>
                      <form className='glass-card__form'>
                          <input className='form__input-login' type="text" onChange={(e)=>SetEmail(e.target.value)} placeholder='Email@exemple.com'/>
                          <input className='form__input-password'  type="password" onChange={(e)=>SetPassword(e.target.value)} placeholder='********' />
                          { empty? <div style={{ color:'red',fontSize:'12px',marginTop:'10px',marginLeft:'20%' }}>Please fill out all the required fields.</div>:'' }  
                          {
                          !isLoading?<button className='form__btn-submit'  onClick={(e)=>submit(e)}> Sign in</button>:
                                      <PulseLoader
                                          color={colors.mainColor}
                                          loading={true}
                                          size={12}
                                          aria-label="Loading Spinner" 
                                          data-testid="loader" 
                                      />  
                          }
                          <p className='form__btn-forget-passweord' >Forget Password?</p>
                      </form>
                  </div>
              </div>
              <div className='content__right'>
                  <div className='right__ismart-device'>

                  </div>
                  <h1 className='right__text'>
                  We are transforming the world into a greener sustainable Place.
                  </h1>
              </div>
          </div>
      </div> 
)
}

