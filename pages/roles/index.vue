<template>
  <div class="content mt-3">
    <div class="container-fluid">
      <div class="d-flex">
        <h3>Daftar Role</h3>
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
          <DataTable :value="roleList" :filters="filters" :loading="roleListLoading" :paginator="true" :rowsPerPageOptions="[5,10,25]" :rows="10" ref="dt">
            <Column field="index" header="#" sortable />
            <Column field="name" header="Name" sortable></Column>
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
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: { DataTable, Column },
  layout: "sidebar",
  data() {
    return {
      filters: {},
      roleList: [],
      roleListLoading: true
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {      
    async getRoleList() {
      const res = await this.apiGet("roles");

      this.roleList = res.data.data;

      let index = 1;
      this.roleList.map((item) => {
        item["index"] = index;
        index++;
      })
      this.roleListLoading = false;
    },
    goToDetail(id) {
      this.$router.push("/roles/" + id)
    }
  }
};
</script>

<style>
</style>
