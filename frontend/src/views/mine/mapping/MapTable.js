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
} from '@coreui/react'

const MapTable = ({
  positiondata,
  competencydata,
  positioncompetencydata,
  setOpenJobCompetency,
}) => {
  const [activeKey, setActiveKey] = useState(1)
  const [selectedPosition, setSelectedPosition] = useState('')
  const [tableRows, setTableRows] = useState([{ competency: null, expectedLevel: null }])

  const handleSelectPosition = (e) => {
    setSelectedPosition(e.target.value)
  }

  const handleAddMore = () => {
    setTableRows([...tableRows, { competency: null, expectedLevel: null }])
  }

  const handleRemove = (index) => {
    const updatedRows = [...tableRows]
    updatedRows.splice(index, 1)
    setTableRows(updatedRows)
  }

  const handleCompetencyChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].competency = value
    setTableRows(updatedRows)
  }

  const handleExpectedLevelChange = (index, value) => {
    const updatedRows = [...tableRows]
    updatedRows[index].expectedLevel = value
    setTableRows(updatedRows)
  }
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
            <h6>COMPETENCY-BASED MAPPING</h6>
          </center>
        </CCardHeader>
        <CCardBody>
          <CNav variant="tabs" role="tablist">
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
          </CNav>
          <CTabContent>
            <CTabPane
              role="tabpanel"
              className="p-2"
              aria-labelledby="home-tab-pane"
              visible={activeKey === 1}
            >
              {/* POSITION LIST */}
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
                            onClick={() => setOpenJobCompetency(true)}
                          >
                            Map
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
              Training Mapping
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>
    </>
  )
}

MapTable.propTypes = {
  positiondata: PropTypes.array.isRequired,
  competencydata: PropTypes.array.isRequired,
  positioncompetencydata: PropTypes.array.isRequired,
  setOpenJobCompetency: PropTypes.func.isRequired,
}

export default MapTable