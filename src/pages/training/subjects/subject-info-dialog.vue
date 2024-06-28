<template>
  <VDialog v-model="isVisible" class="w-50">
    <VCard class="pa-5">
      <VCardTitle class="font-weight-black d-flex justify-space-between">
        {{ isCreateMode ? "Thêm môn học" : isReadonly ? "Chi tiết môn học" : isDeleteMode ? "Xác nhận xóa" : "Chỉnh sửa môn học" }}
      </VCardTitle>
      <VcardText 
        v-if="!isDeleteMode"
        class="pa-5"
        @keyup.enter="handleEnter"
      >
        <VRow>
          <VCol
            cols="2"
            class="d-flex"
          >
            <VLabel class="font-weight-bold">Mã môn</VLabel>
          </VCol>
          <VCol>
            <VTextField
              v-model="subject.codeName"
              :readonly="isReadonly"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="2"
            class="d-flex"
          >
            <VLabel class="font-weight-black">Tên môn</VLabel>
          </VCol>
          <VCol>
            <VTextField
              v-model="subject.name"
              :readonly="isReadonly"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="2"
            class="d-flex"
          >
            <VLabel class="font-weight-bold">Số bài tập</VLabel>
          </VCol>
          <VCol>
            <VTextField
              v-model="subject.totalExercise"
              :readonly="isReadonly"
            ></VTextField>
          </VCol>
        </VRow>
      </VcardText>
      <VCardText v-else>
        <VRow>Bạn muốn xóa môn học này chứ?</VRow>
      </VCardText>
      <VCardActions class="d-flex justify-end mr-2">
        <VBtn
          variant="flat"
          @click="closeDialog()"
        >Thoát</VBtn>
        <VBtn 
          v-if="isCreateMode"
          variant="flat"
          color="success"
          @click="confirmCreate()"
        >Tạo</VBtn>
        <VBtn 
          v-if="isDeleteMode"
          variant="flat"
          color="error"
          @click="confirmDelete()"
        >Xóa</VBtn>
        <VBtn 
          v-else-if="!isReadonly && !isCreateMode"
          variant="flat"
          color="success"
          @click="saveChanges()"
        >Lưu</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
  const isReadonly = ref(false);
  const isVisible = ref(false);
  const isDeleteMode = ref(false);
  const isCreateMode = ref(false);
  const subject = ref({});

  const emit = defineEmits(['confirm-create', 'save-changes', 'confirm-delete']);

  const show = (mode: 'create' | 'view' | 'edit' | 'delete', itemData: any ) => {
    isCreateMode.value = mode === 'create';
    isReadonly.value = mode === 'view';
    isDeleteMode.value = mode === 'delete';
    subject.value = isCreateMode.value ? {} : itemData;
    isVisible.value = true;
  };

  const closeDialog = () => {
    isVisible.value = false;
  };

  const confirmCreate = () => {
    emit('confirm-create', subject.value);
    closeDialog();
  };

  const confirmDelete = () => {
    emit('confirm-delete', subject.value);
    closeDialog();
  };

  const saveChanges = () => {
    emit('save-changes', subject.value);
    closeDialog();
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      saveChanges();
    }
  };

  defineExpose({ show });
</script>