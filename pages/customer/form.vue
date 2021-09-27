<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Customer</h1>

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
            label="Kategori"
            type="select"
            name="category"
            :options="[
              {value: 0, label: 'Sekolah'},
              {value: 1, label: 'Lembaga'},
              {value: 2, label: 'Individu'},
            ]"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            v-if="formValues.category != 2"
            type="number"
            label="Total Murid"
            name="total_student"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            min="0"
          />

          <FormulateInput
            label="Tipe"
            type="select"
            name="type"
            :options="[
              {value: 0, label: 'Swasta'},
              {value: 1, label: 'Negeri'},
            ]"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            label="Agama"
            type="select"
            name="religion"
            :options="[
              {value: 0, label: 'Umum'},
              {value: 1, label: 'Kristen'},
              {value: 2, label: 'Islam'},
              {value: 3, label: 'Hindu'},
              {value: 4, label: 'Budha'},
              {value: 5, label: 'Katolik'},
            ]"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            label="Status"
            type="select"
            name="status"
            :options="[
              {value: 0, label: 'Belum di kontak'},
              {value: 1, label: 'Ditolak'},
              {value: 2, label: 'Belum di Jawab'},
              {value: 3, label: 'Follow Up'},
              {value: 4, label: 'Kunjungan'},
              {value: 5, label: 'Penawaran'},
              {value: 6, label: 'Negosiasi'},
              {value: 7, label: 'Proses MoU'},
              {value: 8, label: 'Kerjasama'},
              {value: 9, label: 'Perpanjangan'},
              {value: 10, label: 'Lain lain'},
            ]"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            v-if="formValues.status == 10"
            type="text"
            label="Lain Lain"
            name="others"
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
      this.id = this.$route.query.id;
      this.getCustomer(this.id)
    }

  },
  methods: {
    async getCustomer(id) {
      const res = await this.apiGet("customers/" + id)
      const resData = res.data.data

      this.formValues = resData
    },
    goToBack() {
      this.$router.back();
    },
    async actionSave() {
      let postData = this.formValues

      this.isLoading = true
      let res = {}

      if(!this.id) {
        postData.created_by = this.getUser().id
        postData = JSON.parse(JSON.stringify(postData))
        res = await this.apiPost("customers", postData);

        // selesai membuat customer lalu menambahkan person in charge didalamnya
        await this.apiPost("customer_users", JSON.parse(JSON.stringify({
          "user_id": this.getUser().id,
          "customer_id": res.data.data.id
        })));
      } else {
        postData.updated_by = this.getUser().id
        postData = JSON.parse(JSON.stringify(postData))
        res = await this.apiPatch("customers/" + this.id, postData);
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
    }
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
