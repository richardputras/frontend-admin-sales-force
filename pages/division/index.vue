<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Daftar Divisi</h3>
        <div class="ml-auto">
          <button class="btn btn-primary" @click="goToForm()"><i class="fas fa-plus"></i> Tambah</button>
          <button class="btn btn-primary" @click="goToDivisionForm()"><i class="fas fa-plus"></i> Tambah Divisi</button>
          <button class="btn btn-primary" @click="goTo('division')">Lihat Divisi</button>
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
          <DataTable :value="employeeList" :filters="filters" :paginator="true" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt" showGridlines>
            <template #empty>
                No records found
            </template>
            <Column field="index" header="#" sortable></Column>
            <Column field="name" header="Divisi" sortable></Column>
            <Column bodyClass="text-center">
              <template #body="slotProps">
                <Button
                  type="button"
                  class="btn btn-sm btn-warning"
                  @click="goToForm(slotProps.data.id)"
                  ><i class="fas fa-pencil-alt"></i
                ></Button>
                <Button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click="deleteDivision(slotProps.data.id)"
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
// import moment from "moment";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: { DataTable, Column },
  layout: "sidebar",
  data() {
    return {
      filters: {},
      employeeList: [],
      employeeListLoading: true,
      isLoading: false
    }
  },
  created() {
      this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const res = await this.apiGet("divisions")
      this.employeeList = res.data.data
      
      let index = 1
      this.employeeList.map((item) => {
        item["index"] = index
        index++

        // let tempName = ""
        // for (let i = 0; i < item.personInChargeList.length; i++) {
        //   tempName = item.personInChargeList[i].user.name
        // }
        // console.log(tempName)
        // item["userName"] = tempName
      })
      this.employeeListLoading = false
    },
    async deleteDivision(id) {
      this.$swal({
        title: "Apakah anda yakin?",
        buttons: true,
        dangerMode: true,
      }).then(async (result) => {
        if (result) {
          const res = await this.apiDelete("divisions/" + id)

          if (res.data.status) {
            this.$swal({
              title: "Delete Sukses",
              icon: "success",
            });
            this.getEmployeeList()
          }
        }
      })
    },
    goToDivisionForm() {
      this.$router.push("/division/form")
    },
    goTo(page) {
      this.$router.push('/' + page)
    },
    goToForm(id) {
      var link = "/division/form"
      
      if (id) {
        link += "?id=" + id
      }

      this.$router.push(link)
    }
  },
//   filters: {
//     dateTime(date) {
//       return moment(date).format("DD MMM YYYY HH:mm")
//     },
//     hour(value) {
//       return moment(value).format("DD-MM-YYYY")
//     }
//   }
}
</script>

<style>
</style>
