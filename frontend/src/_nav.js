import React from 'react'
import { userType } from './userType'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilBuilding,
  cilArrowCircleTop,
  cilObjectUngroup,
  cilFork,
  cilClipboard,
  cilChartLine,
  cilDescription,
} from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

//import { userType } from './userType'

const _nav = [
  {
    component: CNavItem,
    role: 'both',
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    role: 'both',
    name: 'Database',
  },
  {
    component: CNavGroup,
    role: 'admin',
    name: 'Organization',
    to: '',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'Test',
    },
    items: [
      {
        component: CNavItem,
        name: 'Department',
        to: '/mine/department',
      },
      {
        component: CNavItem,
        disabled: false,
        name: 'Employee',
        to: '/mine/employee',
      },
      {
        component: CNavItem,
        name: 'Job Profile',
        to: '/mine/job',
      },
    ],
  },
  {
    component: CNavItem,
    role: 'both',
    name: 'Competency',
    to: '/mine/competency',
    icon: <CIcon icon={cilArrowCircleTop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    role: 'both',
    name: 'Training',
    to: '/mine/training',
    icon: <CIcon icon={cilObjectUngroup} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    role: 'both',
    name: 'Action',
  },
  {
    component: CNavItem,
    role: 'admin',
    name: 'Mapping',
    to: '/mine/mapping',
    icon: <CIcon icon={cilFork} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    role: 'both',
    name: 'Assessment',
    to: '/mine/cga',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    role: 'both',
    name: 'Stat',
  },
  {
    component: CNavItem,
    role: 'both',
    name: 'IDP',
    to: '/mine/idp',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    role: 'admin',
    name: 'Report & Analysis',
    to: '/mine/report',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]

export default _nav
