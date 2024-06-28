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

const items = ref ([
  {
    course: 'Fullstack .Net',
    jan: 1,
    feb: 1,
    mar: 1,
    apr: 1,
    may: 1,
    jun: 1,
    jul: 1,
    aug: 1,
    sep: 1,
    oct: 1,
    nov: 1,
    dec: 1,
    notEnrolled: 12,
  },
  {
    course: 'Fullstack Java',
    jan: 1,
    feb: 0,
    mar: 1,
    apr: 1,
    may: 0,
    jun: 1,
    jul: 1,
    aug: 4,
    sep: 0,
    oct: 0,
    nov: 2,
    dec: 1,
    notEnrolled: 1,
  },
  {
    course: 'C#/Java',
    jan: 4,
    feb: 4,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 6,
    jul: 1,
    aug: 0,
    sep: 0,
    oct: 3,
    nov: 0,
    dec: 2,
    notEnrolled: 5,
  },
  {
    course: 'Tổng học viên của tháng',
    notEnrolled: 'Tổng năm = '
  }
])

</script>

<template>
  <div>
    <VCard>
        <VCardTitle
          class="font-weight-black title text-center"
        >
          THỐNG KÊ HỌC VIÊN TRONG NĂM
        </VCardTitle>
        <VDataTable
          :headers="headers"
          :items="items"
        >
        </VDataTable>
    </VCard>
  </div>
</template>

<style lang="scss">
.title {
  color: red;
}
</style>
