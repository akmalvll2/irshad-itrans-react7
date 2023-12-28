import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCardHeader,
  CCard,
  CCardBody,
  CFormInput,
  CCardFooter,
} from '@coreui/react'
import axios from 'axios'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { userType } from 'src/userType'

import packageJson from '../../../package.json'
const { config } = packageJson

const Settings = ({ visible, setVisible }) => {
  const [password, setPassword] = useState()
  const [cpassword, setCpassword] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault()
    let confirmchangepass = window.confirm('Confirm Update Password?')
    if (confirmchangepass) {
      try {
        const id = userType?.data[0].staff_id
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/changepassword`, { id, password, cpassword })
          .then((response) => {
            if (response) {
              setVisible(!visible)
              alert(response.data)
            } else {
              console.log('Error changing password')
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Settings</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCard>
            <CCardHeader>Change Password</CCardHeader>
            <CCardBody>
              <CFormInput
                size="sm"
                type="password"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <CFormInput
                size="sm"
                type="password"
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Confirm Password"
                onChange={(e) => setCpassword(e.target.value)}
                required
              />
            </CCardBody>
            <CCardFooter>
              <CButton color="secondary" onClick={handleSubmit}>
                Update Password
              </CButton>
            </CCardFooter>
          </CCard>
        </CModalBody>
      </CModal>
    </>
  )
}

Settings.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
}

export default Settings
