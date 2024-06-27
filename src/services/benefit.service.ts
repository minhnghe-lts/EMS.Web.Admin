import axios from '@axios'

const getPagedBenefit = async (param: any) => {
    try {
        const res = await axios.get('Benefit/GetPageBenefit', param)

        return res.data
    }
    catch (err) {
        console.error(err)

        return [

        ]
    }
}

const getBenefitDetails = async (id: number) => {
    try {
        const response = await axios.get(`Benefit/GetBenefitById/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching account info details:", error);
        throw error;
    }
}

const getAllBenefit = async () => {
    try {
        const res = await axios.get('Benefit/GetAllBenefit');
        return res.data;
    } catch (error) {
        console.error("Error fetching all benefit:", error);
        throw error;
    }
}

const BenefitService = {
    getAllBenefit,
    getPagedBenefit,
    getBenefitDetails,
}

export default BenefitService
