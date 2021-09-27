<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Contact Person</h1>

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
            label="Phone"
            name="phone"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            type="text"
            label="Jabatan"
            name="role"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            type="date"
            label="Tanggal Lahir"
            name="date_of_birth"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />
          
          <FormulateInput
            type="email"
            label="Email"
            name="email"
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
import moment from "moment";

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
      this.getContactPerson(this.id)
    } 
  },
  methods: {
    async getContactPerson(id) {
      const res = await this.apiGet("contact_persons/" + id)
      this.formValues = res.data.data
    },
    async actionSave() {
      let form = JSON.parse(JSON.stringify(this.formValues))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        form.customer_id = this.$route.query.customer_id
        
        res = await this.apiPost("contact_persons", form);
      } else {
        res = await this.apiPatch("contact_persons/" + this.id, form);
      } 

      const resData = res.data
      this.isLoading = false
      
      if (resData.status) {
        this.$toasted.success(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.$router.back();
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
    },
    goToBack() {
      this.$router.back();
    }
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
