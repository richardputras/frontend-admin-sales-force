<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Employee Request</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
            <div class="row">
              <div class="col-12 col-sm-5">
                  <FormulateInput
                  label="Divisi"
                  type="select"
                  name="division"
                  :options="[
                    {label: ' '},
                    {value: 0, label: 'IT'},
                    {value: 1, label: 'CT'},
                    {value: 2, label: 'Marketing'},
                    {value: 3, label: 'Admin'},
                    {value: 4, label: 'Keuangan'},
                    {value: 5, label: 'Audit'},
                    {value: 6, label: 'Akademis'},
                    {value: 7, label: 'Legal'},
                    {value: 8, label: 'Training'},
                    {value: 9, label: 'Pengembangan'},
                    {value: 10, label: 'CSR'},
                    {value: 11, label: 'Event'},
                    {value: 12, label: 'RnD'},
                    {value: 13, label: 'HRD'},
                    {value: 14, label: 'General Affairs'},
                  ]"
                  outer-class="form-group"
                  input-class="form-control rounded-pill"
                  validation="required"
                />
            </div>
            <div class="col-12 col-sm-5">
              <FormulateInput
                  label="Posisi"
                  type="textarea"
                  name="position"
                  placeholder="Cth: Frontend, Social Media, Animator"
                  outer-class="form-group"
                  input-class="form-control"
                />
            </div>
            <div class="col-12 col-sm-2">
              <FormulateInput
                  label="Jumlah"
                  type="number"
                  name="quantity"
                  outer-class="form-group"
                  input-class="form-control rounded-pill"
                />
            </div>
          </div>
          
          <div class="row">
            <div class="col-12 col-sm-12">
            <FormulateInput
              label="Tanggal Diperlukan"
              type="date"
              name="date_required"
              outer-class="form-group"
              input-class="form-control rounded-pill"
            />
            </div>
          </div>
          
          <div class="row">
            <div class="col-12 col-sm-6">
              <FormulateInput
                label="Min Gaji"
                type="number"
                name="min_salary"
                placeholder="IDR"
                outer-class="form-group"
                input-class="form-control rounded-pill"
              />
            </div>
             
            <div class="col-12 col-sm-6">
              <FormulateInput
                label="Max Gaji"
                type="number"
                name="max_salary"
                placeholder="IDR"
                outer-class="form-group"
                input-class="form-control rounded-pill"
              /> 
            </div>
          </div>   

          <FormulateInput
            label="Status"
            type="select"
            name="level"
            :options="[
              {label: ' '},
              {value: 0, label: 'Non Staff'},
              {value: 1, label: 'Staff'},
              {value: 2, label: 'Supervisor'},
              {value: 3, label: 'Manajer'},
              {value: 4, label: 'Asisten Manajer'},
              {value: 5, label: 'Magang'},
            ]"
            outer-class="form-group"
            input-class="form-control rounded-pill col-md-12"
            validation="required"
          />

          <div class="row">
            <div class="col-12 col-sm-4">
              <FormulateInput
                label="Gender"
                type="select"
                name="gender"
                :options="[
                  {label: ' '},
                  {value: 0, label: 'Laki-Laki'}, 
                  {value: 1, label: 'Perempuan'},
                  {value: 2, label: 'Laki-laki dan Perempuan'}
                ]"
                outer-class="form-group"
                input-class="form-control rounded-pill"  
               />
            </div>
            <div class="col-12 col-sm-4">
              <FormulateInput
                label="Min Usia"
                type="number"
                name="min_age"
                outer-class="form-group"
                input-class="form-control rounded-pill"
              /> 
            </div>
            <div class="col-12 col-sm-4">
              <FormulateInput
                label="Max Usia"
                type="number"
                name="max_age"
                outer-class="form-group"
                input-class="form-control rounded-pill"
              />
            </div>
            
          </div>
          <FormulateInput
            name="education"
            type="select"
            v-model="degree" 
            @change="showHide"
            label="Pendidikan Minimal"
            :options="[
              {label: ' '},
              {value: 0, label: 'SMA/K'}, 
              {value: 1, label: 'Diploma'}, 
              {value: 2, label: 'S1'}, 
              {value: 3, label: 'S2'}, 
              {value: 4, label: 'S3'},
              {value: 5, label: 'Semua tingkat'}
            ]"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <div class="row">
            <div class="col-12 col-sm-4">
              <FormulateInput
                label="Jurusan Utama"
                type="text"
                name="major"
                outer-class="form-group"
                input-class="form-control rounded-pill"
              />
            </div>
            
            <div class="col-12 col-sm-4">
              <FormulateInput
                label="Jurusan Alternatif"
                type="text"
                name="alternate_major"
                outer-class="form-group"
                input-class="form-control rounded-pill"
              />
            </div>

            <div class="col-12 col-sm-4">
              <FormulateInput
                label="IPK Minimal"
                type="text"
                v-model="grade_point_average" 
                v-if="showName"
                name="grade_point_average"
                outer-class="form-group"
                input-class="form-control rounded-pill"
              />
            </div>
          </div>

          <FormulateInput
            label="Pengalaman Bekerja"
            type="text"
            name="experience"
            outer-class="form-group"
            input-class="form-control"
          />
          
          <div class="row">
            <div class="col-12 col-sm-6">
              <FormulateInput
                label="Primary Skill"
                type="textarea"
                name="primary_skill"
                placeholder="Skill yg harus dimiliki"
                outer-class="form-group"
                input-class="form-control"
              />
            </div>
            <div class="col-12 col-sm-6">
              <FormulateInput
                label="Secondary Skill"
                type="textarea"
                name="secondary_skill"
                placeholder="Skill yang diinginkan"
                outer-class="form-group"
                input-class="form-control"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-12">
              <FormulateInput
                label="Soft Skill"
                type="textarea"
                name="soft_skill"
                placeholder="Cth: Komunikasi verbal yang baik"
                outer-class="form-group"
                input-class="form-control"
              />
            </div>
            <div class="col-12 col-sm-12">
              <FormulateInput
                label="Additional Requirement"
                type="textarea"
                name="requirement"
                placeholder="Cth: Menikah/Berhijab/Agama tertentu/Upload Portofolio"
                outer-class="form-group"
                input-class="form-control"
              />
            </div>
          </div>       
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
      degree:'',
      grade_point_average: '',
      showName: true,
      id: 0,
      formValues: {},
      isLoading: false
    }
  },
  async created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getEmployeeRequest(this.id)
    }
  },
  methods: {
    showHide: function(e){
      console.log("Show "+e.target.value+ " fields")
      this.showName = e.target.value !== '0'
    },
    async getEmployeeRequest(id) {
      const res = await this.apiGet("employee_requests/" + id)
      this.formValues = res.data.data
    },
    goToBack() {
      this.$router.back()
    },
    async actionSave() {
      let postData = this.formValues

      this.isLoading = true
      let res = {}

      if(!this.id) {
        postData.created_by = this.getUser().id
        postData.status = 0
        postData = JSON.parse(JSON.stringify(postData))
        res = await this.apiPost("employee_requests", postData)
        
      } else {
        // postData.updated_by = this.getUser().id

        postData = JSON.parse(JSON.stringify(postData))
        res = await this.apiPatch("employee_requests/" + this.id, postData)
      }

      const resData = res.data
      this.isLoading = false

      if(resData.status) {
        this.$toasted.success(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        })
        this.$router.back()
      }
      else {
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
