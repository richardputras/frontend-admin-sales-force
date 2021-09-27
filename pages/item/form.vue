<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Item</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                  label="Kode Barang"
                  type="text"
                  name="code"
                  outer-class="form-group"
                  input-class="form-control rounded-pill"
                 />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                  label="Nama Barang"
                  type="text"
                  name="name"
                  outer-class="form-group"
                  input-class="form-control rounded-pill"
                  validation="required"
                 />
              </div>
            </div>

            <div class="row"> 
              <div class="col-12 col-sm-5">
                <FormulateInput
                  label="Supplier"
                  type="select"
                  name="supplier_id"
                  :options="dropdownSupplierList"
                  outer-class="form-group"
                  input-class="form-control rounded-pill"
              />  
              </div>
              <div class="col-12 col-sm-5">
                <FormulateInput
                  label="Deskripsi"
                  type="textarea"
                  name="description"
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
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Tanggal Beli"
                    type="date"
                    name="pay_date"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Tanggal Datang"
                    type="date"
                    name="arrival_date"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                  />
              </div>
            </div>
            
            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Harga Beli"
                    type="number"
                    name="buy_price"
                    placeholder="IDR"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
              
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Estimasi Harga Jual"
                    type="number"
                    name="sell_price_estimate"
                    placeholder="IDR"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                  /> 
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Kondisi Barang"
                    type="select"
                    name="item_condition"
                    :options="[
                      {label: ' '},
                      {value: 0, label: 'Berfungsi Baik'},
                      {value: 1, label: 'Perlu Perbaikan'},
                      {value: 2, label: 'Proses Perbaikan'},
                      {value: 3, label: 'Rusak'}
                    ]"
                    outer-class="form-group"
                    input-class="form-control rounded-pill col-md-12"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Status Barang"
                    type="select"
                    name="item_status"
                    :options="[
                      {label: ' '},
                      {value: 0, label: 'Beli baru'}, 
                      {value: 1, label: 'Beli bekas'}, 
                      {value: 2, label: 'Hibah baru'}, 
                      {value: 3, label: 'Hibah bekas'}, 
                      {value: 4, label: 'Perlu dijual'},
                      {value: 5, label: 'Terjual'}
                    ]"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
            </div>
            
            <div class="row">
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Lokasi Barang"
                    type="select"
                    name="location_id"
                    :options="dropdownLocationList"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                    label="Kategori Barang"
                    type="select"
                    name="item_category"
                    :options="[
                      {label: ' '},
                      {value: 0, label: 'Perlengkapan'}, 
                      {value: 1, label: 'Peralatan'}
                    ]"
                    outer-class="form-group"
                    input-class="form-control rounded-pill"  
                />
              </div>
            </div>
            
            <div class="row"> 
              <div class="col-12 col-sm-6">
                <FormulateInput
                  label="Keterangan"
                  type="textarea"
                  name="note"
                  outer-class="form-group"
                  input-class="form-control"
                />
              </div>
              <div class="col-12 col-sm-6">
                <FormulateInput
                  label="PIC"
                  type="select"
                  name="employee_id"
                  :options="dropdownUserList"
                  outer-class="form-group"
                  input-class="form-control rounded-pill"
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
      //showName: true,
      id: 0,

      supplierList: [],
      supplierListLoading: true,

      dropdownSupplierList: [],
      selectedDropdownSupplier: 0,

      locationList: [],
      locationListLoading: true,

      dropdownLocationList: [],
      selectedDropdownLocation: 0,

      userList: [],
      userListLoading: true,

      dropdownUserList: [],
      selectedDropdownUser: 0,
      
      formValues: {},
      isLoading: false
    }
  },
  async created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getItem(this.id)
    }
    this.getSupplierList()
    this.getLocationList()
    this.getUserList()
  },
  methods: {
    // showHide: function(e){
    //   console.log("Show "+e.target.value+ " fields")
    //   this.showName = e.target.value !== '0'
    // },
    async getItem(id) {
      const res = await this.apiGet("items/" + id)
      this.formValues = res.data.data
    },
    async getSupplierList() {
        const res = await this.apiGet("suppliers")
        this.supplierList = res.data.data

        for (let i = 0; i < this.supplierList.length; i++) {
          const item = this.supplierList[i]
          this.selectedDropdownSupplier = item.id
          this.dropdownSupplierList.push({value: item.id, label: item.name})
        }

        this.userListLoading = false
    },
    async getLocationList() {
        const res = await this.apiGet("locations")
        this.locationList = res.data.data

        for (let i = 0; i < this.locationList.length; i++) {
          const item = this.locationList[i]
          this.selectedDropdownLocation = item.id
          this.dropdownLocationList.push({value: item.id, label: item.name})
        }

        this.locationListLoading = false
    },
    async getUserList() {
        const res = await this.apiGet("employees")
        this.userList = res.data.data

        for (let i = 0; i < this.userList.length; i++) {
          const item = this.userList[i]
          this.selectedDropdownUser = item.id
          this.dropdownUserList.push({value: item.id, label: item.first_name})
        }

        this.userListLoading = false
    },
    goToBack() {
      this.$router.back()
    },
    async actionSave() {
      let postData = JSON.parse(JSON.stringify(this.formValues))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        res = await this.apiPost("items", postData)
      } else {
        res = await this.apiPatch("items/" + this.id, postData)
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
