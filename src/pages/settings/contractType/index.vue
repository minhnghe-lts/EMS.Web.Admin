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

const onViewIconClicked = item => {
  alert('Viewing')
}

const onEditIconClicked = item => {
  alert('Editting')
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
      <VCardTitle>Loại Hợp đồng</VCardTitle>
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
