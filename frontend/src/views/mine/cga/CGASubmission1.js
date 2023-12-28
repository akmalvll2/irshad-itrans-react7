import React, { useState, useEffect } from 'react'
import axios from 'axios'
import propTypes from 'prop-types'
import img2 from '../../../assets/images/4.png'

import packageJson from '../../../../package.json'
import {
  CCard,
  CCardBody,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CButton,
  CCallout,
  CCardHeader,
  CCardFooter,
  CTableBody,
  CTableDataCell,
  CAlert,
  CBadge,
} from '@coreui/react'
const { config } = packageJson

const CGASubmission1 = ({ userid, employeedata, cgadata, open, setOpen }) => {
  const userdata = employeedata?.find((itm) => itm.staff_id === userid)

  const cga1 = cgadata?.filter(
    (itm) => itm.staff_id === userid && itm.staff_competency_session === 1,
  )
  const cga2 = cgadata?.filter(
    (itm) => itm.staff_id === userid && itm.staff_competency_session === 2,
  )
  const cga3 = cgadata?.filter(
    (itm) => itm.staff_id === userid && itm.staff_competency_session === 3,
  )
  const cga4 = cgadata?.filter(
    (itm) => itm.staff_id === userid && itm.staff_competency_session === 4,
  )
  const cga5 = cgadata?.filter(
    (itm) => itm.staff_id === userid && itm.staff_competency_session === 5,
  )
  const cga6 = cgadata?.filter(
    (itm) => itm.staff_id === userid && itm.staff_competency_session === 6,
  )
  const cga7 = cgadata?.filter(
    (itm) => itm.staff_id === userid && itm.staff_competency_session === 7,
  )
  const cga8 = cgadata?.filter(
    (itm) => itm.staff_id === userid && itm.staff_competency_session === 8,
  )
  return (
    <>
      <CModal size="xl" visible={open}>
        <CModalHeader>
          <CModalTitle style={{ width: '100%', textAlign: 'center', textTransform: 'uppercase' }}>
            SUBMISSION STATUS
          </CModalTitle>
        </CModalHeader>
        <CModalBody style={{ fontFamily: 'sans serif' }}>
          <CCallout color="info">
            Name : {employeedata?.find((itm) => itm.staff_id === userid)?.staff_name} <br />{' '}
            Position: {employeedata?.find((itm) => itm.staff_id === userid)?.jobTitle} <br />{' '}
            Department: {employeedata?.find((itm) => itm.staff_id === userid)?.departmentname}{' '}
            <br />
          </CCallout>
          <CCard className="mb-2">
            <CCardHeader
              style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center',
              }}
            >
              <center>Assigned Assessor</center>
            </CCardHeader>
            <CTable responsive small>
              <CTableHead color="secondary">
                <CTableRow>
                  <CTableHeaderCell>Assessor Name</CTableHeaderCell>
                  <CTableHeaderCell>Assessor&apos;s Role</CTableHeaderCell>
                  <CTableHeaderCell>Assessment</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {employeedata
                  ?.filter(
                    (itm) =>
                      itm.staff_id === userdata?.reporting_to ||
                      itm.staff_id === userdata?.reviewer_one ||
                      itm.staff_id === userdata?.reviewer_two ||
                      itm.staff_id === userdata?.reviewer_three ||
                      itm.staff_id === userdata?.reviewer_four ||
                      itm.staff_id === userdata?.reviewer_five ||
                      itm.staff_id === userdata?.reviewer_six,
                  )
                  ?.map((val, key) => {
                    return (
                      <CTableRow key={key}>
                        <CTableDataCell>{val.staff_name}</CTableDataCell>
                        <CTableDataCell>
                          {val.staff_id === userdata?.reporting_to
                            ? 'Superior'
                            : val.staff_id === userdata?.reviewer_one
                            ? 'Reviewer One (Subordinate)'
                            : val.staff_id === userdata?.reviewer_two
                            ? 'Reviewer Two (Subordinate)'
                            : val.staff_id === userdata?.reviewer_three
                            ? 'Reviewer Three (Subordinate)'
                            : val.staff_id === userdata?.reviewer_four
                            ? 'Reviewer Four (Peer)'
                            : val.staff_id === userdata?.reviewer_five
                            ? 'Reviewer Five (Peer)'
                            : val.staff_id === userdata?.reviewer_six
                            ? 'Reviewer Six (Peer)'
                            : ''}
                        </CTableDataCell>
                        <CTableDataCell>
                          {val.staff_id === userdata?.reporting_to
                            ? 'Leadership / Functional'
                            : val.staff_id === userdata?.reviewer_one
                            ? 'Leadership'
                            : val.staff_id === userdata?.reviewer_two
                            ? 'Leadership'
                            : val.staff_id === userdata?.reviewer_three
                            ? 'Leadership'
                            : val.staff_id === userdata?.reviewer_four
                            ? 'Leadership'
                            : val.staff_id === userdata?.reviewer_five
                            ? 'Leadership'
                            : val.staff_id === userdata?.reviewer_six
                            ? 'Leadership'
                            : ''}
                        </CTableDataCell>
                        <CTableDataCell>
                          {val.staff_id === userdata?.reporting_to &&
                          cga2.filter((i) => i.staff_competency_type === 2).length > 0 ? (
                            <CBadge color="info">Complete</CBadge>
                          ) : val.staff_id === userdata?.reviewer_one &&
                            cga3.filter((i) => i.staff_competency_type === 2).length > 0 ? (
                            <CBadge color="info">Complete</CBadge>
                          ) : val.staff_id === userdata?.reviewer_two &&
                            cga4.filter((i) => i.staff_competency_type === 2).length > 0 ? (
                            <CBadge color="info">Complete</CBadge>
                          ) : val.staff_id === userdata?.reviewer_three &&
                            cga5.filter((i) => i.staff_competency_type === 2).length > 0 ? (
                            <CBadge color="info">Complete</CBadge>
                          ) : val.staff_id === userdata?.reviewer_four &&
                            cga6.filter((i) => i.staff_competency_type === 2).length > 0 ? (
                            <CBadge color="info">Complete</CBadge>
                          ) : val.staff_id === userdata?.reviewer_five &&
                            cga7.filter((i) => i.staff_competency_type === 2).length > 0 ? (
                            <CBadge color="info">Complete</CBadge>
                          ) : val.staff_id === userdata?.reviewer_six &&
                            cga8.filter((i) => i.staff_competency_type === 2).length > 0 ? (
                            <CBadge color="info">Complete</CBadge>
                          ) : (
                            <CBadge color="danger">Incomplete</CBadge>
                          )}
                          {val.staff_id === userdata?.reporting_to ? (
                            cga2.filter((i) => i.staff_competency_type === 3).length > 0 ? (
                              <>
                                {' '}
                                / <CBadge color="info">Complete</CBadge>
                              </>
                            ) : (
                              <>
                                {' '}
                                / <CBadge color="danger">Incomplete</CBadge>
                              </>
                            )
                          ) : (
                            ''
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            </CTable>
          </CCard>
          <CCard className="mb-2">
            <CCardHeader
              style={{
                backgroundImage: `url(${img2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: 'center',
              }}
            >
              <center>Assigned Staff To Evaluate</center>
            </CCardHeader>
            {employeedata?.filter(
              (itm) =>
                itm.reporting_to === userid ||
                itm.reviewer_one === userid ||
                itm.reviewer_two === userid ||
                itm.reviewer_three === userid ||
                itm.reviewer_four === userid ||
                itm.reviewer_five === userid ||
                itm.reviewer_six === userid,
            ).length > 0 ? (
              <CTable responsive small>
                <CTableHead color="secondary">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Role As</CTableHeaderCell>
                    <CTableHeaderCell>Assessment</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {employeedata
                    ?.filter(
                      (itm) =>
                        itm.reporting_to === userid ||
                        itm.reviewer_one === userid ||
                        itm.reviewer_two === userid ||
                        itm.reviewer_three === userid ||
                        itm.reviewer_four === userid ||
                        itm.reviewer_five === userid ||
                        itm.reviewer_six === userid,
                    )
                    .map((val, key) => {
                      return (
                        <CTableRow key={key}>
                          <CTableDataCell>{val.staff_name}</CTableDataCell>
                          <CTableDataCell>
                            {val.reporting_to && val.reporting_to === userid
                              ? 'Superior'
                              : val.reviewer_one && val.reviewer_one === userid
                              ? 'Reviewer One (Subordinate)'
                              : val.reviewer_two && val.reviewer_two === userid
                              ? 'Reviewer Two (Subordinate)'
                              : val.reviewer_three && val.reviewer_three === userid
                              ? 'Reviewer Three (Subordinate)'
                              : val.reviewer_four && val.reviewer_four === userid
                              ? 'Reviewer Four (Peer)'
                              : val.reviewer_five && val.reviewer_five === userid
                              ? 'Reviewer Five (Peer)'
                              : val.reviewer_six && val.reviewer_six === userid
                              ? 'Reviewer Six (Peer)'
                              : 'No Data Available'}
                          </CTableDataCell>
                          <CTableDataCell>
                            {val.reporting_to && val.reporting_to === userid
                              ? 'Leadership / Functional'
                              : val.reviewer_one && val.reviewer_one === userid
                              ? 'Leadership'
                              : val.reviewer_two && val.reviewer_two === userid
                              ? 'Leadership'
                              : val.reviewer_three && val.reviewer_three === userid
                              ? 'Leadership'
                              : val.reviewer_four && val.reviewer_four === userid
                              ? 'Leadership'
                              : val.reviewer_five && val.reviewer_five === userid
                              ? 'Leadership'
                              : val.reviewer_six && val.reviewer_six === userid
                              ? 'Leadership'
                              : 'No Data Available'}
                          </CTableDataCell>
                          <CTableDataCell>
                            {val.reporting_to &&
                            val.reporting_to === userid &&
                            cgadata?.filter(
                              (itm) =>
                                itm.staff_id === val.staff_id &&
                                itm.staff_competency_session === 2 &&
                                itm.staff_competency_type === 2,
                            ).length > 0 ? (
                              <CBadge color="info">Complete</CBadge>
                            ) : val.reviewer_one &&
                              val.reviewer_one === userid &&
                              cgadata?.filter(
                                (itm) =>
                                  itm.staff_id === val.staff_id &&
                                  itm.staff_competency_session === 3 &&
                                  itm.staff_competency_type === 2,
                              ).length > 0 ? (
                              <CBadge color="info">Complete</CBadge>
                            ) : val.reviewer_two &&
                              val.reviewer_two === userid &&
                              cgadata?.filter(
                                (itm) =>
                                  itm.staff_id === val.staff_id &&
                                  itm.staff_competency_session === 4 &&
                                  itm.staff_competency_type === 2,
                              ).length > 0 ? (
                              <CBadge color="info">Complete</CBadge>
                            ) : val.reviewer_three &&
                              val.reviewer_three === userid &&
                              cgadata?.filter(
                                (itm) =>
                                  itm.staff_id === val.staff_id &&
                                  itm.staff_competency_session === 5 &&
                                  itm.staff_competency_type === 2,
                              ).length > 0 ? (
                              <CBadge color="info">Complete</CBadge>
                            ) : val.reviewer_four &&
                              val.reviewer_four === userid &&
                              cgadata?.filter(
                                (itm) =>
                                  itm.staff_id === val.staff_id &&
                                  itm.staff_competency_session === 6 &&
                                  itm.staff_competency_type === 2,
                              ).length > 0 ? (
                              <CBadge color="info">Complete</CBadge>
                            ) : val.reviewer_five &&
                              val.reviewer_five === userid &&
                              cgadata?.filter(
                                (itm) =>
                                  itm.staff_id === val.staff_id &&
                                  itm.staff_competency_session === 7 &&
                                  itm.staff_competency_type === 2,
                              ).length > 0 ? (
                              <CBadge color="info">Complete</CBadge>
                            ) : val.reviewer_six &&
                              val.reviewer_six === userid &&
                              cgadata?.filter(
                                (itm) =>
                                  itm.staff_id === val.staff_id &&
                                  itm.staff_competency_session === 8 &&
                                  itm.staff_competency_type === 2,
                              ).length > 0 ? (
                              <CBadge color="info">Complete</CBadge>
                            ) : (
                              <CBadge color="danger">Incomplete</CBadge>
                            )}
                            {val.reporting_to && val.reporting_to === userid ? (
                              cgadata?.filter(
                                (itm) =>
                                  itm.staff_id === val.staff_id &&
                                  itm.staff_competency_session === 2 &&
                                  itm.staff_competency_type === 3,
                              ).length > 0 ? (
                                <>
                                  {' '}
                                  / <CBadge color="info">Complete</CBadge>
                                </>
                              ) : (
                                <>
                                  {' '}
                                  / <CBadge color="danger">Incomplete</CBadge>
                                </>
                              )
                            ) : (
                              ''
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })}
                </CTableBody>
              </CTable>
            ) : (
              <CAlert color="danger">No Data Available</CAlert>
            )}
          </CCard>
        </CModalBody>
        <CModalFooter>
          <CButton size="sm" variant="outline" color="secondary" onClick={() => setOpen(!open)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

CGASubmission1.propTypes = {
  userid: propTypes.string,
  employeedata: propTypes.array,
  cgadata: propTypes.array,
  open: propTypes.bool,
  setOpen: propTypes.bool,
}

export default CGASubmission1
