import axios from "@axios";

const getPagedAllowance = async (param: any) => {
  try {
    const res = await axios.get("Allowance/GetPageAllowance", param);

    return res.data;
  } catch (err) {
    console.error(err);

    return [];
  }
};

const getAllowanceById = async (allowanceId) => {
  try {
    const res = await axios.get(
      `Allowance/GetPageAllowanceById/${allowanceId}`
    );

    return res.data;
  } catch (err) {
    console.error(err);

    return [];
  }
};

const editAllowance = async (param: any) => {
  try {
    const res = await axios.put(`Allowance/EditAllowance/${param.id}`, param);

    return res.data;
  } catch (err) {
    console.error(err);

    return [];
  }
};

const deleteAllowance = async (allowanceId) => {
  try {
    const res = await axios.delete(`Allowance/DeleteAllowance/${allowanceId}`);

    return res.data;
  } catch (err) {
    console.error(err);

    return [];
  }
};

const createAllowance = async (param: any) => {
  try {
    const res = await axios.post("Allowance/CreateAllowance", param);

    return res.data;
  } catch (err) {
    console.error(err);

    return [];
  }
};

const AllowanceService = {
  getPagedAllowance,
  getAllowanceById,
  editAllowance,
  deleteAllowance,
  createAllowance,
};

export default AllowanceService;
