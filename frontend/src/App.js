import React, { Component, Suspense, useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './scss/style.scss'
import useToken from './useToken'
import axios from 'axios'

import packageJson from '../package.json'
const { config } = packageJson

const loading = (
  <div style={{ backgroundColor: 'black', width: '100%', height: '100%' }}>Loading</div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
//const Employee = React.lazy(() => import('./views/mine/employee/Employee'))

const App = () => {
  const { token, setToken } = useToken()
  const [setting, setSetting] = useState([])

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        await axios
          .get(`${config.REACT_APP_API_ENDPOINT}/company/getallcompany`)
          .then((response) => {
            if (response) {
              setSetting(response.data)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    fetchSetting()
  }, [])

  if (token) {
    return (
      <HashRouter>
        <Helmet>
          <title>{setting[0]?.company_name}</title>
        </Helmet>
        <Suspense fallback={loading}>
          <Routes>
            {/*<Route path="/employee" name="Employee" element={<Employee />} />*/}
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  } else {
    return (
      <div>
        <Helmet>
          <title>{setting[0]?.company_name}</title>
        </Helmet>
        <Login setToken={setToken} />
      </div>
    )
  }
}

export default App
