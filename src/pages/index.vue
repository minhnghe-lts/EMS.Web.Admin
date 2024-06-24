<script>

</script>

<template>
  <VCard>
    <h3>Thêm nhân viên</h3>
    <VForm>
      <VContainer>
        <VRow>
          <VCol cols="4">
            <VSelect
              :counter="10"
              label="Trạng thái"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Email</span>
            <VTextField
              label="E-mail"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="4"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Tạo TK mới</span>

            <VTextField
              :counter="10"
              label="x"
              hide-details
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="4"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Loại hợp đồng</span>
            <VSelect
              :counter="10"
              label="Loại hợp đồng"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="4"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Ngày hợp đồng</span>
            <input
              type="date"
              :counter="10"
              hide-details
              required
            >
          </VCol>
          <VCol
            cols="4"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Hạn HĐ </span>

            <VTextField
              :counter="10"
              label="x"
              hide-details
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="4"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Tên nhân viên</span>
            <VTextField
              label="Tên nhân viên"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="4"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">SĐT</span>

            <VTextField
              :counter="10"
              label="SĐT"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="4"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Học vấn</span>

            <VSelect
              :counter="10"
              label="Trạng thái"
              hide-details
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            class="d-flex"
          >
            <span class="mr-10">Địa chỉ</span>

            <VTextField
              :counter="10"
              label="Địa chỉ"
              hide-details
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Phòng ban</span>

            <VSelect
              :counter="10"
              label="Phòng ban"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Quản lý bởi</span>

            <VSelect
              :counter="10"
              label="Quản lý bởi"
              hide-details
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            md="4"
            class="d-flex"
          >
            <span class="mr-10">Lương</span>

            <VTextField
              :counter="10"
              label="Lương"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="8"
            class="d-flex"
          >
            <span class="mr-10">Đãi ngộ</span>

            <VTextarea
              :counter="10"
              label="Đãi ngộ"
              hide-details
              required
              rows="2"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol class="d-flex">
            <span class="mr-10">Quá trình công tác</span>
            <VBtn>Thêm</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol class="d-flex">
            <span class="mr-10">Đánh giá các kỳ</span>
            <VBtn>Thêm</VBtn>
          </VCol>
        </VRow>
        <VRow class="justify-end">
          <VBtn>Lưu</VBtn>
        </VRow>
      </VContainer>
    </VForm>
  </VCard>
</template>
