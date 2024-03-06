import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilCommentSquare, cilLockLocked, cilSettings, cilUser, cilBook } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Settings from './Settings'
import useToken from 'src/useToken'
import { userType } from 'src/userType'

import avatar3 from './../../assets/images/avatars/10.jpg'

import packageJson from '../../../package.json'
const { config } = packageJson

const AppHeaderDropdown = () => {
  const [users, setUsers] = useState()
  const [visible, setVisible] = useState(false)
  const handleLogout = async () => {
    try {
      await axios.post(`${config.REACT_APP_API_ENDPOINT}/logout`).then((response) => {
        if (response) {
          alert(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      sessionStorage.removeItem('token')
      window.location.reload()
    }
  }

  useEffect(() => {
    //READ EMPLOYEE API
    const fetchAllEmployee = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/employee/getallemployee`)
        setUsers(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllEmployee()
  }, [])
  return (
    <div>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar
            src={
              users?.find((i) => i.staff_id.toString() === userType.id)?.staff_image
                ? users?.find((i) => i.staff_id.toString() === userType.id)?.staff_image
                : 'http://cdn.onlinewebfonts.com/svg/img_332705.png'
            }
            size="lg"
          />
          {/*<CAvatar src="http://cdn.onlinewebfonts.com/svg/img_332705.png" size="lg" />*/}
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">
            Account : <span style={{ color: 'blue' }}>{userType.name}</span>{' '}
            <span>( {userType.role} )</span>
          </CDropdownHeader>
          {/*
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilCommentSquare} className="me-2" />
            Comments
            <CBadge color="warning" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilBook} className="me-2" />
            Guide
          </CDropdownItem>
          */}
          <CDropdownItem>
            <CButton
              color="transparent"
              style={{ width: '100%' }}
              onClick={() => setVisible(!visible)}
            >
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CButton>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem>
            <CButton color="transparent" style={{ width: '100%' }} onClick={handleLogout}>
              <CIcon icon={cilLockLocked} className="me-2" />
              Sign out
            </CButton>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <Settings visible={visible} setVisible={setVisible} />
    </div>
  )
}

export default AppHeaderDropdown
