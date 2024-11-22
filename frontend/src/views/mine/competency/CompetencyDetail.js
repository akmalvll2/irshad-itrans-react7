import React from 'react'
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
  CTableHeaderCell,
} from '@coreui/react'

//icon
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSave, cilTrash, cilMagnifyingGlass, cilPencil } from '@coreui/icons'

const CompetencyDetail = ({
  visible,
  setVisible,
  competencydata,
  viewCompetency,
  deleteCompetency,
  setToggleEditCompetency,
  editCompetency,
  clusterdata,
  indicatorlist,
  role,
}) => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
        size="xl"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Competency Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {competencydata
            ?.filter((fil) => fil.competency_id === viewCompetency)
            .map((val, key) => {
              const listfunc = (data) => {
                const listItems = data?.split(/\s*#\s*/).filter((item) => item.trim() !== '')
                return listItems
              }
              return (
                <div key={key}>
                  <CTable small bordered stripedColumns>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>Name:</CTableDataCell>
                        <CTableDataCell>{val.competency_name}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Group:</CTableDataCell>
                        <CTableDataCell>
                          {clusterdata?.find((fi) => fi.cluster_id === val.cluster_id).cluster_name}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell>Definition:</CTableDataCell>
                        <CTableDataCell>{val.competency_description}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell colSpan={2}>
                          <CTable small responsive bordered>
                            <CTableBody>
                              <CTableRow>
                                <CTableHeaderCell>Level 1 - Foundation</CTableHeaderCell>
                                <CTableHeaderCell>Level 2 - Intermediate</CTableHeaderCell>
                                <CTableHeaderCell>Level 3 - Proficient</CTableHeaderCell>
                                <CTableHeaderCell>Level 4 - Expert</CTableHeaderCell>
                                <CTableHeaderCell>Level 5 - Mastery</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableDataCell>
                                  <ul>
                                    {listfunc(val.competency_level1)?.map((li, likey) => (
                                      <li key={likey}>{li}</li>
                                    ))}
                                  </ul>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <ul>
                                    {listfunc(val.competency_level2)?.map((li, likey) => (
                                      <li key={likey}>{li}</li>
                                    ))}
                                  </ul>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <ul>
                                    {listfunc(val.competency_level3)?.map((li, likey) => (
                                      <li key={likey}>{li}</li>
                                    ))}
                                  </ul>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <ul>
                                    {listfunc(val.competency_level4)?.map((li, likey) => (
                                      <li key={likey}>{li}</li>
                                    ))}
                                  </ul>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <ul>
                                    {listfunc(val.competency_level5)?.map((li, likey) => (
                                      <li key={likey}>{li}</li>
                                    ))}
                                  </ul>
                                </CTableDataCell>
                              </CTableRow>
                            </CTableBody>
                          </CTable>
                        </CTableDataCell>
                      </CTableRow>
                      {indicatorlist
                        .filter((i) => i.competency_id === val.competency_id)
                        .map((val2, key2) => {
                          return (
                            <CTableRow key={key2}>
                              <CTableDataCell>Indicator {key2 + 1}</CTableDataCell>
                              <CTableDataCell>{val2.indicator_description}</CTableDataCell>
                            </CTableRow>
                          )
                        })}
                    </CTableBody>
                  </CTable>
                  <span className="text-black-50">
                    Registered in the system on {Date(val.competency_system_register)}
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
                  editCompetency(viewCompetency)
                  setToggleEditCompetency(true)
                }}
              >
                <CIcon icon={cilPencil} /> Edit
              </CButton>
              <CButton
                size="sm"
                color="danger"
                onClick={() => {
                  deleteCompetency(viewCompetency)
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

CompetencyDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  competencydata: PropTypes.array.isRequired,
  viewCompetency: PropTypes.number,
  deleteCompetency: PropTypes.func.isRequired,
  setToggleEditCompetency: PropTypes.func.isRequired,
  editCompetency: PropTypes.func,
  clusterdata: PropTypes.array.isRequired,
  indicatorlist: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
}

export default CompetencyDetail
