<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-12 col-md-3 position-fixed">
          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <div v-if="customerLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-24-sb">
                  <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToForm(customer.id)"></i>
                  {{customer.name}}
              </h4>
              <h6 class="text-16-sb">Informasi</h6>
              <h4 class="text-14-m">
                Jumlah Murid : {{customer.total_student}}
              </h4>
              <h4 class="text-14-m">
                Status : 
                <span v-if="customer.status != 10">
                  {{customer.status | getCustomerStatus}}
                </span>
                <span v-else>
                  Lain lain, {{customer.others}}
                </span>
              </h4>
              <div v-if="customer.status >= 7">
                <div>
                  <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="agreementEditModal"></i>
                  <i class="fas fa-file-alt fa-xs"></i>
                  <a :href="customer.link_document" target="_blank" class="text-14-m">Link Perjanjian Kerjasama</a>
                </div>
              </div>
              <hr>
              <div v-if="customerLoading">
                <div class="spinner-border mt-5 ml-5" role="status">
                  <div><span style="color:white;">_</span>
                  </div>
                </div>
              </div>
              <h6 class="text-16-sb">
                <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="addPaymentInfoModal"></i> 
                Pembayaran
                <h4 class="text-14-m">
                  Tanggal :
                  <span v-if="customer.payment_date != null && customer.payment_date != '0000-00-00' ">
                    {{customer.payment_date | dayFormat}}
                  </span>
                </h4>
                <h4 class="text-14-m">
                  Nominal : 
                  <span v-if="customer.payment_nominal != null && customer.payment_nominal != '0' ">
                    {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(customer.payment_nominal)}}
                  </span>
                </h4>
                <h4 class="text-14-m">
                  Jatuh Tempo :
                  <span v-if="customer.payment_deadline != null && customer.payment_deadline != '0000-00-00' ">
                    {{customer.payment_deadline | dayFormat}}
                  </span> 
                </h4>
                <h4 class="text-14-m">
                    Nomor Rekening : {{customer.payment_account_number}}
                </h4>
                <h4 class="text-14-m">
                    CP Accounting : {{customer.payment_contact_person}}
                </h4>
                <hr>
              </h6>
              <h4 class="text-16-sb">
                  ({{contactPersonList.length}}) Contact Person
                  <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="goToContactPersonForm()"></i>
              </h4>
              <div v-if="contactPersonListLoading">
                <div class="spinner-border mt-5 ml-5" role="status">
                  <div><span style="color:white;">_</span>
                  </div>
                </div>
              </div>
              <h5 v-for="contactPerson in contactPersonList" class="text-16-m" :key="contactPerson.id">
                <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToContactPersonForm(contactPerson.id)"></i>
                {{contactPerson.role}} - {{contactPerson.name}}
                <br>
                <i class="fas fa-phone fa-xs"></i> {{contactPerson.phone}}
                <br>
                <div v-if="contactPerson.email.length > 0">
                  <i class="fas fa-envelope fa-xs"></i> {{contactPerson.email}} 
                </div>
                <div v-if="contactPerson.date_of_birth != null && contactPerson.date_of_birth != '0000-00-00' ">
                  <i class="fas fa-calendar-alt fa-xs"></i> {{contactPerson.date_of_birth | dayFormat}}
                </div>
              </h5>
            </div>
          </div>
        </div>

        <div class="modal fade" id="modal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h4 class="modal-title">Payment Info</h4>
              </div>

              <form @submit.prevent="addPaymentInfo">
                <div class="modal-body"> 
                  <FormulateInput
                      type="date"
                      label="Tanggal"
                      name="payment_date"
                      v-model="formFill.payment_date"
                      outer-class="form-group"
                      input-class="form-control rounded-pill"
                      autocomplete="off"
                    />
                  <FormulateInput
                      type="number"
                      label="Nominal"
                      name="payment_nominal"
                      v-model="formFill.payment_nominal"
                      placeholder= "Rp. "
                      outer-class="form-group"
                      input-class="form-control rounded-pill"
                      autocomplete="off"
                    />
                  <FormulateInput
                      type="date"
                      label="Jatuh Tempo"
                      name="payment_deadline"
                      v-model="formFill.payment_deadline"
                      outer-class="form-group"
                      input-class="form-control rounded-pill"
                      autocomplete="off"
                    />
                  <FormulateInput
                    type="text"
                    label="Nomor Rekening"
                    name="payment_account_number"
                    v-model="formFill.payment_account_number"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                    autocomplete="off"
                  />
                  <FormulateInput
                    type="text"
                    label="Contact Accounting"
                    name="payment_contact_person"
                    v-model="formFill.payment_contact_person"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                    autocomplete="off"
                  />
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

        <div class="modal fade" id="modal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h4 class="modal-title">Agreement</h4>
              </div>

              <form @submit.prevent="addAgreementLinkDocument">
                <div class="modal-body"> 
                  <div class="form-group">
                    <label>Link Dokumen</label>
                      <input v-model="formLink.link_document" type="url" name="link_document" class="form-control rounded-pill" autocomplete="off">
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

        <div class="col-12 offset-md-8 col-md-3 d-none d-sm-block position-fixed">
          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <div v-if="personInChargeListLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-16-sb">
                  ({{personInChargeList.length}}) Person In Charge
                  <i class="fas fa-plus fa-sm cursor-pointer text-primary" @click="goToPICForm(customer.id)"></i>
              </h4>
              <hr>   
              <h5 v-for="(person, index) in personInChargeList" class="text-16-m" :key="person.id">
                  ({{person.role | checkRole}}) - {{person.user.name}}
                  <i class="fas fa-trash fa-sm text-danger cursor-pointer" @click="deletePersonInCharge(index)"></i>
              </h5>
            </div>
          </div>
        </div>
        
        <div class="col-12 offset-md-8 col-md-3 d-none d-sm-block position-absolute">
          <div class="row">
            <div class="text-16-sb position-fixed">
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="addModal"></i>
              Comment:
              <div v-if="customerCommentListLoading">
                <div class="spinner-border mt-5 ml-5" role="status">
                    <div><span style="color:white;">_</span>
                    </div>
                </div>
              </div>
              <div v-for="comment in customerCommentList" :key="comment.id" class="text-14-m">
                <span class="text-16-sb"> {{comment.user.name}} </span> - {{comment.description}} 
                <!-- <i class="fas fa-trash fa-sm text-danger cursor-pointer" @click="deleteClass(comment.id)"></i> -->
              </div>
            </div>
            
            <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">Add Comment</h4>
                  </div>

                  <form @submit.prevent="addCustomerComment">
                    <div class="modal-body"> 
                      <FormulateInput
                          type="text"
                          label="Comment"
                          name="description"
                          v-model="form.description"
                          outer-class="form-group"
                          input-class="form-control rounded-pill"
                          autocomplete="off"
                        />
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
          </div>
        </div>

        <div class="offset-3 col-md-5 pl-5">
          <h3 class="text-24-sb">({{activityList.length}})
              Aktifitas
              <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="goToActivityForm()"></i>
          </h3>
          <div v-if="activityListLoading">
            <div class="spinner-border mt-5 ml-5" role="status">
              <div><span style="color:white;">_</span>
              </div>
            </div>
          </div>
          <div v-if="activityListLoading == false && activityList.length == 0">
              <h3 class="mt-3 ml-5">Belum ada aktifitas</h3>
          </div>
          <div v-for="(activity, index) in activityList" :key="activity.id">
            <div class="d-flex align-items-center bg-white shadow-sm rounded p-3 mb-3 select">
              <div>
                <div class="font-weight-bold text-16-m">
                    <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToActivityForm(activity.id)"></i>
                    {{index + 1}}. {{activity.topic}}
                </div>
                <div class="text-10-sb">{{activity.date_time | dayFormat}} - {{activity.date_time | timeFormat}} - {{activity.user.name}}</div>
                <div class="text-12-m">{{activity.description}}</div>
                <br>
                <div class="text-16-sb">
                  <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="addAnotherModal(activity.id)"></i>
                  Comment:
                </div>
                <div v-if="activityCommentListLoading">
                  <div class="spinner-border mt-5 ml-5" role="status">
                      <div><span style="color:white;">_</span>
                      </div>
                  </div>
                </div>
                <div v-for="comment in activityCommentList" :key="comment.id">
                  <div v-if="comment.activity_id == activity.id">
                    <!-- <i class="fas fa-trash fa-sm text-danger cursor-pointer" @click="deleteComment(comment.id)"></i> -->
                    <span class="text-14-sb"> {{comment.user.name}} </span> - {{comment.description}}
                  </div>  
                </div>

                <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h4 class="modal-title">Add Comment</h4>
                      </div>

                      <form @submit.prevent="addActivityComment">
                        <div class="modal-body">
                          <FormulateInput
                              type="text"
                              label="Comment"
                              name="description"
                              v-model="formValues.description"
                              outer-class="form-group"
                              input-class="form-control rounded-pill"
                              autocomplete="off"
                           /> 
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

        "personInChargeList": [],
        "personInChargeListLoading": true,

        "activityList": [],
        "activityListLoading": true,

        "activityCommentList": [],
        "activityCommentListLoading": true,

        "customerCommentList": [],
        "customerCommentListLoading": true,

        form: {},
        formValues: {},
        formFill: {},
        formLink: {},
        isLoading: false
    }
  },
  async created() {
    this.initCustomer()
    this.initContactPersonList()
    this.initPersonInChargeList()
    this.initActivityList()
    this.initActivityCommentList()
    this.initCustomerCommentList()
  },
  methods: {
    addModal(){
      $('#modal').modal('show')
    },
    addAnotherModal(id){
      $('#modal1').modal('show')
      this.selectedActivityID = id
    },
    addPaymentInfoModal(){
      $('#modal2').modal('show')
    },
    agreementEditModal(){
      $('#modal3').modal('show')
    },
    async addCustomerComment(){
      let postData = JSON.parse(JSON.stringify(this.form))
    
      this.isLoading = true
      let res = {}

      if (!this.id) {
        postData.user_id = this.getUser().id
        postData.customer_id = this.$route.params.id
        res = await this.apiPost("customer_comments", postData)
      }
        
      const resData = res.data
      this.isLoading = false
      
      if (resData.status) {
        $('#modal').modal('hide')
        this.$toasted.success("Sukses menambahkan komentar", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initCustomerCommentList()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      this.form.description = ' '
      console.log(postData)
    },
    async addActivityComment(){
      let postData = JSON.parse(JSON.stringify(this.formValues))
      
      this.isLoading = true
      let res = {}

      if (!this.id) {
        postData.user_id = this.getUser().id
        postData.activity_id =this.selectedActivityID
        res = await this.apiPost("activity_comments", postData)
      }

      const resData = res.data
      this.isLoading = false
        
      if (resData.status) {
        $('#modal1').modal('hide')
        this.$toasted.success("Sukses menambahkan komentar", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initActivityCommentList()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      this.formValues.description = ' '
      console.log(postData)
    },
    async addPaymentInfo() {
      let postData = JSON.parse(JSON.stringify(this.formFill))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        res = await this.apiPatch("customers/" + this.$route.params.id, postData)
      }
        
      const resData = res.data
      this.isLoading = false
        
      if (resData.status) {
        $('#modal2').modal('hide')
        this.$toasted.success("Sukses menambahkan/update info pembayaran", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initCustomer()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      console.log(postData)
    },
    async addAgreementLinkDocument() {
      let postData = JSON.parse(JSON.stringify(this.formLink))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        res = await this.apiPatch("customers/" + this.$route.params.id, postData)  
      }

      const resData = res.data
      this.isLoading = false

      if (resData.status) {
        $('#modal3').modal('hide')
        this.$toasted.success("Sukses menambahkan/update link dokumen", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initCustomer()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      console.log(postData)
    },
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
    async initPersonInChargeList() {
      const res = await this.apiGet("customer_users?&filter[]=customer_id," + this.$route.params.id + "&join[]=users->user_id")
      
      this.personInChargeList = []
      this.personInChargeList = res.data.data
      this.personInChargeListLoading = false
    },
    async initActivityList() {
      const res = await this.apiGet("activities?filter[]=customer_id," + this.$route.params.id + "&join[]=users->user_id")

      this.activityList = []
      this.activityList = res.data.data.reverse()
      this.activityListLoading = false
    },
    async initActivityCommentList() {
      const res = await this.apiGet("activity_comments?join[]=users->user_id")

      this.activityCommentList = []
      this.activityCommentList = res.data.data
      this.activityCommentListLoading = false
      
    },
    async initCustomerCommentList() {
      const res = await this.apiGet("customer_comments?&filter[]=customer_id," + this.$route.params.id + "&join[]=users->user_id")

      this.customerCommentList = []
      this.customerCommentList = res.data.data
      this.customerCommentListLoading = false
      
    },
    // async deleteClass(id) {
    //   this.$swal({
    //     title: "Apakah anda yakin?",
    //     buttons: true,
    //     dangerMode: true,
    //   }).then(async (result) => {
    //     if (result) {
    //       const res = await this.apiDelete("customer_comments/" + id);

    //       if (!res.data.success) {
    //         this.$swal({
    //           title: "Delete Sukses",
    //           icon: "success",
    //         });
    //         this.initCustomerCommentList()
    //       }
    //     }
    //   });
    // },
    // async deleteComment(id) {
    //   this.$swal({
    //     title: "Apakah anda yakin?",
    //     buttons: true,
    //     dangerMode: true,
    //   }).then(async (result) => {
    //     if (result) {
    //       const res = await this.apiDelete("activity_comments/" + id);

    //       if (!res.data.success) {
    //         this.$swal({
    //           title: "Delete Sukses",
    //           icon: "success",
    //         });
    //         this.initActivityCommentList()
    //       }
    //     }
    //   });
    // },
    async deletePersonInCharge(index) {
      this.$swal({
          title: "Anda yakin mau menghapus?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      })
      .then(async (willDelete) => {
          if (willDelete) {
            const res = await this.apiDelete("customer_users/" + this.personInChargeList[index].id)
              
            this.personInChargeList.splice(index, 1)

            if(!res.data.success){
              this.$swal({
              title: "Delete Sukses",
              icon: "success",
            })
            this.initPersonInChargeList()
            }
          }
      });
    },
    goToContactPersonForm(id) {
        var link = "/contactperson/form?customer_id=" + this.$route.params.id
      
        if (id != null)
            link += "&id=" + id

        this.$router.push(link)
    },
    goToPICForm() {
        var link = "/customer/personInCharge/form?customer_id=" + this.$route.params.id

        this.$router.push(link)
    },
    goToForm(id) {
      var link = "/customer/form"
      
      if (id != null)
          link += "?id=" + id

      this.$router.push(link)
    },
    goToActivityForm(id) {
      var link = "/activity/form?customer_id=" + this.$route.params.id

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
    dayFormat: function(date) {
      return moment(date).local().format('dddd, DD MMMM YYYY');
    },
    timeFormat: function(time){
      return moment(time).local().format('HH:mm');
    },
    checkRole: function(role) {
        let tempRole = ""
        switch(role) {
        case "1":
            tempRole = "Anggota"
            break;
        default:
            tempRole = "Ketua"
        }

        return tempRole
    },
    getCustomerStatus(value) {
      let status = ""

      if (value == "0") {
        status = "Belum di kontak"
      } else if (value == "1") {
        status = "Ditolak"
      } else if (value == "2") {
        status = "Belum di Jawab"
      } else if (value == "3") {
        status = "Follow Up"
      } else if (value == "4") {
        status = "Kunjungan"
      } else if (value == "5") {
        status = "Penawaran"
      } else if (value == "6") {
        status = "Negosiasi"
      } else if (value == "7") {
        status = "Proses MoU"
      } else if (value == "8") {
        status = "Kerjasama"
      } else if (value == "9") {
        status = "Perpanjangan"
      } else if (value == "10") {
        status = "Lain lain"
      }

      return status
    }
  }
}
</script>

<style>

</style>
