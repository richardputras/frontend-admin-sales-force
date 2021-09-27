<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Warning</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
          <FormulateInput
            type="text"
            label="Judul"
            name="warning_letter"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            type="textarea"
            label="Deskripsi"
            name="warning_description"
            outer-class="form-group"
            input-class="form-control"
          />

          <FormulateInput
            label="Tanggal"
            type="date"
            name="warning_date"
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
      id: 0,
      formValues: {},
      isLoading: false
    }
  },
  async created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id
      this.getWarning(this.id)
    } 
  },
  methods: {
    async getWarning(id) {
      const res = await this.apiGet("warnings/" + id)
      this.formValues = res.data.data
    },

    async actionSave() {
      let postData = JSON.parse(JSON.stringify(this.formValues))

      this.isLoading = true
      let res = {}

      if(!this.id) {
        postData.employee_id = this.$route.query.employee_id  
        res = await this.apiPost("warnings", postData)
        
      } else {
        res = await this.apiPatch("warnings/" + this.id, postData)
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
      }
      else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      console.log(postData)
    },
    
    goToBack() {
      this.$router.back()
    },
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
