<script setup lang="ts">
const isReadonly = ref(false);
const isVisible = ref(false);
const isDeleteMode = ref(false);
const data = ref({
  id: null,
  name: "",
  level: "",
});

const emit = defineEmits(['confirm-delete', 'save-changes']);

const show = (mode: "view" | "edit" | "delete" | "create", itemData: any) => {
  isReadonly.value = mode === "view";
  isDeleteMode.value = mode === "delete";

  data.value = {
    id: itemData.id || null,
    level: itemData.level || "",
    name: itemData.name || "",
  };
  isVisible.value = true;
};

const closeDialog = () => {
  isVisible.value = false;
};

const confirmDelete = () => {
  // Emit event for delete confirmation
  emit("confirm-delete", data.value.id);
  closeDialog();
};

const saveChanges = () => {
  // Emit event for saving changes
  emit("save-changes", data.value);
  closeDialog();
};

defineExpose({ show });
</script>

<template>
  <VDialog v-model="isVisible" max-width="600px" transition="scale-transition">
    <VCard>
      <VCardTitle class="title-dialog">
        {{
          isReadonly
            ? "Chi tiết vị trí"
            : isDeleteMode
            ? "Xác nhận xóa"
            : data.id
            ? "Chỉnh sửa vị trí"
            : "Thêm vị trí mới"
        }}
        <VBtn
          icon="$close"
          size="large"
          color="white"
          variant="text"
          @click="closeDialog"
        ></VBtn>
      </VCardTitle>
      <VDivider></VDivider>
      <div v-if="!isDeleteMode" style="padding: 15px">
        <VContainer>
          <VRow>
            <VCol cols="3">
              <strong>Tên cấp tổ chức</strong>
            </VCol>
            <VCol cols="9">
              <VTextField
                v-model="data.name"
                label="Name"
                :readonly="isReadonly"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3">
              <strong>Cấp tổ chức</strong>
            </VCol>
            <VCol cols="9">
              <VTextarea
                v-model="data.level"
                label="Level"
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
        <VSpacer></VSpacer>
        <VBtn
          class="mr-2"
          variant="elevated"
          color="secondary"
          text
          @click="closeDialog"
          >Close</VBtn
        >
        <VBtn
          v-if="isDeleteMode"
          variant="elevated"
          color="error"
          text
          @click="confirmDelete"
          >Xóa</VBtn
        >
        <VBtn
          variant="elevated"
          v-else-if="!isReadonly"
          color="success"
          text
          @click="saveChanges"
          >Save</VBtn
        >
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