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
} from '@coreui/react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import image1 from '../../../assets/itransbg.png'
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
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/authentication/userauthentication`, {
          id: username,
          password: password,
        })
        .then((response) => {
          //console.log(jwtDecode(response.data))
          if (response.data.status === 'valid') {
            setToken(response.data.token)
          } else if (response.data.status === 'invalid') {
            setErrLogin(true)
          }
        })
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
          backgroundImage: `url(https://images.unsplash.com/photo-1663947718652-fa32fb546da2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, // Use the imported image
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8, // Adjust the opacity as needed
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
      <CContainer style={{ zIndex: '1' }}>
        <CRow>
          <CCol
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CCard style={{ width: '36rem', padding: '20px' }}>
              <CRow>
                <CCol md={4} className="d-flex justify-content-center align-items-center">
                  <CCardImage src={appname[0]?.company_logo} className="p-2" />
                </CCol>
                <CCol md={8}>
                  <CCardBody>
                    <h5 style={{ fontFamily: 'proxima-nova', textTransform: 'uppercase' }}>
                      {appname[0]?.company_name} ( {appname[0]?.company_short_name} )
                    </h5>
                    <CForm onSubmit={handleSubmit}>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CAlert
                        color="danger"
                        dismissible
                        visible={errLogin}
                        onClose={() => setErrLogin(false)}
                      >
                        Wrong username and password
                      </CAlert>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          onChange={(e) => setUsername(e.target.value)}
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
                          onChange={(e) => setPassword(e.target.value)}
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
                </CCol>
              </CRow>
            </CCard>
            {/*<CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
              <CCardBody className="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </CCardBody>
            </CCard>*/}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default Login
