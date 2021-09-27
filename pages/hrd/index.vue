<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Employee Request</h3>
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
          <DataTable :value="employeeRequestList" :filters="filters" :loading="employeeRequestListLoading" :paginator="true" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt">
            <Column field="index" header="#" sortable />
            <Column field="position" header="Position" sortable></Column>
            <Column field="division" header="Division" sortable>
              <template #body="slotProps">
                <span> {{slotProps.data.division | getEmployeeDivision}}</span>
              </template>
            </Column>
            <Column field="quantity" header="Quantity" sortable></Column>
            <Column field="gender" header="Gender" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.gender == '0'">Laki-Laki</span>
                <span v-if="slotProps.data.gender == '1'">Perempuan</span>
              </template>
            </Column>
            <Column field="status" header="Status" sortable>
              <template #body="slotProps">
                <span>
                  {{slotProps.data.status | getEmployeeStatus}}
                </span>
              </template>
            </Column>
            <Column field="created_at" header="Date Created" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.created_at">
                  {{slotProps.data.created_at | hour}}
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
                <!-- <i class="fas fa-trash fa-sm text-danger cursor-pointer" @click="deleteClass(slotProps.data.id)"></i> -->
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
      employeeRequestList: [],
      employeeRequestListLoading: true,
      isLoading: false
    };
  },
  created() {
      this.getEmployeeRequestList()
  },
  methods: {
    async getEmployeeRequestList() {
      const res = await this.apiGet("employee_requests")
      this.employeeRequestList = res.data.data
      
      let index = 1
      this.employeeRequestList.map((item) => {
        item["index"] = index
        index++
      })
      this.employeeRequestListLoading = false
    },
    // async deleteClass(id) {
    //   this.$swal({
    //     title: "Apakah anda yakin?",
    //     buttons: true,
    //     dangerMode: true,
    //   }).then(async (result) => {
    //     if (result) {
    //       const res = await this.apiDelete("employee_requests/" + id)

    //       if (res.data.status) {
    //         this.$swal({
    //           title: "Delete Sukses",
    //           icon: "success",
    //         });
    //         this.getEmployeeRequestList()
    //       }
    //     }
    //   });
    // },
    goToDetail(id) {
      this.$router.push("/hrd/" + id)
    },
    goToForm(id) {
      var link = "/hrd/form"
      
      if (id) {
        link += "?id=" + id
      }

      this.$router.push(link)
    },
    goToBack() {
      this.$router.back()
    },
  },
  filters: {
    dateTime: function (date) {
      return moment(date).format("DD MMM YYYY HH:mm");
    },
    hour(value) {
      return moment(value).format("DD-MM-YYYY");
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
        status = "Tes Tulis"
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
    }
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
