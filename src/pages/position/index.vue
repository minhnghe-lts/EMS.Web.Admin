<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import PositionService from "@/services/position.service";
import PositionDialog from "./PositionDialog.vue";

const headers = ref([
  {
    title: "Mã vị trí",
    key: "id",
    sortable: false,
  },
  {
    title: "Tên vị trí",
    key: "positionName",
    sortable: false,
  },
  {
    title: "Mô tả vị trí",
    key: "positionDescription",
    sortable: false,
  },
  {
    title: "Đãi ngộ",
    key: "benefits",
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
  const res = await PositionService.getPagedPosition(param);

  tableDataSource.value = res.data;
  pagination.value.pageNo = res.pageNo;
  pagination.value.pageSize = res.pageSize;
};

onBeforeMount(async () => {
  await loadTableData();
});

const dialogRef = ref();

// View item;
const onViewIconClicked = async (item: any) => {
  try {
    const data = await PositionService.getPositionDetails(item.id);
    dialogRef.value.show("view", data);
  } catch (error) {
    console.error("Error fetching account details:", error);
  }
};

// Edit item
const onEditIconClicked = async (item: any) => {
  try {
    const data = await PositionService.getPositionDetails(item.id);
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
      await PositionService.editPosition(data);
    } else {
      await PositionService.createPosition(data);
    }
    await loadTableData();
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};

const confirmDelete = async (id: number) => {
  try {
    await PositionService.deletePosition(id);
    await loadTableData();
  } catch (error) {
    console.error("Error deleting account:", error);
  }
};

const formAddPosition = ref({
  positionName: "",
  positionDescription: "",
  benefits: [],
});

const onAddButtonClicked = () => {
  try {
    dialogRef.value.show("create", formAddPosition.value);
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
              <VIcon icon="mdi-map-marker"></VIcon> 
              <span class="ml-1">Vị trí</span>
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
        <template #item.benefits="{ item }">
          <span>{{
            item.raw.benefits.map((b) => b.benefitName).join(", ") ||
            "No Benefits"
          }}</span>
        </template>
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

    <PositionDialog
      ref="dialogRef"
      @save-changes="saveChanges"
      @confirm-delete="confirmDelete"
    />
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
    color: rgb(59, 59, 59); /* Màu nền khi hover */
  }
}
</style>