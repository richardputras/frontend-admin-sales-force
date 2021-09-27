<template>
  <div class="dataTables_wrapper">
    <div class="row">
      <div class="col">
        <label>
          <select class="form-control" v-model="perPage" @change="loadPerPage">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <div class="col text-right">
        <button
          class="btn btn-sm btn-primary"
          v-if="actionEdit"
          @click="actionEdit()"
        >
          Tambah <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>

    <b-table
      hover
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="dtOptions.fields"
      :busy="isBusy"
    >
      <template #head(btnAction)>
        <i class="fas fa-bars"></i>
      </template> 

      <template #cell(Pic)="data">
        <img class="img img-fluid" style="width:150px;" :src="data.value" />
      </template>

      <template #cell(BackgroundColor)="data">
        <div class="text-center" :style="'width:100px; height:20px; background-color: #' + data.value + '; color:white;'">#{{data.value}}</div>
      </template>

      <template #cell(btnAction)="data">
        <button
          class="btn btn-sm btn-success"
          v-if="actionDetail"
          @click="actionDetail(data.value)"
        >
          <i class="fas fa-folder-open"></i>
        </button>
        <button
          class="btn btn-sm btn-warning"
          v-if="actionEdit"
          @click="actionEdit(data.value)"
        >
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button
          class="btn btn-sm btn-danger"
          v-if="actionDelete"
          @click="actionDelete(data.value)"
        >
          <i class="fas fa-trash"></i>
        </button>
      </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <div class="row">
      <div class="col-6">
        <p>Total Item : {{ totalRows }}</p>
      </div>
      <div class="col-6">
        <b-pagination
          align="right"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// https://bootstrap-vue.org/docs/components/table

export default {
  props: {
    dtOptions: Object,
    actionDetail: Function,
    actionEdit: Function,
    actionDelete: Function,
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      // totalRows: 0,
      perPage: 10,
      sortBy: null,
      isBusy: true,
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    loadPerPage() {
      console.log(this.perPage);
    },
    async getData() {
      let params = "";

      if (this.dtOptions.params) {
        params = this.dtOptions.params;
      }

      const res = await this.apiGet(this.dtOptions.url, params);
      console.log(this.dtOptions);

      this.items = res.data.data;
      // this.totalRows = res.data.length;
      this.isBusy = false;
    },
    async reload() {
      console.log("test reload");
      this.getData();
    },
  },
};
</script>
