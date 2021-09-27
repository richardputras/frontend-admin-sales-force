<template>
  <div class="wrapper">
    <div class="spinner-border" role="status" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <header class="main-header shadow-sm">
        <nav class="navbar fixed-top navbar-expand-lg">

          <!-- <ol class="breadcrumb navbar-nav ml-5 mb-2">
            <li  v-for="(item, index) in folderTree" :key="index" class="breadcrumb-item text-main-blue">


                <span class="text-16-sb  ">
                  <a role="button" @click="goToFolderDetail(item.link,index)" v-if="index < folderTree.length-1">{{item.text}}</a>
                  <a v-else>{{item.text}}</a>
                </span>
            </li>
          </ol> -->
          <ul class="navbar-nav ml-5 mr-auto">
            <li class="nav-item pl-2 pr-2">
              <h2 class="text-16-sb">Welcome, {{getUser().name}}</h2>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <!-- <li class="nav-item pl-2 pr-2">
              <a class="nav-link" @click="goTo(8)"><img src="~assets/icon/bookmark.svg" alt=""></a>
            </li>
            <li class="nav-item pl-2 pr-2">
              <a class="nav-link" href="#"><img src="~assets/icon/notification.svg" alt=""></a>
            </li> -->
            <li class="nav-item pl-2 pr-2">
              <a class="nav-link" href="#" @click="logOut()">
                <img src="~assets/icon/logout.svg" alt="">
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div class="main-sidebar">
        <ul class="sidebar-menu">
          <li :class="activeTab == 0 ? 'activeTab':''">
            <a role="button" @click="goTo(0)">
              <img v-if="activeTab == 0" src="~/assets/icons/dashboard/activeTab1.png" alt="btn main menu" v-b-tooltip="{trigger: 'hover', title: 'main menu', placement: 'right', variant: 'info' }">
              <img v-else src="~/assets/icons/dashboard/InactiveTab1.png" alt="btn main menu" v-b-tooltip="{trigger: 'hover', title: 'main menu', placement: 'right', variant: 'secondary' }">
            </a>
          </li>
        </ul>
      </div>
      <div class="content-wrapper">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      "activeTab": 0,
      "loading": true,
      "stateInit": {},
      "folderTree" : [],
    }
  },
  mounted: function(){

    if (this.folderTree.length == 0 ) {
     var folderTree = JSON.parse(localStorage.getItem('folderTree'));

      this.folderTree = folderTree;
    }
    var self = this;
    this.$root.$on('myEvent', ($folder) => { // here you need to use the arrow function
     self.folderTree.push($folder);
     localStorage.setItem('folderTree',JSON.stringify(self.folderTree))
    })
  },
  async created() {
    console.log("created")

    if (this.getConfiguration().isLogin) {
      this.loading = false
    } else {
      this.$router.push('/login')
    }
      // this.getListOfParents(this.$route.path.substring(this.$route.path.lastIndexOf('/')+1));
      // console.log(this.$route.path.substring(this.$route.path.lastIndexOf('/')+1));
  },
  methods: {
    goTo(index) {
      this.activeTab = index;
        this.folderTree = [];
      if (index == 0) {
        //push to main index
        this.$router.push('/')
      } else if (index == 1) {
        //push to /market
        this.$router.push('/market')
      } else if (index == 2) {
        //push to /resources
        this.$router.push('/resources')

        // // this.stateInit['Resources'] = ''
        // this.$store.commit('setState', this.stateInit)
      } else if (index == 3) {
        //push to /class
        this.$router.push('/class')
      } else if (index == 4) {
        //push to /class
        this.$router.push('/enrichment')
      // } else if (index == 6) {
      // //push to /Chat
      // this.$router.push('/chat')
      } else if (index == 7) {
        //push to /setting
        this.$router.push('/setting')
      } else if (index == 8) {
        //push to /bookmark
        this.$router.push('/market/bookmark')
      }
    },
    logOut() {
      this.$swal({
        title: "Do you want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.removeUser()
          this.$router.push('/login')
        }
      });
    },
    goToFolderDetail($idFolder, index) {
      // vuex way
      // var lastIndex = this.$store.state.fileState.length-1
      // if (index < lastIndex) {
      //   var arrState = this.$store.state.fileState;
      //   arrState.splice(index+1, lastIndex);
      //   this.$store.commit('setState',arrState);
      // }

      //localstorage way
      var lastIndex = this.folderTree.length-1;
      if (index < lastIndex) {
        this.folderTree.splice(index+1, lastIndex);
      }
      this.$router.push('/resources/folder/'+$idFolder)
    },

  },
}
</script>

<style>
body {
  background-color: #FCFCFC;
  overflow-x: hidden;
}

.activeTab {
  background-color: white;
}

.wrapper {
  position: relative;
}

a {
  margin-top: 0px;
  margin-bottom: 0px
}

.main-header {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: #fff;
}

.main-sidebar {
  width: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0094DA;
  z-index: 1030;
  min-height: 100%;
}

.content-wrapper {
  margin-left: 60px;
  padding-top: 50px;
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}
.sidebar-menu a {
  color: #EAF8FF;
  text-align: center;
}
.sidebar-menu > li > a {
  /* padding: 12px 5px 12px 16px; */
  padding-top: 12px;
  padding-bottom: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
  display: block;
}

/* ini kalo dihover, icon jadi hilang, krn warna icon dan background sama */
/* .sidebar-menu li a:hover {
  background-color: #EAF8FF;
} */

.content {
  padding-bottom: 30px;
  margin-left: auto;
  background-color: #fbfbfb;
}


.table-media {
  width: 100%;
  table-layout: fixed;
}
.table-media th, .table-media td {
  padding: 0.3rem;
}

.breadcrumb {
  background-color: white;
  padding: 2px 15px !important;
}


  .breadcrumb-item + .breadcrumb-item::before {
        content: ">";
        color: #0094DA;
        font-weight: bold;
    }

</style>
