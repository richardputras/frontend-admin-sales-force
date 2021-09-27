<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Perjanjian Kerjasama</h3>
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
          <DataTable :value="customerList" :filters="filters" :loading="customerListLoading" :paginator="true" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt">
            <Column field="index" header="#" sortable />
            <Column field="name" header="Name" sortable></Column>
            <Column field="userName" header="PIC" sortable>
              <template #body="slotProps">
                {{slotProps.data.userName}}
              </template>
            </Column>
            <Column field="category" header="Category" sortable>
              <template #body="slotProps">
                <span> {{slotProps.data.category | getCustomerCategory}}</span>
              </template>
            </Column>
            <Column field="type" header="Tipe" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.type == '0'">Swasta</span>
                <span v-if="slotProps.data.type == '1'">Negeri</span>
              </template>
            </Column>
            <Column field="religion" header="Agama" sortable>
              <template #body="slotProps">
                <span>{{slotProps.data.religion | getCustomerReligion}}</span>
              </template>
            </Column>
            <Column field="status" header="Status" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.status != 10">
                  {{slotProps.data.status | getCustomerStatus}}
                </span>
                <span v-else>
                  Lain lain, {{slotProps.data.others}}
                </span>
              </template>
            </Column>
            <Column field="link_document" header="Link Dokumen">
              <template #body="slotProps">
                <span v-if="slotProps.data.link_document != ''">
                  <a :href="slotProps.data.link_document" target="_blank" >Link</a>
                </span>
                <span v-else>
                    
                </span>
              </template>
            </Column>
            <Column field="last_follow_up" header="Terakhir Interaksi" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.last_follow_up">
                  {{slotProps.data.last_follow_up | hour}}
                </span>
                <span v-else>
                  -
                </span>
              </template>
            </Column>
            <Column bodyClass="text-center">
              <template #body="slotProps">
                <Button type="button" class="btn btn-sm btn-success" @click="goToDetail(slotProps.data.id)"><i class="fas fa-eye"></i></Button>
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
      customerList: [],
      customerListLoading: true
    };
  },
  created() {
    this.getcustomerList();
  },
  methods: {      
    async getcustomerList() {
      const res = await this.apiGet("customers?filter[]=status," + '>=,' + 7 + "&joinList[]=customer_users,id,customer_id->users,user_id as personInChargeList");

      this.customerList = res.data.data;

      let index = 1;
      this.customerList.map((item) => {
        item["index"] = index;
        index++;

        let tempName = ""
        for (let i = 0; i < item.personInChargeList.length; i++) {
          tempName = item.personInChargeList[i].user.name+ '\n'
        }
        console.log(tempName)
        item["userName"] = tempName
      })
      this.customerListLoading = false;
    },
    goToDetail(id) {
      this.$router.push("/customer/" + id)
    }
  },
  filters: {
    dateTime: function (date) {
      return moment(date).format("DD MMM YYYY HH:mm");
    },
    hour(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    getCustomerCategory(value) {
      let status = ""

      if (value == "0") {
        status = "Sekolah"
      } else if (value == "1") {
        status = "Lembaga"
      } else if (value == "2") {
        status = "Individu"
      }

      return status
    },
    getCustomerReligion(value) {
      let status = ""

      if (value == "0") {
        status = "Umum"
      } else if (value == "1") {
        status = "Kristen"
      } else if (value == "2") {
        status = "Islam"
      } else if (value == "3") {
        status = "Hindu"
      } else if (value == "4") {
        status = "Budha"
      } else if (value == "5") {
        status = "Katolik"
      }

      return status
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
      } else if (value == "10") {
        status = "Lain lain"
      }

      return status
    }
  }
};
</script>

<style>
</style>
