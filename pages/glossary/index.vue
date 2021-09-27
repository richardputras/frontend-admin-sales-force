<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="offset-3 col-md-5 pl-5">
            <h3 class="text-24-sb">({{glossaryList.length}})
                List Glossary
                <i class="fas fa-plus fa-xs cursor-pointer text-primary" @click="goToGlossaryForm()"></i>
            </h3>

            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="search" placeholder="Search...">
                </div>
              </div>
            </div>

            <div v-if="glossaryListLoading">
              <div class="spinner-border mt-5 ml-5" role="status">
                <div><span style="color:white;">_</span>
                </div>
              </div>
            </div>
            
            <div v-for="glossary in filteredList" :key="glossary.id">
              <div>
                  <h5><i class="fas fa-pencil-alt fa-xs cursor-pointer text-warning" @click="goToGlossaryForm(glossary.id)"></i> {{glossary.title}}</h5>
                  <p>{{glossary.description}}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  layout: 'sidebar',
  data() {
    return {
        search: '',
        glossaryList: [],
        glossaryListLoading: true,
    }
  },
  
  created() {
    this.getGlossaryList();
  },
  methods: {
    async getGlossaryList() {
      const res = await this.apiGet("glossaries")

      this.glossaryList = res.data.data
      this.glossaryListLoading = false
      this.sortedArray()
    },
    goToGlossaryForm(id) {
        var link = "/glossary/form"

        if (id != null)
            link += "?id=" + id

        this.$router.push(link)
    },
    sortedArray: function() {
      function compare(a, b) {
        if (a.title < b.title)
          return -1
        if (a.title > b.title)
          return 1
        return 0
      }
      return this.glossaryList.sort(compare)
    }
  },
  computed: {
    filteredList () {
      return this.glossaryList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>
