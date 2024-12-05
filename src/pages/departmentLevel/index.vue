<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import DepartmentLevelService from "@/services/departmentLevel.service";
import DepartmentLevelDialog from "./department-level-dialog.vue";

const headers = ref([
  {
    title: "Mã cấp tổ chức",
    key: "id",
    sortable: false,
  },
  {
    title: "Cấp tổ chức",
    key: "level",
    sortable: false,
  },
  {
    title: "Tên cấp",
    key: "name",
    sortable: false,
  },
  {
    title: "action",
    key: "action",
    sortable: false,
  },
]);
const tableDataSource = ref([]);
const search = ref("");
const pagination = ref({
  pageNo: 1,
  pageSize: 10,
  totalPages: 4,
  totalItems: 31,
  itemPerPageOption: [10, 20, 50, "All"],
});

const loadTableData = async () => {
  const param = {
    pageNo: pagination.value.pageNo,
    pageSize: pagination.value.pageSize,
  };
  const res = await DepartmentLevelService.getPagedDepartmentLevel(param);

  tableDataSource.value = res.data;
  pagination.value.pageNo = res.pageNo;
  pagination.value.pageSize = res.pageSize;
};

onBeforeMount(async () => {
  await loadTableData();
});

const dialogRef = ref();
const showSnackbar = ref(false);
const text = ref("");

// View item;
const onViewIconClicked = async (item: any) => {
  try {
    const data = await DepartmentLevelService.getDepartmentLevelDetails(
      item.id
    );
    dialogRef.value.show("view", data);
  } catch (error) {
    console.error("Error fetching account details:", error);
  }
};

// Edit item
const onEditIconClicked = async (item: any) => {
  try {
    const data = await DepartmentLevelService.getDepartmentLevelDetails(
      item.id
    );
    // editFormContent.value = { ...data };
    dialogRef.value.show("edit", data);
  } catch (error) {
    console.error("Error fetching account details:", error);
  }
};

const saveChanges = async (data: any) => {
  try {
    debugger;
    if (data.id) {
      await DepartmentLevelService.editDepartmentLevel(data);
      text.value = "Cập nhật vị trí thành công";
      showSnackbar.value = true;
    } else {
      await DepartmentLevelService.createDepartmentLevel(data);
      text.value = "Thêm vị trí thành công";
      showSnackbar.value = true;
    }
    await loadTableData();
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};

const confirmDelete = async (id: number) => {
  try {
    await DepartmentLevelService.deleteDepartmentLevel(id);
    text.value = "Xóa vị trí thành công";
    showSnackbar.value = true;
    await loadTableData();
  } catch (error) {
    console.error("Error deleting account:", error);
  }
};

const formAddDepartmentLevel = ref({
  DepartmentLevelName: "",
  DepartmentLevel: "",
});

const onAddButtonClicked = () => {
  try {
    dialogRef.value.show("create", formAddDepartmentLevel.value);
  } catch (error) {
    console.error("Error showing add dialog:", error);
  }
};

const onDeleteIconClicked = async (id: number) => {
  try {
    dialogRef.value.show("delete", id);
  } catch (error) {
    console.error("Error fetching account details:", error);
  }
};

const onPageNoChanged = async () => {
  await loadTableData();
};
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="mt-2 mb-3">
        <VRow class="d-flex align-center justify-space-between">
          <VCol cols="8">
            <div class="d-flex align-center">
              <VIcon icon="mdi-floor-plan"></VIcon>
              <span class="ml-2">Cấp tổ chức</span>
            </div>
          </VCol>
          <VCol cols="4">
            <div class="d-flex">
              <VTextField
                v-model="search"
                density="compact"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="solo-filled"
                flat
                hide-details
                single-line
              ></VTextField>
              <VBtn class="ml-3" variant="elevated" @click="onAddButtonClicked">
                <VIcon icon="mdi-plus"></VIcon>
              </VBtn>
            </div>
          </VCol>
        </VRow>
        <VSpacer></VSpacer>
      </VCardTitle>
    </VCard>

    <VDataTable
      :headers="headers"
      :items="tableDataSource"
      :item-per-page-option="pagination.itemPerPageOption"
      :search="search"
      hover
      class="background-datatable"
    >
      <template #item.action="{ item }">
        <div>
          <VIcon
            icon="mdi-eye-outline"
            class="icon-margin"
            style="color: DeepSkyBlue"
            @click="onViewIconClicked(item.raw)"
          />
          <VIcon
            icon="mdi-pencil-outline"
            class="icon-margin"
            style="color: DarkOrange"
            @click="onEditIconClicked(item.raw)"
          />
          <VIcon
            icon="mdi-trash-can-outline"
            class="icon-margin"
            style="color: red"
            @click="onDeleteIconClicked(item.raw)"
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

    <DepartmentLevelDialog
      ref="dialogRef"
      @save-changes="saveChanges"
      @confirm-delete="confirmDelete"
    />

    <VSnackbar
      v-model="showSnackbar"
      timeout="2000"
      color="success"
      rounded="sm"
      transition="scale-transition"
    >
      {{ text }}
    </VSnackbar>
  </div>
</template>

<style lang="scss">
.container {
  border: solid 1px #3c3c3c;
  border-radius: 1em;
}

.icon-margin {
  margin-inline-end: 1em;
}

.background-datatable {
  margin-top: 0.8em;
  border-radius: 5px;
  div.v-table__wrapper {
    background-color: lavender;
    // color: rgb(59, 59, 59) ;
    .v-data-table__th {
      background-color: #7367f0;
      color: white !important;
    }
  }
  tbody tr:hover {
    background-color: #bedef9;
    color: rgb(59, 59, 59);
  }
}
</style>