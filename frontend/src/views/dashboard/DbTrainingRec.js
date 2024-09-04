import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import img2 from '../../assets/images/4.png'

import MyContext from '../mine/data/MyContext'

// IMPORT COREUI COMPONENT
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CAlert,
  CSpinner,
  CBadge,
} from '@coreui/react'
import { userType } from 'src/userType'
import CIcon from '@coreui/icons-react'
import { cilClipboard } from '@coreui/icons'

const DBTrainingRec = ({ assessmentlist }) => {
  const {
    company,
    staff,
    staffAssessor,
    position,
    training,
    department,
    competency,
    cluster,
    assessment,
    assessmentResult,
    positionCompetency,
    competencyTraining,
    loading,
  } = useContext(MyContext)

  const selectedCompany = company[0]

  if (
    loading.company ||
    loading.staff ||
    loading.staffAssessor ||
    loading.position ||
    loading.training ||
    loading.department ||
    loading.competency ||
    loading.cluster ||
    loading.assessment ||
    loading.assessmentResult ||
    loading.positionCompetency ||
    loading.competencyTraining
  ) {
    return <CSpinner />
  }
  return (
    <div>
      <CCard className=" my-2">
        <CCardHeader
          style={{
            backgroundColor: `${selectedCompany?.company_system_primary_color}`,
            color: 'ghostwhite',
          }}
        >
          <CIcon icon={cilClipboard} /> TRAINING RECOMMENDATION
        </CCardHeader>
        {positionCompetency?.length > 0 ? (
          <CAlert color="info" className="m-2">
            No Data Available
          </CAlert>
        ) : (
          <CTable small responsive bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>No</CTableHeaderCell>
                <CTableHeaderCell>Training</CTableHeaderCell>
                <CTableHeaderCell>Training Group</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>1</CTableDataCell>
                <CTableDataCell>Human Resource Management Training</CTableDataCell>
                <CTableDataCell>Functional</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        )}
      </CCard>
    </div>
  )
}

DBTrainingRec.propTypes = {
  assessmentlist: PropTypes.array.isRequired,
}

export default DBTrainingRec
