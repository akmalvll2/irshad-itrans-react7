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

const DepartmentTable = ({
  departmentlist,
  setToggleCreateDepartment,
  deleteDepartment,
  setToggleDetailDepartment,
  viewDepartment,
  setToggleEditDepartment,
  editDepartment,
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
              <h6>DEPARTMENT</h6>
            </center>
            <CButtonGroup className="float-end">
              <CButton size="sm" color="secondary" onClick={() => setToggleCreateDepartment(true)}>
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
                  title="TOTAL DEPARTMENT"
                  value={departmentlist.length}
                />
              </CCol>
            </CRow>
            {departmentlist.length > 0 ? (
              <CTable small bordered striped responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Department</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {departmentlist?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell>{val.department_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButtonGroup className=" d-flex justify-content-center">
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => {
                                setToggleDetailDepartment(true)
                                viewDepartment(val.department_id)
                              }}
                            >
                              <CIcon icon={cilMagnifyingGlass} />
                            </CButton>
                            <CButton
                              size="sm"
                              color="secondary"
                              variant="outline"
                              onClick={() => {
                                setToggleEditDepartment(true)
                                editDepartment(val.department_id)
                              }}
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                            <CButton
                              size="sm"
                              color="danger"
                              variant="outline"
                              onClick={() => deleteDepartment(val.department_id)}
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
                No department data available.
                <CButton color="link" onClick={() => setToggleCreateDepartment(true)}>
                  Add department
                </CButton>
              </CAlert>
            )}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

DepartmentTable.propTypes = {
  departmentlist: PropTypes.array.isRequired,
  setToggleCreateDepartment: PropTypes.func.isRequired,
  setToggleDetailDepartment: PropTypes.func.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
  viewDepartment: PropTypes.func.isRequired,
  setToggleEditDepartment: PropTypes.func.isRequired,
  editDepartment: PropTypes.func,
}

export default DepartmentTable
