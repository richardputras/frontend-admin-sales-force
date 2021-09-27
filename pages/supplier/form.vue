<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Supplier</h1>

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
            type="text"
            label="Alamat"
            name="address"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

          <FormulateInput
            type="text"
            label="Nomor Telepon"
            name="phone_number"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />
          
          <FormulateInput
            type="text"
            label="Nama Bank"
            name="bank_name"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

          <FormulateInput
            type="text"
            label="Nomor Rekening Bank"
            name="bank_number"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

         <FormulateInput
            type="text"
            label="Nama CP"
            name="contact_person_name"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

          <FormulateInput
            type="text"
            label="Nomor CP"
            name="contact_person_phone"
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
      this.id = this.$route.query.id;
      this.getSupplier(this.id)
    } 
  },
  methods: {
    async getSupplier(id) {
      const res = await this.apiGet("suppliers/" + id)
      this.formValues = res.data.data
    },
    async actionSave() {
      let form = JSON.parse(JSON.stringify(this.formValues))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        res = await this.apiPost("suppliers", form)
      } else {
        res = await this.apiPatch("suppliers/" + this.id, form)
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
