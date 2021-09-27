<template>
  <div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="data in dataList" :key="data.id">
        <nuxt-link to="/notification/detail">
          <h5>{{data.Title}}</h5>
          <p>{{data.Content}}</p>
          <small class="text-muted">{{data.CreatedAt | moment}}</small>
        </nuxt-link>
      </li>
    </ul> 
  </div>
</template>

<script>
import moment from "moment";

export default {
  filters: {
    moment: (val) => {
      var tempIsToday = moment(val).isSame(Date(), "day");
      if (tempIsToday)
        return moment(val).format('hh:mm')
      else {
        return moment(val).format('DD MMM hh:mm')
      }
    }
  },
  props: [
    'dataList'
  ]
}
</script>