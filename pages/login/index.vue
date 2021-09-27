<template>
  <div class="container-login">
    <div class="row justify-content-between">
      <div class="form-pages offset-md-4 col-12 col-md-4">
        <div class="form-content">
          <div class="logo mt-5 text-center">
            <img src="~/assets/logo_outclass.png" width="30%" height="auto" />
          </div>
          <div class="text-center">
            <h4 class="text-primary">Selamat Datang</h4>
          </div>
          <div class="mt-3">
            <div
              v-if="isLogin == false"
              class="alert alert-danger alert-dismissible fade show"
            >
              Incorrect email or password The email or password you entered is
              incorrect. Please try again or contact support if you are unable
              to access your account.
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                required
                v-model="form.username"
                placeholder="Username"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                required
                v-model="form.password"
                placeholder="Kata Sandi"
              />
            </div>

            <div
              v-if="loading"
              class="row align-items-center"
              style="margin-left: 0px"
            >
              <div class="spinner-border" role="status"></div>
              <div><span style="color: white">_</span>signing in</div>
            </div>
            <button
              @click="login"
              class="btn btn-primary btn-block"
              v-else
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      loading: false,
      isLogin: true,
    };
  },
  methods: {
    async login () {
      this.loading = true
      var body = {
        "username": this.form.username,
        "password": this.form.password
      }

      const res = await this.apiGet(
        "users?filter[]=username," + body.username + "&filter[]=password," + body.password +
        "&joinList[]=role_privileges,role_id,role_id->privileges,privilege_id as privilegeList"
      )

      if (res.data.data.length == 1) {
        this.loading = false
        this.setUser(res.data.data[0], res.data.message)

        this.$router.push('/')
      } else {
        this.isLogin = false
      }
      this.loading = false
    },
    goToForgetPassword() {
      this.$router.push("/forgetPassword");
    },
  },
};
</script>

<style>
/*
  .container-login {
    position: absolute;
    right: 0;
    margin-left: 50px;
    background-color: white;
  }
  .login-box {
    width: 360px;
    margin: 5% auto;
  }

  .login-box-body {
    -webkit-box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 10px 0px, rgba(0, 0, 0, 0.09) 0px -1px 5px 0px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 10px 0px, rgba(0, 0, 0, 0.09) 0px -1px 5px 0px;
    background-color: #fff;
    padding: 20px;
  }
  */
/*
  body {
      max-height: 100vh;
  }
  */
.form-pages {
  height: auto;
  width: 100%;
}
.form-content {
  margin: 0px 100px;
}
.login-option {
  text-align: center;
  color: #bdbdbd;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  margin: 5px 0 22px 0;
  border: none;
  background: #d2e9f5;
  color: #7c7979;
}

.masuk {
  padding-left: 30px;
  padding-right: 30px;
}
.lupa-password {
  font-weight: bold;
}
span:hover {
  cursor: pointer;
  color: #0095da;
}
.welcome h4 {
  margin-top: 20px;
  color: #0095da;
  font-weight: 400;
}
.banner-samping h1 {
  margin-top: 50%;
  margin-left: 10%;
  color: #fff;
  font-weight: bold;
  font-size: 500%;
}
.fa-google {
  background: conic-gradient(
      from -45deg,
      #ea4335 110deg,
      #4285f4 90deg 180deg,
      #34a853 180deg 270deg,
      #fbbc05 270deg
    )
    73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>
