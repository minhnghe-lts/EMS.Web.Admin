import axios from '@axios'

const login = async (loginData: any) => {
  return await axios.post('Auth/Login', loginData)
}

const AuthService = {
  login,
}

export default AuthService
