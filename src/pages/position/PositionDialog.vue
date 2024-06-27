<script setup lang="ts">
import BenefitService from "@/services/benefit.service";
const isReadonly = ref(false);
const isVisible = ref(false);
const isDeleteMode = ref(false);
const data = ref({
  id: null,
  positionName: "",
  positionDescription: "",
  benefitPositionIds: [],
});

const { emit } = getCurrentInstance();

const show = (mode: "view" | "edit" | "delete" | "create", itemData: any) => {
  isReadonly.value = mode === "view";
  isDeleteMode.value = mode === "delete";

  data.value = {
    id: itemData.id || null,
    positionName: itemData.positionName || "",
    positionDescription: itemData.positionDescription || "",
    benefitPositionIds:
      itemData.benefits.map((benefit: any) => benefit.benefitId) || [],
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

const listBenefits = ref([]);

const getAllBenefits = async () => {
  try {
    const data = await BenefitService.getAllBenefit();
    listBenefits.value = data.map((benefit: any) => ({
      value: benefit.id,
      name: benefit.benefitName,
    }));
  } catch (error) {
    console.error("Error loading benefits:", error);
  }
};

onMounted(async () => {
  await getAllBenefits();
});

defineExpose({ show, listBenefits });
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
              <strong>Tên vị trí</strong>
            </VCol>
            <VCol cols="9">
              <VTextField
                v-model="data.positionName"
                label="Position Name"
                :readonly="isReadonly"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3">
              <strong>Mô tả vị trí</strong>
            </VCol>
            <VCol cols="9">
              <VTextarea
                v-model="data.positionDescription"
                label="Description"
                :readonly="isReadonly"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3">
              <strong>Đãi ngộ</strong>
            </VCol>
            <VCol cols="9">
              <VSelect
                v-model="data.benefitPositionIds"
                :items="listBenefits"
                item-value="value"
                item-title="name"
                label="Select Benefits"
                multiple
                :readonly="isReadonly"
              ></VSelect>
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