<template>
  <div class="container-login">
    <div class="row justify-content-between">
      <div class="form-page col-md-5">
        <div class="kembali">
          <button class="back btn btn-outline-info rounded-circle" ><a href="/login"><i class="fa fa-arrow-left"></i></a></button>
        </div>
        <div class="form-content">
          <!--
          <div class="judul">
            <h5>lupa kata sandi</h5>
          </div>
          -->
          <div>
            <h6>Kami telah mengirimkan 4 Digit kode OTP ke email Kamu. silahkan masukkan kode tersebut dibawah ini.
            </h6>
          </div>
          <div v-if="isOTP == false" class="alert alert-danger alert-dismissible fade show">
              kode OTP salah. Mohon cek email Anda kembali.
            </div>
          <div class="row justify-content-around mt-4">
            <div class="col-sm-3">
              <input type="text" class="form-control" maxlength="1" required v-model="otp1" @keyup="next1" id="otp1">
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" maxlength="1" required v-model="otp2" @keyup="next2" id="otp2">
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" maxlength="1" required v-model="otp3" @keyup="next3" id="otp3">
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control" maxlength="1" required v-model="otp4" @keyup="next4" id="otp4">
            </div>
          </div>

          <!--
          <div>
            <v-otp-input
              inputClasses="otp-input"
              :numInputs="4"
              separator="-"
              :shouldAutoFocus="true"
              @on-complete="handleOnComplete"
              @on-change="handleOnChange"
            />
          </div>
          -->
          <div class="countdown" v-if="timerCount>0">
            belum menerima email?
          </div>
          <div class="countdown" v-if="timerCount>0">
            kirim ulang kode dalam {{timerCount}} detik
          </div>

          <div class="kirim-ulang" v-if="timerCount==0">
            <button @click="forgetPassword" class="btn btn-primary rounded-pill lanjutkan">
              kirim ulang
            </button>
          </div>

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
      timerCount: 30,
    }
  },

  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true
    }
  },
  methods: {
    next1() {
      document.getElementById('otp2').focus();
    },
    next2() {
      document.getElementById('otp3').focus();
    },
    next3() {
      document.getElementById('otp4').focus();
    },
    next4: function() {
      if (this.otp1==1 && this.otp2==2 && this.otp3==3 && this.otp4==4) {
        this.$router.push('/newPassword');
      }else {
        this.isOTP = false;
        this.otp1 = this.otp2 = this.otp3 = this.otp4 = '';

        /*
        this.otp1 = '',
        this.otp2 = '',
        this.otp3 = '',
        this.otp4 = '',
        */
        document.getElementById('otp1').focus()
      }
    },
    forgetPassword() {
      this.$router.push('/newPassword');
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
  .countdown {
    text-align: left;
    color: #BDBDBD;
  }
  input[type=text] {
  width: 100%;
  margin: 5px 0 22px 0;
  border: none;
  background: #d2e9f5;
  text-align: center;
  font-family: work sans;
  font-size: 2.3em;
  font-weight: bold;
  color: #0095DA;
  }
  input[type=text]:focus {
    color: #0095DA;
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

  .otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: "center";
}
.error {
  border: 1px solid red !important;
}
</style>
