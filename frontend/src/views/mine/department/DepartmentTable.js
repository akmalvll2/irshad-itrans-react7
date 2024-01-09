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
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const DepartmentTable = ({ departmentlist, setToggleCreateDepartment, deleteDepartment }) => {
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
              <h4>DEPARTMENT LIST</h4>
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
                <CCallout color="primary">Total Department : {departmentlist.length}</CCallout>
              </CCol>
            </CRow>
          </CCardBody>
          <CTable small bordered>
            <CTableHead color="secondary">
              <CTableRow>
                <CTableHeaderCell>No</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Number of Staff</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {departmentlist.length > 0 ? (
                departmentlist?.map((val, key) => {
                  return (
                    <CTableRow key={key}>
                      <CTableDataCell>{key + 1}</CTableDataCell>
                      <CTableDataCell>{val.department_name}</CTableDataCell>
                      <CTableDataCell>4</CTableDataCell>
                      <CTableDataCell>
                        <CButtonGroup className=" d-flex justify-content-center">
                          <CButton size="sm" color="secondary" variant="outline">
                            <CIcon icon={cilMagnifyingGlass} />
                          </CButton>
                          <CButton size="sm" color="secondary" variant="outline">
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton
                            size="sm"
                            color="danger"
                            variant="outline"
                            onClick={(e) => deleteDepartment(val.department_id)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={3}>
                    <CAlert color="danger">No Data Availalble</CAlert>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCard>
      </div>
    </>
  )
}

DepartmentTable.propTypes = {
  departmentlist: PropTypes.array.isRequired,
  setToggleCreateDepartment: PropTypes.func.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
}

export default DepartmentTable
