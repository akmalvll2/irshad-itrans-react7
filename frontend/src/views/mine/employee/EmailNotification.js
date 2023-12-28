import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import axios from 'axios'

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CButton,
  CModalBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPopover,
  CFormCheck,
  CFormInput,
  CModalFooter,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const EmailNotification = ({ visible, setVisible, receiver }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [subject, setSubject] = useState()
  const [message, setMessage] = useState()
  const [idArray, setIdArray] = useState([])

  const handleIdArray = (e, idx) => {
    const { value } = e.target
    const id = 'id'
    const newArray = [...idArray]

    // Ensure newArray has enough items for the current idx
    while (newArray.length <= idx) {
      newArray.push({ [id]: null })
    }

    if (e.target.checked) {
      newArray[idx] = { ...newArray[idx], [id]: value }
      setIdArray(newArray)
    } else {
      newArray[idx] = { ...newArray[idx], [id]: null }
      setIdArray(newArray)
    }
  }

  const handleSend = async () => {
    try {
      setIsLoading(true)
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/mailall`, { subject, message, idArray })
        .then((response) => {
          if (response) {
            setVisible(!visible)
            alert(response.data)
            setIdArray([])
          } else {
            alert('Cannot Send Email')
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log(idArray)
  }, [idArray])
  return (
    <>
      <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader
          onClose={() => setVisible(false)}
          style={{ backgroundColor: '#4f5d73', color: 'whitesmoke' }}
        >
          EMAIL NOTIFICATION
        </CModalHeader>
        <CModalBody>
          <CTable small responsive bordered>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell>Subject</CTableHeaderCell>
                <CTableDataCell>
                  <CFormInput onChange={(e) => setSubject(e.target.value)} />
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Message</CTableHeaderCell>
                <CTableDataCell>
                  <CFormTextarea rows={4} onChange={(e) => setMessage(e.target.value)} />
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Receiver</CTableHeaderCell>
                <CTableDataCell>
                  {receiver?.map((val, key) => {
                    return (
                      <>
                        <CFormCheck
                          label={val.staff_name}
                          value={val.staff_id}
                          onChange={(e) => handleIdArray(e, key)}
                        />
                      </>
                    )
                  })}
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleSend} disabled={isLoading}>
            {isLoading ? (
              <CSpinner component="span" size="lg" color="dark" aria-hidden="true" />
            ) : (
              'Send'
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

EmailNotification.propTypes = {
  visible: propTypes.bool,
  setVisible: propTypes.bool,
  receiver: propTypes.array,
}

export default EmailNotification
