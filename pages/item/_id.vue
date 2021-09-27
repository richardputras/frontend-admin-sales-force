<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-12 col-md-3 position-absolute">
          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <div v-if="itemLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-24-sb">
                <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToForm(item.id)"></i>
                {{item.name}}
              </h4>
              <hr>
              <h6 class="text-16-sb">Informasi</h6>
              <h4 class="text-14-m">
                Kode Barang : {{item.code}}
              </h4>
              <h4 class="text-14-m">
                Deskripsi Barang : {{item.description}}
              </h4>
              <h4 class="text-14-m">
                Jumlah Barang : {{item.quantity}} {{item.unit}}
              </h4>
              <h4 class="text-14-m">
                Tanggal Beli:
                <span v-if="item.pay_date != '0000-00-00' ">
                    {{item.pay_date | dayFormat}}
                </span>
                <span v-else>
                  -
                </span>
              </h4>
              <h4 class="text-14-m">
                Tanggal Terima:
                <span v-if="item.arrival_date != '0000-00-00' ">
                    {{item.arrival_date | dayFormat}}
                </span>
                <span v-else>
                  -
                </span>
              </h4>
              <h4 class="text-14-m">
                Harga Beli : 
                <span v-if="item.buy_price != null">
                    {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.buy_price)}}
                </span>
                <span v-else>
                  -
                </span>
              </h4>
              <h4 class="text-14-m">
                Kondisi Barang : {{item.item_condition | getItemCondition}}
              </h4>
              <h4 class="text-14-m">
                Status Barang: {{item.item_status | getItemStatus}}
              </h4>
              <h4 class="text-14-m">
                Lokasi Barang: {{item.location_id | getItemLocation}}
              </h4>
              <h4 class="text-14-m">
                Kategori Barang: {{item.item_category | getItemCategory}}
              </h4>
              <h4 class="text-14-m">
                <span v-if="item.note != null">Keterangan: {{item.note}}</span> 
              </h4>
              <hr>
              <div>
                <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="warrantyLinkModal"></i>
                <a :href="item.warranty" target="_blank" class="text-14-m">Garansi</a>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h4 class="modal-title">Warranty</h4>
              </div>

              <form @submit.prevent="addWarranty">
                <div class="modal-body"> 
                  <div class="form-group">
                    <label>Link Garansi</label>
                      <input v-model="formLink.warranty" type="url" name="warranty" class="form-control rounded-pill" autocomplete="off">
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

        <div class="col-12 offset-md-8 col-md-3 d-none d-sm-block position-absolute">
          <img :src="require('@/assets/images/items/' + this.$route.params.id + '.jpg')" width="300" height="326" />
          <br>
          <br>
          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <h4 class="text-16-sb">Supplier
                <!-- <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToSupplierForm(supplier.id)"></i> -->
            </h4>
            <div v-if="supplierListLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <h5 v-for="supplier in supplierList" :key="supplier.id" class="text-16-sb">
              <div>
                Nama : <span class="text-14-m">{{supplier.supplier.name}}</span> 
              </div>
              <div>
                Alamat : <span class="text-14-m">{{supplier.supplier.address}}</span>  
              </div>
              <div>
                Nomor Telepon : <span class="text-14-m"> {{supplier.supplier.phone_number}} </span>
              </div>
              <div>
                <span v-if="supplier.supplier.bank_number != null">Nomor Rekening: {{supplier.supplier.bank_number}} ({{supplier.supplier.bank_name}}) </span> 
              </div>
            </h5>
          </div>

          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <h4 class="text-16-sb">
                Person In Charge
            </h4>
            <div v-if="personInChargeListLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <h5 v-for="(person, index) in personInChargeList" class="text-16-sb" :key="person.id">
              <div>Nama: <span class="text-14-m">{{person.employee.first_name}} {{person.employee.last_name}}</span> <i class="fas fa-trash fa-sm text-danger cursor-pointer" @click="deletePersonInCharge(index)"></i></div>
            </h5>
          </div>

          <div class="bg-white shadow-sm rounded p-3 mb-3">
            <h4 class="text-16-sb">
              Stok Opname <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="stockModal"></i>
            </h4>
            <div v-if="stockLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            <h5 v-for="stock in stockList" :key="stock.id" class="text-16-sb">
              <div class="text-14-m">
                Stok Awal : {{stock.begin_stock}}
              </div>
              <div class="text-14-m">
                Stok Akhir : {{stock.last_stock}}
              </div>
              <div class="text-14-m">
                Tanggal Stok Habis : {{stock.empty_date}}
              </div>
            </h5>
          </div>
        </div>

        <div class="modal fade" id="modal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h4 class="modal-title">Stok</h4>
              </div>

              <form @submit.prevent="addStock">
                <div class="modal-body"> 
                  <div class="form-group">
                    <label>Stok Awal</label>
                      <input v-model="formStock.begin_stock" type="number" name="begin_stock" class="form-control rounded-pill" autocomplete="off">
                  </div>
                  <div class="form-group">
                    <label>Stok Akhir</label>
                      <input v-model="formStock.last_stock" type="number" name="last_stock" class="form-control rounded-pill" autocomplete="off">
                  </div>
                  <div class="form-group">
                    <label>Tanggal Stok Habis</label>
                      <input v-model="formStock.empty_date" type="date" name="empty_date" class="form-control rounded-pill" autocomplete="off">
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
          <h3 class="text-24-sb">({{maintenanceList.length}})
            Daftar Maintenance
            <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="goToMaintenanceForm()"></i>
          </h3>
          <div v-if="maintenanceListLoading">
            <div class="spinner-border mt-5 ml-5" role="status">
              <div><span style="color:white;">_</span>
              </div>
            </div>
          </div>
          <div v-if="maintenanceListLoading == false && maintenanceList.length == 0">
            <h3 class="mt-3 ml-5">Belum ada aktifitas perawatan</h3>
          </div>
          <div v-for="(activity, index) in maintenanceList" :key="activity.id">
            <div class="d-flex align-items-center bg-white shadow-sm rounded p-3 mb-3 select">
                <div>
                    <div class="font-weight-bold text-16-m">
                      <i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToMaintenanceForm(activity.id)"></i>
                      {{index + 1}}. {{activity.title}}
                    </div>
                    <div class="text-10-sb">{{activity.maintenance_start_date | dayFormat}}</div>
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
        item: {},
        itemLoading: true,

        stockList: [],
        stockLoading: true,

        supplierList: [],
        supplierListLoading: true,

        personInChargeList: [],
        personInChargeListLoading: true,
        
        maintenanceList: [],
        maintenanceListLoading: true,

        form: {},
        formLink: {},
        formStock: {},
        isLoading: false
    }
  },
  async created() {
    this.initItem()
    this.initStock()
    this.initSupplierList()
    this.initPersonInChargeList()
    this.initMaintenanceList()
  },
  methods: {
    warrantyLinkModal(){
      $('#modal').modal('show')
    },
    photoLinkModal(){
      $('#modal1').modal('show')
    },
    stockModal(){
      $('#modal2').modal('show')
    },
    async addWarranty() {
      let postData = JSON.parse(JSON.stringify(this.formLink))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        res = await this.apiPatch("items/" + this.$route.params.id, postData)  
      }

      const resData = res.data
      this.isLoading = false

      if (resData.status) {
        $('#modal').modal('hide')
        this.$toasted.success("Sukses menambahkan/update link", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initItem()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      console.log(postData)
    },
    async addStock() {
      let postData = JSON.parse(JSON.stringify(this.formStock))

      this.isLoading = true
      let res = {}

      if (!this.id) {
        postData.item_id = this.$route.params.id
        res = await this.apiPost("stock_opnames", postData)  
      } else {
        res = await this.apiPatch("stock_opnames/" + this.$route.params.id, postData)
      }

      const resData = res.data
      this.isLoading = false

      if (resData.status) {
        $('#modal2').modal('hide')
        this.$toasted.success("Sukses menambahkan", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
        this.initItem()
      } else {
        this.$toasted.error(resData.message, {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 2500
        });
      }
      console.log(postData)
    },
    async initItem() {
      const res = await this.apiGet("items/" + this.$route.params.id)
      
      this.item = {}
      this.item = res.data.data
      this.itemLoading = false
    },
    async initStock() {
      const res = await this.apiGet("stock_opnames?&filter[]=item_id," + this.$route.params.id)
      
      this.stockList = []
      this.stockList = res.data.data
      this.stockLoading = false
    },
    async initSupplierList() {
      const res = await this.apiGet("items?&filter[]=id," + this.$route.params.id + "&join[]=suppliers->supplier_id")
      
      this.supplierList = []
      this.supplierList = res.data.data
      this.supplierListLoading = false
    },
    async initPersonInChargeList() {
      const res = await this.apiGet("items?&filter[]=id," + this.$route.params.id + "&join[]=employees->employee_id")
      
      this.personInChargeList = []
      this.personInChargeList = res.data.data
      this.personInChargeListLoading = false
    },
    async initMaintenanceList() {
      const res = await this.apiGet("maintenances?filter[]=item_id," + this.$route.params.id)

      this.maintenanceList = []
      this.maintenanceList = res.data.data.reverse()
      this.maintenanceListLoading = false
    },
    async deletePersonInCharge(index) {
      this.$swal({
          title: "Anda yakin mau menghapus?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      })
      .then(async (willDelete) => {
          if (willDelete) {
            const res = await this.apiDelete("items/" + this.personInChargeList[index].id)
              
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
    goToSupplierForm(id) {
      var link = "/supplier/form?supplier_id=" + this.$route.params.id
    
      if (id != null)
          link += "&id=" + id

      this.$router.push(link)
    },
    goToPICForm() {
        var link = "/item/personInCharge/form?employee_id=" + this.$route.params.id

        this.$router.push(link)
    },
    goToForm(id) {
      var link = "/item/form"

      if (id != null)
        link += "?id=" + id

      this.$router.push(link)
    },
    goToMaintenanceForm(id) {
      var link = "/maintenance/form?item_id=" + this.$route.params.id

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
    dayFormat(date) {
      return moment(date).local().format('dddd, DD MMMM YYYY');
    },
    timeFormat(time) {
      return moment(time).local().format('HH:mm');
    },
    getItemCategory(value) {
      let status = ""

      if (value == "0") {
        status = "Perlengkapan"
      } else if (value == "1") {
        status = "Peralatan"
      } 

      return status
    },
    getItemLocation(value) {
      let status = ""

      if (value == "1") {
        status = "Ruang Tamu"
      } else if (value == "2") {
        status = "Momentum"
      } else if (value == "3") {
        status = "Studio"
      } else if (value == "4") {
        status = "Ruang IT"
      } else if (value == "5") {
        status = "Ruang CT"
      } else if (value == "6") {
        status = "Ruang Tengah"
      } else if (value == "7") {
        status = "Dapur"
      } else if (value == "8") {
        status = "Mushola"
      }

      return status
    },
    getItemStatus(value) {
      let status = ""

      if (value == "0") {
        status = "Beli Baru"
      } else if (value == "1") {
        status = "Beli Bekas"
      } else if (value == "2") {
        status = "Hibah Baru"
      } else if (value == "3") {
        status = "Hibah Bekas"
      } else if (value == "4") {
        status = "Perlu Dijual"
      } else if (value == "5") {
        status = "Terjual"
      }

      return status
    },
    getItemCondition(value) {
      let status = ""

      if (value == "0") {
        status = "Berfungsi Baik"
      } else if (value == "1") {
        status = "Perlu Perbaikan"
      } else if (value == "2") {
        status = "Proses Perbaikan"
      } else if (value == "3") {
        status = "Rusak"
      }

      return status
    }
  }
}
</script>

<style>

</style>
