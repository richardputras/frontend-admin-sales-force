<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-outclass">
    <nuxt-link to="/" class="navbar-brand">OUTCLASS</nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/course">Courses</nuxt-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Resources <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Reports <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login">Login</nuxt-link>
        </li>
      </ul>

      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-bell"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
  .navbar-brand {
    font-weight: bold;
  }
</style>