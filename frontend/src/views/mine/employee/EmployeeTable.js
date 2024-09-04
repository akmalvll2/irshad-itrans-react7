import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'
import MyContext from '../data/MyContext'
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
  CImage,
  CCardImage,
  CAvatar,
  CBadge,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CToast,
  CToastBody,
  CFormCheck,
  CFormSelect,
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

const EmployeeChart = React.lazy(() => import('./EmployeeChart'))

const EmployeeTable = ({
  employeelist,
  setToggleCreateEmployee,
  deleteEmployee,
  setToggleDetailEmployee,
  viewEmployee,
  setToggleEditEmployee,
  editEmployee,
  departmentlist,
  positionlist,
  assessors,
  role,
}) => {
  const { loading, company } = useContext(MyContext)
  const [activeKey, setActiveKey] = useState(1)
  const [positionFilter, setPositionFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')

  const selectedCompany = company[0]

  const filteredEmployee = employeelist.filter((i) =>
    departmentFilter === 'All' ? true : i.department_id.toString() === departmentFilter,
  )

  if (loading.company) <CSpinner />
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
            style={{
              backgroundColor: `${selectedCompany?.company_system_primary_color}`,
              color: 'ghostwhite',
            }}
          >
            <CIcon icon={cilLibrary} /> EMPLOYEE
            {role === 'admin' ? (
              <CButtonGroup className="float-end">
                <CTooltip content="Add" placement="auto">
                  <CButton
                    size="sm"
                    color="secondary"
                    onClick={() => setToggleCreateEmployee(true)}
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
                  title="TOTAL EMPLOYEE"
                  value={employeelist.length}
                />
              </CCol>
            </CRow>
            <CCard>
              <CCardHeader>
                <CAlert color="secondary">
                  <h6>Filter</h6>
                  <CRow>
                    <CCol md={4}>
                      <CFormSelect
                        label="Department"
                        size="sm"
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                      >
                        <option value="All">All</option>
                        {departmentlist.map((val) => (
                          <option
                            className="text-uppercase"
                            key={val.department_id}
                            value={val.department_id}
                          >
                            {val.department_name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    {/*<CCol md={4}>
                      <CFormSelect label="Position" size="sm">
                        <option value="All">All</option>
                        {positionlist.map((val) => (
                          <option key={val.position_id} value={val.position_id}>
                            {val.position_name}
                          </option>
                        ))}
                      </CFormSelect>
                      </CCol>*/}
                  </CRow>
                </CAlert>
                <CNav variant="tabs" className="card-header-tabs">
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 1}
                      component="button"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected={activeKey === 1}
                      onClick={() => setActiveKey(1)}
                    >
                      LIST
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 2}
                      component="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected={activeKey === 2}
                      onClick={() => setActiveKey(2)}
                    >
                      CHART
                    </CNavLink>
                  </CNavItem>
                </CNav>
              </CCardHeader>
              <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
                  <CCardBody>
                    {filteredEmployee.length > 0 ? (
                      <CTable small bordered striped responsive>
                        <CTableHead color="dark">
                          <CTableRow>
                            <CTableHeaderCell>
                              {/*<CFormCheck type="checkbox" />*/}
                              <span className="mx-2">No</span>
                            </CTableHeaderCell>
                            <CTableHeaderCell>Employee</CTableHeaderCell>
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {filteredEmployee?.map((val, key) => {
                            return (
                              <CTableRow key={key}>
                                <CTableDataCell>
                                  {/*<CFormCheck type="checkbox" />*/}
                                  <span className="mx-2">{key + 1}</span>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CAvatar className="m-2 float-start" src={val.staff_image} />
                                  {val.staff_name}
                                  <br />
                                  <CBadge className="mx-1" size="sm" color="secondary">
                                    {val.position_name}
                                  </CBadge>
                                  <CBadge className="mx-1" size="sm" color="info">
                                    {val.department_name}
                                  </CBadge>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CButtonGroup className=" d-flex justify-content-center">
                                    <CTooltip content="Details" placement="auto">
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
                                    </CTooltip>

                                    {role === 'admin' ? (
                                      <>
                                        <CTooltip content="Edit" placement="auto">
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
                                        </CTooltip>
                                        <CTooltip content="Delete" placement="auto">
                                          <CButton
                                            size="sm"
                                            color="danger"
                                            variant="outline"
                                            onClick={() => deleteEmployee(val.staff_id)}
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
                        No employee data available.
                        {role === 'admin' ? (
                          <CButton color="link" onClick={() => setToggleCreateEmployee(true)}>
                            Add employee
                          </CButton>
                        ) : null}
                      </CAlert>
                    )}
                  </CCardBody>
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="profile-tab-pane"
                  visible={activeKey === 2}
                >
                  <CCardBody>
                    <EmployeeChart
                      employeelist={employeelist}
                      setToggleCreateEmployee={setToggleCreateEmployee}
                      setToggleDetailEmployee={setToggleDetailEmployee}
                      deleteEmployee={deleteEmployee}
                      viewEmployee={viewEmployee}
                      setToggleEditEmployee={setToggleEditEmployee}
                      editEmployee={editEmployee}
                    />
                  </CCardBody>
                </CTabPane>
              </CTabContent>
            </CCard>
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
  departmentlist: PropTypes.array.isRequired,
  positionlist: PropTypes.array.isRequired,
  assessors: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
}

export default EmployeeTable
