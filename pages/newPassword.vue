<template>
  <div class="container-login">
    <div class="row justify-content-between">
      <div class="form-page col-md-6">
        <div class="kembali">
          <button class="back btn btn-outline-info rounded-circle" ><a href="/login"><i class="fa fa-arrow-left"></i></a></button>
        </div>

        <div class="form-content">
          <div class="input-group mt-4">
            <input type="password" class="form-control" id="newPassword" placeholder="kata sandi baru" aria-describedby="inputGroupPrepend2" required>
            <div class="input-group-prepend" v-if="visible==false">
              <button class="input-group-text" @click="showPassword()"><i class="fa fa-eye"></i></button>
            </div>
            <div class="input-group-prepend" v-else>
              <button class="input-group-text" @click="reverseShowPassword()"><i class="fa fa-eye-slash"></i></button>
            </div>
          </div>
          <div class="input-group mt-4">
            <input type="password" class="form-control" id="newPasswordConfirmation" placeholder="Username" aria-describedby="inputGroupPrepend2" required>
            <div class="input-group-prepend" v-if="visible2==false">
              <button class="input-group-text" @click="showPasswordConfirm()"><i class="fa fa-eye"></i></button>
            </div>
            <div class="input-group-prepend" v-else>
              <button class="input-group-text" @click="reverseShowPasswordConfirm()"><i class="fa fa-eye-slash"></i></button>
            </div>
          </div>

          <div v-if="loading" class="row align-items-center" style="margin-left:0px;">
            <div class="spinner-border" role="status">
            </div>
            <div><span style="color:white;">_</span>waiting
            </div>
          </div>
            <button @click="savePassword" class="btn btn-primary rounded-pill mt-4 lanjutkan">
              simpan
            </button>
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
  data() {
    return{
        visible: false,
        visible2: false,
    }

  },
  methods: {
    savePassword() {
      this.$router.push('/newPasswordSuccess');
    },
    showPassword() {
      this.visible = true;
    },
    reverseShowPassword() {
      this.visible = false;
    },
    showPasswordConfirm() {
      this.visible2 = true;
    },
    reverseShowPasswordConfirm() {
      this.visible2 = false;
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
    text-align: left;
    margin: 0px 100px 0px 130px;
    position: absolute;
    top: 35%;
    width: 50%;
  }
  .login-option {
    text-align: center;
    color: #BDBDBD;
  }
  input[type=password] {
  width: 100%;
  margin: 5px 0 22px 0;
  border: none;
  background: #d2e9f5;
  color: #7c7979;
  }
  .input-group-text {
    border: none;
    text-align: left;
    color: #0095da;
    margin-top: 4.3px;
  }
  .input-group-text:focus {
    outline: none;
    box-shadow: none;
  }
  .lanjutkan {
    padding: 5px 30px
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
  .fa-arrow-left:hover {
    color: #fff;
  }



</style>
