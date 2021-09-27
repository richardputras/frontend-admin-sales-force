<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-md-3">  
        </div>
        <div v-if="privilegeLoading">
          <div class="spinner-border mt-5 ml-5" role="status">
            <div><span style="color:white;">_</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
            <h4 class="text-24-sb">
                Daftar Privilege
            </h4>
            <div v-if="privilegeLoading == false && privilegeList.length == 0">
                <h3 class="mt-3 ml-5">Not Found</h3>
            </div>
            <br>
            <div v-for="(privilege,index) in groupedPrivilege" :key="index">
                <span>{{privilege.name}}</span>
                <ul>
                  <li v-for="(privilegeNameList, index) in privilege.privilege" style="list-style: none" :key="index">
                    <input type="checkbox" :id="privilegeNameList.data.id" :value="privilegeNameList.data.name" v-model="privilegeNameList.status"> {{privilegeNameList.data.name}} 
                  </li>
                </ul>
            </div>
            <div class="d-flex justify-content-around">
              <FormulateInput
                type="button"
                input-class="btn btn-danger rounded-pill"
                label="Kembali"
                @click="goToBack"
              />
            <FormulateInput
                type="submit"
                :disabled="isLoading"
                :label="isLoading ? 'Loading...' : 'Simpan'"
                @click="addRolePrivilege"
                input-class="btn btn-primary rounded-pill"
              />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'sidebar',
  data() {
    return {
        privilegeList: [],
        privilegeLoading: true,
        rolePrivilegeList: [],
        rolePrivilegeLoading: true,
        privilegeStatusList: [],
        groupedPrivilege: [],
        isLoading: false
    }
  },
  async created() {
    this.initPrivilegeList()
  },
  methods: {
    async initPrivilegeList() {
      const res = await this.apiGet("privileges")
      
      this.privilegeList = []
      if (res.data.status == true) {
        this.privilegeList = res.data.data
        this.initRolePrivilegeList()
        this.privilegeLoading = false
      } else {
        this.privilegeLoading = false
        this.initRolePrivilegeList()
      }
    },
    async initRolePrivilegeList() {
      const res = await this.apiGet("role_privileges")
      
      this.rolePrivilegeList = []
      if (res.data.status == true) {
        this.rolePrivilegeList = res.data.data
        this.rolePrivilegeLoading = false
        this.privilegeStatus()
        this.privilegeChecked()
        this.groupedPrivileges()
      } else {
        this.rolePrivilegeLoading = false
        this.privilegeStatus()
        this.privilegeChecked()
        this.groupedPrivileges()
      }
    },
    addRolePrivilege() {
      this.isLoading = true
      var activationList = []  // untuk menyimpan privilege yang dicentang dan statusnya
      let activeData = {}
      var found = false

      this.groupedPrivilege.forEach((itemGroup) => {
        itemGroup.privilege.forEach((itemPrivilege) => {
          if (itemPrivilege.status == true) {
            activationList.push(itemPrivilege)
          }
        })
      })
      activationList.forEach((active) => {
        activeData = Object.assign({role_id: this.$route.params.id, privilege_id: active.data.id})
        console.log(activeData)
        activeData = JSON.parse(JSON.stringify(activeData))
        for(var i in this.rolePrivilegeList){
          if (this.rolePrivilegeList[i].role_id == this.$route.params.id) {
            found = true
            // console.log(activeData[i] + " compare with " + this.rolePrivilegeList[j].privilege_id + " = " + found)
            if (found == true) {
              this.apiDelete("role_privileges/" + this.rolePrivilegeList[i].id)
            }
          }
        }
        activeData = this.apiPost("role_privileges", activeData)
      })

      this.isLoading = true

      this.$toasted.success("Sukses menambahkan role privilege", {
        theme: "toasted-primary",
        position: "bottom-right",
        duration: 1500
      });
      this.$router.back()
    },
    goToBack() {
      this.$router.back();
    },
    privilegeStatus () {
      this.privilegeStatusList = []

      for (var n = 0; n < this.privilegeList.length; n++) {
        this.privilegeStatusList.push({data: this.privilegeList[n], status: false})
      }
    },
    privilegeChecked() {
      var tempPrivilegeList = this.privilegeStatusList
      var tempRolePrivilegeList = this.rolePrivilegeList
    
      for (var i in tempPrivilegeList) {
        for (var j in tempRolePrivilegeList) { 
          if (tempPrivilegeList[i].data.id === tempRolePrivilegeList[j].privilege_id && tempRolePrivilegeList[j].role_id === this.$route.params.id) {
            tempPrivilegeList[i].status = true
          }
        }
      }
    },
    groupedPrivileges() {      
      var itemFound = false
      this.groupedPrivilege = []  // untuk menyimpan kategori dan isi per kategorinya dari privilege

      this.privilegeStatusList.forEach((item) => {
        var nameSplit = item.data.name.split(/[.]/)[0]
        if (this.groupedPrivilege.length == 0) {
          this.groupedPrivilege.push({name: nameSplit, privilege: [item]})        
        } else {
          itemFound = false
          this.groupedPrivilege.forEach((group) => {
            if (nameSplit == group.name) {
              itemFound = true
              group.privilege.push(item)
            }
          })
          
          if (itemFound == false) {
            this.groupedPrivilege.push({name: nameSplit, privilege: [item]})
            let uniqueGroupedPrivilege = [...new Set(this.groupedPrivilege)]
            this.groupedPrivilege = uniqueGroupedPrivilege
          }
        }
      });
    }
  }
}
</script>

<style>
.d-flex {
  width: 50%;
}
</style>
