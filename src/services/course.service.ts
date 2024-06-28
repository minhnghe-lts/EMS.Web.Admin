import axios from '@axios'

const getPageCourse = async (param: any) => {
  try {
    const res = await axios.get('Course/GetPageCourse', param)
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const getInfoCourse = async (id: number) => {
  try {
    const res = await axios.get(`Course/GetInfoCourse/${id}`)
    return res.data
  } 
  catch (err) {
    console.error(err)
    throw err
  }
}

const createCourse = async (param: any) => {
  try {
    const res = await axios.post(`Course/CreateCourse`, param)
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const editCourse = async (param: any) => {
  try {
    const res = await axios.put(`Course/EditCourse/` + param.id, param)
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const deleteCourse = async (id: number) => {
  try {
    const res = await axios.delete(`Course/DeleteCourse/${id}`)
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const CourseService = {
  getPageCourse,
  getInfoCourse,
  createCourse,
  editCourse,
  deleteCourse
}

export default CourseService
