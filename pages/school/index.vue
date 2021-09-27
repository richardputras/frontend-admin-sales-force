<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>School</h3>
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
          <DataTable :value="schoolList" :filters="filters" :paginator="true" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt">
            <Column field="ID" header="No" headerClass="text-right" bodyClass="text-right" headerStyle="width: 100px;" sortable>
              <template #body="slotProps">
                {{slotProps.index + 1}}
              </template>
            </Column>
            <Column field="Name" header="Nama" sortable></Column>
            <Column field="Email" header="Email" sortable></Column>
            <Column field="Status" header="Status" sortable>
              <template #body="slotProps">
                <span v-if="slotProps.data.Status == '2'">Sudah dihubungi</span>
                <span v-if="slotProps.data.Status == '0'">Belum dihubungi</span>
              </template>
            </Column>
            <Column bodyClass="text-center" headerStyle="width: 150px;">
              <template #body="slotProps">
                <Button type="button" class="btn btn-sm btn-warning" @click="goToForm(slotProps.data.ID)"><i class="fas fa-pencil-alt"></i></Button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable"
import Column from "primevue/column"

export default {
  components: { DataTable, Column },
  layout: "sidebar",
  data() {
    return {
      filters: {},
      schoolList: []
    }
  },
  async created() {
    this.getSchoolList()
  },
  methods: {
    async getSchoolList() {
      const res = await this.apiGet("school/list")
      // , "with[0]=UserAccount.User"

      this.schoolList = res.data.data
    },
    goToForm(id) {
      var link = "/school/form"
      if (id) {
        link += "?id=" + id;
      }

      this.$router.push(link)
    }
  }
}
</script>
