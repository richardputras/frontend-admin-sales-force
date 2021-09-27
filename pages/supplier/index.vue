<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Supplier</h3>
        <div class="ml-auto">
          <button class="btn btn-primary" @click="goToForm()"><i class="fas fa-plus"></i> Tambah</button>
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
          <DataTable :value="supplierList" :filters="filters" :loading="supplierListLoading" :paginator="true" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt">
            <Column field="index" header="#" sortable />
            <Column field="name" header="Nama Supplier" sortable></Column>
            <Column field="address" header="Alamat" sortable></Column>
            <Column field="phone_number" header="Nomor Telepon" sortable></Column>
            <Column bodyClass="text-center">
              <template #body="slotProps">
                <Button type="button" class="btn btn-sm btn-success" @click="goToDetail(slotProps.data.id)"><i class="fas fa-eye"></i></Button>
                <Button
                  type="button"
                  class="btn btn-sm btn-warning"
                  @click="goToForm(slotProps.data.id)"
                  ><i class="fas fa-pencil-alt"></i
                ></Button>
                <!-- <i class="fas fa-trash fa-sm text-danger cursor-pointer" @click="deleteSupplier(slotProps.data.id)"></i> -->
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
      supplierList: [],
      supplierListLoading: true,
    }
  },
  created() {
    this.getSupplierList()
  },
  methods: {
    async getSupplierList() {
      const res = await this.apiGet("suppliers")

      this.supplierList = res.data.data

      let index = 1
      this.supplierList.map((item) => {
        item["index"] = index
        index++
      })
      this.supplierListLoading = false
    },
    // async deleteSupplier(id) {
    //   this.$swal({
    //     title: "Apakah anda yakin?",
    //     buttons: true,
    //     dangerMode: true,
    //   }).then(async (result) => {
    //     if (result) {
    //       const res = await this.apiDelete("suppliers/" + id)

    //       if (res.data.success) {
    //         this.$swal({
    //           title: "Delete Sukses",
    //           icon: "success",
    //         })
    //         this.getItemList()
    //       } else {
    //         this.$swal({
    //           title: "Delete Gagal",
    //           icon: "error",
    //         })
    //       }
    //     }
    //   })
    // },
    // goToDetail(id) {
    //   this.$router.push("/item/" + id)
    // },
    goToForm(id) {
      var link = "/supplier/form"
      
      if (id) {
        link += "?id=" + id
      }

      this.$router.push(link)
    }
  },
  filters: {
    dateTime(date) {
      return moment(date).format("DD MMM YYYY HH:mm")
    },
    hour(value) {
      return moment(value).format("DD-MM-YYYY")
    }
  }
}
</script>

<style>
</style>
