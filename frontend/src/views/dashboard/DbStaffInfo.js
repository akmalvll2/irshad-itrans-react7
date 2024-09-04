import React, { useContext, useState } from 'react'
//import moment from 'moment'
//import img2 from '../../assets/images/4.png'

//path to userType component
import { userType } from 'src/userType'

import MyContext from '../mine/data/MyContext'

// IMPORT COREUI COMPONENT
import {
  CSpinner,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CAlert,
  CNav,
  CNavLink,
  CTabContent,
  CNavItem,
  CTabPane,
} from '@coreui/react'

import { CChart } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilUser } from '@coreui/icons'

const DashboardInfo1 = () => {
  const { staff, cluster, positionCompetency, company, loading } = useContext(MyContext)

  const [activeKey, setActiveKey] = useState(1)

  const selectedStaff = staff?.find((i) => i.staff_id.toString() === userType?.id)

  const selectedCompany = company[0]

  // loading state if the data are not available
  if (loading.staff || loading.positionCompetency || loading.company || loading.cluster) {
    return <CSpinner />
  }
  return (
    <div>
      <CCard className="my-2">
        <CCardHeader
          /*style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'navy',
            textAlign: 'center',
          }}*/
          style={{
            backgroundColor: `${selectedCompany.company_system_primary_color}`,
            color: 'ghostwhite',
          }}
        >
          <CIcon icon={cilUser} /> STAFF INFORMATION
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={6}>
              {staff
                .filter((i) => i.staff_id.toString() === userType?.id)
                ?.map((val, key) => (
                  <CTable small responsive bordered key={key}>
                    <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell>ID</CTableHeaderCell>
                        <CTableDataCell className="text-uppercase">
                          {val.staff_id_number}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableDataCell className=" text-uppercase">
                          {val.staff_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Position</CTableHeaderCell>
                        <CTableDataCell className=" text-uppercase">
                          {val.position_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Grade</CTableHeaderCell>
                        <CTableDataCell className=" text-uppercase">
                          {val.position_grade}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Department</CTableHeaderCell>
                        <CTableDataCell className=" text-uppercase">
                          {val.department_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell>Report To</CTableHeaderCell>
                        <CTableDataCell className=" text-uppercase">
                          {staff?.find((i) => i.staff_id === val.manager_id).staff_name}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                ))}
            </CCol>
            <CCol md={6}>
              <CCard>
                <CCardHeader>
                  <h6>Competency Listing</h6>
                  <CNav
                    variant="tabs"
                    role="tablist"
                    className="card-header-tabs flex-column flex-sm-row"
                  >
                    {cluster?.map((cls, clskey) => {
                      return (
                        <CNavItem role="presentation" key={clskey}>
                          <CNavLink
                            active={activeKey === clskey + 1}
                            component="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected={activeKey === clskey + 1}
                            onClick={() => setActiveKey(clskey + 1)}
                          >
                            {cls.cluster_name}
                          </CNavLink>
                        </CNavItem>
                      )
                    })}
                  </CNav>
                </CCardHeader>
                <CCardBody className="p-0">
                  <CTabContent>
                    {cluster?.map((cls, clskey) => {
                      return (
                        <CTabPane
                          role="tabpanel"
                          className="p-0"
                          aria-labelledby="home-tab-pane"
                          visible={activeKey === clskey + 1}
                          key={clskey + 1}
                        >
                          {positionCompetency?.filter(
                            (i) =>
                              i.position_id === selectedStaff?.position_id &&
                              i.cluster_id === cls.cluster_id,
                          ).length > 0 ? (
                            <CTable small responsive className="m-0">
                              <CTableHead>
                                <CTableRow>
                                  <CTableHeaderCell>No</CTableHeaderCell>
                                  <CTableHeaderCell>Competency</CTableHeaderCell>
                                  <CTableHeaderCell>RCL</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {positionCompetency
                                  ?.filter(
                                    (i) =>
                                      i.position_id === selectedStaff?.position_id &&
                                      i.cluster_id === cls.cluster_id,
                                  )
                                  .map((val2, key2) => (
                                    <CTableRow key={key2}>
                                      <CTableDataCell>{key2 + 1}.</CTableDataCell>
                                      <CTableDataCell>{val2.competency_name}</CTableDataCell>
                                      <CTableDataCell className=" d-flex align-items-center">
                                        {val2.position_competency_expected_level}
                                      </CTableDataCell>
                                    </CTableRow>
                                  ))}
                              </CTableBody>
                            </CTable>
                          ) : (
                            <CAlert className="m-2" color="info">
                              No Data Available
                            </CAlert>
                          )}
                        </CTabPane>
                      )
                    })}
                  </CTabContent>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DashboardInfo1
