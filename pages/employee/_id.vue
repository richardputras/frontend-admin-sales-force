<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-12 col-md-3 position-absolute">  
          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <div v-if="employeeLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-24-sb">
                <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToForm(employee.id)"></i>
                {{employee.first_name}} {{employee.last_name}}
              </h4>
              <hr>
              <h6 class="text-16-sb">Detail</h6>
              <h4 class="text-14-m">
                NIP : {{employee.employee_id_number}}
              </h4>
              <h4 class="text-14-m">
                NIK : {{employee.id_number}}
              </h4>
              <h4 class="text-14-m">
                Jenis Kelamin : {{employee.gender | getEmployeeGender}}
              </h4>
              <h4 class="text-14-m">
                Tempat Lahir : {{employee.place_of_birth}}
              </h4>
              <h4 class="text-14-m">
                Tanggal Lahir: {{employee.date_of_birth | dateFormat}}
              </h4>
              <h4 class="text-14-m">
                Email Pribadi : {{employee.email}}
              </h4>
              <h4 class="text-14-m">
                <span v-if="employee.corporate_email != null && employee.corporate_email != '' "> Email Kantor: {{employee.corporate_email}} </span>
              </h4>
              <h4 class="text-14-m">
                <span v-if="employee.phone_number != null && employee.phone_number != '' ">Nomor HP Pribadi: {{employee.phone_number}}</span> 
              </h4>
              <h4 class="text-14-m">
                <span v-if="employee.corporate_phone_number != null && employee.corporate_phone_number != '' ">Nomor HP Kantor: {{employee.corporate_phone_number}}</span> 
              </h4>
              <h4 class="text-14-m">
                Alamat (Sesuai KTP): {{employee.main_address}}
              </h4>
              <h4 class="text-14-m">
                <span v-if="employee.alternate_address != null && employee.alternate_address != '' ">Alamat Sekarang: {{employee.alternate_address}}</span>
              </h4>
              <h4 class="text-14-m">
                Status Pernikahan: {{employee.marriage_status | getEmployeeMarriageStatus}}
              </h4>
              <h4 class="text-14-m">
                <span v-if="employee.total_child != null">Jumlah Anak: {{employee.total_child}}</span> 
              </h4>
              <h4 class="text-14-m">
                Posisi: {{employee.position | getEmployeePosition}}
              </h4>
              <h4 class="text-14-m">
                Divisi: {{employee.division_id | getEmployeeDivision}}
              </h4>
              <h4 class="text-14-m">
                Status Kerja: {{employee.work_status | getEmployeeWorkStatus}}
              </h4>
              <h4 class="text-14-m">
                Tanggal Masuk Kerja:
                <span v-if="employee.start_work_date != null && employee.start_work_date != '0000-00-00' ">
                    {{employee.start_work_date | dateFormat}}
                </span>
              </h4>
            </div>
          </div>
        </div>

        <div class="col-12 offset-md-8 col-md-3 d-none d-sm-block position-absolute">
          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <h4 class="text-16-sb">
              Payroll <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="goToPayrollForm()"></i> 
            </h4>
            <div v-if="employeeLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <h5 v-for="payroll in payrollList" class="text-16-m" :key="payroll.id">
              <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToPayrollForm(payroll.id)"></i>
              <div>
                Gaji Pokok : {{payroll.basic_salary}}
              </div>
              <div>
                Tanggal Gajian : {{payroll.salary_date}}
              </div>
            </h5>
          </div>
          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <h4 class="text-16-sb"><i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="resignModal"></i> Resign</h4>
            <div>
              Tanggal Resign :
              <span v-if="employee.resign_at != null ">
                {{employee.resign_at | dateFormat}}
              </span>
            </div>
            <div>
              Alasan Resign : {{employee.resign_reason}}
            </div>
          </div>
          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <h4 class="text-16-sb"><i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="contactModal"></i> Kontak Daurat</h4>
            <div>
              Nama : {{employee.emergency_contact_name}}
            </div>
            <div>
              Nomor Telepon/HP : {{employee.emergency_contact_phone}}
            </div>
            <div>
              Alamat : {{employee.emergency_contact_address}}
            </div>
            <div>
              Hubungan dengan karyawan : {{employee.emergency_contact_relation}}
            </div>
          </div>
        </div>

        <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h4 class="modal-title">Resign</h4>
              </div>

              <form @submit.prevent="addResign">
                <div class="modal-body"> 
                  <div class="form-group">
                    <label>Tanggal Resign</label>
                      <input v-model="formResign.resign_at" type="date" name="resign_at" class="form-control rounded-pill" autocomplete="off">
                  </div>
                  <div class="form-group">
                    <label>Alasan Resign</label>
                      <input v-model="formResign.resign_reason" type="text" name="resign_reason" class="form-control rounded-pill" autocomplete="off">
                  </div>
                </div>
                <div class="modal-footer">
                  <FormulateInput
                    type="button"
                    input-class="btn btn-danger rounded-pill"
                    label="Batal"
                    data-dismiss="modal"
                  />
                  <FormulateInput
                    type="submit"
                    :disabled="isLoading"
                    :label="isLoading ? 'Loading...' : 'Simpan'"
                    input-class="btn btn-primary rounded-pill"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h4 class="modal-title">Kontak Daurat</h4>
              </div>

              <form @submit.prevent="addContact">
                <div class="modal-body"> 
                  <div class="form-group">
                    <label>Nama</label>
                      <input v-model="formContact.emergency_contact_name" type="text" name="emergency_contact_name" class="form-control rounded-pill" autocomplete="off">
                  </div>
                  <div class="form-group">
                    <label>Alamat</label>
                      <input v-model="formContact.emergency_contact_address" type="text" name="emergency_contact_address" class="form-control rounded-pill" autocomplete="off">
                  </div>
                  <div class="form-group">
                    <label>Nomor Telepon/HP</label>
                      <input v-model="formContact.emergency_contact_phone" type="text" name="emergency_contact_phone" class="form-control rounded-pill" autocomplete="off">
                  </div>
                  <div class="form-group">
                    <label>Hubungan</label>
                      <input v-model="formContact.emergency_contact_relation" type="text" name="emergency_contact_relation" class="form-control rounded-pill" autocomplete="off">
                  </div>
                </div>
                <div class="modal-footer">
                  <FormulateInput
                    type="button"
                    input-class="btn btn-danger rounded-pill"
                    label="Batal"
                    data-dismiss="modal"
                  />
                  <FormulateInput
                    type="submit"
                    :disabled="isLoading"
                    :label="isLoading ? 'Loading...' : 'Simpan'"
                    input-class="btn btn-primary rounded-pill"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="offset-3 col-md-5 pl-5">
          <h3 class="text-24-sb">({{warningList.length}})
            Daftar Warning
            <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="goToWarningForm()"></i>
          </h3>
          <div v-if="warningListLoading">
            <div class="spinner-border mt-5 ml-5" role="status">
              <div><span style="color:white;">_</span>
              </div>
            </div>
          </div>
          <div v-if="warningListLoading == false && warningList.length == 0">
            <h3 class="mt-3 ml-5">Belum ada warning</h3>
          </div>
          <div v-for="(warning, index) in warningList" :key="warning.id">
            <div class="d-flex align-items-center bg-white shadow-sm rounded p-3 mb-3 select">
                <div>
                    <div class="font-weight-bold text-16-m">
                      <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToWarningForm(warning.id)"></i>
                      {{index + 1}}. {{warning.warning_letter}}
                    </div>
                    <div class="text-10-sb">{{warning.warning_date | dayFormat}}</div>
                    <div class="text-12-m">{{warning.warning_description}}</div>
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
        employee: {},
        employeeLoading: true,

        payrollList: [],
        payrollListLoading: true,

        warningList: [],
        warningListLoading: true,

        form: {},
        formLink: {},
        formResign: {},
        formContact: {},
        isLoading: false
    }
  },
  async created() {
    this.initEmployee()
    this.initPayrollList()
    this.initWarningList()
  },
  methods: {
    resignModal(){
      $('#modal').modal('show')
    },
    contactModal(){
      $('#modal').modal('show')
    },
    async addResign() {
      let postData = JSON.parse(JSON.stringify(this.formResign))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        res = await this.apiPatch("employees/" + this.$route.params.id, postData)
      }
        
      const resData = res.data
      this.isLoading = false
        
      if (resData.status) {
        $('#modal').modal('hide')
        this.$toasted.success(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initEmployee()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      console.log(postData)
    },
    async addContact() {
      let postData = JSON.parse(JSON.stringify(this.formContact))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        res = await this.apiPatch("employees/" + this.$route.params.id, postData)
      }
        
      const resData = res.data
      this.isLoading = false
        
      if (resData.status) {
        $('#modal1').modal('hide')
        this.$toasted.success(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initEmployee()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      console.log(postData)
    },
    async initEmployee() {
      const res = await this.apiGet("employees/" + this.$route.params.id)
      
      this.employee = {}
      this.employee = res.data.data
      this.employeeLoading = false
    },
    async initPayrollList() {
      const res = await this.apiGet("payrolls?&filter[]=employee_id," + this.$route.params.id)
      
      this.payrollList = []
      this.payrollList = res.data.data
      this.payrollListLoading = false
    },
    async initWarningList() {
      const res = await this.apiGet("warnings?filter[]=employee_id," + this.$route.params.id)

      this.warningList = []
      this.warningList = res.data.data.reverse()
      this.warningListLoading = false
    },
    goToForm(id) {
      var link = "/employee/form"

      if (id != null)
        link += "?id=" + id

      this.$router.push(link)
    },
    goToPayrollForm(id) {
      var link = "/payroll/form"

      if (id != null)
        link += "?id=" + id

      this.$router.push(link)
    },
    goToWarningForm(id) {
      var link = "/warning/form?employee_id=" + this.$route.params.id

      if (id != null)
        link += "&id=" + id

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
    dateFormat(date) {
      return moment(date).local().format('dddd, DD MMMM YYYY');
    },
    timeFormat(time) {
      return moment(time).local().format('HH:mm');
    },
    getEmployeeDivision(value) {
      let status = ""

      if (value == "0") {
        status = "IT"
      } else if (value == "1") {
        status = "CT"
      } else if (value == "2") {
        status = "Marketing & Development"
      } else if (value == "3") {
        status = "Admin"
      } else if (value == "4") {
        status = "Finance & Accounting"
      } else if (value == "5") {
        status = "Audit"
      } else if (value == "6") {
        status = "Akademik"
      } else if (value == "7") {
        status = "Corporate Legal & HRD"
      } else if (value == "8") {
        status = "Training"
      } else if (value == "9") {
        status = "CSR"
      } else if (value == "10") {
        status = "Event"
      } else if (value == "11") {
        status = "RnD"
      } else if (value == "12") {
        status = "General Affairs"
      }

      return status
    },
    getEmployeePosition(value) {
      let status = ""

      if (value == "0") {
        status = "Non Staff"
      } else if (value == "1") {
        status = "Staff"
      } else if (value == "2") {
        status = "Supervisor"
      } else if (value == "3") {
        status = "Kadiv"
      } else if (value == "4") {
        status = "Wakil Kadiv"
      }

      return status
    },
    getEmployeeWorkStatus(value) {
      let status = ""

      if (value == "0") {
        status = "Full Time"
      } else if (value == "1") {
        status = "Part Time"
      } else if (value == "2") {
        status = "Magang"
      } else if (value == "3") {
        status = "Freelance"
      }

      return status
    },
    getEmployeeMarriageStatus(value) {
      let status = ""

      if (value == "0") {
        status = "Lajang"
      } else if (value == "1") {
        status = "Menikah"
      } else if (value == "2") {
        status = "Cerai Hidup"
      }

      return status
    },
    getEmployeeGender(value) {
      let status = ""

      if (value == "0") {
        status = "Laki-Laki"
      } else if (value == "1") {
        status = "Perempuan"
      } 

      return status
    }
  }
}
</script>

<style>

</style>
