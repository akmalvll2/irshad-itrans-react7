import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PropTypes } from 'prop-types'
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CImage,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPrint } from '@coreui/icons'

import packageJson from '../../../../package.json'
const { config } = packageJson

const IdpDetail = ({ visible, setVisible, id }) => {
  const [detail, setDetail] = useState([])
  const [info, setInfo] = useState([])
  const [staffId, setStaffId] = useState()
  const getBadgeColor = (status) => {
    if (status === 0) {
      return 'info'
    } else if (status === 1) {
      return 'warning'
    } else if (status === 2) {
      return 'danger'
    }
  }
  useEffect(() => {
    setStaffId(id)

    const fetchInfo = async () => {
      try {
        const testData = id
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/idpinfo`, { idx: testData })
          .then((response) => {
            if (response.data) {
              setInfo(response.data)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    const fetchDetail = async () => {
      try {
        const testData = id
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/idpdetail`, { idx: testData })
          .then((response) => {
            if (response.data) {
              setDetail(response.data)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    fetchInfo()
    fetchDetail()

    console.log(detail)
  }, [id, staffId])
  if (!visible) {
    return (
      <>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink active>
              <CButton small color="transparent" onClick={(e) => setVisible(!visible)}>
                Back
              </CButton>
            </CNavLink>
          </CNavItem>
        </CNav>
        <CCard>
          <CCardHeader>
            <CContainer style={{ display: 'flex', justifyContent: 'space-between' }}>
              INDIVIDUAL DEVELOPMENT PLAN
              <CButton color="dark">
                <CIcon icon={cilPrint} />
              </CButton>
            </CContainer>
          </CCardHeader>
          <CCardBody>
            <CTable small responsive color="dark">
              {info?.map((val, key) => {
                return (
                  <CTableBody key={key}>
                    <CTableRow>
                      <CTableHeaderCell rowSpan={5}>
                        <center>
                          <CImage
                            fluid
                            src="https://www.mrse.com.my/wp-content/uploads/2017/01/User-icon.png"
                            width={150}
                            height={150}
                          />
                        </center>
                      </CTableHeaderCell>
                      <CTableDataCell style={{ color: 'orange' }}>
                        ( {val.staff_id} ) {val.staff_name}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow style={{ color: 'whitesmoke' }}>
                      <CTableDataCell>{val.position}</CTableDataCell>
                    </CTableRow>
                    <CTableRow style={{ color: 'whitesmoke' }}>
                      <CTableDataCell>{val.staff_department}</CTableDataCell>
                    </CTableRow>
                    <CTableRow style={{ color: 'whitesmoke' }}>
                      <CTableDataCell>Report to {val.staff_reporting}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                )
              })}
            </CTable>
            <CTable bordered striped small responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell colSpan={4}>CGA Detail</CTableHeaderCell>
                  <CTableHeaderCell colSpan={2}>Training Plan</CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Competency</CTableHeaderCell>
                  <CTableHeaderCell>Required Level</CTableHeaderCell>
                  <CTableHeaderCell>Current Level</CTableHeaderCell>
                  <CTableHeaderCell>Gap</CTableHeaderCell>
                  <CTableHeaderCell>Recommended Training</CTableHeaderCell>
                  <CTableHeaderCell>Priority</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {detail?.map((val, key) => {
                  return (
                    <CTableRow key={key}>
                      <CTableDataCell>{val.competency_name}</CTableDataCell>
                      <CTableDataCell>{val.expected}</CTableDataCell>
                      <CTableDataCell>{val.current_competency_level}</CTableDataCell>
                      <CTableDataCell>{val.expected - val.current_competency_level}</CTableDataCell>
                      <CTableDataCell>{val.training_name}</CTableDataCell>
                      <CTableDataCell>
                        {val.staff_competency_gap < 2 ? (
                          <CBadge color={getBadgeColor(0)}>Low</CBadge>
                        ) : val.staff_competency_gap > 2 ? (
                          <CBadge color={getBadgeColor(2)}>High</CBadge>
                        ) : (
                          <CBadge color={getBadgeColor(1)}>Average</CBadge>
                        )}
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

IdpDetail.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
  id: PropTypes.string,
}

export default IdpDetail
