import React, { useState } from 'react'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import {
  CSpinner,
  CCard,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCallout,
  CCardBody,
  CRow,
  CCol,
  CAlert,
  CButtonGroup,
  CButton,
  CTooltip,
  CWidgetStatsF,
  CForm,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CAccordion,
  CAccordionBody,
  CAccordionItem,
  CAccordionHeader,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilLink } from '@coreui/icons'

const MapTable = ({
  positiondata,
  competencydata,
  positioncompetencydata,
  trainingcompetencydata,
  setOpenJobCompetency,
  setOpenTrainingCompetency,
  setPositionid,
  setTrainingId,
  stafflist,
  traininglist,
  setToggleMapAssessor,
  setstaffid,
}) => {
  const [activeKey, setActiveKey] = useState(1)
  return (
    <>
      <CCard>
        <CCardHeader
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'navy',
            paddingBottom: '0px',
          }}
        >
          <center>
            <h6>MAPPING</h6>
          </center>
        </CCardHeader>
        <CCard>
          <CCardHeader>
            <CNav variant="tabs" role="tablist" className="card-header-tabs">
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 1}
                  component="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  Position
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 2}
                  component="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Training
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 3}
                  component="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  Assessor
                </CNavLink>
              </CNavItem>
            </CNav>
          </CCardHeader>
          <CTabContent>
            <CTabPane
              role="tabpanel"
              className="p-2"
              aria-labelledby="home-tab-pane"
              visible={activeKey === 1}
            >
              {/* POSITION MAPPING TABLE */}
              <CTable small responsive bordered striped>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Position</CTableHeaderCell>
                    <CTableHeaderCell>Total Competencies</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {positiondata?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.position_name}</CTableDataCell>
                        <CTableDataCell>
                          {
                            positioncompetencydata?.filter(
                              (fil) => fil.position_id === val.position_id,
                            ).length
                          }
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setOpenJobCompetency(true)
                              setPositionid(val.position_id)
                            }}
                          >
                            <CIcon icon={cilLink} size="sm" /> Set Competency
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              className="p-2"
              aria-labelledby="profile-tab-pane"
              visible={activeKey === 2}
            >
              {/* TRAINING MAPPING TABLE */}
              {traininglist.length > 0 ? (
                <CTable small responsive bordered striped>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>No</CTableHeaderCell>
                      <CTableHeaderCell>Training</CTableHeaderCell>
                      <CTableHeaderCell>No of Competencies</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {traininglist?.map((val, key) => (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.training_name}</CTableDataCell>
                        <CTableDataCell>
                          {
                            trainingcompetencydata?.filter((i) => i.training_id === val.training_id)
                              .length
                          }
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButtonGroup>
                            <CButton
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setTrainingId(val.training_id)
                                setOpenTrainingCompetency(true)
                              }}
                            >
                              <CIcon icon={cilLink} size="sm" /> Set Competency
                            </CButton>
                          </CButtonGroup>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <CAlert color="info">No Training Data Available</CAlert>
              )}
            </CTabPane>
            <CTabPane
              role="tabpanel"
              className="p-2"
              aria-labelledby="home-tab-pane"
              visible={activeKey === 3}
            >
              {/* ASSESSOR MAPPING TABLE */}
              <CTable small responsive bordered striped className="my-0">
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Staff</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {stafflist?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.staff_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setToggleMapAssessor(true)
                              setstaffid(val.staff_id)
                            }}
                          >
                            <CIcon icon={cilLink} size="sm" /> Assessor
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            </CTabPane>
          </CTabContent>
        </CCard>
      </CCard>
    </>
  )
}

MapTable.propTypes = {
  positiondata: PropTypes.array.isRequired,
  competencydata: PropTypes.array.isRequired,
  positioncompetencydata: PropTypes.array.isRequired,
  trainingcompetencydata: PropTypes.array.isRequired,
  setOpenJobCompetency: PropTypes.func.isRequired,
  setOpenTrainingCompetency: PropTypes.func.isRequired,
  setPositionid: PropTypes.func.isRequired,
  setTrainingId: PropTypes.func.isRequired,
  stafflist: PropTypes.array.isRequired,
  traininglist: PropTypes.array.isRequired,
  setToggleMapAssessor: PropTypes.func.isRequired,
  setstaffid: PropTypes.func,
}

export default MapTable
