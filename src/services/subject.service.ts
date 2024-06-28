import axios from '@axios'

const getPageSubject = async (param: any) => {
  try {
    const res = await axios.get('Subject/GetPageSubject', param)
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const getAllSubject = async () => {
  try {
    const res = await axios.get('Subject/GetAllSubject')
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const getInfoSubject = async (id: number) => {
  try {
    const res = await axios.get(`Subject/GetInfoSubject/${id}`)
    return res.data
  } 
  catch (err) {
    console.error(err)
    throw err
  }
}

const createSubject = async (param: any) => {
  try {
    const res = await axios.post(`Subject/CreateSubject`, param)
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const editSubject = async (param: any) => {
  try {
    const res = await axios.put(`Subject/EditSubject/` + param.id, param)
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const deleteSubject = async (id: number) => {
  try {
    const res = await axios.delete(`Subject/DeleteSubject/${id}`)
    return res.data
  }
  catch (err) {
    console.error(err)
  }
}

const SubjectService = {
  getPageSubject,
  getInfoSubject,
  createSubject,
  editSubject,
  deleteSubject,
  getAllSubject
}

export default SubjectService
