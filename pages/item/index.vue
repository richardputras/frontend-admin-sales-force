<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Item List</h3>
        <div class="ml-auto">
          <button class="btn btn-primary" @click="goToForm()"><i class="fas fa-plus"></i> Tambah</button>
          <button class="btn btn-primary" @click="goToSupplierForm()"><i class="fas fa-plus"></i> Tambah Supplier</button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <input type="text" class="form-control" v-model="filters.global" placeholder="Search...">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <DataTable :value="itemList" :filters="filters" :loading="itemListLoading" :paginator="true" removableSort  
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" 
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt">
            <template #header>
              <div style="text-align: left">
                <Button type="button" class="btn btn-sm btn-primary" @click="exportCSV($event)"><i class="fas fa-external-link-alt"></i>Export</Button>
              </div>
            </template>
            <template #empty>
              No records found
            </template>
            <Column field="code" header="Kode Barang" sortable></Column>
            <Column field="name" header="Nama Barang" sortable></Column>
            <Column field="quantity" header="Jumlah" sortable></Column>
            <Column field="buy_price" header="Harga Satuan" sortable>
              <template #body="slotProps">
              {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(slotProps.data.buy_price)}}
              </template>
            </Column>
            <Column field="item_category" header="Kategori" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.item_category == '0'">Perlengkapan</span>
                <span v-if="slotProps.data.item_category == '1'">Peralatan</span>
              </template>
            </Column>
            <Column field="location_id" header="Lokasi" sortable>
              <template #body="slotProps">
                <span>{{slotProps.data.location_id | getItemLocation}}</span>
              </template>
            </Column>
            <Column field="pay_date" header="Tanggal Beli" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.pay_date != '0000-00-00'">
                  {{slotProps.data.pay_date | date}}
                </span>
                <span v-else>
                  -
                </span>
              </template>
            </Column>
            <Column bodyClass="text-center">
              <template #body="slotProps">
                <Button type="button" class="btn btn-sm btn-success" @click="goToDetail(slotProps.data.id)"><i class="fas fa-eye"></i></Button>
                <Button
                  type="button"
                  class="btn btn-sm btn-warning"
                  @click="goToForm(slotProps.data.id)"
                  ><i class="fas fa-pencil-alt"></i
                ></Button>
                <Button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click="deleteItem(slotProps.data.id)"
                  ><i class="fas fa-trash"></i
                ></Button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: { DataTable, Column },
  layout: "sidebar",
  data() {
    return {
      filters: {},
      itemList: [],
      itemListLoading: true
    }
  },
  created() {
    this.getItemList()
  },
  methods: {
    async getItemList() {
      const res = await this.apiGet("items")

      this.itemList = res.data.data

      let index = 1
      this.itemList.map((item) => {
        item["index"] = index
        index++
      })
      this.itemListLoading = false
    },
    async deleteItem(id) {
      this.$swal({
        title: "Apakah anda yakin?",
        buttons: true,
        dangerMode: true,
      }).then(async (result) => {
        if (result) {
          const res = await this.apiDelete("items/" + id)

          if (res.data.status) {
            this.$swal({
              title: "Delete Barang Sukses",
              icon: "success",
            })
            this.getItemList()
          } else {
            this.$swal({
              title: "Delete Barang Gagal",
              icon: "error",
            })
          }
        }
      })
    },
    goToDetail(id) {
      this.$router.push("/item/" + id)
    },
    goToSupplierForm(){
      this.$router.push("/supplier/form")
    },
    goToForm(id) {
      var link = "/item/form"

      if (id) {
        link += "?id=" + id
      }

      this.$router.push(link)
    },
    exportCSV() {
      this.$refs.dt.exportCSV()
    }
  },
  filters: {
    dateTime(date) {
      return moment(date).format("DD MMM YYYY HH:mm")
    },
    date(value) {
      return moment(value).format("DD-MM-YYYY")
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
    }
  },
}
</script>

<style>
</style>
