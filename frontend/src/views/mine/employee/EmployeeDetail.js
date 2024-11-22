import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CButton,
  CButtonGroup,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CImage,
  CCallout,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTableHead,
  CTableHeaderCell,
  CAlert,
  CAccordion,
  CAccordionBody,
  CAccordionItem,
  CAccordionHeader,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'

//icon
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil, cilInbox } from '@coreui/icons'

const EmployeeDetail = ({
  visible,
  setVisible,
  employeedata,
  viewEmployee,
  deleteEmployee,
  setToggleEditEmployee,
  editEmployee,
  departmentdata,
  positiondata,
  mailpassword,
  positioncompetency,
  assessors,
  role,
}) => {
  const [activeKey, setActiveKey] = useState(1)
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)} size="xl">
        <CModalHeader>
          <CModalTitle>Employee Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {employeedata
            ?.filter((fil) => fil.staff_id === viewEmployee)
            .map((val, key) => {
              return (
                <div key={key}>
                  <CRow>
                    <CCol>
                      <CTable small bordered responsive stripedColumns>
                        <CTableBody>
                          <CTableRow>
                            <CTableDataCell colSpan={2}>
                              <center>
                                <CImage fluid src={val.staff_image} height={150} width={150} />
                              </center>
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell>Name:</CTableDataCell>
                            <CTableDataCell>{val.staff_name}</CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell>Email:</CTableDataCell>
                            <CTableDataCell>{val.staff_email}</CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell>Designation:</CTableDataCell>
                            <CTableDataCell>
                              {
                                positiondata.find((fil) => fil.position_id === val.position_id)
                                  ?.position_name
                              }
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell>Department:</CTableDataCell>
                            <CTableDataCell>
                              {
                                departmentdata.find(
                                  (fil) => fil.department_id === val.department_id,
                                )?.department_name
                              }
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell>Superior:</CTableDataCell>
                            <CTableDataCell>
                              {
                                employeedata.find((fil) => fil.staff_id === val.manager_id)
                                  ?.staff_name
                              }
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell>Role:</CTableDataCell>
                            <CTableDataCell>{val.staff_role}</CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell>Staff Number:</CTableDataCell>
                            <CTableDataCell>{val.staff_id_number}</CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableDataCell>Date of Report Duty:</CTableDataCell>
                            <CTableDataCell>
                              {moment(val.staff_organization_register).format('DD MMMM YYYY')}
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol>
                      <CCard>
                        <CCardHeader>
                          <h6 className="float-end">COMPETENCY STATISTIC</h6>
                          <CNav
                            variant="tabs"
                            role="tablist"
                            className="card-header-tabs flex-column flex-sm-row"
                          >
                            <CNavItem role="presentation">
                              <CNavLink
                                active={activeKey === 1}
                                component="button"
                                role="tab"
                                aria-controls="home-tab-pane"
                                aria-selected={activeKey === 1}
                                onClick={() => setActiveKey(1)}
                              >
                                Core
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
                                Generic
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
                                Functional
                              </CNavLink>
                            </CNavItem>
                          </CNav>
                        </CCardHeader>
                        <CCardBody className="p-0">
                          <CTabContent>
                            <CTabPane
                              role="tabpanel"
                              className="p-0"
                              aria-labelledby="home-tab-pane"
                              visible={activeKey === 1}
                            >
                              {/* CORE */}
                              {positioncompetency?.filter(
                                (i) =>
                                  i.position_id === val.position_id &&
                                  i.cluster_name.toString() === 'Core',
                              ).length > 0 ? (
                                <CTable small responsive className="m-0">
                                  <CTableHead>
                                    <CTableRow>
                                      <CTableHeaderCell>No</CTableHeaderCell>
                                      <CTableHeaderCell>Competency</CTableHeaderCell>
                                      <CTableHeaderCell>Score</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>
                                    {positioncompetency
                                      ?.filter(
                                        (i) =>
                                          i.position_id === val.position_id &&
                                          i.cluster_name.toString() === 'Core',
                                      )
                                      .map((val2, key2) => (
                                        <CTableRow key={key2}>
                                          <CTableDataCell>{key2 + 1}.</CTableDataCell>
                                          <CTableDataCell>{val2.competency_name}</CTableDataCell>
                                          <CTableDataCell className=" d-flex align-items-center">
                                            <CChart
                                              type="doughnut"
                                              data={{
                                                //labels: ['VueJs', 'EmberJs'],
                                                datasets: [
                                                  {
                                                    backgroundColor: ['gray', 'blue'],
                                                    data: [100, 0],
                                                  },
                                                ],
                                              }}
                                              style={{ width: '50px', height: '50px' }}
                                              options={{
                                                plugins: {
                                                  tooltip: {
                                                    enabled: true,
                                                    backgroundColor: 'blue',
                                                  },
                                                },
                                              }}
                                            />{' '}
                                            0.1
                                          </CTableDataCell>
                                        </CTableRow>
                                      ))}
                                  </CTableBody>
                                </CTable>
                              ) : (
                                <CAlert className="m-2" color="primary">
                                  No Data Available
                                </CAlert>
                              )}
                            </CTabPane>
                            <CTabPane
                              role="tabpanel"
                              className="p-0"
                              aria-labelledby="home-tab-pane"
                              visible={activeKey === 2}
                            >
                              {/* GENERIC */}
                              {positioncompetency?.filter(
                                (i) =>
                                  i.position_id === val.position_id &&
                                  i.cluster_name.toString() === 'Generic',
                              ).length > 0 ? (
                                <CTable small responsive className="m-0">
                                  <CTableHead>
                                    <CTableRow>
                                      <CTableHeaderCell>No</CTableHeaderCell>
                                      <CTableHeaderCell>Competency</CTableHeaderCell>
                                      <CTableHeaderCell>Score</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>
                                    {positioncompetency
                                      ?.filter(
                                        (i) =>
                                          i.position_id === val.position_id &&
                                          i.cluster_name.toString() === 'Generic',
                                      )
                                      .map((val2, key2) => (
                                        <CTableRow key={key2}>
                                          <CTableDataCell>{key2 + 1}.</CTableDataCell>
                                          <CTableDataCell>{val2.competency_name}</CTableDataCell>
                                          <CTableDataCell className=" d-flex align-items-center">
                                            <CChart
                                              type="doughnut"
                                              data={{
                                                //labels: ['VueJs', 'EmberJs'],
                                                datasets: [
                                                  {
                                                    backgroundColor: ['gray', 'blue'],
                                                    data: [100, 0],
                                                  },
                                                ],
                                              }}
                                              style={{ width: '50px', height: '50px' }}
                                              options={{
                                                plugins: {
                                                  tooltip: {
                                                    enabled: false,
                                                  },
                                                },
                                              }}
                                            />{' '}
                                            0.0
                                          </CTableDataCell>
                                        </CTableRow>
                                      ))}
                                  </CTableBody>
                                </CTable>
                              ) : (
                                <CAlert className="m-2" color="primary">
                                  No Data Available
                                </CAlert>
                              )}
                            </CTabPane>
                            <CTabPane
                              role="tabpanel"
                              className="p-0"
                              aria-labelledby="home-tab-pane"
                              visible={activeKey === 3}
                            >
                              {/* FUNCTIONAL */}
                              {positioncompetency?.filter(
                                (i) =>
                                  i.position_id === val.position_id &&
                                  i.cluster_name.toString() === 'Functional',
                              ).length > 0 ? (
                                <CTable small responsive className="m-0">
                                  <CTableHead>
                                    <CTableRow>
                                      <CTableHeaderCell>No</CTableHeaderCell>
                                      <CTableHeaderCell>Competency</CTableHeaderCell>
                                      <CTableHeaderCell>Score</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>
                                    {positioncompetency
                                      ?.filter(
                                        (i) =>
                                          i.position_id === val.position_id &&
                                          i.cluster_name.toString() === 'Functional',
                                      )
                                      .map((val2, key2) => (
                                        <CTableRow key={key2}>
                                          <CTableDataCell>{key2 + 1}.</CTableDataCell>
                                          <CTableDataCell>{val2.competency_name}</CTableDataCell>
                                          <CTableDataCell className=" d-flex align-items-center">
                                            <CChart
                                              type="doughnut"
                                              data={{
                                                //labels: ['VueJs', 'EmberJs'],
                                                datasets: [
                                                  {
                                                    backgroundColor: ['gray', 'blue'],
                                                    data: [100, 0],
                                                  },
                                                ],
                                              }}
                                              style={{ width: '50px', height: '50px' }}
                                              options={{
                                                plugins: {
                                                  tooltip: {
                                                    enabled: false,
                                                  },
                                                },
                                              }}
                                            />{' '}
                                            0.0
                                          </CTableDataCell>
                                        </CTableRow>
                                      ))}
                                  </CTableBody>
                                </CTable>
                              ) : (
                                <CAlert className="m-2" color="primary">
                                  No Data Available
                                </CAlert>
                              )}
                            </CTabPane>
                          </CTabContent>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CAccordion alwaysOpen className="my-2">
                        <CAccordionItem itemKey={1}>
                          <CAccordionHeader>Assessor</CAccordionHeader>
                          <CAccordionBody>
                            {/* ASSESSOR */}
                            {employeedata.filter((i) =>
                              assessors.some(
                                (u) => u.staff_id === val.staff_id && u.assessor_id === i.staff_id,
                              ),
                            ).length > 0 ? (
                              employeedata
                                .filter((i) =>
                                  assessors.some(
                                    (u) =>
                                      u.staff_id === val.staff_id && u.assessor_id === i.staff_id,
                                  ),
                                )
                                .map((a) => {
                                  return (
                                    <div key={a.staff_id} className="p-md-0 m-0">
                                      <h6>{a.staff_name}</h6>
                                    </div>
                                  )
                                })
                            ) : (
                              <CAlert color="danger" className="m-1">
                                No employee data available.
                              </CAlert>
                            )}
                          </CAccordionBody>
                        </CAccordionItem>
                        <CAccordionItem itemKey={2}>
                          <CAccordionHeader>Assessment</CAccordionHeader>
                          <CAccordionBody>Assessment Information</CAccordionBody>
                        </CAccordionItem>
                        <CAccordionItem itemKey={3}>
                          <CAccordionHeader>Recommendation & Summary</CAccordionHeader>
                          <CAccordionBody>Recommendation Information</CAccordionBody>
                        </CAccordionItem>
                      </CAccordion>
                    </CCol>
                  </CRow>
                  <span className=" text-black-50">
                    Registered in the system on {Date(val.staff_system_register)}
                  </span>
                </div>
              )
            })}
        </CModalBody>
        <CModalFooter>
          {role === 'admin' ? (
            <CButtonGroup>
              <CButton
                size="sm"
                color="secondary"
                onClick={() => {
                  if (window.confirm('Generate Password and Sent Notification?')) {
                    mailpassword(
                      viewEmployee,
                      employeedata.find((fin) => fin.staff_id === viewEmployee),
                    )
                  }
                }}
              >
                <CIcon icon={cilInbox} /> Email Notification
              </CButton>
              <CButton
                size="sm"
                color="secondary"
                onClick={() => {
                  editEmployee(viewEmployee)
                  setToggleEditEmployee(true)
                }}
              >
                <CIcon icon={cilPencil} /> Edit
              </CButton>
              <CButton
                size="sm"
                color="danger"
                onClick={() => {
                  deleteEmployee(viewEmployee)
                  setVisible(!visible)
                }}
              >
                <CIcon icon={cilTrash} /> Delete
              </CButton>
            </CButtonGroup>
          ) : (
            ''
          )}

          <CButton size="sm" color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

EmployeeDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  employeedata: PropTypes.array.isRequired,
  viewEmployee: PropTypes.number,
  deleteEmployee: PropTypes.func.isRequired,
  setToggleEditEmployee: PropTypes.func.isRequired,
  editEmployee: PropTypes.func,
  departmentdata: PropTypes.array.isRequired,
  positiondata: PropTypes.array.isRequired,
  mailpassword: PropTypes.func.isRequired,
  positioncompetency: PropTypes.array.isRequired,
  assessors: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
}

export default EmployeeDetail
