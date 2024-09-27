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
  CBadge,
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

const CompetencyTable = ({
  competencylist,
  setToggleCreateCompetency,
  deleteCompetency,
  setToggleDetailCompetency,
  viewCompetency,
  setToggleEditCompetency,
  editCompetency,
  role,
}) => {
  const { loading, company, cluster } = useContext(MyContext)
  const [groupFilter, setGroupFilter] = useState('All')

  const selectedCompany = company[0]
  const filteredCompetency = competencylist.filter((i) =>
    groupFilter === 'All' ? true : i.cluster_name === groupFilter,
  )

  if (loading.company || loading.cluster) <CSpinner />
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
            <CIcon icon={cilLibrary} /> COMPETENCY
            {role === 'admin' ? (
              <CButtonGroup className="float-end">
                <CTooltip content="Add" placement="auto">
                  <CButton
                    size="sm"
                    color="secondary"
                    onClick={() => setToggleCreateCompetency(true)}
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
              <CCol lg={3}>
                <CWidgetStatsF
                  className="mb-3"
                  color="primary"
                  //icon={<CIcon icon={cilChartPie} height={24} />}
                  title="TOTAL COMPETENCY"
                  value={competencylist.length}
                />
              </CCol>
              <CCol lg={3}>
                <CWidgetStatsF
                  className="mb-3"
                  color="warning"
                  //icon={<CIcon icon={cilChartPie} height={24} />}
                  title="TOTAL CORE COMPETENCY"
                  value={competencylist.filter((i) => i.cluster_name === 'Core').length}
                />
              </CCol>
              <CCol lg={3}>
                <CWidgetStatsF
                  className="mb-3"
                  color="success"
                  //icon={<CIcon icon={cilChartPie} height={24} />}
                  title="TOTAL GENERIC COMPETENCY"
                  value={competencylist.filter((i) => i.cluster_name === 'Generic').length}
                />
              </CCol>
              <CCol lg={3}>
                <CWidgetStatsF
                  className="mb-3"
                  color="info"
                  //icon={<CIcon icon={cilChartPie} height={24} />}
                  title="TOTAL FUNCTIONAL COMPETENCY"
                  value={competencylist.filter((i) => i.cluster_name === 'Functional').length}
                />
              </CCol>
            </CRow>
            <CAlert color="secondary">
              <h6>Filter</h6>
              <CButtonGroup>
                <CButton
                  color="secondary"
                  variant="outline"
                  size="sm"
                  onClick={() => setGroupFilter('All')}
                  active={groupFilter === 'All' ? true : false}
                >
                  All
                </CButton>
                {cluster?.map((cls, clskey) => (
                  <CButton
                    key={clskey}
                    color="secondary"
                    variant="outline"
                    size="sm"
                    onClick={() => setGroupFilter(cls.cluster_name)}
                    active={groupFilter === cls.cluster_name ? true : false}
                  >
                    {cls.cluster_name}
                  </CButton>
                ))}
              </CButtonGroup>
            </CAlert>
            {filteredCompetency.length > 0 ? (
              <CTable small bordered striped responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Competency</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredCompetency?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell className=" text-uppercase">
                          {val.competency_name}
                          <CBadge className="mx-2" size="sm" color={val.cluster_color}>
                            {val.cluster_name}
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
                                  setToggleDetailCompetency(true)
                                  viewCompetency(val.competency_id)
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
                                      setToggleEditCompetency(true)
                                      editCompetency(val.competency_id)
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
                                    onClick={() => deleteCompetency(val.competency_id)}
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
                No competency data available.
                {role === 'admin' ? (
                  <CButton color="link" onClick={() => setToggleCreateCompetency(true)}>
                    Add competency
                  </CButton>
                ) : (
                  ''
                )}
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
  role: PropTypes.string.isRequired,
}

export default CompetencyTable
