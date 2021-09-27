<template>
  <div class="container-login">
    <div class="row justify-content-between">
      <div class="form-page col-md-5">
        <div class="kembali">
          <button class="btn btn-outline-secondary rounded-circle" ><a href="/login"><i class="fa fa-arrow-left"></i></a></button>
        </div>
        <div class="form-content">

          <div class="judul">
            <h5>lupa kata sandi</h5>
          </div>
          <div>
            <h6>Masukkan alamat email akun kamu</h6>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" required v-model="form.email" placeholder="Email">
          </div>
          <div v-if="loading" class="row align-items-center" style="margin-left:0px;">
            <div class="spinner-border" role="status">
            </div>
            <div><span style="color:white;">_</span>waiting
            </div>
          </div>
            <button @click="forgetPassword" class="btn btn-primary rounded-pill">
              Forget Password
            </button>

        </div>
      </div>
      <div class="banner-samping col-md-6">
        <h1>Slogan text here</h1>
      </div>
    </div>
  </div>
    <!--
    <div class="container">
      <div class="login-box">
        <div class="login-box-body">
          <h4 class="text-center">Masukkan email yang terdaftar.</h4>
          <div class="form-group">
            <input type="text" class="form-control" required v-model="form.email" placeholder="Email">
          </div>
          <div v-if="loading" class="row align-items-center" style="margin-left:0px;">
            <div class="spinner-border" role="status">
            </div>
            <div><span style="color:white;">_</span>waiting</div>
          </div>
          <button @click="forgetPassword" class="btn btn-primary">
            Forget Password
          </button>
        </div>
      </div>
    </div>
    -->
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
      },
      loading: false,
    }
  },
  methods: {
    /*
    back(){
      this.$router.back()
    },
    */
    async forgetPassword() {
      this.$router.push('/kodeOtp')
        /*
        const res = await axios.post(
            this.apiUrl("forgetpassword"),
            {
                "Email": this.form.email,
            }
        )

        if (res.data.success == 0) {
            this.$swal({
                title: res.data.message,
                icon: "error",
                buttons: true,
                dangerMode: true,
            })
        } else {
            this.$swal({
                title: "Silahkan cek email anda",
                icon: "success",
                buttons: true,
                dangerMode: true,
            })
        }
        */
    }
  }
}
</script>

<style>
  /*
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
  body {
      min-height: 100vh;
  }
  .form-page {
    height: 100vh;
    width: auto;
  }
  .kembali {
    margin-top: 10px;
    margin-left: 10px;
    text-align: left;
  }
  .form-content {
    text-align: center;
    margin: 0px 120px;
    position: absolute;
    top: 35%;
  }
  .login-option {
    text-align: center;
    color: #BDBDBD;
  }
  input[type=text] {
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
    color:  #0095DA;
  }
  .judul h5 {
      color: #0095DA;
      font-weight: bold;
  }
  .banner-samping {
    transition: opacity 0.5s ease;
    -webkit-transition: opacity 0.5s ;
    background: linear-gradient(
                rgba(0, 0, 0, 0.7),
                rgba(0, 0, 0, 0.7)
                ),url('../assets/images/login-page2.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: auto;
  }

  .banner-samping h1 {
      margin-top: 50%;
      margin-left: 10%;
      color: #fff;
      font-weight: bold;
      font-size: 500%;
  }
  .fa-google {
    background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }
  .fa-arrow-left {
    color: #0095DA;
    transform: scale(1.3);
  }
</style>
