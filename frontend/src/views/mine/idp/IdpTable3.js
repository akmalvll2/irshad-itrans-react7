import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PropTypes } from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
  CCardTitle,
  CButtonGroup,
  CAlert,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPrint, cilLightbulb, cilCheckAlt } from '@coreui/icons'
import img2 from '../../../assets/images/4.png'
import { userType } from 'src/userType'

import packageJson from '../../../../package.json'
import Select from 'src/views/forms/input-group/InputGroup'
const { config } = packageJson

const IdpTable3 = () => {
  const [data, setData] = useState([])
  const [staff, setStaff] = useState([])
  const [load, setLoad] = useState(false)
  const [setting, setSetting] = useState([])
  const [currSelect, setCurrSelect] = useState()

  //self submission
  const cga1 = data?.filter((item) => item.staff_competency_session === 1)
  //superior submission
  const cga2 = data?.filter((item) => item.staff_competency_session === 2)
  //peer 1 submission
  const cga3 = data?.filter((item) => item.staff_competency_session === 3)
  //peer 2 submission
  const cga4 = data?.filter((item) => item.staff_competency_session === 4)
  //peer 3 submission
  const cga5 = data?.filter((item) => item.staff_competency_session === 5)
  //subordinate 1 submission
  const cga6 = data?.filter((item) => item.staff_competency_session === 6)
  //subordinate 2 submission
  const cga7 = data?.filter((item) => item.staff_competency_session === 7)
  //subordinate 3 submission
  const cga8 = data?.filter((item) => item.staff_competency_session === 8)

  const fetchSetting = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/appname`).then((response) => {
        if (response) {
          setSetting(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchStaff = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/user`).then((response) => {
        if (response) {
          setStaff(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = async () => {
    try {
      setLoad(true)
      await axios.post(`${config.REACT_APP_API_ENDPOINT}/cgaresultall`).then((response) => {
        if (response) {
          setData(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
    }
  }
  const gapCalculation = (staffid, cluster, competencyid, expectedlvl) => {
    const ans =
      cga2?.filter(
        (idx) =>
          idx.staff_id === staffid &&
          idx.competency_cluster === cluster &&
          idx.competency_id === competencyid,
      ).length === 0
        ? expectedlvl -
          cga1?.filter(
            (idx) =>
              idx.staff_id === staffid &&
              idx.competency_cluster === cluster &&
              idx.competency_id === competencyid,
          )[0]?.current_competency_level
        : parseFloat(
            (
              (expectedlvl -
                cga1?.filter(
                  (idx) =>
                    idx.staff_id === staffid &&
                    idx.competency_cluster === cluster &&
                    idx.competency_id === competencyid,
                )[0]?.current_competency_level) *
                0.3 +
              (expectedlvl -
                cga2?.filter(
                  (idx) =>
                    idx.staff_id === staffid &&
                    idx.competency_cluster === cluster &&
                    idx.competency_id === competencyid,
                )[0]?.current_competency_level) *
                0.7
            ).toFixed(2),
          )

    return ans
  }
  const handlePrint = (id) => {
    const printContent = document.getElementById(id)?.innerHTML
    const originalContent = document.body.innerHTML

    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = originalContent
    window.location.reload()
  }
  useEffect(() => {
    fetchData()
    fetchSetting()
    fetchStaff()
  }, [])
  return (
    <>
      <CCard>
        <CCardHeader
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
          }}
        >
          <center>
            <CCardTitle>INDIVIDUAL DEVELOPMENT PLAN</CCardTitle>
          </center>
          {userType?.data[0].type === 'admin' ? (
            <>
              <CButtonGroup className="float-end">
                <CButton color="dark" onClick={(e) => handlePrint('tab1')}>
                  <CIcon icon={cilPrint} />
                </CButton>
              </CButtonGroup>
              <CFormSelect
                size="sm"
                id="floatingInput"
                className="mb-3"
                label="Staff"
                name="staff"
                onChange={(e) => setCurrSelect(e.target.value)}
              >
                <option>..Choose Staff</option>
                {staff?.map((val, key) => {
                  return (
                    <option key={key} value={val.staff_id}>
                      {val.staff_name}
                    </option>
                  )
                })}
              </CFormSelect>
            </>
          ) : (
            ''
          )}
        </CCardHeader>
        <CCardBody>
          {load ? (
            <CSpinner component="span" size="sm" color="light" aria-hidden="true" />
          ) : (
            <div id="tab1">
              <>
                {data
                  ?.reduce((accumulator, currentitem) => {
                    if (!accumulator.some((item) => item.staff_name === currentitem.staff_name)) {
                      accumulator.push(currentitem)
                    }
                    return accumulator
                  }, [])
                  .filter((itm) =>
                    userType?.data[0].type === 'admin'
                      ? itm.staff_id === '112679'
                      : itm.staff_id === userType?.data[0].staff_id,
                  ).length > 0 ? (
                  ''
                ) : (
                  <CAlert color="info">No Data Available</CAlert>
                )}
                {data
                  ?.reduce((accumulator, currentitem) => {
                    if (!accumulator.some((item) => item.staff_name === currentitem.staff_name)) {
                      accumulator.push(currentitem)
                    }
                    return accumulator
                  }, [])
                  .filter((itm) =>
                    userType?.data[0].type === 'admin'
                      ? itm.staff_id === currSelect
                      : itm.staff_id === userType?.data[0].staff_id,
                  )
                  .map((val, key) => {
                    return (
                      <div key={key} style={{ pageBreakAfter: 'always' }}>
                        <CTable small responsive bordered color="dark">
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell>Name</CTableHeaderCell>
                              <CTableHeaderCell colSpan={4}>{val.staff_name}</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableHeaderCell>Position</CTableHeaderCell>
                              <CTableHeaderCell>{val.job_title}</CTableHeaderCell>
                              <CTableHeaderCell>Unit</CTableHeaderCell>
                              <CTableHeaderCell>{val.department_name}</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                        </CTable>
                        <CTable small responsive bordered style={{ textAlign: 'center' }}>
                          <CTableBody>
                            <CTableRow style={{ fontWeight: 'bold' }}>
                              <CTableDataCell rowSpan={2}>COMPETENCY</CTableDataCell>
                              <CTableDataCell rowSpan={2}>RCL</CTableDataCell>
                              <CTableDataCell rowSpan={2}>GAP</CTableDataCell>
                              <CTableDataCell rowSpan={2}>PRIORITY</CTableDataCell>
                              <CTableDataCell colSpan={4}>DEVELOPMENT STRATEGY</CTableDataCell>
                            </CTableRow>
                            <CTableRow style={{ fontWeight: 'bold' }}>
                              <CTableDataCell>TRAINING</CTableDataCell>
                              <CTableDataCell>COACHING</CTableDataCell>
                              <CTableDataCell>SELF LEARNING</CTableDataCell>
                              <CTableDataCell>ON THE JOB TRAINING</CTableDataCell>
                            </CTableRow>
                            {setting[0]?.setting_app_survey_1 === 1 ? (
                              <>
                                <CTableRow style={{ fontWeight: 'bold' }}>
                                  <CTableDataCell colSpan={8} color="dark">
                                    CORE
                                  </CTableDataCell>
                                </CTableRow>
                                {cga1
                                  ?.filter(
                                    (item) =>
                                      item.staff_id === val.staff_id &&
                                      item.competency_cluster === 'Core',
                                  )
                                  .map((item, key) => {
                                    return (
                                      <CTableRow key={key}>
                                        <CTableDataCell>{item.competency_name}</CTableDataCell>
                                        <CTableDataCell>{item.expected_level}</CTableDataCell>
                                        <CTableDataCell>
                                          {gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 0
                                            ? 'VERY LOW'
                                            : gapCalculation(
                                                val.staff_id,
                                                item.competency_cluster,
                                                item.competency_id,
                                                item.expected_level,
                                              ) < 0.5
                                            ? 'LOW'
                                            : gapCalculation(
                                                val.staff_id,
                                                item.competency_cluster,
                                                item.competency_id,
                                                item.expected_level,
                                              ) < 1.5
                                            ? 'HIGH'
                                            : 'VERY HIGH'}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 0 ? (
                                            '-'
                                          ) : gapCalculation(
                                              val.staff_id,
                                              item.competency_cluster,
                                              item.competency_id,
                                              item.expected_level,
                                            ) < 0.5 ? (
                                            '-'
                                          ) : gapCalculation(
                                              val.staff_id,
                                              item.competency_cluster,
                                              item.competency_id,
                                              item.expected_level,
                                            ) < 1.5 ? (
                                            '-'
                                          ) : (
                                            <CIcon icon={cilCheckAlt} />
                                          )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 0 ? (
                                            '-'
                                          ) : gapCalculation(
                                              val.staff_id,
                                              item.competency_cluster,
                                              item.competency_id,
                                              item.expected_level,
                                            ) < 0.5 ? (
                                            '-'
                                          ) : gapCalculation(
                                              val.staff_id,
                                              item.competency_cluster,
                                              item.competency_id,
                                              item.expected_level,
                                            ) < 1.5 ? (
                                            <CIcon icon={cilCheckAlt} />
                                          ) : (
                                            <CIcon icon={cilCheckAlt} />
                                          )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 0 ? (
                                            '-'
                                          ) : gapCalculation(
                                              val.staff_id,
                                              item.competency_cluster,
                                              item.competency_id,
                                              item.expected_level,
                                            ) < 0.5 ? (
                                            <CIcon icon={cilCheckAlt} />
                                          ) : gapCalculation(
                                              val.staff_id,
                                              item.competency_cluster,
                                              item.competency_id,
                                              item.expected_level,
                                            ) < 1.5 ? (
                                            <CIcon icon={cilCheckAlt} />
                                          ) : (
                                            <CIcon icon={cilCheckAlt} />
                                          )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 0 ? (
                                            <CIcon icon={cilCheckAlt} />
                                          ) : gapCalculation(
                                              val.staff_id,
                                              item.competency_cluster,
                                              item.competency_id,
                                              item.expected_level,
                                            ) < 0.5 ? (
                                            <CIcon icon={cilCheckAlt} />
                                          ) : gapCalculation(
                                              val.staff_id,
                                              item.competency_cluster,
                                              item.competency_id,
                                              item.expected_level,
                                            ) < 1.5 ? (
                                            <CIcon icon={cilCheckAlt} />
                                          ) : (
                                            <CIcon icon={cilCheckAlt} />
                                          )}
                                        </CTableDataCell>
                                      </CTableRow>
                                    )
                                  })}
                              </>
                            ) : (
                              ''
                            )}

                            {setting[0]?.setting_app_survey_1 === 1 ? (
                              <CTableRow style={{ fontWeight: 'bold' }}>
                                <CTableDataCell colSpan={8} color="dark">
                                  GENERIC
                                </CTableDataCell>
                              </CTableRow>
                            ) : (
                              ''
                            )}
                            {cga1
                              ?.filter(
                                (item) =>
                                  item.staff_id === val.staff_id &&
                                  item.competency_cluster === 'Generic',
                              )
                              .map((item, key) => {
                                return (
                                  <CTableRow key={key}>
                                    <CTableDataCell>{item.competency_name}</CTableDataCell>
                                    <CTableDataCell>{item.expected_level}</CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0
                                        ? 'VERY LOW'
                                        : gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 0.5
                                        ? 'LOW'
                                        : gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 1.5
                                        ? 'HIGH'
                                        : 'VERY HIGH'}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 0.5 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 1.5 ? (
                                        '-'
                                      ) : (
                                        <CIcon icon={cilCheckAlt} />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 0.5 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 1.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : (
                                        <CIcon icon={cilCheckAlt} />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 0.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 1.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : (
                                        <CIcon icon={cilCheckAlt} />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 0.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 1.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : (
                                        <CIcon icon={cilCheckAlt} />
                                      )}
                                    </CTableDataCell>
                                  </CTableRow>
                                )
                              })}
                            <CTableRow style={{ fontWeight: 'bold' }}>
                              <CTableDataCell colSpan={8} color="dark">
                                FUNCTIONAL
                              </CTableDataCell>
                            </CTableRow>
                            {cga1?.filter(
                              (item) =>
                                item.staff_id === val.staff_id &&
                                item.competency_cluster === 'Functional',
                            ).length > 0 ? (
                              ''
                            ) : (
                              <CTableRow>
                                <CTableDataCell colSpan={8}>
                                  <CAlert color="info">Assessment Incomplete</CAlert>
                                </CTableDataCell>
                              </CTableRow>
                            )}
                            {cga1
                              ?.filter(
                                (item) =>
                                  item.staff_id === val.staff_id &&
                                  item.competency_cluster === 'Functional',
                              )
                              .map((item, key) => {
                                return (
                                  <CTableRow key={key}>
                                    <CTableDataCell>{item.competency_name}</CTableDataCell>
                                    <CTableDataCell>{item.expected_level}</CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0
                                        ? 'VERY LOW'
                                        : gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 0.5
                                        ? 'LOW'
                                        : gapCalculation(
                                            val.staff_id,
                                            item.competency_cluster,
                                            item.competency_id,
                                            item.expected_level,
                                          ) < 1.5
                                        ? 'HIGH'
                                        : 'VERY HIGH'}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 0.5 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 1.5 ? (
                                        '-'
                                      ) : (
                                        <CIcon icon={cilCheckAlt} />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 0.5 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 1.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : (
                                        <CIcon icon={cilCheckAlt} />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0 ? (
                                        '-'
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 0.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 1.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : (
                                        <CIcon icon={cilCheckAlt} />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {gapCalculation(
                                        val.staff_id,
                                        item.competency_cluster,
                                        item.competency_id,
                                        item.expected_level,
                                      ) < 0 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 0.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : gapCalculation(
                                          val.staff_id,
                                          item.competency_cluster,
                                          item.competency_id,
                                          item.expected_level,
                                        ) < 1.5 ? (
                                        <CIcon icon={cilCheckAlt} />
                                      ) : (
                                        <CIcon icon={cilCheckAlt} />
                                      )}
                                    </CTableDataCell>
                                  </CTableRow>
                                )
                              })}
                          </CTableBody>
                        </CTable>
                      </div>
                    )
                  })}
              </>
            </div>
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default IdpTable3
