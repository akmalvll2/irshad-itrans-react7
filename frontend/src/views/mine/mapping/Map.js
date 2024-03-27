import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const MapJobCompetency = React.lazy(() => import('./MapJobCompetency'))
const MapTable = React.lazy(() => import('./MapTable'))
const MapAssessor = React.lazy(() => import('./MapAssessor'))
//const EmployeeEdit = React.lazy(() => import('./EmployeeEdit'))

const Map = () => {
  const [competencydata, setCompetencydata] = useState([])
  const [positiondata, setPositiondata] = useState([])
  const [clusterdata, setClusterdata] = useState([])
  const [stafflist, setstafflist] = useState([])
  const [assessorlist, setassessorlist] = useState([])
  const [positioncompetencydata, setPositioncompetencydata] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [openJobCompetency, setOpenJobCompetency] = useState(false)
  const [toggleMapAssessor, setToggleMapAssessor] = useState(false)
  const [positionid, setPositionid] = useState()
  const [staffid, setstaffid] = useState()

  //CREATE JOB COMPETENCY API
  const createNewJobCompetency = async (jobcompetencydata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/jobcompetency/createjobcompetency`, {
          jobcompetencydata: jobcompetencydata,
        })
        .then((response) => {
          if (response) {
            console.log('Successfully set position skills set')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE JOB COMPETENCY API
  const deleteJobCompetency = async (jobcompetencyid) => {
    const deleteconfirm = window.confirm('Delete Mapping?')
    if (deleteconfirm) {
      try {
        await axios
          .delete(
            `${config.REACT_APP_API_ENDPOINT}/jobcompetency/deletejobcompetency/${jobcompetencyid}`,
          )
          .then((response) => {
            if (response) {
              alert('Mapping deleted')
              setIsChange(!isChange)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

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
    //READ ASSESSOR API
    const fetchAllAssessor = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/assessor/getallassessor`)
        setassessorlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllAssessor()
  }, [isChange])

  useEffect(() => {
    //READ EMPLOYEE API
    const fetchAllEmployee = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/employee/getallemployee`)
        setstafflist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllEmployee()
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
        setPositionid={setPositionid}
        stafflist={stafflist}
        assessorlist={assessorlist}
        setToggleMapAssessor={setToggleMapAssessor}
        setstaffid={setstaffid}
      />
      <MapJobCompetency
        positiondata={positiondata}
        competencydata={competencydata}
        visible={openJobCompetency}
        setVisible={setOpenJobCompetency}
        positionid={positionid}
        positioncompetencydata={positioncompetencydata}
        createnewjobcompetency={createNewJobCompetency}
        deleteJobCompetency={deleteJobCompetency}
      />
      <MapAssessor
        visible={toggleMapAssessor}
        setVisible={setToggleMapAssessor}
        staffid={staffid}
        stafflist={stafflist}
        assessorlist={assessorlist}
      />
    </>
  )
}

export default Map
