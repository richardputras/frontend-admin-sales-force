import Vue from 'vue'
import utility from '~/plugins/functions'
import configuration from '~/static/configuration'

Vue.mixin({
  created: function () {
    if (configuration.resetOnStart)
      localStorage.clear();

    let token = localStorage.getItem("token")
    let user = localStorage.getItem('user')
    if (token != null) {
      configuration.user = JSON.parse(user)
      configuration.isLogin = true
    }
  },
  methods: {
    getConfiguration() {
      return configuration
    },
    getUser() {
      return configuration.user
    },
    parseID(data, url = false, route = false) {
      let tempId = data.IDEncrypt;
      if (configuration.development) {
        tempId = data.ID
      }

      // jika mau parse url maka secara otomatis akan mengirimkan "id nya|god"
      if (url) {
        // jika mengambil id di routing
        if (route) {
          // akan mengirimkan id encrypt
          if (configuration.development) {
            tempId = tempId + "/id"
          } else {
            tempId = tempId + "/idencrypt"
          }
        } else {
          // tidak mengambil id di routing, berarti digunakan untuk filter
          tempId = tempId + "|god"
        }
      }

      return "" + tempId + ""
    },
    setUser(data, token) {
      // FUTURE
      // melimit data user apa yang di simpan di dalam local storage

      configuration.user = JSON.stringify(data)
      localStorage.setItem('user', configuration.user);
      localStorage.setItem('privilegeList', JSON.stringify(data.privilegeList));
      localStorage.setItem('token', token);
      configuration.isLogin = true
    },
    removeUser() {
      localStorage.removeItem("user");
      localStorage.removeItem("privilegeList");
      localStorage.removeItem("token");
      configuration.isLogin = false
    },
    printHelp: utility.printHelp,
    apiUrlHelper: utility.apiUrlHelper,
    apiGet: utility.apiGet,
    apiPost: utility.apiPost,
    apiPatch: utility.apiPatch,
    apiDelete: utility.apiDelete,
    companyAsset: utility.companyAsset,
    checkForm: utility.checkForm,
    checkPermission: utility.checkPermission,
  },
})
