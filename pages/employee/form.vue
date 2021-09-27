<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Employee</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="No KTP"
                    type="text"
                    name="id_number"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                    validation="required"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="No Induk Pegawai"
                    type="text"
                    name="employee_id_number"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
            </div>
          
            <div class="row">
              <div class="col-12 col-sm-4">
                <FormulateInput
                    label="Nama Depan"
                    type="text"
                    name="first_name"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                    validation="required"
                />
              </div>
              <div class="col-12 col-sm-4">
                <FormulateInput
                    label="Nama Belakang"
                    type="text"
                    name="last_name"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
              <div class="col-12 col-sm-4">
                <FormulateInput
                    label="Gender"
                    type="select"
                    name="gender"
                    :options="[
                    {label: ' '},
                    {value: 0, label: 'Laki-Laki'}, 
                    {value: 1, label: 'Perempuan'}
                    ]"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"  
                />
              </div>
            </div>
            
            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Tempat Lahir"
                    type="text"
                    name="place_of_birth"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                /> 
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Tanggal Lahir"
                    type="date"
                    name="date_of_birth"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
            </div>

            <FormulateInput
                label="Alamat (Sesuai KTP)"
                type="textarea"
                name="main_address"
                outer-class="form-group"
                input-class="form-control"
            />

            <FormulateInput
                label="Alamat Sekarang"
                type="textarea"
                name="alternate_address"
                outer-class="form-group"
                input-class="form-control"
            />

            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Email Pribadi"
                    type="email"
                    name="email"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Email Kantor"
                    type="textarea"
                    name="corporate_email"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="No HP Pribadi"
                    type="text"
                    name="phone_number"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="No HP Kantor"
                    type="text"
                    name="corporate_phone_number"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
            </div>

            <div class="row">
                <div class="col-12 col-sm-9">
                    <FormulateInput
                        label="Status Pernikahan"
                        type="select"
                        name="marriage_status"
                        v-model="marriage_status" 
                        @change="showHide"
                        :options="[
                            {label: ' '},
                            {value: 0, label: 'Lajang'}, 
                            {value: 1, label: 'Menikah'},
                            {value: 2, label: 'Cerai Hidup'}
                        ]"
                        outer-class="form-group"
                        input-class="form-control rounded-pill"  
                    />
                </div>
                <div class="col-12 col-sm-3">
                    <FormulateInput
                        label="Jumlah Anak"
                        type="number"
                        v-model="total_child" 
                        v-if="showField"
                        name="total_child"
                        outer-class="form-group"
                        input-class="form-control rounded-pill"
                    />
                </div>
            </div>

            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Posisi"
                    type="select"
                    name="position"
                    :options="[
                      {label: ' '},
                      {value: 0, label: 'Non Staff'}, 
                      {value: 1, label: 'Staff'}, 
                      {value: 2, label: 'Supervisor'}, 
                      {value: 3, label: 'Kadiv'}, 
                      {value: 4, label: 'Wakil Kadiv'}
                    ]"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Divisi"
                    type="select"
                    name="division_id"
                    :options="[
                      {label: ' '},
                      {value: 0, label: 'IT'}, 
                      {value: 1, label: 'CT'}, 
                      {value: 2, label: 'Marketing & Development'}, 
                      {value: 3, label: 'Admin'}, 
                      {value: 4, label: 'Finance & Accounting'}, 
                      {value: 5, label: 'Audit'},
                      {value: 6, label: 'Akademik'},
                      {value: 7, label: 'Corporate Legal & HRD'},
                      {value: 8, label: 'Training'},
                      {value: 9, label: 'CSR'},
                      {value: 10, label: 'Event'},
                      {value: 11, label: 'RnD'},
                      {value: 12, label: 'General Affairs'}
                    ]"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
            </div>
            
            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Status Kerja"
                    type="select"
                    name="work_status"
                    :options="[
                      {label: ' '},
                      {value: 0, label: 'Full Time'},
                      {value: 1, label: 'Part Time'},
                      {value: 2, label: 'Magang'},
                      {value: 3, label: 'Freelance'}
                    ]"
                    outer-class="form-group"
                    input-class="form-control rounded-pill col-md-12"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Tanggal Masuk Kerja"
                    type="date"
                    name="start_work_date"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
            </div>
            <br>
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
export default {
  layout: "sidebar",
  data() {
    return {
      marriage_status: '',
      total_child: '',
      showField: true,
      id: 0,
      
      // divisionList: [],
      // divisionListLoading: true,

      // dropdownDivisionList: [],
      // selectedDropdownDivision: 0,

      formValues: {},
      isLoading: false
    }
  },
  async created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getEmployee(this.id)
    }

    // this.getDivisionList()
  },
  methods: {
    showHide: function(e) {
      console.log("Show "+e.target.value+ " fields")
      this.showField = e.target.value != '0'
    },
    async getEmployee(id) {
      const res = await this.apiGet("employees/" + id)
      this.formValues = res.data.data
    },
    // async getDivisionList() {
    //     const res = await this.apiGet("divisions")
    //     this.divisionList = res.data.data

    //     for (let i = 0; i < this.divisionList.length; i++) {
    //       const item = this.divisionList[i]
    //       this.selectedDropdownDivision = item.id
    //       this.dropdownDivisionList.push({value: item.id, label: item.name})
    //     }

    //     this.divisionListLoading = false
    // },
    goToBack() {
      this.$router.back()
    },
    async actionSave() {
      let postData = JSON.parse(JSON.stringify(this.formValues))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        res = await this.apiPost("employees", postData)
      } else {
        res = await this.apiPatch("employees/" + this.id, postData)
      }

      const resData = res.data
      this.isLoading = false

      if (resData.status) {
        this.$toasted.success(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        })
        this.$router.back()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        })
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
