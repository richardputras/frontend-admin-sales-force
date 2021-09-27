<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-md-3 bg-white shadow-sm rounded p-3 mb-3">
            <div v-if="customerLoading">
                <div class="spinner-border mt-5 ml-5" role="status">
                    <div><span style="color:white;">_</span>
                    </div>
                </div>
            </div>
            <div class="mt-4">
            <h4 class="text-24-sb">
                {{customer.name}}
                <button class="btn btn-default" @click="goToForm(customer.id)"><i class="fas fa-edit"></i></button>
            </h4>
            <hr>
            <h4 class="text-16-sb">Contact Person</h4>
            <div v-if="contactPersonListLoading">
                <div class="spinner-border mt-5 ml-5" role="status">
                    <div><span style="color:white;">_</span>
                    </div>
                </div>
            </div>
            <h5 v-for="contactPerson in contactPersonList" :key="contactPerson.id" class="text-16-m">
                {{contactPerson.name}}, {{contactPerson.phone}}
                <br>{{contactPerson.role}}
            </h5>
          </div>
        </div>
        <div v-if="activityListLoading">
          <div class="spinner-border mt-5 ml-5" role="status">
            <div><span style="color:white;">_</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
            <h4 class="text-24-sb">
                <button @click="goToActivityForm(customer.id)" class="btn btn-default text-primary">
                    <i class="fas fa-plus"></i>
                </button>
                Tambah Aktifitas
            </h4>
            <div v-if="activityListLoading == false && activityList.length == 0">
                <h3 class="mt-3 ml-5">Belum ada aktifitas</h3>
            </div>
            <div v-for="(activity) in activityList" :key="activity.id">
                <div class="d-flex align-items-center bg-white shadow-sm rounded p-3 mb-3 select">
                    <div>
                        <div class="font-weight-bold text-16-m">{{activity.date_time | dayFormat}} - {{activity.topic}} </div>
                        <div class="text-12-m">{{activity.description}}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'sidebar',
  data() {
    return {
        "customer": {},
        "customerLoading": true,

        "contactPersonList": [],
        "contactPersonListLoading": true,

        "activityList": [],
        "activityListLoading": true,
    }
  },
  async created() {
    this.initCustomer()
    this.initContactPersonList()
    this.initActivityList()
  },
  methods: {
    async initCustomer() {
      const res = await this.apiGet("customers/" + this.$route.params.id)
      
      this.customer = {}
      this.customer = res.data.data
      this.customerLoading = false
    },
    async initContactPersonList() {
      const res = await this.apiGet("contact_persons?&filter[]=customer_id," + this.$route.params.id)
      
      this.contactPersonList = []
      this.contactPersonList = res.data.data
      this.contactPersonListLoading = false
    },
    async initActivityList() {
      const res = await this.apiGet("activities?filter[]=customer_id," + this.$route.params.id)

      this.activityList = []
      this.activityList = res.data.data.reverse()
      this.activityListLoading = false
    },
    goToForm(id) {
      var link = "/customer/form"
      if (id != null)
        link += "?id=" + id

      this.$router.push(link)
    },
    goToActivityForm(id) {
      var link = "/activity/form"
      if (id != null)
        link += "?id=" + id

      this.$router.push(link)
    },
    checkDay(day) {
      switch(day) {
        case 1:
          return "Senin"
        case 2:
          return "Selasa"
        case 3:
          return "Rabu"
        case 4:
          return "Kamis"
        case 5:
          return "Jumat"
        case 6:
          return "Sabtu"
        case 7:
          return "Minggu"
      }
    },
    checkMonth(month) {
      switch(month) {
        case 1:
          return "Januari"
        case 2:
          return "Februari"
        case 3:
          return "Maret"
        case 4:
          return "April"
        case 5:
          return "Mei"
        case 6:
          return "Juni"
        case 7:
          return "Juli"
        case 8:
          return "Agustus"
        case 9:
          return "September"
        case 10:
          return "Oktober"
        case 11:
          return "November"
        case 12:
          return "Desember"
      }
    },
    getDayMonthYear(date) {
      const timestamp = new Date(date)
      const dayName = this.checkDay(timestamp.getDay())
      const day = timestamp.getDate()
      const month = this.checkMonth(timestamp.getMonth() + 1)
      const year = timestamp.getFullYear()
      return `${dayName}, ${day} ${month} ${year}`
    },
    getTime(date) {
      const timestamp = new Date(date)
      let hour = timestamp.getHours().toString()
      if (hour.length === 1) {
        hour = '0' + hour
      }
      let minute = timestamp.getMinutes().toString()
      if (minute.length === 1) {
        minute = '0' + minute
      }
      return `${hour}:${minute}`
    },
  },
  filters: {
    dayFormat: function (date) {
      return moment(date).local().format('dddd, DD MMMM YYYY');
    }
  }
}
</script>

<style>

</style>
