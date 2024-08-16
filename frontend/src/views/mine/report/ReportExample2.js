import React, { useContext, useEffect, useState } from 'react'
import img2 from '../../../assets/images/4.png'
import {
  CCard,
  CCardHeader,
  CButtonGroup,
  CButton,
  CCardBody,
  CFormSelect,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTableBody,
  CTableDataCell,
  CAvatar,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CSpinner,
  CProgress,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

import { CChart } from '@coreui/react-chartjs'

import MyContext from '../data/MyContext'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilCheckAlt, cilPeople } from '@coreui/icons'

const ReportTable1 = () => {
  const [visible, setVisible] = useState(false)
  const [selectedCompetency, setSelectedCompetency] = useState()
  //const [selectedAssessment, setSelectedAssessment] = useState(assessment.find())
  const {
    staff,
    position,
    department,
    competency,
    cluster,
    assessment,
    assessmentResult,
    positionCompetency,
    loading,
  } = useContext(MyContext)
  const roundedResult = (data) => {
    var res
    data ? (res = Number(data.toFixed(2))) : (res = null)
    return res
  }
  const score = (staff_id, competency_id, type) => {
    const score = assessmentResult.find(
      (i) =>
        i.staff_id === staff_id &&
        i.competency_id === competency_id &&
        i.staff_assessor_type === type,
    )?.assessment_result_score
    return score
  }

  useEffect(() => {
    console.log('Set Selected Competency')
  }, [selectedCompetency])
  if (
    loading.staff ||
    loading.position ||
    loading.department ||
    loading.competency ||
    loading.cluster ||
    loading.assessment ||
    loading.assessmentResult ||
    loading.positionCompetency
  ) {
    return <CSpinner />
  }
  return (
    <>
      <CCard>
        <CCardBody>
          <CTable small responsive bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ReportTable1
