<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Employee List</h3>
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
          <DataTable :value="employeeList" :filters="filters" :paginator="true" removableSort paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt">
             <template #empty>
                No records found
            </template>
            <!-- <Column field="index" header="#" sortable /> -->
            <Column field="first_name" header="Nama Karyawan" sortable></Column>
            <Column field="place_of_birth" header="Tempat Lahir" sortable></Column>
            <Column field="date_of_birth" header="Tanggal Lahir" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.date_of_birth">
                  {{slotProps.data.date_of_birth | date}}
                </span>
                <span v-else>
                  -
                </span>
              </template>
            </Column>
            <Column field="gender" header="Jenis Kelamin" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.gender == '0'">Laki-Laki</span>
                <span v-if="slotProps.data.gender == '1'">Perempuan</span>
              </template>
            </Column>
            <Column field="division" header="Divisi" sortable>
              <template #body="slotProps">
                <span> {{slotProps.data.division_id | getEmployeeDivision}}</span>
              </template>
            </Column>
            <Column field="work_status" header="Status Kerja" sortable>
              <template #body="slotProps">
                <span>
                  {{slotProps.data.work_status | getEmployeeStatus}}
                </span>
              </template>
            </Column>
            <Column field="start_work_date" header="Tanggal Masuk" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.start_work_date">
                  {{slotProps.data.start_work_date | date}}
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
                  @click="deleteEmployee(slotProps.data.id)"
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
      const res = await this.apiGet("employees")
      this.employeeList = res.data.data
      
      let index = 1
      this.employeeList.map((item) => {
        item["index"] = index
        index++
      })
      this.employeeListLoading = false
    },
    async deleteEmployee(id) {
      this.$swal({
        title: "Apakah anda yakin?",
        buttons: true,
        dangerMode: true,
      }).then(async (result) => {
        if (result) {
          const res = await this.apiDelete("employees/" + id)

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
    goToDetail(id) {
      this.$router.push("/employee/" + id)
    },
    goToForm(id) {
      var link = "/employee/form"
      
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
    dateTime(date) {
      return moment(date).format("DD MMM YYYY HH:mm")
    },
    date(date) {
      return moment(date).format("DD-MM-YYYY")
    },
    getEmployeeDivision(value) {
      let status = ""

      if (value == "0") {
        status = "IT"
      } else if (value == "1") {
        status = "CT"
      } else if (value == "2") {
        status = "Marketing & Development"
      } else if (value == "3") {
        status = "Admin"
      } else if (value == "4") {
        status = "Finance & Accounting"
      } else if (value == "5") {
        status = "Audit"
      } else if (value == "6") {
        status = "Akademik"
      } else if (value == "7") {
        status = "Corporate Legal & HRD"
      } else if (value == "8") {
        status = "Training"
      } else if (value == "9") {
        status = "CSR"
      } else if (value == "10") {
        status = "Event"
      } else if (value == "11") {
        status = "RnD"
      } else if (value == "12") {
        status = "General Affairs"
      }

      return status
    },
    getEmployeeStatus(value) {
      let status = ""

      if (value == "0") {
        status = "Full Time"
      } else if (value == "1") {
        status = "Part Time"
      } else if (value == "2") {
        status = "Magang"
      } else if (value == "3") {
        status = "Freelance"
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
