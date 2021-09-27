<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Maintenance</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
          <FormulateInput
            type="text"
            label="Judul"
            name="title"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            type="textarea"
            label="Deskripsi"
            name="description"
            outer-class="form-group"
            input-class="form-control"
          />

          <FormulateInput
            label="Tanggal Mulai Perawatan"
            type="date"
            name="maintenance_start_date"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

          <FormulateInput
            label="Tanggal Selesai Perawatan"
            type="date"
            name="maintenance_end_date"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

          <!-- <FormulateInput
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
          /> -->

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
      this.getMaintenance(this.id)
    } 
  },
  methods: {
    async getMaintenance(id) {
      const res = await this.apiGet("maintenances/" + id)
      this.formValues = res.data.data
    },

    async actionSave() {
      let postData = JSON.parse(JSON.stringify(this.formValues))

      this.isLoading = true
      let res = {}

      if(!this.id) {
        postData.item_id = this.$route.query.item_id  
        res = await this.apiPost("maintenances", postData)
        
      } else {
        res = await this.apiPatch("maintenances/" + this.id, postData)
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
