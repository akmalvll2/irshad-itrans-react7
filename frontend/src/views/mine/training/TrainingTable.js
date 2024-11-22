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
  cilChartLine,
} from '@coreui/icons'

const TrainingTable = ({
  traininglist,
  setToggleCreateTraining,
  deleteTraining,
  setToggleDetailTraining,
  viewTraining,
  setToggleEditTraining,
  editTraining,
  role,
}) => {
  const { loading, company, cluster } = useContext(MyContext)
  const [groupFilter, setGroupFilter] = useState('All')

  const selectedCompany = company[0]
  const filteredTraining = traininglist.filter((i) =>
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
            <CIcon icon={cilLibrary} /> TRAINING
            {role === 'admin' ? (
              <CButtonGroup className="float-end">
                <CTooltip content="Add" placement="auto">
                  <CButton
                    size="sm"
                    color="secondary"
                    onClick={() => setToggleCreateTraining(true)}
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
                  color={
                    groupFilter !== 'All'
                      ? cluster?.find((i) => i.cluster_name === groupFilter).cluster_color
                      : 'secondary'
                  }
                  icon={<CIcon icon={cilChartLine} height={24} />}
                  title="TOTAL TRAINING"
                  value={filteredTraining?.length}
                />
              </CCol>
            </CRow>
            <CAlert color="secondary">
              <h6>Filter</h6>
              <CButtonGroup>
                <CButton
                  color={
                    groupFilter !== 'All'
                      ? cluster?.find((i) => i.cluster_name === groupFilter).cluster_color
                      : 'secondary'
                  }
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
                    color={
                      groupFilter !== 'All'
                        ? cluster?.find((i) => i.cluster_name === groupFilter).cluster_color
                        : 'secondary'
                    }
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
            {filteredTraining.length > 0 ? (
              <CTable small bordered striped responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>No</CTableHeaderCell>
                    <CTableHeaderCell>Training</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredTraining?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{key + 1}</CTableDataCell>
                        <CTableDataCell className="text-uppercase">
                          {val.training_name}
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
                                  setToggleDetailTraining(true)
                                  viewTraining(val.training_id)
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
                                      setToggleEditTraining(true)
                                      editTraining(val.training_id)
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
                                    onClick={() => deleteTraining(val.training_id)}
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
                No training data available.
                {role === 'admin' ? (
                  <CButton color="link" onClick={() => setToggleCreateTraining(true)}>
                    Add training
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

TrainingTable.propTypes = {
  traininglist: PropTypes.array.isRequired,
  setToggleCreateTraining: PropTypes.func.isRequired,
  setToggleDetailTraining: PropTypes.func.isRequired,
  deleteTraining: PropTypes.func.isRequired,
  viewTraining: PropTypes.func.isRequired,
  setToggleEditTraining: PropTypes.func.isRequired,
  editTraining: PropTypes.func,
  role: PropTypes.string.isRequired,
}

export default TrainingTable
