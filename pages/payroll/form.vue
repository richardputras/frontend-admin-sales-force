<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Payroll</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
          <FormulateInput
            label="Gaji Pokok"
            type="text"
            name="basic_salary"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            label="Tanggal Gajian"
            type="date"
            name="salary_date"
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
              label="Simpan"
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
      id: 0,

      formValues: {},
      isLoading: false
    }
  },
  async created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id
      this.getPayroll(this.id)
    }
  },
  methods: {
    async getPayroll(id) {
      const res = await this.apiGet("payrolls/" + id)
      this.formValues = res.data.data
    },
    goToBack() {
      this.$router.back()
    },
    async actionSave() {
        let postData = JSON.parse(JSON.stringify(this.formValues))

        this.isLoading = true
        let res = {}

        if (!this.id) {
            res = await this.apiPost("payrolls", postData)
        } else {
            res = await this.apiPatch("payrolls/" + this.id, postData)
        }

        const resData = res.data
        this.isLoading = false

        if(resData.status) {
            this.$toasted.success(resData.message, {
                theme: "toasted-primary",
                position: "bottom-right",
                duration: 2500
            });
            this.goToBack()
        } else {
            this.$toasted.error(resData.message, {
                theme: "toasted-primary",
                position: "bottom-right",
                duration: 2500
            });
        }
    }
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
