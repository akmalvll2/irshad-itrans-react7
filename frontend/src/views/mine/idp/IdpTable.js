import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PropTypes } from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import packageJson from '../../../../package.json'
const { config } = packageJson

const IdpTable = ({ visible, setVisible, setId }) => {
  const [staffList, setStaffList] = useState()
  const fetchStaff = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/staffidplist`).then((response) => {
        if (response.data) {
          setStaffList(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleVisible = (e) => {
    e.preventDefault()

    setVisible(!visible)
    setId(e.target.value)
  }

  useEffect(() => {
    fetchStaff()
  })
  if (visible) {
    return (
      <>
        <CCard>
          <CCardHeader>Individual Development Plan List</CCardHeader>
          <CCardBody>
            <CTable bordered striped hover small responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>IDP Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {staffList?.map((val, key) => {
                  return (
                    <CTableRow key={key}>
                      <CTableDataCell>{key + 1}</CTableDataCell>
                      <CTableDataCell>{val.staff_name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="link"
                          onClick={handleVisible}
                          value={val.staff_id}
                          disabled={val.count > 0 ? false : true}
                        >
                          {val.count > 0 ? 'Ready' : 'Not Ready'}
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </>
    )
  }
}

IdpTable.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
  setId: PropTypes.string,
}

export default IdpTable
