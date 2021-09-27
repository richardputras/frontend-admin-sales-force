<template>
  <div class="box shadow-sm bg-white p-3">
    <h4>Montessori</h4>
    <p>Bahasa Indonesia</p>
    <p>Kelas 6 SD</p>

    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <a href="#">Materials</a>
      </li>
      <li class="list-group-item">
        <a href="#">Updates</a>
      </li>
      <li class="list-group-item">
        <nuxt-link to="/gradebook_report">Gradebook</nuxt-link>
      </li>
      <li class="list-group-item">
        <nuxt-link to="/grades_report">Grade Setup</nuxt-link>
      </li>
      <li class="list-group-item">
        <a href="#">Badges</a>
      </li>
      <li class="list-group-item">
        <nuxt-link to="/attendances_report">Attendance</nuxt-link>
      </li>
      <li class="list-group-item">
        <a href="#">Members</a>
      </li>
    </ul>

    <div class="bg-success p-2 text-white">
      <h3>Access Code</h3>
      <p>97P8-87MV-P4VMD</p>
      <a href="#">Reset</a>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>