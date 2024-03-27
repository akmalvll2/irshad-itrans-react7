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

const JobTable = ({
  joblist,
  setToggleCreateJob,
  deleteJob,
  setToggleDetailJob,
  viewJob,
  setToggleEditJob,
  editJob,
  role,
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
              <h6>POSITION</h6>
            </center>
            {role === 'admin' ? (
              <CButtonGroup className="float-end">
                <CTooltip content="Add" placement="auto">
                  <CButton size="sm" color="secondary" onClick={() => setToggleCreateJob(true)}>
                    <CIcon icon={cilPlus} />
                  </CButton>
                </CTooltip>
                <CTooltip content="PDF" placement="auto">
                  <CButton size="sm" color="secondary">
                    <CIcon icon={cilSave} />
                  </CButton>
                </CTooltip>
              </CButtonGroup>
            ) : (
              ''
            )}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol lg={4}>
                <CWidgetStatsF
                  className="mb-3"
                  color="primary"
                  //icon={<CIcon icon={cilChartPie} height={24} />}
                  title="TOTAL POSITION"
                  value={joblist.length}
                />
              </CCol>
            </CRow>
            {joblist.length > 0 ? (
              <CTable small bordered striped responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Position</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {joblist?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.position_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButtonGroup className=" d-flex justify-content-center">
                            <CTooltip content="Details" placement="auto">
                              <CButton
                                size="sm"
                                color="secondary"
                                variant="outline"
                                onClick={() => {
                                  setToggleDetailJob(true)
                                  viewJob(val.position_id)
                                }}
                              >
                                <CIcon icon={cilMagnifyingGlass} />
                              </CButton>
                            </CTooltip>

                            {role === 'admin' ? (
                              <>
                                <CTooltip content="Edit" placement="auto">
                                  <CButton
                                    size="sm"
                                    color="secondary"
                                    variant="outline"
                                    onClick={() => {
                                      setToggleEditJob(true)
                                      editJob(val.position_id)
                                    }}
                                  >
                                    <CIcon icon={cilPencil} />
                                  </CButton>
                                </CTooltip>
                                <CTooltip content="Delete" placement="auto">
                                  <CButton
                                    size="sm"
                                    color="danger"
                                    variant="outline"
                                    onClick={() => deleteJob(val.position_id)}
                                  >
                                    <CIcon icon={cilTrash} />
                                  </CButton>
                                </CTooltip>
                              </>
                            ) : (
                              ''
                            )}
                          </CButtonGroup>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="danger">
                No position data available.
                <CButton color="link" onClick={() => setToggleCreateJob(true)}>
                  Add position
                </CButton>
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

JobTable.propTypes = {
  joblist: PropTypes.array.isRequired,
  setToggleCreateJob: PropTypes.func.isRequired,
  setToggleDetailJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  viewJob: PropTypes.func.isRequired,
  setToggleEditJob: PropTypes.func.isRequired,
  editJob: PropTypes.func,
  role: PropTypes.string.isRequired,
}

export default JobTable
