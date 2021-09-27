import axios from 'axios';

const util = {
  printHelp(parameter) {
    console.log("-----------------------------")
    console.log(parameter)
    console.log("-----------------------------")
  },

  apiUrlHelper(url, parameter = "", print = false) {
    const configuration = this.getConfiguration()
    let link = "";
    link = [configuration.server, "api", "g", url].join("/")
    link += parameter == "" ? "":"&" + parameter

    // akan selalu print url jika print = true atau mode development
    if (print || configuration.development) {
      this.printHelp(link)
    }

    return link
  },

  apiGet(url, parameter = "", print = false) {
    var token = localStorage.getItem('token')
    const config = {
      headers: {
        'Accept': 'application/json',
        // "Authorization": "Bearer " + token
      }
    }

    const res = axios.get(
      this.apiUrlHelper(url, parameter, print),
      config
    )

    return res
  },

  apiPost(url, body, parameter = "") {
    var token = localStorage.getItem('token')
    const config = {
      headers: {
        'Accept': 'application/json',
        // "Authorization": "Bearer " + token
      }
    }

    const res = axios.post(
      this.apiUrlHelper(url, parameter),
      body,
      config
    )

    return res
  },

  apiPatch(url, body, parameter = "") {
    var token = localStorage.getItem('token')
    const config = {
      headers: {
        'Accept': 'application/json',
        // "Authorization": "Bearer " + token
      }
    }

    const res = axios.patch(
      this.apiUrlHelper(url, parameter),
      body,
      config
    )

    return res
  },

  apiDelete(url) {
    var token = localStorage.getItem('token')
    const config = {
      headers: {
        'Accept': 'application/json',
        // "Authorization": "Bearer " + token
      }
    }

    const res = axios.delete(
      this.apiUrlHelper(url),
      config
    )

    return res
  },

  companyAsset(page, link, highRes = true) {
    const configuration = this.getConfiguration()
    var path = "";

    if (link == "") {
      if(page == "avatar") {
        path = configuration.serverProd + "/public/img/avatar-default.png";
      } else {
        path = configuration.serverProd + "/public/img/no-image.png";
      }

      if(configuration.development)
        this.printHelp(path);

      return path;
    }

    if (page == "") {
      return link;
    }

    var highResPath = "";
    if (highRes) {
      highResPath = "/high-res";
    }
    //                     config.serverProd                 company      page          link
    // contohnya shiftsoft shiftsoft.org:9000 + /public/c/ + shift + / + product + / + z5NipFKx3WeTNk-ndk_MVwk=.png
    path = configuration.server + "/public/c/" + configuration.company + "/" + page + highResPath + "/" + link;

    if(configuration.development)
        this.printHelp(path);

    return path;
  },

  checkForm(fieldList, form) {
    const configuration = this.getConfiguration()
    let isDevelopment = configuration.development

    var messageList = [];

    fieldList.map((item) => {
      let fieldName = item["Name"]
      let fieldData = item["Data"]
      let fieldValue = form[fieldData]
      let fieldType = item["Type"]
      let isEmpty = false

      // check apakah kosong
      if (fieldType == "Select") {
        if (parseInt(fieldValue) == 0) {
          isEmpty = true
        }
      } else if (fieldType == "DateTime") {
          if (fieldValue == undefined || fieldValue == "") {
            isEmpty = true
          }
      } else if (Object.keys(fieldValue).length === 0) {
        isEmpty = true
      }

      // jika terbukti kosong maka mengirimkan pesan
      if (isEmpty)
        messageList.push(fieldName + " tidak boleh kosong")
        // jika mode development, akan menampilkan valuenya

      // check apakah kosong

      // check untuk angka
      if (fieldType == "Number") {
        if (Number.isInteger(parseInt(fieldValue)) == false) {
          messageList.push(fieldName + " harus diisi dengan angka")
        }
      }
      // check untuk angka
    });

    if (messageList.length > 0) {
      this.$swal({
        title: "Gagal",
        text: messageList.join("\n"),
        icon: "error",
      })
      return false
    }

    return true
  },
  checkPermission(privilege) {
    const privlegeList = JSON.parse(localStorage.getItem('privilegeList'))
    const privlegeListLength = privlegeList.length
    var tempPrivilegeList = []

    for (let i = 0; i < privlegeListLength; i++) {
      tempPrivilegeList.push(privlegeList[i].privilege.name)
    }

    console.log(tempPrivilegeList)

    return tempPrivilegeList.includes(privilege)
  }
}

export default util
