<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = ref([
  {
    title: "Khóa học",
    key: "code",
    sortable: false,
  },
  {
    title: "Tên khóa",
    key: "name",
    sortable: false,
  },
  {
    title: "Lộ trình",
    key: "path",
    sortable: false,
  },
  {
    title: "Hành động",
    key: "action",
    sortable: false,
  },
])
</script>

<template>
  <div>
    <VCard>
        <VCardTitle>Thống kê năm</VCardTitle>
        <VDataTable
          :headers="headers"
        >
            <template>
                
            </template>
        </VDataTable>
    </VCard>
  </div>
</template>

<style lang="scss">
.header {
  font-size: 12px;
}
</style>
