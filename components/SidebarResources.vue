<template>
  <nav class="nav nav-pills flex-column">
    <nuxt-link to="/resources/materi" exact class="nav-link">Materi</nuxt-link>
    <nuxt-link to="/resources/bank_soal" exact class="nav-link">Bank Soal</nuxt-link>
    <nuxt-link to="/resources/nilai" exact class="nav-link">Nilai</nuxt-link>
    <nuxt-link to="/resources/absensi" exact class="nav-link">Absensi</nuxt-link>
  </nav>  
</template>

<script>
export default {
  
}
</script>

<style>
.nuxt-link-active {
  color: #fff !important;
  background-color: #007bff;
}
</style>