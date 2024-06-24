<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import ContractTypeService from '@/services/contractType.service'

const headers = ref([
  {
    title: 'Loại hợp đồng',
    key: 'name',
    sortable: false,
  },
  {
    title: 'action',
    key: 'action',
    sortable: false,
  },
])

const tableDataSource = ref([])

const pagination = ref({
  pageNo: 1,
  pageSize: 10,
  totalPages: 4,
  totalItems: 31,
  itemPerPageOption: [10, 20, 50, 'All'],
})

const loadTableData = async () => {
  const param = {
    pageNo: pagination.value.pageNo,
    pageSize: pagination.value.pageSize,
  }

  const res = await ContractTypeService.getPagedContractType(param)

  tableDataSource.value = res.data
  pagination.value.pageNo = res.pageNo
  pagination.value.pageSize = res.pageSize
}

onBeforeMount(() => {
  loadTableData()
})

const selectedItem = ref({})
const dialogVisible = ref(false)

const onViewIconClicked = async item => {
  dialogVisible.value = true

  const contractTypeID = item.value
  const res = await ContractTypeService.getContractType(contractTypeID)

  selectedItem.value = res
  console.log(selectedItem.value.name)
}

const onEditIconClicked = item => {
  alert('Editing')
}

const onDeleteIconClicked = item => {
  alert('Deleted')
}

const onPageNoChanged = async () => {
  await loadTableData()
}
</script>

<template>
  <div>
    <VCard>
      <VRow>
        <VCol>
          <VCardTitle>Loại Hợp đồng</VCardTitle>
        </VCol>
        <VCol class="d-flex justify-end ma-3">
          <VTextField
            label="Tìm kiếm"
            class="mr-5"
          />
          <VBtn>+</VBtn>
        </VCol>
      </VRow>
      <VDataTable
        :headers="headers"
        :items="tableDataSource"
        :item-per-page-option="pagination.itemPerPageOption"
      >
        <template #item.action="{ item }">
          <div>
            <VIcon
              icon="mdi-eye-outline"
              class="icon-margin"
              @click="onViewIconClicked(item)"
            />
            <VIcon
              icon="mdi-pencil-outline"
              class="icon-margin"
              @click="onEditIconClicked(item)"
            />
            <VIcon
              icon="mdi-trash-can-outline"
              class="icon-margin"
              style="color: red;"
              @click="onDeleteIconClicked(item)"
            />
          </div>
        </template>
        <template #bottom>
          <div class="d-flex justify-end">
            <VPagination
              v-model="pagination.pageNo"
              total-visible="5"
              :length="pagination.totalPages"
              @update:modelValue="onPageNoChanged"
            >
              <template #next="slotProps">
                <VBtn
                  v-bind="slotProps"
                  variant="tonal"
                  color="default"
                  :icon="false"
                  text="Tiếp"
                />
              </template>
              <template #prev="slotProps">
                <VBtn
                  v-bind="slotProps"
                  variant="tonal"
                  color="default"
                  :icon="false"
                  text="Trước"
                />
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTable>
      <VDialog
        v-model="dialogVisible"
        width="50%"
      >
        <VCard class="pa-5">
          <VRow>
            <VCol>
              <VCardTitle>Xem thông tin chi tiết</VCardTitle>
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="2"
              class="d-flex"
            >
              <VLabel>Tên hợp đồng</VLabel>
            </VCol>
            <VCol cols="7">
              <VTextField v-model:value="selectedItem.name" />
            </VCol>
          </VRow>
          <VRow class="justify-end">
            <VBtn @click="dialogVisible = !dialogVisible">
              Đóng
            </VBtn>
          </VRow>
        </VCard>
      </VDialog>
    </VCard>
  </div>
</template>

<style>
.container {
  border: solid 1px #3c3c3c;
  border-radius: 1em;
}

.icon-margin {
  margin-inline-end: 1em;
}
</style>
