<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Product Knowledge</h1>

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
            validation="required"
          />

          <FormulateInput
            label="Kategori"
            type="select"
            name="product_category_id"
            :options="[
              {value: 1, label: 'Tuton Hub'},
              {value: 2, label: 'Perpus Book Store'},
              {value: 3, label: 'Learning Management System'},
              {value: 4, label: 'Video Conference'},
              {value: 5, label: 'Admin Sekolah'},
            ]"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
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
      this.getProductKnowledge(this.id)
    } 
  },
  methods: {
    async getProductKnowledge(id) {
      const res = await this.apiGet("product_knowledges/" + id)
      this.formValues = res.data.data
    },

    async actionSave() {
      let postData = this.formValues

      this.isLoading = true
      let res = {}

      if(!this.id) {
        // postData.created_by = this.getUser().id
        postData = JSON.parse(JSON.stringify(postData))
        res = await this.apiPost("product_knowledges", postData);
        
      } else {
        // postData.updated_by = this.getUser().id
        postData = JSON.parse(JSON.stringify(postData))
        res = await this.apiPatch("product_knowledges/" + this.id, postData);
      }
      
      const resData = res.data;
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
      this.$router.back();
    },
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
