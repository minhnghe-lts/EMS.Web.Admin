import axios from '@axios'

const getPagedPosition = async (param: any) => {
    try {
        const res = await axios.get('Position/GetPagePosition', param)

        return res.data
    }
    catch (err) {
        console.error(err)

        return [

        ]
    }
}

const getPositionDetails = async (id: number) => {
    try {
        const response = await axios.get(`Position/GetPositionById/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching account info details:", error);
        throw error;
    }
}

const createPosition = async (param: any) => {
    try {
        debugger
        const response = await axios.post(`/Position/CreatePosition`, param);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const editPosition = async (param: any) => {
    try {
        debugger
        const response = await axios.put(`/Position/EditPosition/` + param.id, param);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const deletePosition = async (id: number) => {
    try {
        const response = await axios.delete(`/Position/DeletePosition/${id}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const PositionService = {
    getPagedPosition,
    getPositionDetails,
    createPosition,
    editPosition,
    deletePosition
}

export default PositionService
