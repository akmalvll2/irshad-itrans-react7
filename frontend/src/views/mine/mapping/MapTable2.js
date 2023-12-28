import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CTable,
  CTableRow,
  CTableDataCell,
  CTableBody,
  CFormLabel,
  CFormSelect,
  CTableHead,
  CButton,
  CTableHeaderCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMinus } from '@coreui/icons'

import packageJson from '../../../../package.json'
const { config } = packageJson

const MapTable2 = () => {
  const [compList, setCompList] = useState([])
  const [trainList, setTrainList] = useState([])
  const [currComp, setCurrComp] = useState()
  const [currMapList, setCurrMapList] = useState([])

  const [currTrain, setCurrTrain] = useState()
  const [currGapLevel, setCurrGapLevel] = useState()

  const fetchCompetency = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/competency`).then((response) => {
        if (response) {
          setCompList(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTraining = async () => {
    try {
      await axios.get(`${config.REACT_APP_API_ENDPOINT}/trainingmaplist`).then((response) => {
        if (response) {
          setTrainList(response.data)
        } else {
          console.log('Error retrieve training list')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTrainingMapList = async () => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/activetrainingmaplist`, { currComp: currComp })
        .then((response) => {
          if (response) {
            setCurrMapList(response.data)
          } else {
            console.log('Error retrieve current map list data')
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    try {
      console.log(currGapLevel)
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/addcompetencytraining`, {
          compid: currComp,
          trainingid: currTrain,
          compreq: currGapLevel,
        })
        .then((response) => {
          if (response) {
            alert(response.data)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (deleteid) => {
    const confirmdelete = window.confirm('Remove training?')
    if (confirmdelete) {
      try {
        const dltTrain = deleteid
        await axios
          .post(`${config.REACT_APP_API_ENDPOINT}/deletetrainingmap`, { dltTrain: dltTrain })
          .then((response) => {
            if (response) {
              alert(response.data)
            } else {
              console.log('Error unmapped training')
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    fetchCompetency()
    fetchTraining()
    fetchTrainingMapList()
  })
  return (
    <>
      <CCard>
        <CCardBody>
          <CTable bordered responsive stripedColumns>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CFormLabel>Choose Competency</CFormLabel>
                </CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(e) => setCurrComp(e.target.value)}
                  >
                    <option>...Choose Competency...</option>
                    {compList?.map((val, key) => {
                      return (
                        <option key={key} value={val.competency_id}>
                          {val.competency_name}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>
                  <CFormLabel>Choose Training & Required Level</CFormLabel>
                </CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(e) => setCurrTrain(e.target.value)}
                  >
                    <option>...choose training from this option</option>
                    {trainList?.map((val, key) => {
                      return (
                        <option key={key} value={val.training_id}>
                          {val.training_name}
                        </option>
                      )
                    })}
                  </CFormSelect>
                  <CFormSelect
                    aria-label="Default select example"
                    options={[
                      '..Choose Level..',
                      { label: '1 - Awareness', value: '1' },
                      { label: '2 - Knowledge', value: '2' },
                      { label: '3 - Skill', value: '3' },
                      { label: '4 - Advance', value: '4' },
                      { label: '5 - Expert', value: '5' },
                    ]}
                    onChange={(e) => setCurrGapLevel(e.target.value)}
                  />
                  <CButton variant="outline" color="secondary" onClick={(e) => handleSubmit()}>
                    <CIcon icon={cilPlus} />
                  </CButton>
                  <CTable bordered>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Training</CTableHeaderCell>
                        <CTableHeaderCell>Required Gap Level</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {currMapList?.map((val, key) => {
                        return (
                          <CTableRow key={key}>
                            <CTableDataCell>{val.training_name}</CTableDataCell>
                            <CTableDataCell>{val.gap_level}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                variant="outline"
                                color="secondary"
                                value={val.competency_training_id}
                                onClick={() => handleDelete(val.competency_training_id)}
                              >
                                <CIcon icon={cilMinus} />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })}
                      {currMapList.length > 0 ? '' : 'No Training Mapped'}
                    </CTableBody>
                  </CTable>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default MapTable2
