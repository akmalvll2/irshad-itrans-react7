import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const MapJobCompetency = React.lazy(() => import('./MapJobCompetency'))
const MapTable = React.lazy(() => import('./MapTable'))
//const EmployeeDetail = React.lazy(() => import('./EmployeeDetail'))
//const EmployeeEdit = React.lazy(() => import('./EmployeeEdit'))

const Map = () => {
  const [competencydata, setCompetencydata] = useState([])
  const [positiondata, setPositiondata] = useState([])
  const [clusterdata, setClusterdata] = useState([])
  const [positioncompetencydata, setPositioncompetencydata] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [openJobCompetency, setOpenJobCompetency] = useState(false)

  useEffect(() => {
    //READ POSITION API
    const fetchAllPosition = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/job/getalljob`)
        setPositiondata(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllPosition()
  }, [isChange])
  useEffect(() => {
    //READ COMPETENCY API
    const fetchAllCompetency = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/competency/getallcompetency`,
        )
        setCompetencydata(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllCompetency()
  }, [isChange])
  useEffect(() => {
    //READ JOB COMPETENCY API
    const fetchAllJobCompetency = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/jobcompetency/getalljobcompetency`,
        )
        setPositioncompetencydata(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllJobCompetency()
  }, [isChange])
  return (
    <>
      <MapTable
        positiondata={positiondata}
        competencydata={competencydata}
        positioncompetencydata={positioncompetencydata}
        setOpenJobCompetency={setOpenJobCompetency}
      />
      <MapJobCompetency
        positiondata={positiondata}
        competencydata={competencydata}
        visible={openJobCompetency}
        setVisible={setOpenJobCompetency}
      />
    </>
  )
}

export default Map
