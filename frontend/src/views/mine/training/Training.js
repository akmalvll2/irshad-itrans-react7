import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const TrainingTable = React.lazy(() => import('./TrainingTable'))
const TrainingCreate = React.lazy(() => import('./TrainingCreate'))
const TrainingDetail = React.lazy(() => import('./TrainingDetail'))
const TrainingEdit = React.lazy(() => import('./TrainingEdit'))

const Training = () => {
  const [traininglist, setTraininglist] = useState([])
  const [clusterlist, setClusterlist] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [toggleCreateTraining, setToggleCreateTraining] = useState(false)
  const [toggleDetailTraining, setToggleDetailTraining] = useState(false)
  const [toggleEditTraining, setToggleEditTraining] = useState(false)
  const [viewTraining, setViewTraining] = useState()
  const [editTraining, setEditTraining] = useState()

  //CREATE TRAINING API
  const createNewTraining = async (trainingdata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/training/createtraining`, {
          trainingdata: trainingdata,
        })
        .then((response) => {
          if (response) {
            alert('Training data saved.')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE TRAINING API
  const deleteTraining = async (trainingid) => {
    const deleteconfirm = window.confirm('Delete training?')
    if (deleteconfirm) {
      try {
        await axios
          .delete(`${config.REACT_APP_API_ENDPOINT}/training/deletetraining/${trainingid}`)
          .then((response) => {
            if (response) {
              alert('Training deleted')
              setIsChange(!isChange)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  //UPDATE TRAINING API
  const updateTraining = async (trainingdata) => {
    try {
      await axios
        .put(
          `${config.REACT_APP_API_ENDPOINT}/training/updatetraining/${trainingdata.trainingid}`,
          {
            trainingdata: trainingdata,
          },
        )
        .then((response) => {
          if (response) {
            alert('Training updated')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    //READ TRAINING API
    const fetchAllTraining = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/training/getalltraining`)
        setTraininglist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllTraining()
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
        <TrainingTable
          traininglist={traininglist}
          setToggleCreateTraining={setToggleCreateTraining}
          setToggleDetailTraining={setToggleDetailTraining}
          deleteTraining={deleteTraining}
          viewTraining={setViewTraining}
          setToggleEditTraining={setToggleEditTraining}
          editTraining={setEditTraining}
        />
        <TrainingDetail
          visible={toggleDetailTraining}
          setVisible={setToggleDetailTraining}
          trainingdata={traininglist}
          viewTraining={viewTraining}
          deleteTraining={deleteTraining}
          setToggleEditTraining={setToggleEditTraining}
          editTraining={setEditTraining}
          clusterdata={clusterlist}
        />
        <TrainingCreate
          visible={toggleCreateTraining}
          setVisible={setToggleCreateTraining}
          createTraining={createNewTraining}
          clusterlist={clusterlist}
        />
        <TrainingEdit
          visible={toggleEditTraining}
          setVisible={setToggleEditTraining}
          trainingdata={traininglist}
          trainingid={editTraining}
          updatedtraining={updateTraining}
          clusterlist={clusterlist}
        />
      </Suspense>
    </>
  )
}

export default Training
