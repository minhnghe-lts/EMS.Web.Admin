<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  isDialogVisible: Boolean,
  editedItem: Object,
})

const emits = defineEmits(['update:isDialogVisible', 'save'])

const cancel = () => {
  emits('update:isDialogVisible', false)
}

const saveChanges = () => {
  emits('save', editedItem)
  emits('update:isDialogVisible', false)
}
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="500"
  >
    <VCard>
      <VCardTitle>Chỉnh sửa hợp đồng</VCardTitle>
      <VCardText>
        <VForm>
          <VTextField
            v-model="editedItem.name"
            label="Loại hợp đồng"
            required
          />
          <!-- Add more input fields as necessary -->
        </VForm>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="blue darken-1"
          text
          @click="cancel"
        >
          Hủy
        </VBtn>
        <VBtn
          color="blue darken-1"
          text
          @click="saveChanges"
        >
          Lưu
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
