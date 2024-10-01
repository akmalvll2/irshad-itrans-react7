import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import {
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CNavTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import { sygnet } from 'src/assets/brand/sygnet'
import { kopetrologo } from 'src/assets/brand/kopetrologo'
import { logo } from 'src/assets/brand/logo'
import logo1 from 'src/assets/logo-itrans.png'

//import SimpleBar from 'simplebar-react'
//import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

import packageJson from '../../package.json'
const { config } = packageJson

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [setting, setSetting] = useState([])
  const [logoSrc, setLogoSrc] = useState('logo-itrans.png')

  const fetchSetting = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/company/getallcompany`).then((response) => {
        if (response) {
          setSetting(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchSetting()
  }, [])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand
        className="d-none d-md-flex"
        to="/"
        style={{ backgroundColor: 'white', color: 'gray', padding: 50, maxHeight: 113 }}
      >
        {/*<CIcon className="sidebar-brand-full" icon={kopetrologo} height={35} />*/}
        <CImage className="sidebar-brand-full" src={setting[0]?.company_logo} fluid />
        {/*<h6 className="sidebar-brand-full">ITRANS</h6>*/}
        {/*<CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />*/}
        {/*<h6 className="sidebar-brand-narrow">iTRANS</h6>*/}
      </CSidebarBrand>
      <CSidebarNav>
        <AppSidebarNav items={navigation} />
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
