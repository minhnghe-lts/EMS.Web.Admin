<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import SubjectService from '@/services/subject.service'
import SubjectInfo from './subject-info-dialog.vue'

const headers = ref([
  {
    title: "Mã môn học",
    key: "codeName",
    sortable: false,
  },
  {
    title: "Tên môn",
    key: "name",
    sortable: false,
  },
  {
    title: "Số bài tập",
    key: "totalExercise",
    sortable: false,
  },
  {
    title: "Hành động",
    key: "action",
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

  const res = await SubjectService.getPageSubject(param)

  tableDataSource.value = res.data
  pagination.value.pageNo = res.pageNo
  pagination.value.pageSize = res.pageSize
}

onBeforeMount(() => {
  loadTableData()
})

const dialogRef = ref(null)

const onCreateButtonClicked = () => {
  try {
    dialogRef.value.show('create',{});
  } catch (error) {
    console.error('Failed to load subject details:', error);
  }
}

const confirmCreate = async (data: any) => {
  try {
    await SubjectService.createSubject(data);
    await loadTableData();
    showSnackbar.value = true;
  } catch (error) {
    console.error('Failed to load subject details:', error);
  }
}

const onViewIconClicked = async (item: any) => {
  try {
    const data = await SubjectService.getInfoSubject(item.value)
    dialogRef.value.show('view', data)
  } catch (error) {
    console.error('Failed to load subject details:', error)
  }
}

const showSnackbar = ref(false)

const onEditIconClicked = async (item: any) => {
  try {
    const data = await SubjectService.getInfoSubject(item.value)
    dialogRef.value.show('edit', data)
  } catch (error) {
    console.error('Failed to load subject details:', error)
  }
}

const saveChanges = async (data: any) => {
  try {
    await SubjectService.editSubject(data)
    await loadTableData()
    showSnackbar.value = true
  } catch (error) {
    console.error('Failed to load subject details:', error)
  }
}

const onDeleteIconClicked = async (item: any) => {
  try {
    dialogRef.value.show('delete', item.value);
  } catch (error) {
    console.error("Error fetching account details:", error);
  }
}

const confirmDelete = async (id: number) => {
  try {
    await SubjectService.deleteSubject(id)
    await loadTableData()
    showSnackbar.value = true
  } catch (error) {
    console.error('Failed to load subject details:', error)
  }
}

const onPageNoChanged = async () => {
  await loadTableData()
}
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="card-title">DANH SÁCH MÔN HỌC</VCardTitle>
      <VRow class="search-add-area">
        <VCol cols="3">
          <VTextField placeholder="Tìm kiếm theo môn học/tên môn"></VTextField>
        </VCol>
        <VCol cols="1">
          <VBtn>
            <VIcon icon="mdi-magnify"></VIcon>
          </VBtn>
        </VCol>
        <VCol cols="1">
          <VBtn @click="onCreateButtonClicked">
            <VIcon icon="mdi-plus"></VIcon>
          </VBtn>
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
              class="icon-action"
              @click="onViewIconClicked(item)"
            >
            </VIcon>
            <VIcon
              icon="mdi-pencil-outline"
              class="icon-action"
              @click="onEditIconClicked(item)"
            >
            </VIcon> 
            <VIcon
              icon="mdi-trash-can-outline"
              class="icon-action"
              @click="onDeleteIconClicked(item)"
            >
            </VIcon> 
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

      <SubjectInfo
        ref="dialogRef"
        @save-changes="saveChanges"
        @confirm-delete="confirmDelete"
        @confirm-create="confirmCreate"
      />
      <VSnackbar 
        v-model="showSnackbar"
        timeout="2000"
        color="success"
      >
        Cập nhật thành công!
      </VSnackbar>
    </VCard>
  </div>
</template>

<style lang="scss">
.header {
  font-size: 12px;
}
.icon-action {
  margin-right: 5px;
}
.icon-action:hover {
  background-color: #7367f0;
  color: white;
}
.search-add-area {
  display: flex;
  justify-content: flex-end;
}
</style>
