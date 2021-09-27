<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Division</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
          <FormulateInput
            label="Divisi"
            type="text"
            name="name"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            label="Deskripsi"
            type="text"
            name="description"
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
      this.getDivision(this.id)
    }
  },
  methods: {
    async getDivision(id) {
      const res = await this.apiGet("divisions/" + id)
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
            res = await this.apiPost("divisions", postData)
        } else {
            res = await this.apiPatch("divisions/" + this.id, postData)
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
