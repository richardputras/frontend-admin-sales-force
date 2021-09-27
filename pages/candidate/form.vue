<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Employee Candidate</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
          <FormulateInput
            type="text"
            label="Nama"
            name="name"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            type="textarea"
            label="Keterangan"
            name="description"
            outer-class="form-group"
            input-class="form-control"
          />

          <FormulateInput
            label="Tanggal Pendaftaran"
            type="date"
            name="register_date"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

          <FormulateInput
            label="Berkas (link google drive)"
            type="url"
            name="link"
            placeholder="https://example.com"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

          <div class="d-flex justify-content-end toolbar-footer">
            <FormulateInput
              type="button"
              input-class="btn btn-danger rounded-pill"
              label="Batal"
              @click="goToBack"
            />
            <FormulateInput
              type="submit"
              :disabled="isLoading"
              :label="isLoading ? 'Loading...' : 'Simpan'"
              input-class="btn btn-primary rounded-pill"
            />
          </div>
        </FormulateForm>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: "sidebar",
  data() {
    return {
      employeeRequest: [],
      id: 0,
      formValues: {},
      isLoading: false
    }
  },
  async created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getCandidate(this.id)
    }
    this.getEmployeeRequest()
  },
  methods: {
    async getCandidate(id) {
      const res = await this.apiGet("employee_request_candidates/" + id)
      this.formValues = res.data.data
    },
    async getEmployeeRequest() {
      const res = await this.apiGet("employee_requests")
      this.employeeRequest = []
      this.employeeRequest = res.data.data
    },
    async actionSave() {
      this.formValues.employee_request_id = this.employeeRequest[0].id
      console.log(this.formValues)

      let postData = JSON.parse(JSON.stringify(this.formValues))

      this.isLoading = true
      let res = {}

      if (!this.id) {  
        res = await this.apiPost("employee_request_candidates", postData)
      } else {
        res = await this.apiPatch("employee_request_candidates/" + this.id, postData)
      }

      const resData = res.data
      this.isLoading = false

      if (resData.status) {
        this.$toasted.success(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        })
        this.$router.back()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        })
      }
    },
    goToBack() {
      this.$router.back()
    }
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
