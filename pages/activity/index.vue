<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Aktifitas</h3>
        <!-- <div class="ml-auto">
          <button class="btn btn-primary" @click="goToForm()"><i class="fas fa-plus"></i> Tambah</button>
        </div> -->
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>Cari</label>
            <input type="text" class="form-control" v-model="filters.global" placeholder="Search...">
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-row">
            <div class="col-5">
              <label>Start Date</label>
              <input type="date" class="form-control" v-model="filterStartDate" placeholder="Tanggal">
            </div>
            <div class="col-5">
              <label>End Date</label>
              <input type="date" class="form-control" v-model="filterEndDate" placeholder="Tanggal">
            </div>
            <div class="col mt-auto">
              <button class="btn btn-primary" @click="filterByDate">Filter</button>
            </div>
            <div class="col mt-auto">
              <button class="btn btn-warning" @click="clear">
                <i class="fas fa-sync"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <DataTable :value="activityList" :filters="filters" :loading="activityListLoading" :paginator="true" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt">
            <Column field="ID" header="No" headerClass="text-right" bodyClass="text-right" headerStyle="width: 100px;" sortable>
              <template #body="slotProps">
                {{slotProps.index + 1}}
              </template>
            </Column>
            <Column field="topic" header="Aktifitas" sortable></Column>
            <Column field="customer.name" header="Customer" sortable></Column>
            <Column field="user.name" header="PIC" sortable></Column>
            <Column field="description" header="Deskripsi" sortable></Column>
            <Column field="date_time" header="Status Terakhir">
              <template #body="slotProps">
                <span v-if="slotProps.data.customer.status != 10">
                  {{slotProps.data.customer.status | getCustomerStatus}}
                </span>
                <span v-else>
                  Lain lain, {{slotProps.data.customer.others}}
                </span>
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
      tempActivityList: [],
      activityList: [],
      activityListLoading: true,

      filterStartDate: "",
      filterEndDate: "",
    };
  },
  created() {
    this.getActivityList();
  },
  methods: {
    async getActivityList() {
      const res = await this.apiGet("activities?join[]=customers->customer_id&join[]=users->user_id");

      this.activityList = res.data.data;
      this.tempActivityList = this.activityList
      this.activityListLoading = false;
    },
    async deleteClass(id) {
      this.$swal({
        title: "Apakah anda yakin?",
        buttons: true,
        dangerMode: true,
      }).then(async (result) => {
        if (result) {
          const res = await this.apiDelete("event/" + id);

          if (res.data.success) {
            this.$swal({
              title: "Delete Sesi Sukses",
              icon: "success",
            });
            this.getActivityList();
          } else {
            this.$swal({
              title: "Delete Sesi Gagal",
              icon: "error",
            });
          }
        }
      });
    },
    goToDetail(id) {
      this.$router.push("/customer/" + id)
    },
    goToForm(id) {
      var link = "/activity/form";
      if (id) {
        link += "?id=" + id;
      }

      this.$router.push(link);
    },
    clear() {
      this.filterStartDate = ""
      this.filterEndDate = ""
      this.activityList = this.tempActivityList
    },
    filterByDate() {
      if (this.activityList.length != this.tempActivityList.length) {
        this.activityList = this.tempActivityList
      }

      console.log(this.filterStartDate)

      if (this.filterStartDate != "") {
        this.activityList = this.activityList.filter((item, index) => {
          return item.date_time >= moment(this.filterStartDate).format("YYYY-MM-DD") + " 00:00:00"
        });
      }

      if (this.filterEndDate != "") {
        this.activityList = this.activityList.filter((item, index) => {
          return item.date_time <= moment(this.filterEndDate).format("YYYY-MM-DD") + " 23:59:59"
        });
      }
    }
  },
  filters: {
    dateTime: function (date) {
      return moment(date).format("DD MMM YYYY HH:mm");
    },
    dateDmy(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    getCustomerStatus(value) {
      let status = ""

      if (value == "0") {
        status = "Belum di kontak"
      } else if (value == "1") {
        status = "Ditolak"
      } else if (value == "2") {
        status = "Belum di Jawab"
      } else if (value == "3") {
        status = "Follow Up"
      } else if (value == "4") {
        status = "Kunjungan"
      } else if (value == "5") {
        status = "Penawaran"
      } else if (value == "6") {
        status = "Negosiasi"
      } else if (value == "7") {
        status = "Proses MoU"
      } else if (value == "8") {
        status = "Kerjasama"
      } else if (value == "9") {
        status = "Perpanjangan"
      }

      return status
    }
  },
};
</script>

<style>
</style>
