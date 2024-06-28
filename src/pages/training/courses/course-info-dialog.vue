<template>
  <VDialog v-model="isVisible" class="w-50">
    <VCard class="pa-5">
      <VCardTitle class="font-weight-black d-flex justify-space-between">
        {{ isCreateMode ? "Thêm khóa học" : isReadonly ? "Chi tiết khóa học" : isDeleteMode ? "Xác nhận xóa" : "Chỉnh sửa khóa học" }}
      </VCardTitle>
      <VCardText
        v-if="!isDeleteMode"
        class="pa-5"
        @keyup.enter="handleEnter"
      >
        <VRow>
          <VCol
            cols="2" 
            class="d-flex"
          >
            <VLabel class="font-weight-bold">Mã khóa</VLabel>
          </VCol>
          <VCol>
            <VTextField
              v-model="course.codeName"
              :readonly="isReadonly"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol 
            cols="2"
            class="d-flex"
          >
            <VLabel class="font-weight-black">Tên khóa</VLabel>
          </VCol>
          <VCol>
            <VTextField
              v-model="course.name"
              :readonly="isReadonly"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="2"
            class="d-flex"
          >
            <VLabel class="font-weight-bold">Lộ trình học</VLabel>
          </VCol>
          <VCol>
            <VSelect
              v-model="course.subjectIds"
              :items="availableSubjectList"
              item-value="value"
              item-title="name"
              :readonly="isReadonly"
              multiple
            >
            </VSelect>
          </VCol>
        </VRow>
      </VCardText>
      <VCardText v-else>
        <VRow>Bạn muốn xóa khóa học này chứ?</VRow>
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
  import SubjectService from "@/services/subject.service";
  const isReadonly = ref(false);
  const isVisible = ref(false);
  const isDeleteMode = ref(false);
  const isCreateMode = ref(false);
  const course = ref({
    id: null,
    codeName: "",
    name: "",
    subjectIds: []
  });
  const deletedCourse = ref({});
  const availableSubjectList = ref([]);

  const emit = defineEmits(['confirm-create', 'save-changes', 'confirm-delete']);

  const show = ( mode: 'create' | 'view' | 'edit' | 'delete', itemData: any ) => {
    isCreateMode.value = mode === 'create';
    isReadonly.value = mode === 'view';
    isDeleteMode.value = mode === 'delete';
    course.value = {
      id: itemData.id || null,
      codeName: itemData.codeName || "",
      name: itemData.name || "",
      subjectIds: itemData.subjects ? itemData.subjects.map((subject: any) => subject.id) : []
    }
    deletedCourse.value = itemData;
    isVisible.value = true;
  };
  
  const getAllAvailableSubject = async () => {
    try {
      const data = await SubjectService.getAllSubject();
      availableSubjectList.value = data.map((subject: any) => ({
        value: subject.id,
        name: subject.name,
      }));
    }
    catch (error) {
      console.error('Failed to load subject details:', error)
    }
  }

  const closeDialog = () => {
    isVisible.value = false;
  };

  const confirmCreate = () => {
    emit('confirm-create', course.value);
    closeDialog();
  };

  const confirmDelete = () => {
    emit('confirm-delete', deletedCourse.value);
    closeDialog();
  };

  const saveChanges = () => {
    emit('save-changes', course.value);
    closeDialog();
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      saveChanges();
    }
  };

  onMounted(() => {
    getAllAvailableSubject();
  });

  defineExpose({ show });
</script>