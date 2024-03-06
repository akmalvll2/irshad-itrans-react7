import React from 'react'
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
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const CompetencyTable = ({
  competencylist,
  setToggleCreateCompetency,
  deleteCompetency,
  setToggleDetailCompetency,
  viewCompetency,
  setToggleEditCompetency,
  editCompetency,
}) => {
  return (
    <>
      <div>
        <CCard>
          <CCardHeader
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'navy',
            }}
          >
            <center>
              <h6>COMPETENCY</h6>
            </center>
            <CButtonGroup className="float-end">
              <CButton size="sm" color="secondary" onClick={() => setToggleCreateCompetency(true)}>
                <CIcon icon={cilPlus} />
              </CButton>
              <CButton size="sm" color="secondary">
                <CIcon icon={cilSave} />
              </CButton>
            </CButtonGroup>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol lg={4}>
                <CWidgetStatsF
                  className="mb-3"
                  color="primary"
                  //icon={<CIcon icon={cilChartPie} height={24} />}
                  title="TOTAL COMPETENCY"
                  value={competencylist.length}
                />
              </CCol>
            </CRow>
            {competencylist.length > 0 ? (
              <CTable small bordered striped responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Competency</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {competencylist?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.competency_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButtonGroup className=" d-flex justify-content-center">
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => {
                                setToggleDetailCompetency(true)
                                viewCompetency(val.competency_id)
                              }}
                            >
                              <CIcon icon={cilMagnifyingGlass} />
                            </CButton>
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => {
                                setToggleEditCompetency(true)
                                editCompetency(val.competency_id)
                              }}
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                            <CButton
                              size="sm"
                              color="danger"
                              variant="outline"
                              onClick={() => deleteCompetency(val.competency_id)}
                            >
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </CButtonGroup>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="danger">
                No competency data available.
                <CButton color="link" onClick={() => setToggleCreateCompetency(true)}>
                  Add competency
                </CButton>
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

CompetencyTable.propTypes = {
  competencylist: PropTypes.array.isRequired,
  setToggleCreateCompetency: PropTypes.func.isRequired,
  setToggleDetailCompetency: PropTypes.func.isRequired,
  deleteCompetency: PropTypes.func.isRequired,
  viewCompetency: PropTypes.func.isRequired,
  setToggleEditCompetency: PropTypes.func.isRequired,
  editCompetency: PropTypes.func,
}

export default CompetencyTable
