<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">{{ page }}</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
          <FormulateInput
            label="Nama"
            type="text"
            name="Name"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            label="Email"
            type="text"
            name="Email"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <div class="d-flex justify-content-end toolbar-footer">
            <NuxtLink class="btn btn-danger rounded-pill" to="/school">Batal</NuxtLink>
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
      page: "School",
      formValues: {
        Name: "",
        Day: 0,
        LessonID: "0",
        Description: "",
        StartTime: "",
        StartDate: "",
        EndTime: "",
        JoinCode: "",
        Status: 2,
        CodeExpiredAt: "2022-01-01T00:00:00",
      },
    };
  },
  async created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getClass(this.id);
    }
  },
  methods: {
    async actionSave() {
      var tempForm = {...this.formValues}
      tempForm.Day = parseInt(tempForm.Day)

      let body = JSON.parse(JSON.stringify(tempForm));

      if(body.Day != undefined) {
        body.Day = Number(body.Day);
      }

      if(this.id) {
        const res = await this.apiPatch("circle/" + this.id, body, "GodMode=true");
        let resData = res.data;

        if(resData.success) {
          this.$toasted.success(resData.message, {
            theme: "toasted-primary",
            position: "bottom-right",
            duration: 2500
          });
          this.$router.push('/class');
        }
        else {
          this.$toasted.error(resData.message, {
            theme: "toasted-primary",
            position: "bottom-right",
            duration: 2500
          });
        }
      }
      else {
        const res = await this.apiPost("circle", body);
        let resData = res.data;

        if(resData.success) {
          this.$toasted.success(resData.message, {
            theme: "toasted-primary",
            position: "bottom-right",
            duration: 2500
          });
          this.$router.push('/class');
        }
        else {
          this.$toasted.error(resData.message, {
            theme: "toasted-primary",
            position: "bottom-right",
            duration: 2500
          });
        }
      }
    },
    async checkJoinCode() {},
    async getClass(id) {
      const res = await this.apiGet("circle/" + id + "/id");

      // supaya ketika simpan enggak error, karena ketika disimpan, mengirim semua object dari data
      var _fieldList = [
        'ID',
        'Name',
        'Day',
        'LessonID',
        'Description',
        'StartTime',
        'StartDate',
        'EndTime',
        'JoinCode',
        'CodeExpiredAt'
      ]

      _fieldList.forEach(field => {
        if(field in res.data.data) {
          this.formValues[field] = res.data.data[field]
        }
      })
    },
  },
};
</script>

<style>
.container {
  width: 570px;
}
</style>
