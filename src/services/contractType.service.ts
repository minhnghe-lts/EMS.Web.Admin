import axios from '@axios'

const getPagedContractType = async (param: any) => {
  try {
    const res = await axios.get('ContractType/GetPageContractType', param)
    return res.data
  }
  catch (err) {
    console.error(err)

    return [
      {
        name: 'Cộng tác viên Part time',
        id: 1,
      },
      {
        name: 'Cộng tác viên Part time',
        id: 2,
      },
      {
        name: 'Thử việc Part time',
        id: 3,
      },
    ]
  }
}

const ContractTypeService = {
  getPagedContractType,
}

export default ContractTypeService
