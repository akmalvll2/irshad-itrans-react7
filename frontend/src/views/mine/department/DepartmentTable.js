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
import {
  cilPlus,
  cilSave,
  cilTrash,
  cilMagnifyingGlass,
  cilPencil,
  cilLibrary,
} from '@coreui/icons'

const DepartmentTable = ({
  departmentlist,
  setToggleCreateDepartment,
  deleteDepartment,
  setToggleDetailDepartment,
  viewDepartment,
  setToggleEditDepartment,
  editDepartment,
  role,
}) => {
  return (
    <>
      <div>
        <CCard>
          <CCardHeader
            /*style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'navy',
            }}*/
            style={{ backgroundColor: '#3b5998', color: 'ghostwhite' }}
          >
            <CIcon icon={cilLibrary} /> DEPARTMENT
            {role === 'admin' ? (
              <CButtonGroup className="float-end">
                <CTooltip content="Add" placement="auto">
                  <CButton
                    size="sm"
                    color="secondary"
                    onClick={() => setToggleCreateDepartment(true)}
                  >
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
                        <CTableDataCell className="text-uppercase">
                          {val.department_name}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButtonGroup className=" d-flex justify-content-center">
                            <CTooltip
                              content="Details"
                              placement="auto"
                              //style={customTooltipStyle}
                            >
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
                            </CTooltip>

                            {role === 'admin' ? (
                              <>
                                <CTooltip
                                  content="Edit"
                                  placement="auto"
                                  //style={customTooltipStyle}
                                >
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
                                </CTooltip>

                                <CTooltip
                                  content="Delete"
                                  placement="auto"
                                  //style={customTooltipStyle}
                                >
                                  <CButton
                                    size="sm"
                                    color="danger"
                                    variant="outline"
                                    onClick={() => deleteDepartment(val.department_id)}
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
                No department data available.
                {role === 'admin' ? (
                  <CButton color="link" onClick={() => setToggleCreateDepartment(true)}>
                    Add department
                  </CButton>
                ) : null}
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
  role: PropTypes.string.isRequired,
}

export default DepartmentTable
