<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = ref([
  {
    title: "Khóa học",
    key: "course",
    sortable: false,
  },
  {
    title: "Tháng 1",
    key: "jan",
    sortable: false,
  },
  {
    title: "Tháng 2",
    key: "feb",
    sortable: false,
  },
  {
    title: "Tháng 3",
    key: "mar",
    sortable: false,
  },
  {
    title: "Tháng 4",
    key: "apr",
    sortable: false,
  },
  {
    title: "Tháng 5",
    key: "may",
    sortable: false,
  },
  {
    title: "Tháng 6",
    key: "jun",
    sortable: false,
  },
  {
    title: "Tháng 7",
    key: "jul",
    sortable: false,
  },
  {
    title: "Tháng 8",
    key: "aug",
    sortable: false,
  },
  {
    title: "Tháng 9",
    key: "sep",
    sortable: false,
  },
  {
    title: "Tháng 10",
    key: "oct",
    sortable: false,
  },
  {
    title: "Tháng 11",
    key: "nov",
    sortable: false,
  },
  {
    title: "Tháng 12",
    key: "dec",
    sortable: false,
  },
  {
    title: "Chưa nhập học",
    key: "notEnrolled",
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
          :items="tableDataSource"
        >
        </VDataTable>
    </VCard>
  </div>
</template>

<style lang="scss">
.header {
  font-size: 12px;
}
</style>
