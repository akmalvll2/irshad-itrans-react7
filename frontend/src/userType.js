import { jwtDecode } from 'jwt-decode'
export const userType = jwtDecode(JSON.parse(sessionStorage.getItem('token')))
