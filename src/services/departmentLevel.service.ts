import axios from '@axios'

const getPagedDepartmentLevel = async (param: any) => {
    try {
        const res = await axios.get('DepartmentLevel/GetPageDepartmentLevel', param)

        return res.data
    }
    catch (err) {
        console.error(err)

        return [

        ]
    }
}

const getDepartmentLevelDetails = async (id: number) => {
    try {
        const response = await axios.get(`DepartmentLevel/GetDepartmentLevelById/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching account info details:", error);
        throw error;
    }
}

const createDepartmentLevel = async (param: any) => {
    try {
        debugger
        const response = await axios.post(`/DepartmentLevel/CreateDepartmentLevel`, param);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const editDepartmentLevel = async (param: any) => {
    try {
        debugger
        const response = await axios.put(`/DepartmentLevel/EditDepartmentLevel/` + param.id, param);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const deleteDepartmentLevel = async (id: number) => {
    try {
        const response = await axios.delete(`/DepartmentLevel/DeleteDepartmentLevel/${id}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const DepartmentLevelService = {
    getPagedDepartmentLevel,
    getDepartmentLevelDetails,
    createDepartmentLevel,
    editDepartmentLevel,
    deleteDepartmentLevel
}

export default DepartmentLevelService
