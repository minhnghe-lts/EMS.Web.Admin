import axios from "@axios";

const getPagedContractType = async (param: any) => {
  try {
    const res = await axios.get("ContractType/GetPageContractType", param);

    return res.data;
  } catch (err) {
    console.error(err);

    return [
      {
        name: "Cộng tác viên Part time",
        id: 1,
      },
      {
        name: "Cộng tác viên Part time",
        id: 2,
      },
      {
        name: "Thử việc Part time",
        id: 3,
      },
    ];
  }
};

const getContractType = async (contractTypeId) => {
  try {
    const res = await axios.get(
      `ContractType/GetContracTypeById/${contractTypeId}`
    );

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const editContracType = async (param: any) => {
  try {
    const res = await axios.put(
      `/ContractType/EditContractType/${param.id}`,
      param
    );

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteContracType = async (id) => {
  try {
    const res = await axios.delete(`ContractType/DeleteContractType/${id}`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const createContracType = async (param) => {
  try {
    const res = await axios.post("ContractType/CreateContractType/", param);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const ContractTypeService = {
  getPagedContractType,
  getContractType,
  editContracType,
  deleteContracType,
  createContracType,
};

export default ContractTypeService;
