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
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const EmployeeChart = React.lazy(() => import('./EmployeeChart'))

const EmployeeTable = ({
  employeelist,
  setToggleCreateEmployee,
  deleteEmployee,
  setToggleDetailEmployee,
  viewEmployee,
  setToggleEditEmployee,
  editEmployee,
  assessors,
}) => {
  const [activeKey, setActiveKey] = useState(1)
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
              <h6>EMPLOYEE</h6>
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
            <CCard>
              <CCardHeader>
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
                      aria-controls="home-tab-pane"
                      aria-selected={activeKey === 2}
                      onClick={() => setActiveKey(2)}
                    >
                      ASSESSOR
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 3}
                      component="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected={activeKey === 3}
                      onClick={() => setActiveKey(3)}
                    >
                      CHART
                    </CNavLink>
                  </CNavItem>
                </CNav>
              </CCardHeader>
              <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
                  <CCardBody>
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
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="profile-tab-pane"
                  visible={activeKey === 2}
                >
                  <CCardBody>
                    {employeelist.length > 0 ? (
                      <CTable small bordered striped responsive>
                        <CTableHead color="dark">
                          <CTableRow>
                            <CTableHeaderCell>No</CTableHeaderCell>
                            <CTableHeaderCell>Employee ( Self )</CTableHeaderCell>
                            <CTableHeaderCell>Superior</CTableHeaderCell>
                            <CTableHeaderCell>Subordinate/Peer</CTableHeaderCell>
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {employeelist?.map((val, key) => {
                            return (
                              <CTableRow key={key}>
                                <CTableDataCell>{key + 1}</CTableDataCell>
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
                                  {/* ASSESSOR : SUPERIOR */}
                                  {employeelist.filter((i) =>
                                    assessors.some(
                                      (u) =>
                                        u.staff_id === val.staff_id &&
                                        u.assessor_id === i.staff_id &&
                                        u.staff_assessor_type === 'superior',
                                    ),
                                  ).length > 0 ? (
                                    employeelist
                                      .filter((i) =>
                                        assessors.some(
                                          (u) =>
                                            u.staff_id === val.staff_id &&
                                            u.assessor_id === i.staff_id &&
                                            u.staff_assessor_type === 'superior',
                                        ),
                                      )
                                      .map((a) => {
                                        return (
                                          <CCallout key={a.key} className="p-md-2 m-0">
                                            <CAvatar className="m-2" src={a.staff_image} />
                                            {a.staff_name}
                                          </CCallout>
                                        )
                                      })
                                  ) : (
                                    <CAlert color="danger" className="m-1">
                                      No employee data available.
                                    </CAlert>
                                  )}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {/* ASSESSOR : SUBORDINATE */}
                                  {employeelist.filter((i) =>
                                    assessors.some(
                                      (u) =>
                                        u.staff_id === val.staff_id &&
                                        u.assessor_id === i.staff_id &&
                                        u.staff_assessor_type === 'subordinate',
                                    ),
                                  ).length > 0 ? (
                                    employeelist
                                      .filter((i) =>
                                        assessors.some(
                                          (u) =>
                                            u.staff_id === val.staff_id &&
                                            u.assessor_id === i.staff_id &&
                                            u.staff_assessor_type === 'subordinate',
                                        ),
                                      )
                                      .map((a) => {
                                        return (
                                          <CCallout key={a.key} className=" p-md-2 m-0">
                                            <CAvatar className="m-2" src={a.staff_image} />
                                            {a.staff_name}
                                          </CCallout>
                                        )
                                      })
                                  ) : (
                                    <CAlert color="danger" className="m-1">
                                      No employee data available.
                                    </CAlert>
                                  )}
                                </CTableDataCell>
                                <CTableDataCell></CTableDataCell>
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
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="profile-tab-pane"
                  visible={activeKey === 3}
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
  assessors: PropTypes.array.isRequired,
}

export default EmployeeTable
