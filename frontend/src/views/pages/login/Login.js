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
          backgroundImage: `url(https://wallpaper.dog/large/11032627.png)`, // Use the imported image
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
      <CContainer
        style={{
          zIndex: '1',
        }}
      >
        <CCard
          className="p-2"
          style={{
            background: 'rgba(230, 230, 230, 0.7)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <CRow>
            <CCol lg={4} className="align-content-center">
              <CCardBody>
                <CCardImage src={appname[0]?.company_logo} className="p-2 " />
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
            </CCol>
            <CCol
              lg={8}
              className=" d-flex flex-column align-content-center justify-content-center p-4"
            >
              <h4>Terms of Service</h4>
              <ol>
                <li>
                  <strong>Acceptance of Terms:</strong> By accessing or using <i>ITRANS</i>, you
                  agree to be bound by these Terms of Service, including any additional terms and
                  conditions and policies referenced herein.
                </li>
                <li>
                  <strong>Use of the Service:</strong> <i>ITRANS</i> is provided solely for your
                  organizational use. You agree not to use <i>ITRANS</i> for any illegal or
                  unauthorized purpose.
                </li>
                <li>
                  <strong>User Accounts:</strong> You may receive an account to access certain
                  features of <i>ITRANS</i>. You are responsible for maintaining the confidentiality
                  of your account credentials and for all activities that occur under your account.
                </li>
                <li>
                  <strong>Privacy:</strong> Your use of <i>ITRANS</i> is subject to our Privacy
                  Policy, which governs how we collect, use, and disclose your personal information.
                  By using <i>ITRANS</i>, you consent to the collection and use of your information
                  as described in our Privacy Policy.
                </li>
              </ol>
            </CCol>
          </CRow>
        </CCard>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default Login
