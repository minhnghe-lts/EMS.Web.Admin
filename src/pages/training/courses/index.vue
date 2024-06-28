<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import CourseService from '@/services/course.service'
import CourseInfo from './course-info-dialog.vue'

const headers = ref([
  {
    title: "Mã khóa học",
    key: "codeName",
    sortable: false,
  },
  {
    title: "Tên khóa",
    key: "name",
    sortable: false,
  },
  {
    title: "Lộ trình",
    key: "subjects",
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

  const res = await CourseService.getPageCourse(param)

  tableDataSource.value = res.data
  pagination.value.pageNo = res.pageNo
  pagination.value.pageSize = res.pageSize
}

onBeforeMount(() => {
  loadTableData()
})

const dialogRef = ref(null);
const showSnackbar = ref(false);

const onCreateButtonClicked = () => {
  try {
    dialogRef.value.show('create',{});
  } catch (error) {
    console.error('Failed to load subject details:', error);
  }
}

const confirmCreate = async (data: any) => {
  try {
    await CourseService.createCourse(data);
    await loadTableData();
    showSnackbar.value = true;
  } catch (error) {
    console.error('Failed to load subject details:', error);
  }
}

const onViewIconClicked = async (item: any) => {
  try {
    const data = await CourseService.getInfoCourse(item.value)
    dialogRef.value.show('view', data);
  } catch (error) {
    console.error('Failed to load subject details:', error)
  }
}

const onEditIconClicked = async (item: any) => {
  try {
    const data = await CourseService.getInfoCourse(item.id)
    dialogRef.value.show('edit', data);
  } catch (error) {
    console.error('Failed to load subject details:', error)
  }
}

const saveChanges = async (data: any) => {
  try {
    await CourseService.editCourse(data);
    await loadTableData();
    showSnackbar.value = true;
  } catch (error) {
    console.error('Failed to load subject details:', error)
  }
}

const onDeleteIconClicked = async (item: any) => {
  try {
    dialogRef.value.show('delete', item.value);
  } catch (error) {
    console.error('Failed to load subject details:', error)
  }
}

const confirmDelete = async (id: number) => {
  try {
    await CourseService.deleteCourse(id)
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
      <VCardTitle>DANH SÁCH KHÓA HỌC</VCardTitle>
      <VRow class="search-add-area">
        <VCol cols="3">
          <VTextField placeholder="Tìm kiếm theo mã khóa/tên khóa học"></VTextField>
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
        <template #item.subjects="{ item }">
          <span>
            {{ item.raw.subjects.map((subject) => subject.name).join(', ') || "Không có môn nào" }}
          </span>
        </template>
        <template #item.action="{ item }">
          <div>
            <VIcon
              icon="mdi-eye-outline"
              class="icon-margin"
              @click="onViewIconClicked(item)"
            >
            </VIcon> 
            <VIcon
              icon="mdi-pencil-outline"
              class="icon-margin"
              @click="onEditIconClicked(item.raw)"
            >
            </VIcon> 
            <VIcon
              icon="mdi-trash-can-outline"
              class="icon-margin"
              style="color: red;"
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

      <CourseInfo
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
.icon-margin {
  margin-inline-end: 1em;
}
.search-add-area {
  display: flex;
  justify-content: flex-end;
}
</style>
