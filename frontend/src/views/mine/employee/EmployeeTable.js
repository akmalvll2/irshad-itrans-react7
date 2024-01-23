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

const EmployeeTable = ({
  employeelist,
  setToggleCreateEmployee,
  deleteEmployee,
  setToggleDetailEmployee,
  viewEmployee,
  setToggleEditEmployee,
  editEmployee,
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
              <h4>EMPLOYEE</h4>
            </center>
            <CButtonGroup className="float-end">
              <CButton size="sm" color="secondary" onClick={() => setToggleCreateEmployee(true)}>
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
                  title="TOTAL EMPLOYEE"
                  value={employeelist.length}
                />
              </CCol>
            </CRow>
            {employeelist.length > 0 ? (
              <CTable small bordered striped responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Employee</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {employeelist?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.staff_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButtonGroup className=" d-flex justify-content-center">
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => {
                                setToggleDetailEmployee(true)
                                viewEmployee(val.staff_id)
                              }}
                            >
                              <CIcon icon={cilMagnifyingGlass} />
                            </CButton>
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => {
                                setToggleEditEmployee(true)
                                editEmployee(val.staff_id)
                              }}
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                            <CButton
                              size="sm"
                              color="danger"
                              variant="outline"
                              onClick={() => deleteEmployee(val.staff_id)}
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
                No employee data available.
                <CButton color="link" onClick={() => setToggleCreateEmployee(true)}>
                  Add employee
                </CButton>
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

EmployeeTable.propTypes = {
  employeelist: PropTypes.array.isRequired,
  setToggleCreateEmployee: PropTypes.func.isRequired,
  setToggleDetailEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  viewEmployee: PropTypes.func.isRequired,
  setToggleEditEmployee: PropTypes.func.isRequired,
  editEmployee: PropTypes.func,
}

export default EmployeeTable
