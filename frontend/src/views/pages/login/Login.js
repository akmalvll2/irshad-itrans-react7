import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CImage,
  CCardTitle,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import image1 from '../../../assets/images/angular.jpg'
import image2 from '../../../assets/logo-itrans.png'
import image3 from '../../../assets/images/vue.jpg'
//import logo1 from '../../../assets/logo-itrans.png'
//import video1 from '../../../assets/videobg.mp4'

import packageJson from '../../../../package.json'
const { config } = packageJson

/*async function loginUser(credentials) {
  return fetch(`${config.REACT_APP_API_ENDPOINT}/logintoken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}*/

const Login = ({ setToken }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [errLogin, setErrLogin] = useState(false)
  const [appname, setappname] = useState([])
  const [logoSrc, setLogoSrc] = useState('logo-itrans.png')

  const logoPath = require(`../../../assets/${logoSrc}`)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const adminResponse = await axios.post(
        `${config.REACT_APP_API_ENDPOINT}/authentication/adminauthentication`,
        {
          id: username,
          password: password,
        },
      )

      if (adminResponse.data.status === 'valid') {
        setToken(adminResponse.data.token)
        return // Exit early if admin authentication succeeds
      }

      console.log('Admin authentication failed, attempting user authentication...')

      const userResponse = await axios.post(
        `${config.REACT_APP_API_ENDPOINT}/authentication/userauthentication`,
        {
          id: username,
          password: password,
        },
      )

      if (userResponse.data.status === 'valid') {
        setToken(userResponse.data.token)
      } else {
        console.log('No data authenticated')
        setErrLogin(true)
      }
    } catch (err) {
      alert(err)
    }
  }

  const fetchAppName = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/company/getallcompany`).then((response) => {
        if (response) {
          setappname(response.data)
        } else {
          console.log('Error fetching app name')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const setPlaybackRate = (video) => {
    if (video) {
      video.playbackRate = 0.6 // Set the playback rate here
    }
  }

  useEffect(() => {
    fetchAppName()
  }, [])
  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'whitesmoke',
      }}
    >
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'whitesmoke',
          //backgroundImage: `url(https://images.unsplash.com/photo-1663947718652-fa32fb546da2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, // Use the imported image
          //backgroundImage: `url(https://wallpaper.dog/large/11032627.png)`, // Use the imported image
          backgroundImage: `url(https://img.freepik.com/free-vector/realistic-design-technology-background_23-2148426705.jpg?t=st=1732518077~exp=1732521677~hmac=7d97bf16a4ebe6040ff66864108545c8c36aeac2309828808b0b755035a9bd89&w=900)`, // Use the imported image
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.9, // Adjust the opacity as needed
        }}
      ></div>
      {/*<video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.5, // Adjust the opacity as needed
        }}
        autoPlay
        loop
        muted
        onCanPlay={(e) => setPlaybackRate(e.target)}
      >
        <source src={video1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>*/}
      {appname[0] ? (
        <CContainer
          style={{
            zIndex: '1',
          }}
          className="d-flex justify-content-center"
        >
          <CRow className=" d-flex justify-content-center">
            <CCol lg={8} md={8} sm={12} className="align-content-center">
              <CCard
                className="p-4"
                style={{
                  background: 'rgba(230, 230, 230, 0.7)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <CImage src={appname[0]?.company_logo} fluid width={600} height={400} />

                <CCardBody>
                  {/*<h5 style={{ fontFamily: 'proxima-nova', textTransform: 'uppercase' }}>
                {appname[0]?.company_name}
              </h5>
              <h6 style={{ fontFamily: 'proxima-nova', textTransform: 'uppercase' }}>
                ( {appname[0]?.company_short_name} )
              </h6>*/}
                  <CCardTitle className="my-4 text-center text-primary">
                    {appname[0]?.company_system_name}
                  </CCardTitle>
                  <CForm onSubmit={handleSubmit}>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CAlert
                      color="danger"
                      dismissible
                      visible={errLogin}
                      onClose={() => setErrLogin(false)}
                    >
                      Wrong username or password
                    </CAlert>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value.trim())}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value.trim())}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      {/*<CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
            </CCol>*/}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      ) : (
        <CContainer
          style={{
            zIndex: '1',
          }}
          className="d-flex justify-content-center"
        >
          <CSpinner color="light" />
        </CContainer>
      )}
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default Login
