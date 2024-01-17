import React, { Suspense, useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import axios from 'axios'

//path to API call IMPORTANT!
import packageJson from '../../../../package.json'
const { config } = packageJson

//import department component
const JobTable = React.lazy(() => import('./JobTable'))
const JobCreate = React.lazy(() => import('./JobCreate'))
const JobDetail = React.lazy(() => import('./JobDetail'))
const JobEdit = React.lazy(() => import('./JobEdit'))

const Job = () => {
  const [joblist, setJoblist] = useState([])
  const [isChange, setIsChange] = useState(false)
  const [toggleCreateJob, setToggleCreateJob] = useState(false)
  const [toggleDetailJob, setToggleDetailJob] = useState(false)
  const [toggleEditJob, setToggleEditJob] = useState(false)
  const [viewJob, setViewJob] = useState()
  const [editJob, setEditJob] = useState()

  //CREATE JOB API
  const createNewJob = async (jobdata) => {
    try {
      await axios
        .post(`${config.REACT_APP_API_ENDPOINT}/job/createjob`, {
          jobdata: jobdata,
        })
        .then((response) => {
          if (response) {
            alert('Position data saved.')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  //DELETE JOB API
  const deleteJob = async (jobid) => {
    const deleteconfirm = window.confirm('Delete position?')
    if (deleteconfirm) {
      try {
        await axios
          .delete(`${config.REACT_APP_API_ENDPOINT}/job/deletejob/${jobid}`)
          .then((response) => {
            if (response) {
              alert('Position deleted')
              setIsChange(!isChange)
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  //UPDATE JOB API
  const updateJob = async (jobdata) => {
    try {
      await axios
        .put(`${config.REACT_APP_API_ENDPOINT}/job/updatejob/${jobdata.jobid}`, {
          jobdata: jobdata,
        })
        .then((response) => {
          if (response) {
            alert('Position updated')
            setIsChange(!isChange)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    //READ JOB API
    const fetchAllJob = async () => {
      try {
        const response = await axios.get(`${config.REACT_APP_API_ENDPOINT}/job/getalljob`)
        setJoblist(response.data)
      } catch (error) {
        console.log('Error: '.error)
      }
    }
    fetchAllJob()
  }, [isChange])
  return (
    <>
      <Suspense fallback={<CSpinner />}>
        <JobTable
          joblist={joblist}
          setToggleCreateJob={setToggleCreateJob}
          setToggleDetailJob={setToggleDetailJob}
          deleteJob={deleteJob}
          viewJob={setViewJob}
          setToggleEditJob={setToggleEditJob}
          editJob={setEditJob}
        />
        <JobCreate
          visible={toggleCreateJob}
          setVisible={setToggleCreateJob}
          createJob={createNewJob}
        />
        <JobDetail
          visible={toggleDetailJob}
          setVisible={setToggleDetailJob}
          jobdata={joblist}
          viewJob={viewJob}
          deleteJob={deleteJob}
          setToggleEditJob={setToggleEditJob}
          editJob={setEditJob}
        />
        <JobEdit
          visible={toggleEditJob}
          setVisible={setToggleEditJob}
          jobdata={joblist}
          jobid={editJob}
          updatedjob={updateJob}
        />
      </Suspense>
    </>
  )
}

export default Job
