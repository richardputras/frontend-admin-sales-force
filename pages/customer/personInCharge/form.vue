<template>
  <div class="content mt-4">
    <div class="container">
      <div class="bg-white shadow-sm p-3">
        <h1 class="mb-3">Person In Charge</h1>

        <FormulateForm v-model="formValues" @submit="actionSave">
          <FormulateInput
            label="Nama PIC"
            type="select"
            name="user_id"
            :options="dropdownUserList"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <FormulateInput
            label="Status Project"
            type="select"
            name="role"
            :options="[
              {value: 0, label: 'Ketua'},
              {value: 1, label: 'Anggota'},
            ]"
            outer-class="form-group"
            input-class="form-control rounded-pill"
            validation="required"
          />

          <div class="d-flex justify-content-end toolbar-footer">
            <FormulateInput
              type="button"
              input-class="btn btn-danger rounded-pill"
              label="Batal"
              @click="goToBack"
            />
            <FormulateInput
              type="submit"
              label="Simpan"
              input-class="btn btn-primary rounded-pill"
            />
          </div>
        </FormulateForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "sidebar",
  data() {
    return {
      id: 0,

      userList: [],
      userListLoading: true,

      dropdownUserList: [],
      selectedDropdownUser: 0,

      formValues: {},
      isLoading: false
    }
  },
  async created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getCustomer(this.id)
    }

    this.getUserList()

  },
  methods: {
    async getCustomer(id) {
      const res = await this.apiGet("customer_users/" + id)
      this.formValues = res.data.data
    },
    async getUserList() {
        const res = await this.apiGet("users")
        this.userList = res.data.data

        for (let i = 0; i < this.userList.length; i++) {
            const item = this.userList[i]
            this.selectedDropdownUser = item.id
            this.dropdownUserList.push({value: item.id, label: item.name})
        }

        this.userListLoading = false

    },
    goToBack() {
      this.$router.back();
    },
    async actionSave() {
        let postData = JSON.parse(JSON.stringify(this.formValues))

        this.isLoading = true
        let res = {}

        if (!this.id) {
            postData.customer_id = this.$route.query.customer_id
            res = await this.apiPost("customer_users", postData);
        } else {
            res = await this.apiPatch("customer_users/" + this.id, postData);
        }

        const resData = res.data;
        this.isLoading = false

        if(resData.status) {
            this.$toasted.success(resData.message, {
                theme: "toasted-primary",
                position: "bottom-right",
                duration: 2500
            });
            this.goToBack()
        } else {
            this.$toasted.error(resData.message, {
                theme: "toasted-primary",
                position: "bottom-right",
                duration: 2500
            });
        }
    }
  }
}
</script>

<style>
.container {
  width: 570px;
}
</style>
