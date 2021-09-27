<template>
  <div class="container-login">
    <div class="row justify-content-between">
      <div class="form-page col-md-5">
        <div class="kembali">
          <button class="back btn btn-outline-info rounded-circle" ><a href="/login"><i class="fa fa-arrow-left arrow-top"></i></a></button>
        </div>
        <div class="form-content">

          <div class="logo-gembok">
            <button class="btn btn-primary rounded-circle btn-logo">
            <i class="fa fa-lock"></i>
            </button>
          </div>

          <div class="mt-5">
            <h6>kata sandi berhasil diperbarui!</h6>
          </div>

          <div class="mt-lg-5">
            <button class="btn btn-link rounded-pill kembali-login">
              <a href="/login">
              <i class="fa fa-arrow-left arrow-bottom"> kembali ke login</i>
              </a>
            </button>
          </div>
          <!--
          <div class="mt-lg-5">
            <button @click="kembaliLogin" class="btn btn-link rounded-pill kembali-login">
              <i class="fa fa-arrow-left arrow-bottom"> kembali ke login</i>
            </button>
          </div>
          -->

        </div>
      </div>
      <div class="banner-samping col-md-6">
        <h1>Belajar lebih menyenangkan</h1>
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
  data(){
    return {

    }
  },

      methods: {
        kembaliLogin() {
          this.$router.push('/login')
        }
      },
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
    text-align: left;
    margin: 0px 120px;
    position: absolute;
    top: 35%;
  }
  .kembali-login {
    text-align: left;
    font-weight: bold;
    transform: scale(1.0);
  }
  .arrow-bottom {
    color: #0095da;
  }
  .arrow-bottom:hover {
    color:darkturquoise;
  }
  .lupa-password {
    font-weight: bold;
  }
  span:hover {
    cursor: pointer;
    color:  #0095DA;
  }
  .logo-gembok {
    border: solid;
    border-width: 2px;
    box-shadow: #7c7979 10px -10px;
    color: #0095da;
    margin: 0 70px;
  }
  .fa-lock {
    color: #fff;
  }
  .btn-logo {
    margin: 20px 25px;
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
  .arrow-top {
    color: #0095DA;
    transform: scale(1.3);
  }
  .arrow-top:hover {
    color: #fff;
  }


</style>
