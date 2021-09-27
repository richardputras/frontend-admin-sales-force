<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 mt-3" v-if="checkPermission('Calculator.View')">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Calculator</h5>
            <p class="card-text">Menghitung biaya</p>
            <button class="btn btn-primary" @click="goTo('calculator')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Customer</h5>
            <p class="card-text">Menampilkan semua customer yang ada</p>
            <button class="btn btn-primary" @click="goTo('customer')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Activity</h5>
            <p class="card-text">Menampilkan setiap aktifitas yang ada</p>
            <button class="btn btn-primary" @click="goTo('activity')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Glossary</h5>
            <p class="card-text">Menampilkan daftar glossary</p>
            <button class="btn btn-primary" @click="goTo('glossary')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Product Knowledge</h5>
            <p class="card-text">Menampilkan daftar product knowledge</p>
            <button class="btn btn-primary" @click="goTo('product_knowledge')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Agreement</h5>
            <p class="card-text">Menampilkan setiap MoU yang ada</p>
            <button class="btn btn-primary" @click="goTo('admin')">Lihat</button>
          </div>
       </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Employee Request</h5>
            <p class="card-text">Menampilkan setiap request yang ada</p>
            <button class="btn btn-primary" @click="goTo('hrd')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Roles</h5>
            <p class="card-text">Menampilkan setiap role yang ada</p>
            <button class="btn btn-primary" @click="goTo('roles')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Item</h5>
            <p class="card-text">Menampilkan setiap barang yang ada</p>
            <button class="btn btn-primary" @click="goTo('item')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Employee</h5>
            <p class="card-text">Menampilkan setiap karyawan yang ada</p>
            <button class="btn btn-primary" @click="goTo('employee')">Lihat</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Procedure</h5>
            <p class="card-text">Menampilkan setiap SOP yang ada</p>
            <button class="btn btn-primary" @click="goTo('procedure')">Lihat</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'

export default {
  layout: 'sidebar',
  data() {
    return {
    }
  },
  async created() {

  },
  methods: {
    goTo(page) {
      this.$router.push('/' + page)
    },
  }
}
</script>
