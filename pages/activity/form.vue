<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Aktifitas</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
          <FormulateInput
            type="text"
            label="Title"
            name="topic"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            type="textarea"
            label="Description"
            name="description"
            outer-class="form-group"
            input-class="form-control"
          />

          <FormulateInput
            label="Tanggal Mulai"
            type="date"
            name="startDate"
            outer-class="form-group"
            input-class="form-control rounded-pill"
          />

          <FormulateInput
            label="Waktu Mulai"
            type="time"
            name="startTime"
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
      this.getActivity(this.id)
    } else {
      this.formValues.startDate = moment().format('YYYY-MM-DD');
      this.formValues.startTime = moment().format('HH:mm');
    }

  },
  methods: {
    async getActivity(id) {
      const res = await this.apiGet("activities/" + id)
      this.formValues = res.data.data
      this.formValues.startDate = moment(this.formValues.date_time).format('YYYY-MM-DD');
      this.formValues.startTime = moment(this.formValues.date_time).format('HH:mm');
    },
    async actionSave() {
      this.formValues.customer_id = this.$route.query.customer_id
      this.formValues.user_id = this.getUser().id
      this.formValues.date_time = this.convertToDateTime(this.formValues.startDate, this.formValues.startTime);

      let form = JSON.parse(JSON.stringify(this.formValues))

      delete form.startDate
      delete form.startTime

      this.isLoading = true
      let res = {}
      if (!this.id) {
        form.Status = 2
        res = await this.apiPost("activities", form);
        
      } else {
        res = await this.apiPatch("activities/" + this.id, form);
      }

      const resData = res.data
      this.isLoading = false

      if(resData.status) {
        this.apiPatch("customers/" + this.formValues.customer_id, {"last_follow_up": res.data.data.date_time})

        this.$toasted.success(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.$router.back();
      }
      else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
    },
    goToBack() {
      this.$router.back();
    },
    convertToDateTime(date, time = "") {
      let tempDate = date.split("-");
      console.log(tempDate)
      console.log(date)
      let tempDateString = tempDate[0]+"-"+tempDate[1]+"-"+tempDate[2]

      if (time == "") {
        time = "00:00"
      }

      let timezone = -(new Date().getTimezoneOffset()/60);

      if (timezone < 10)
        timezone = "0" + timezone
      let tempDateTime = tempDateString + "T" + time + ":00" + "+" + timezone + ":00";
      // 2020-01-01T00:00:00+07:00

      return tempDateTime
    }
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
