import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MyContext from 'src/views/mine/data/MyContext'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { kopetrologo } from 'src/assets/brand/kopetrologo'
import logo1 from 'src/assets/brand/KOPETRO.png'

import packageJson from '../../package.json'
const { config } = packageJson

const AppHeader = () => {
  const { company, loading } = useContext(MyContext)
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [appname, setappname] = useState([])

  const fetchAppName = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/company/getallcompany`).then((response) => {
        if (response) {
          setappname(response.data)
        } else {
          console.log('Error getting app name')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAppName()
  }, [])

  if (loading.company) return <CSpinner />

  return (
    <CHeader
      position="sticky"
      className="mb-4 bg-white-500"
      style={
        {
          /*
        backgroundImage:
          'url("https://img.freepik.com/free-photo/geometric-composition_24972-787.jpg?t=st=1732519258~exp=1732522858~hmac=82328bc36f39b67a441d007f81d962bdab7a4123b24b8db2cea1929e3fb31626&w=900")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      */
        }
      }
    >
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/*<CIcon icon={logo1} height={48} alt="Logo" />*/}
        </CHeaderBrand>
        {/*className="d-none d-md-flex me-auto bg-info"*/}
        <CHeaderNav>
          <CNavItem>
            <h4 style={{ color: company[0]?.company_system_info_color }}>
              {company[0]?.company_system_name}
            </h4>
            {/*<h6>
              {appname?.map((item) => item.setting_app_name)} ({' '}
              {appname?.map((item) => item.setting_app_short_name)} )
  </h6>*/}
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
