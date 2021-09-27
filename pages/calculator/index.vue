<template>
    <div class="content mt-3">
        <div class="container-fluid">
            <table class="table table-hovered table-bordered">
                <thead class="bg-warning text-white text-center">
                    <td>Modul</td>
                    <td colspan=5>Biaya</td>
                </thead>
                <tr>
                    <td>Video Konferensi (Per pelajar per bulan)</td>
                    <td v-for="(item, index) in videoCallPriceList"
                        :key="item.id"
                        @click="selectVideoCallPrice(index)"
                        class="cursor-pointer"
                        :class="selectedVideoCallPrice == index ? 'bg-primary text-white':'bg-light'"
                    >
                        {{item.minimumQuantity}} jam {{item.maximumQuantity == 0 ? " >":" - " + item.maximumQuantity + " jam"}} 
                        <br>
                        Rp.{{item.price || numberFormat}}
                    </td>
                </tr>
                <tr>
                    <td>
                        Harga LMS
                    </td>
                    <td colspan=5r>
                        Rp.{{lmsPrice | numberFormat}}
                    </td>
                </tr>
                <tr>
                    <td>
                        Personassist
                    </td>
                    <td colspan=5>
                        Rp.{{personAssistPrice | numberFormat}}
                    </td>
                </tr>
            </table>

            <div class="row">
                <div class="col-12 col-sm-6">
                    <h2 class="text-14-m">Student @ Rp.{{lmsPrice | numberFormat}}</h2>
                    <input class="form-control" type="number" v-model="form.student" @keyup="calculatePrice">
                </div>
                <div class="col-12 col-sm-6">
                    <h2 class="text-14-m">Harga Video Call @ murid</h2>
                    <input class="form-control" type="number" v-model="videoCallPrice" @keyup="calculatePrice">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 col-sm-6">
                    <h2 class="text-14-m">Video Call /bulan @jam Rp.{{videoCallPriceList[this.selectedVideoCallPrice].price | numberFormat}}</h2>
                    <input class="form-control" type="number" v-model="form.videoCallHour" @keyup="checkVideoCallPrice">
                </div>
                <div class="col-12 col-sm-6">
                    <h2 class="text-14-m">Jumlah Guru @ Rp.{{personAssistPrice | numberFormat}}</h2>
                    <input class="form-control" type="number" v-model="form.teacher" @keyup="calculatePrice">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 col-sm-6">
                    <h2 class="text-14-m">Harga LMS @ Rp.{{lmsPrice | numberFormat}}</h2>
                    <input class="form-control" type="number" v-model="lmsPrice" @keyup="calculatePrice">
                </div>
            </div>
            
            <div class="mt-5 text-center" v-if="form.student == 0 && form.videoCallHour == 0 && form.teacher == 0">
                <h2>Belum ada perhitungan harga, ayo masukan perhitungan!</h2>
            </div>
            <div class="" v-else>
                <h2 class="text-24-sb mt-5">Perhitungan Harga</h2>

                <table class="table table-bordered">
                    <tr class="text-14-m" v-if="form.student != 0 && form.videoCallHour != 0">
                        <td>Video Call</td>
                        <td>Rp.{{this.videoCallPrice | numberFormat}} x {{form.student | numberFormat}} Murid x {{form.videoCallHour}} Jam</td>
                        <td class="text-bold">Rp. {{this.form.videoCallHour * this.form.student * this.videoCallPrice | numberFormat}}</td>
                    </tr>
                    <tr class="text-14-m" v-if="form.student != 0">
                        <td>LMS</td>
                        <td>Rp.{{lmsPrice | numberFormat}} x {{form.student | numberFormat}} Murid</td>
                        <td class="text-bold">Rp. {{this.form.student * this.lmsPrice | numberFormat}}</td>
                    </tr>
                    <tr class="text-14-m" v-if="form.teacher != 0">
                        <td>Personal Assistant</td>
                        <td>Rp.{{personAssistPrice | numberFormat}} x {{form.teacher | numberFormat}} Guru</td>
                        <td class="text-bold">Rp. {{this.form.teacher * this.personAssistPrice | numberFormat}}</td>
                    </tr>
                    <tr class="text-48-sb">
                        <td colspan="3">
                            Rp. {{totalPrice | numberFormat}} / bulan
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  layout: "sidebar",
  data() {
    return {
      filters: {},
      videoCallPriceList: [
          {id: 1, minimumQuantity: 5, maximumQuantity: 20, price: 300},
          {id: 2, minimumQuantity: 21, maximumQuantity: 40, price: 275},
          {id: 3, minimumQuantity: 41, maximumQuantity: 60, price: 250},
          {id: 4, minimumQuantity: 61, maximumQuantity: 80, price: 225},
          {id: 5, minimumQuantity: 80, maximumQuantity: 0, price: 200},
      ],
      selectedVideoCallPrice: 0,
      videoCallPrice: 0,
      lmsPrice: 15000,
      personAssistPrice: 50000,
      form: {
          "student": 0,
          "videoCallHour": 0,
          "teacher": 0
      },
      totalPrice: 0,
      helpCentreList: [],
      helpCentreListLoading: true,
    };
  },
  created() {
    this.videoCallPrice = this.videoCallPriceList[0].price
  },
  methods: {
    checkVideoCallPrice() {
        for (let i = 0; i < this.videoCallPriceList.length; i++) {
            const item = this.videoCallPriceList[i]

            if (item.minimumQuantity <= parseInt(this.form.videoCallHour)) {
                this.videoCallPrice = item.price
                this.selectedVideoCallPrice = i
            }
        }

        this.calculatePrice()
    },
    selectVideoCallPrice(index) {
        this.selectedVideoCallPrice = index
        this.videoCallPrice = this.videoCallPriceList[this.selectedVideoCallPrice].price
        this.calculatePrice()
    },
    calculatePrice() {
        let tempPrice = 0

        tempPrice += this.form.videoCallHour * this.form.student * this.videoCallPrice,
        tempPrice += this.form.student * this.lmsPrice,
        tempPrice += this.form.teacher * this.personAssistPrice,
        this.totalPrice = tempPrice
    },
  },
  filters: {
    dateTime: function (date) {
      return moment(date).format("DD MMM YYYY HH:mm");
    },
    dateDmy(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    numberFormat: function(value) {
        return Intl.NumberFormat('id-ID').format(value)
    }
  },
};
</script>

<style>
</style>
