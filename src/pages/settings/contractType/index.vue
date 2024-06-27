<script setup lang="ts">
import ContractTypeService from "@/services/contractType.service";
import { VDataTable } from "vuetify/labs/VDataTable";
import ContractTypeDialog from "./ContractTypeDialog.vue";

const headers = ref([
  {
    title: "Loại hợp đồng",
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

  const res = await ContractTypeService.getPagedContractType(param);

  tableDataSource.value = res.data;
  pagination.value.pageNo = res.pageNo;
  pagination.value.pageSize = res.pageSize;
};

onBeforeMount(() => {
  loadTableData();
});

const dialogRef = ref(null);

const onViewIconClicked = async (item: any) => {
  try {
    const data = await ContractTypeService.getContractType(item.value);

    dialogRef.value.show("view", data);
  } catch (error) {
    console.error("Error fetching account details:", error);
  }
};

const onEditIconClicked = async (item) => {
  try {
    const data = await ContractTypeService.getContractType(item.value);

    dialogRef.value.show("edit", data);
  } catch (error) {
    console.error("Error fetching account details:", error);
  }
};

const saveChanges = async (data: any) => {
  try {
    await ContractTypeService.editContracType(data);
    await loadTableData();
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};

const onDeleteIconClicked = async (item) => {
  try {
    const data = await ContractTypeService.getContractType(item.value);

    dialogRef.value.show("delete", data);
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};

const confirmDelete = async (data: any) => {
  try {
    await ContractTypeService.deleteContracType(data);
    await loadTableData();
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};

const onAddIconClicked = async () => {
  try {
    const data = {};

    dialogRef.value.show("create", data);
    await loadTableData();
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};

const confirmCreate = async (data: any) => {
  try {
    await ContractTypeService.createContracType(data);
    await loadTableData();
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};

const onPageNoChanged = async () => {
  await loadTableData();
};
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
            v-model="search"
            density="compact"
            label="Tìm kiếm"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
            class="mr-5"
          />
          <VBtn @click="onAddIconClicked"> + </VBtn>
        </VCol>
      </VRow>
      <VDataTable
        :headers="headers"
        :items="tableDataSource"
        :item-per-page-option="pagination.itemPerPageOption"
        :search="search"
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
              style="color: red"
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
    <ContractTypeDialog
      ref="dialogRef"
      @save-changes="saveChanges"
      @confirm-delete="confirmDelete"
      @confirmCreate="confirmCreate"
    />
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
