<script setup lang="ts">
const emit = defineEmits(["confirm-create", "save-changes", "confirm-delete"]);
const isReadonly = ref(false);
const isVisible = ref(false);
const isDeleteMode = ref(false);
const isCreateMode = ref(false);
const data = ref({});

const show = (
  mode: "create" | "view" | "edit" | "delete",
  itemData: object
) => {
  isReadonly.value = mode === "view";
  isDeleteMode.value = mode === "delete";
  isCreateMode.value = mode === "create";
  data.value = itemData || {};
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const confirmDelete = () => {
  // Emit event for delete confirmation
  emit("confirm-delete", data.value);
  closeDialog();
};

const saveChanges = () => {
  // Emit event for saving changes
  emit("save-changes", data.value);
  closeDialog();
};

const confirmCreate = () => {
  // Emit event for creating new item
  emit("confirm-create", data.value);
  closeDialog();
};

defineExpose({ show });
</script>

<template>
  <VDialog v-model="isVisible" width="50%">
    <VCard class="pa-5">
      <VCardTitle class="title-dialog">
        {{
          isCreateMode
            ? "Thêm loại hợp đồng"
            : isReadonly
            ? "Chi tiết loại hợp đồng"
            : isDeleteMode
            ? "Xác nhận xóa"
            : "Chỉnh sửa loại hợp đồng"
        }}
        <VBtn
          icon="$close"
          size="large"
          color="white"
          variant="text"
          @click="closeDialog"
        />
      </VCardTitle>
      <VDivider />
      <div v-if="!isDeleteMode" style="padding: 15px">
        <VContainer>
          <VRow>
            <VCol cols="3" class="d-flex">
              <VLabel>Tên hợp đồng</VLabel>
            </VCol>
            <VCol cols="7">
              <VTextField
                v-model="data.name"
                label="Tên hợp đồng"
                :readonly="isReadonly"
              />
            </VCol>
          </VRow>
        </VContainer>
      </div>

      <div v-else style="padding: 15px">
        Bạn có chắc chắn muốn xóa mục này không?
      </div>
      <VCardActions>
        <VSpacer />
        <VBtn
          class="mr-2"
          variant="elevated"
          color="secondary"
          text
          @click="closeDialog"
        >
          Close
        </VBtn>
        <VBtn
          v-if="isDeleteMode"
          variant="elevated"
          color="error"
          text
          @click="confirmDelete"
        >
          Xóa
        </VBtn>
        <VBtn
          v-else-if="!isReadonly && !isCreateMode"
          variant="elevated"
          color="success"
          text
          @click="saveChanges"
        >
          Lưu </VBtn
        ><VBtn
          v-else-if="isCreateMode"
          variant="elevated"
          color="success"
          text
          @click="confirmCreate"
        >
          Tạo
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.title-dialog {
  display: flex;
  justify-content: space-between;
  padding-left: 1.2em;
  align-items: center;
  background-color: #7367f0;
  color: white;
}
</style>
