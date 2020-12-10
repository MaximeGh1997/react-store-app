import axios from 'axios'
import jwtDecode from 'jwt-decode'

function logout () {
    localStorage.removeItem("authToken")
    delete axios.defaults.headers['Authorization']
}

function authenticate (credentials) {
    return axios.post("http://127.0.0.1:8000/api/login_check", credentials)
                .then(response => response.data.token)
                .then(token => {
                    localStorage.setItem("authToken", token)
                    axios.defaults.headers['Authorization']="Bearer " + token
                    console.log(jwtDecode(token))
                    return true
                })
}

function isAuthenticated () {
    const token = localStorage.getItem("authToken")
    if (token) {
        const jwtData = jwtDecode(token)
        if ((jwtData.exp * 1000) > new Date().getTime()) {
            return true
        }
        return false
    }
    return false
}

function isAdmin () {
    const token = localStorage.getItem("authToken")
    if (token) {
        const jwtData = jwtDecode(token)
        if (jwtData.roles.includes('ROLE_ADMIN')) {
            return true
        }
        return false
    }
    return false
}

export default {
    authenticate: authenticate,
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin,
    logout: logout
}