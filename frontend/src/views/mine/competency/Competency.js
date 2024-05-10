import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

// FETCH USER ROLE
import { userType } from 'src/userType'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import competency component
const CompetencyTable = React.lazy(() => import('./CompetencyTable'))
const CompetencyCreate = React.lazy(() => import('./CompetencyCreate'))
const CompetencyDetail = React.lazy(() => import('./CompetencyDetail'))
const CompetencyEdit = React.lazy(() => import('./CompetencyEdit'))

const Competency = () => {
  const [competencylist, setCompetencylist] = useState([])
  const [clusterlist, setClusterlist] = useState([])
  const [indicatorlist, setIndicatorlist] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [toggleCreateCompetency, setToggleCreateCompetency] = useState(false)
  const [toggleDetailCompetency, setToggleDetailCompetency] = useState(false)
  const [toggleEditCompetency, setToggleEditCompetency] = useState(false)
  const [viewCompetency, setViewCompetency] = useState()
  const [editCompetency, setEditCompetency] = useState()

  //CREATE COMPETENCY API
  const createNewCompetency = async (competencydata, indicatordata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/competency/createcompetency`, {
          competencydata: competencydata,
        })
        .then((response) => {
          if (response.data) {
            if (indicatordata) {
              for (let x = 0; x < indicatordata.length; x++) {
                createNewIndicator(indicatordata[x], response.data)
              }
            }
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    } finally {
      alert('Competency data saved')
    }
  }

  //CREATE INDICATOR API
  const createNewIndicator = async (indicatordata, competencyid) => {
    indicatordata.competencyid = competencyid
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/indicator/createindicator`, {
          indicatordata: indicatordata,
        })
        .then((response) => {
          if (response.data) {
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE COMPETENCY API
  const deleteCompetency = async (competencyid) => {
    const deleteconfirm = window.confirm('Delete competency?')
    if (deleteconfirm) {
      try {
        await axios
          .delete(`${config.REACT_APP_API_ENDPOINT}/competency/deletecompetency/${competencyid}`)
          .then((response) => {
            if (response) {
              alert('Competency deleted')
              setIsChange(!isChange)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  //UPDATE COMPETENCY API
  const updateCompetency = async (competencydata) => {
    try {
      await axios
        .put(
          `${config.REACT_APP_API_ENDPOINT}/competency/updatecompetency/${competencydata.competencyid}`,
          {
            competencydata: competencydata,
          },
        )
        .then((response) => {
          if (response) {
            console.log(response.data)
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //UPDATE INDICATOR API
  const updateIndicator = async (indicatordata) => {
    try {
      await axios
        .put(
          `${config.REACT_APP_API_ENDPOINT}/indicator/updateindicator/${indicatordata.indicatorid}`,
          {
            indicatordata: indicatordata,
          },
        )
        .then((response) => {
          if (response) {
            console.log(response.data)
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    //READ COMPETENCY API
    const fetchAllCompetency = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/competency/getallcompetency`,
        )
        setCompetencylist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllCompetency()
  }, [isChange])

  useEffect(() => {
    //READ INDICATOR API
    const fetchAllIndicator = async () => {
      try {
        const response = await axios.get(
          `${config.REACT_APP_API_ENDPOINT}/indicator/getallindicator`,
        )
        setIndicatorlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllIndicator()
  }, [isChange])

  useEffect(() => {
    //READ CLUSTER API
    const fetchAllCluster = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/cluster/getallcluster`)
        setClusterlist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllCluster()
  }, [])
  return (
    <>
      <Suspense fallback={<CSpinner />}>
        <CompetencyTable
          competencylist={competencylist}
          setToggleCreateCompetency={setToggleCreateCompetency}
          setToggleDetailCompetency={setToggleDetailCompetency}
          deleteCompetency={deleteCompetency}
          viewCompetency={setViewCompetency}
          setToggleEditCompetency={setToggleEditCompetency}
          editCompetency={setEditCompetency}
          role={userType.role}
        />
        <CompetencyCreate
          visible={toggleCreateCompetency}
          setVisible={setToggleCreateCompetency}
          createCompetency={createNewCompetency}
          clusterlist={clusterlist}
        />
        <CompetencyDetail
          visible={toggleDetailCompetency}
          setVisible={setToggleDetailCompetency}
          competencydata={competencylist}
          viewCompetency={viewCompetency}
          deleteCompetency={deleteCompetency}
          setToggleEditCompetency={setToggleEditCompetency}
          editCompetency={setEditCompetency}
          clusterdata={clusterlist}
          indicatorlist={indicatorlist}
          role={userType.role}
        />
        <CompetencyEdit
          visible={toggleEditCompetency}
          setVisible={setToggleEditCompetency}
          competencydata={competencylist}
          competencyid={editCompetency}
          updatedcompetency={updateCompetency}
          clusterlist={clusterlist}
          indicatorlist={indicatorlist}
          updateindicator={updateIndicator}
        />
      </Suspense>
    </>
  )
}

export default Competency
