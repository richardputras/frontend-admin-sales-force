<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-12 col-md-3 position-absolute">
            <div class="bg-white shadow-sm rounded p-3 mb-3">
                <div v-if="employeeRequestLoading">
                    <div class="spinner-border mt-5 ml-5" role="status">
                        <div><span style="color:white;">_</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="text-24-sb">
                        <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToForm(employeeRequest.id)"></i>
                         Divisi:  {{employeeRequest.division | getEmployeeDivision}}
                    </h4>
                    <hr>
                    <h4 class="text-24-sb">
                        Status : {{employeeRequest.status | getEmployeeStatus}}
                    </h4>
                    <hr>
                    <h4 class="text-24-sb">
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Diterima HRD'"
                        v-if="employeeRequest.status == 0 && checkPermission('EmployeeRequest.UpdateStatus')"
                        v-model="values.status"
                        @click="changeStatus(1)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Dalam Proses'"
                        v-if="employeeRequest.status == 1 && checkPermission('EmployeeRequest.UpdateStatus')"
                        v-model="values.status"
                        @click="changeStatus(2)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Sortir Tahap 1'"
                        v-if="employeeRequest.status == 2 && checkPermission('EmployeeRequest.UpdateStatus')"
                        v-model="values.status"
                        @click="changeStatus(3)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Sortir Tahap 1 Selesai'"
                        v-if="employeeRequest.status == 3 && checkPermission('EmployeeRequest.Update')"
                        v-model="values.status"
                        @click="changeStatus(4)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Proses Psikotes'"
                        v-if="employeeRequest.status == 4 && checkPermission('EmployeeRequest.UpdateStatus')"
                        v-model="values.status"
                        @click="changeStatus(5)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Tes dari Kepdiv'"
                        v-if="employeeRequest.status == 5 && checkPermission('EmployeeRequest.UpdateStatus')"
                        v-model="values.status"
                        @click="changeStatus(6)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Sortir Tahap 2'"
                        v-if="employeeRequest.status == 6 && checkPermission('EmployeeRequest.UpdateStatus')"
                        v-model="values.status"
                        @click="changeStatus(7)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Sortir Tahap 2 Selesai'"
                        v-if="employeeRequest.status == 7 && checkPermission('EmployeeRequest.Update')"
                        v-model="values.status"
                        @click="changeStatus(8)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Interview'"
                        v-if="employeeRequest.status == 8 && checkPermission('EmployeeRequest.UpdateStatus')"
                        v-model="values.status"
                        @click="changeStatus(9)"
                        input-class="btn btn-primary rounded-pill"
                      />
                      <FormulateInput
                        type="button"
                        :disabled="isLoading"
                        :label="isLoading ? 'Loading...' : 'Selesai'"
                        v-if="employeeRequest.status == 9 && checkPermission('EmployeeRequest.UpdateStatus')"
                        v-model="values.status"
                        @click="changeStatus(10)"
                        input-class="btn btn-primary rounded-pill"
                      />
                    </h4>
                    <hr>
                    <h4 class="text-16-sb">
                        Posisi : <span class="text-16-m">{{employeeRequest.position}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Jumlah Diperlukan : <span class="text-16-m">{{employeeRequest.quantity}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Tanggal Diperlukan : <span class="text-16-m">{{employeeRequest.date_required | dateFormat}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Gaji Minimal : <span class="text-16-m">{{employeeRequest.min_salary}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Gaji Maksimal : <span class="text-16-m">{{employeeRequest.max_salary}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Status Pegawai : <span class="text-16-m">{{employeeRequest.level | getEmployeeLevel }}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Jenis Kelamin : <span class="text-16-m">{{employeeRequest.gender | getEmployeeGender}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Usia Minimal : <span class="text-16-m">{{employeeRequest.min_age}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Usia Maksimal : <span class="text-16-m">{{employeeRequest.max_age}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Jenjang Pendidikan : <span class="text-16-m">{{employeeRequest.education | getEmployeeEducation}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Jurusan : <span class="text-16-m">{{employeeRequest.major}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Jurusan Alternatif : <span class="text-16-m">{{employeeRequest.alternate_major}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        IPK Minimal : <span class="text-16-m">{{employeeRequest.grade_point_average}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Pengalaman : <span class="text-16-m">{{employeeRequest.experience}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Skill Wajib : <span class="text-16-m">{{employeeRequest.primary_skill}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Skill Diinginkan : <span class="text-16-m">{{employeeRequest.secondary_skill}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Soft Skill : <span class="text-16-m">{{employeeRequest.soft_skill}}</span> 
                    </h4>
                    <h4 class="text-16-sb">
                        Permintaan Tambahan : <span class="text-16-m">{{employeeRequest.requirement}}</span> 
                    </h4>
                </div>
            </div>
        </div>

        <div class="col-12 offset-md-8 col-md-3 d-none d-sm-block position-absolute">
          <h3 class="text-24-sb">({{ this.counter }})
              Kandidat Tidak Lolos
          </h3>
          <div v-if="employeeCandidateListLoading">
            <div class="spinner-border mt-5 ml-5" role="status">
              <div><span style="color:white;">_</span>
              </div>
            </div>
          </div>
          <div v-for="(candidate, index) in employeeCandidateList" :key="candidate.name">
            <div class="d-flex align-items-center bg-white shadow-sm rounded p-3 mb-3 select" v-if="candidate.is_rejected == 1 && candidate.rejection_at_status != employeeRequest.status">
              <div>
                <div class="font-weight-bold text-16-m">
                  <span> {{index + 1}}. </span> {{candidate.name}} 
                  <div style="color:red"> ditolak pada tahap {{candidate.rejection_at_status | getRejectedAtStatus}} </div> 
                   Register Date: <span class="text-12-sb" >{{candidate.register_date | dayFormat}}</span>
                  <br>
                   Deskripsi: <span class="text-12">{{candidate.description}}</span>
                  <br>
                   Link Berkas: <span class="text-12-sb"><a :href="candidate.link" target="_blank">{{candidate.link}}</a></span>
                </div>
              </div>
            </div>                 
          </div>
        </div>

        <div class="offset-3 col-md-5 pl-5">
            <h3 class="text-24-sb">({{ (employeeCandidateList.length-this.counter) }})
                Calon Kandidat
                <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="goToCandidateForm()" v-if="employeeRequest.status == 2 && checkPermission('EmployeeRequest.UpdateStatus')"></i>
            </h3>
            <div v-if="employeeCandidateListLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <div v-if="employeeCandidateListLoading == false && employeeCandidateList.length == 0">
                <h3 class="mt-3 ml-5">Belum ada calon</h3>
            </div>
            <div v-for="(candidate, index) in employeeCandidateList" :key="candidate.name">
                <div class="d-flex align-items-center bg-white shadow-sm rounded p-3 mb-3 select" v-if="candidate.is_rejected == 0 || candidate.rejection_at_status == employeeRequest.status">
                    <div>
                      <div class="font-weight-bold text-16-m">
                        <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToCandidateForm(candidate.id)" v-if="employeeRequest.status == 2 && checkPermission('EmployeeRequest.UpdateStatus')"></i>
                        <span> {{index + 1}}. </span> {{candidate.name}} 
                         <div v-if="candidate.is_rejected == 1 && employeeRequest.status == 3" style="color:red;">Tidak lolos ke tahap selanjutnya</div>
                         <div v-if="candidate.is_rejected == 1 && employeeRequest.status == 5" style="color:red;">Tidak lolos ke tahap selanjutnya</div>
                         <div v-if="candidate.is_rejected == 1 && employeeRequest.status == 7" style="color:red;">Tidak lolos ke tahap selanjutnya</div>
                         <div v-if="candidate.is_rejected == 1 && employeeRequest.status == 9" style="color:red;">Tidak lolos ke tahap selanjutnya</div> 
                         <div v-else-if="candidate.is_rejected == 0 && employeeRequest.status == 4" style="color:green;">Lolos ke tahap selanjutnya</div>
                         <div v-else-if="candidate.is_rejected == 0 && employeeRequest.status == 6" style="color:green;">Lolos ke tahap selanjutnya</div>
                         <div v-else-if="candidate.is_rejected == 0 && employeeRequest.status == 8" style="color:green;">Lolos ke tahap selanjutnya</div>
                         <div v-else-if="candidate.is_rejected == 0 && employeeRequest.status == 10" style="color:green;">Diterima sebagai karyawan baru</div>
                        <i class="fas fa-trash fa-sm text-danger cursor-pointer" @click="deleteCandidate(candidate.id)" v-if="employeeRequest.status == 2 && checkPermission('EmployeeRequest.UpdateStatus')"></i>
                      </div>
                      Register Date: <span class="text-12-sb" >{{candidate.register_date | dayFormat}}</span>
                      <br>
                      Deskripsi: <span class="text-12">{{candidate.description}}</span>
                      <br>
                      Link Berkas: <span class="text-12-sb"><a :href="candidate.link" target="_blank">{{candidate.link}}</a></span>
                      <br>
                      <div class="btn-toolbar">
                        <FormulateInput
                          type="button"
                          :disabled="isLoading"
                          :label="isLoading ? 'Loading...' : 'Lolos'"
                          v-model="textValues"
                          v-if="employeeRequest.status == 3 && checkPermission('EmployeeRequest.Update') && candidate.is_rejected == 1"
                          @click="selectCandidate(0, candidate.id)"
                          input-class="btn btn-primary rounded-pill"
                        />
                        <FormulateInput
                          type="button"
                          :disabled="isLoading"
                          :label="isLoading ? 'Loading...' : 'Lolos'"
                          v-model="textValues"
                          v-if="employeeRequest.status == 7 && checkPermission('EmployeeRequest.Update') && candidate.is_rejected == 1"
                          @click="selectCandidate(0, candidate.id)"
                          input-class="btn btn-primary rounded-pill"
                        />
                        <FormulateInput
                          type="button"
                          :disabled="isLoading"
                          :label="isLoading ? 'Loading...' : 'Lolos'"
                          v-model="textValues"
                          v-if="employeeRequest.status == 5 && checkPermission('EmployeeRequest.UpdateStatus') && candidate.is_rejected == 1"
                          @click="selectCandidate(0, candidate.id)"
                          input-class="btn btn-primary rounded-pill"
                        />
                        <FormulateInput
                          type="button"
                          :disabled="isLoading"
                          :label="isLoading ? 'Loading...' : 'Lolos'"
                          v-model="textValues"
                          v-if="employeeRequest.status == 9 && checkPermission('EmployeeRequest.UpdateStatus') && candidate.is_rejected == 1"
                          @click="selectCandidate(0, candidate.id)"
                          input-class="btn btn-primary rounded-pill"
                        />
                        <FormulateInput
                          type="button"
                          :disabled="isLoading"
                          :label="isLoading ? 'Loading...' : 'Tidak Lolos'"
                          v-model="textValues"
                          v-if="employeeRequest.status == 3 && checkPermission('EmployeeRequest.Update') && candidate.is_rejected == 0"
                          @click="selectCandidate(1, candidate.id)"
                          input-class="btn btn-danger rounded-pill ml-2"
                        />
                        <FormulateInput
                          type="button"
                          :disabled="isLoading"
                          :label="isLoading ? 'Loading...' : 'Tidak Lolos'"
                          v-model="textValues"
                          v-if="employeeRequest.status == 7 && checkPermission('EmployeeRequest.Update') && candidate.is_rejected == 0"
                          @click="selectCandidate(1, candidate.id)"
                          input-class="btn btn-danger rounded-pill ml-2"
                        />
                        <FormulateInput
                          type="button"
                          :disabled="isLoading"
                          :label="isLoading ? 'Loading...' : 'Tidak Lolos'"
                          v-model="textValues"
                          v-if="employeeRequest.status == 5 && checkPermission('EmployeeRequest.UpdateStatus') && candidate.is_rejected == 0"
                          @click="selectCandidate(1, candidate.id)"
                          input-class="btn btn-danger rounded-pill ml-2"
                        />
                        <FormulateInput
                          type="button"
                          :disabled="isLoading"
                          :label="isLoading ? 'Loading...' : 'Tidak Lolos'"
                          v-model="textValues"
                          v-if="employeeRequest.status == 9 && checkPermission('EmployeeRequest.UpdateStatus') && candidate.is_rejected == 0"
                          @click="selectCandidate(1, candidate.id)"
                          input-class="btn btn-danger rounded-pill ml-2"
                        />
                      </div>
                      <br>
                      <div class="text-16-sb">
                        <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="addAnotherModal(candidate.id)" v-if="checkPermission('EmployeeRequest.Update')"></i>
                        Comment:
                      </div>
                      <div v-if="candidateCommentListLoading">
                        <div class="spinner-border mt-5 ml-5" role="status">
                          <div><span style="color:white;">_</span>
                          </div>
                        </div>
                      </div>
                      <div v-for="comment in candidateCommentList" :key="comment.id" class="text-14-m">
                        <div v-if="comment.employee_request_candidate_id == candidate.id">
                          <i class="fas fa-trash fa-sm text-danger cursor-pointer" @click="deleteComment(comment.id)"></i> 
                          <span class="text-14-sb"> {{comment.description}} </span> - {{comment.user.name}} 
                        </div> 
                      </div>
                    </div>

                    <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                              <h4 class="modal-title">Add Comment</h4>
                          </div>

                          <form @submit.prevent="addCandidateComment()">
                            <div class="modal-body"> 
                              <div class="form-group">
                                <label>Comment</label>
                                  <input v-model="formValues.description" type="text" name="description" class="form-control rounded-pill">
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
      employeeRequest: {},
      employeeRequestLoading: true,

      employeeCandidateList: [],
      employeeCandidateListLoading: true,

      candidateCommentList: [],
      candidateCommentListLoading: true,

      formValues: {},
      values: {},
      textValues: {},
      counter: 0,
      count: 0,
      isLoading: false
    }
  },
  async created() {
    this.initEmployeeRequest()
    this.initEmployeeCandidateList()
    this.initCandidateCommentList()
  },
  methods: {
    addModal() {
      $('#modal').modal('show');
    },
    addAnotherModal(id) {
      $('#modal1').modal('show');
      this.selectedRequestCandidateID = id;
      console.log(this.selectedRequestCandidateID)
    },
    async addCandidateComment() {
      let postData = JSON.parse(JSON.stringify(this.formValues))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        postData.user_id = this.getUser().id
        postData.employee_request_candidate_id = this.selectedRequestCandidateID
      
        res = await this.apiPost("employee_request_candidate_comments", postData)
      }
          
      const resData = res.data
      this.isLoading = false

      if (resData.status) {
        $('#modal1').modal('hide');
        this.$toasted.success("Sukses menambahkan komentar", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initCandidateCommentList()
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
    async changeStatus(value) {
      let postData = JSON.parse(JSON.stringify(this.values))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        postData.status = value

        if (value == 4 || value == 6 || value == 8 || value == 10) {
          let rejectedCandidate = this.employeeCandidateList.filter(item => item.is_rejected == 1 && item.rejection_at_status == this.employeeRequest.status)
          if (rejectedCandidate.length == 0) {
            this.$swal({
              title: "Apakah Anda yakin akan meloloskan semua kandidat?",
              buttons: true,
              dangerMode: true,
            }).then(async (result) => {
              if (result) {
                res = await this.apiPatch("employee_requests/" + this.$route.params.id, postData)
              }

              this.isLoading = false

              if (res.status) {
                this.$toasted.success("Sukses mengubah status", {
                  theme: "toasted-primary",
                  position: "bottom-right",
                  duration: 2500
                })
                this.initEmployeeRequest()
              } else {
                this.$toasted.error(res.message, {
                  theme: "toasted-primary",
                  position: "bottom-right",
                  duration: 2500
                })
              }
            })
          } else if (rejectedCandidate.length > 0 && rejectedCandidate.length < this.employeeCandidateList.length) {
            this.count = 0
            var result = this.employeeCandidateList.filter(item => item.is_rejected == 1 && item.rejection_at_status == this.employeeRequest.status).length
            this.count += result

            var counter = this.employeeCandidateList.filter(item => item.is_rejected == 0).length

            this.$swal({
              title: "Apakah Anda yakin akan meloloskan " + counter + " kandidat dan tidak meloloskan " +  this.count + " kandidat?",
              buttons: true,
              dangerMode: true,
            }).then(async (result) => {
              if (result) {
                res = await this.apiPatch("employee_requests/" + this.$route.params.id, postData)
              }

              this.isLoading = false

              if (res.status) {
                this.$toasted.success("Sukses mengubah status", {
                  theme: "toasted-primary",
                  position: "bottom-right",
                  duration: 2500
                })
                this.initEmployeeRequest()
                this.initEmployeeCandidateList()
              } else {
                this.$toasted.error(res.message, {
                  theme: "toasted-primary",
                  position: "bottom-right",
                  duration: 2500
                })
              }
            })
          } else {
            this.$swal({
              title: "Apakah Anda yakin semua kandidat tidak lolos?",
              buttons: true,
              dangerMode: true,
            }).then(async (result) => {
              if (result) {
                res = await this.apiPatch("employee_requests/" + this.$route.params.id, postData)
              }

              this.isLoading = false

              if (res.status) {
                this.$toasted.success("Sukses mengubah status", {
                  theme: "toasted-primary",
                  position: "bottom-right",
                  duration: 2500
                })
                this.initEmployeeRequest()
              } else {
                this.$toasted.error(res.message, {
                  theme: "toasted-primary",
                  position: "bottom-right",
                  duration: 2500
                })
              }
            })
          }
        } else {
          res = await this.apiPatch("employee_requests/" + this.$route.params.id, postData)

          this.isLoading = false
          
          if (res.status) {
            this.$toasted.success("Sukses mengubah status", {
              theme: "toasted-primary",
              position: "bottom-right",
              duration: 2500
            })
            this.initEmployeeRequest()
          } else {
            this.$toasted.error(res.message, {
              theme: "toasted-primary",
              position: "bottom-right",
              duration: 2500
            })
          }
        }
      }
    },
    async selectCandidate(value, id) {
      let postData = JSON.parse(JSON.stringify(this.textValues))
      console.log(postData)

      this.isLoading = true
      let res = {}

      this.selectedID = id
      console.log(this.selectedID)

      if (!this.id) {
        postData.is_rejected = value
        
        if (value == 0) {
          res = await this.apiPatch("employee_request_candidates/" + this.selectedID, postData)
          
        } else {
          postData.rejection_at_status = this.employeeRequest.status
          postData.rejection_by = this.getUser().id
          postData.rejection_note = "Belum sesuai dengan kriteria"
          res = await this.apiPatch("employee_request_candidates/" + this.selectedID, postData)
        }
        
        this.isLoading = false
          
        if (res.status) {
          this.$toasted.success("Sukses", {
            theme: "toasted-primary",
            position: "bottom-right",
            duration: 2500
          })
          this.initEmployeeCandidateList()  
        } else {
          this.$toasted.error(res.message, {
            theme: "toasted-primary",
            position: "bottom-right",
            duration: 2500
          })
        }
      } 
      console.log(res)
    },
    async initEmployeeRequest() {
      const res = await this.apiGet("employee_requests/" + this.$route.params.id)
      
      this.employeeRequest = {}
      this.employeeRequest = res.data.data
      this.employeeRequestLoading = false
    },
    async initEmployeeCandidateList() {
      const res = await this.apiGet("employee_request_candidates?filter[]=employee_request_id," + this.$route.params.id)

      this.employeeCandidateList = []
      this.employeeCandidateList = res.data.data.reverse()
      this.employeeCandidateListLoading = false
      
      this.counter = 0
      var count = this.employeeCandidateList.filter(item => item.is_rejected == 1 && item.rejection_at_status != this.employeeRequest.status).length
      this.counter += count
    },
    async initCandidateCommentList() {
      const res = await this.apiGet("employee_request_candidate_comments?join[]=employee_request_candidates->employee_request_candidate_id&join[]=users->user_id")

      this.candidateCommentList = []
      this.candidateCommentList = res.data.data
      this.candidateCommentListLoading = false  
    },
    async deleteComment(id) {
      this.$swal({
        title: "Apakah anda yakin?",
        buttons: true,
        dangerMode: true,
      }).then(async (result) => {
        if (result) {
          const res = await this.apiDelete("employee_request_candidate_comments/" + id);

          if (!res.data.success) {
            this.$swal({
              title: "Delete Sukses",
              icon: "success",
            });
            this.initCandidateCommentList()
          }
        }
      });
    },
    async deleteCandidate(id) {
      this.$swal({
        title: "Apakah anda yakin?",
        buttons: true,
        dangerMode: true,
      }).then(async (result) => {
        if (result) {
          const res = await this.apiDelete("employee_request_candidates/" + id);

          if (!res.data.success) {
            this.$swal({
              title: "Delete Sukses",
              icon: "success",
            });
            this.initEmployeeCandidateList()
          }
        }
      });
    },
    goToForm(id) {
      var link = "/hrd/form"
    
      if (id)
          link += "?id=" + id

      this.$router.push(link)
    },
    goToCandidateForm(id) {
      var link = "/candidate/form?employee_request_id=" + this.$route.params.id 

      if (id)
          link += "&id=" + id
          
      this.$router.push(link)
    }
  },
  filters: {
    dayFormat: function(date) {
      return moment(date).local().format('dddd, DD MMMM YYYY');
    },
    dateFormat: function(date) {
      return moment(date).local().format('DD MMMM YYYY');
    },
    getEmployeeGender(value) {
     let status = "" 
      if (value == "0") {
        status = "Laki-Laki"
      } else if (value == "1") {
        status = "Perempuan"
      } else if (value == "2") {
        status = "Laki-laki dan Perempuan"
      }

      return status
    },
    getEmployeeDivision(value) {
      let status = ""

      if (value == "0") {
        status = "IT"
      } else if (value == "1") {
        status = "CT"
      } else if (value == "2") {
        status = "Marketing"
      } else if (value == "3") {
        status = "Admin"
      } else if (value == "4") {
        status = "Keuangan"
      } else if (value == "5") {
        status = "Audit"
      } else if (value == "6") {
        status = "Akademis"
      } else if (value == "7") {
        status = "Legal"
      } else if (value == "8") {
        status = "Training"
      } else if (value == "9") {
        status = "Pengembangan"
      } else if (value == "10") {
        status = "CSR"
      } else if (value == "11") {
        status = "Event"
      } else if (value == "12") {
        status = "RnD"
      } else if (value == "13") {
        status = "HRD"
      } else if (value == "14") {
        status = "General Affairs"
      }

      return status
    },
    getEmployeeEducation(value) {
      let status = ""

      if (value == "0") {
        status = "SMA/K"
      } else if (value == "1") {
        status = "Diploma"
      } else if (value == "2") {
        status = "S1"
      } else if (value == "3") {
        status = "S2"
      } else if (value == "4") {
        status = "S3"
      } else if (value == "5") {
        status = "Semua tingkat"
      }

      return status
    },
    getEmployeeStatus(value) {
      let status = ""

      if (value == "0") {
        status = "Menunggu konfirmasi HRD"
      } else if (value == "1") {
        status = "Diterima HRD"
      } else if (value == "2") {
        status = "Dalam proses pencarian"
      } else if (value == "3") {
        status = "Sortir Tahap 1"
      } else if (value == "4") {
        status = "Sortir Tahap 1 selesai"
      } else if (value == "5") {
        status = "Psikotes"
      } else if (value == "6") {
        status = "Tes dari Kepdiv"
      } else if (value == "7") {
        status = "Sortir Tahap 2"
      } else if (value == "8") {
        status = "Sortir Tahap 2 selesai"
      } else if (value == "9") {
        status = "Interview"
      } else if (value == "10") {
        status = "Selesai"
      }

      return status
    },
    getEmployeeLevel (value) {
      let status = ""

      if (value == "0") {
        status = "Non Staff"
      } else if (value == "1") {
        status = "Staff"
      } else if (value == "2") {
        status = "Supervisor"
      } else if (value == "3") {
        status = "Asisten Manajer"
      } else if (value == "4") {
        status = "Manajer"
      } else if (value == "5") {
        status = "Magang"
      }

      return status
    },
    getRejectedAtStatus(value) {
      let status = ""

      if (value == "3") {
        status = "Sortir Tahap 1"
      } else if (value == "5") {
        status = "Psikotes"
      } else if (value == "7") {
        status = "Sortir Tahap 2"
      } else if (value == "9") {
        status = "Interview"
      } 
      return status
    }
  }
}
</script>

<style>

</style>
