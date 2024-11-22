import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCard,
  CCardBody,
  CFormInput,
  CCardHeader,
  CCardFooter,
  CFormRange,
  CRow,
  CCol,
  CCardSubtitle,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import axios from 'axios'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { userType } from 'src/userType'
import packageJson from '../../../package.json'

const { config } = packageJson

const Settings = ({ visible, setVisible }) => {
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [selfWeight, setSelfWeight] = useState(30)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState(
    userType?.role === 'admin' ? 'dataManagement' : 'userSettings',
  )

  const handleSelfWeightChange = (value) => {
    const newSelfWeight = Math.min(Math.max(value, 0), 100) // Ensure within bounds
    setSelfWeight(newSelfWeight)
  }

  const handleSuperiorWeightChange = (value) => {
    const newSuperiorWeight = Math.min(Math.max(value, 0), 100)
    setSelfWeight(100 - newSuperiorWeight)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== cpassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    setError('')

    try {
      const id = userType?.data[0].staff_id
      const response = await axios.post(`${config.REACT_APP_API_ENDPOINT}/changepassword`, {
        id,
        password,
      })
      setSuccess(response.data)
      setPassword('')
      setCpassword('')
    } catch (err) {
      setError('Error changing password')
      console.error(err)
    }
  }

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Settings</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CNav variant="pills" role="tablist">
            {userType?.role === 'admin' && (
              <CNavItem>
                <CNavLink
                  href="#"
                  active={activeTab === 'dataManagement'}
                  onClick={() => setActiveTab('dataManagement')}
                >
                  Data Management
                </CNavLink>
              </CNavItem>
            )}
            <CNavItem>
              <CNavLink
                href="#"
                active={activeTab === 'userSettings'}
                onClick={() => setActiveTab('userSettings')}
              >
                User Settings
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            {userType?.role === 'admin' && (
              <CTabPane visible={activeTab === 'dataManagement'}>
                <CCard className="mt-3">
                  <CCardHeader>
                    <CCardSubtitle className="text-muted">Weightage Settings</CCardSubtitle>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol xs={12} md={6}>
                        <CFormRange
                          min={0}
                          max={100}
                          step={0.5}
                          label={`Self Assessment Weight: ${selfWeight}%`}
                          value={selfWeight}
                          id="selfWeightRange"
                          onChange={(e) => handleSelfWeightChange(e.target.value)}
                        />
                      </CCol>
                      <CCol xs={12} md={6}>
                        <CFormRange
                          min={0}
                          max={100}
                          step={0.5}
                          label={`Superior Assessment Weight: ${100 - selfWeight}%`}
                          value={100 - selfWeight}
                          id="superiorWeightRange"
                          onChange={(e) => handleSuperiorWeightChange(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CTabPane>
            )}
            <CTabPane visible={activeTab === 'userSettings'}>
              <CCard className="mt-3">
                <CCardHeader>Change Password</CCardHeader>
                <CCardBody>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  <form onSubmit={handleSubmit}>
                    <CFormInput
                      size="sm"
                      type="password"
                      id="password"
                      floatingClassName="mb-3"
                      floatingLabel="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <CFormInput
                      size="sm"
                      type="password"
                      id="cpassword"
                      floatingClassName="mb-3"
                      floatingLabel="Confirm Password"
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                      required
                    />
                    <CButton color="primary" type="submit">
                      Update Password
                    </CButton>
                  </form>
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>
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
